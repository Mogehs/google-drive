import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { database } from "@/firebaseConfig";

const useFetchData = (
  collectionName: string,
  parentId?: string,
  user?: string
) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setData([]);
      return;
    }

    setLoading(true);
    setData([]); // ✅ Clear old data on dependency change

    const colRef = collection(database, collectionName);

    // Items created by the user
    const q1 = query(
      colRef,
      where("parentId", "==", parentId ?? ""),
      where("userEmail", "==", user)
    );

    // Items shared with the user
    const q2 = query(
      colRef,
      where("parentId", "==", parentId ?? ""),
      where("sharedTo", "array-contains", user)
    );

    let ownedItems: any[] = [];
    let sharedItems: any[] = [];

    const mergeAndSet = () => {
      const merged = [...ownedItems, ...sharedItems].filter(
        (item, index, self) => index === self.findIndex((i) => i.id === item.id)
      );
      setData(merged);
      setLoading(false);
    };

    const unsub1 = onSnapshot(
      q1,
      (snapshot) => {
        ownedItems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        mergeAndSet();
      },
      (err) => {
        setError(err.message || "Failed to fetch owned items");
        setLoading(false);
      }
    );

    const unsub2 = onSnapshot(
      q2,
      (snapshot) => {
        sharedItems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        mergeAndSet();
      },
      (err) => {
        setError(err.message || "Failed to fetch shared items");
        setLoading(false);
      }
    );

    return () => {
      unsub1();
      unsub2();
    };
  }, [collectionName, parentId, user]);

  return { data, loading, error };
};

export default useFetchData;
