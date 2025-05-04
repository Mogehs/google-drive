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

    const colRef = collection(database, collectionName);

    // Query 1: Items created by the user
    const q1 = query(
      colRef,
      where("parentId", "==", parentId ?? ""),
      where("userEmail", "==", user)
    );

    // Query 2: Items shared with the user
    const q2 = query(
      colRef,
      where("parentId", "==", parentId ?? ""),
      where("sharedTo", "array-contains", user)
    );

    const combinedData: any[] = [];
    let unsub1: () => void;
    let unsub2: () => void;

    unsub1 = onSnapshot(
      q1,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        combinedData.push(...docs);
        setData((prev) => {
          const merged = [
            ...docs,
            ...prev.filter((p) => !docs.some((d) => d.id === p.id)),
          ];
          return merged;
        });
        setLoading(false);
      },
      (err) => {
        setError(err.message || "Failed to fetch owned items");
        setLoading(false);
      }
    );

    unsub2 = onSnapshot(
      q2,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        combinedData.push(...docs);
        setData((prev) => {
          const merged = [
            ...prev,
            ...docs.filter((d) => !prev.some((p) => p.id === d.id)),
          ];
          return merged;
        });
        setLoading(false);
      },
      (err) => {
        setError(err.message || "Failed to fetch shared items");
        setLoading(false);
      }
    );

    return () => {
      unsub1 && unsub1();
      unsub2 && unsub2();
    };
  }, [collectionName, parentId, user]);

  return { data, loading, error };
};

export default useFetchData;
