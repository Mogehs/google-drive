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

    const q = query(
      colRef,
      where("parentId", "==", parentId ?? ""),
      where("userEmail", "==", user)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(docsData);
        setLoading(false);
      },
      (err) => {
        setError(err.message || "Failed to fetch data");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, parentId, user]);

  return { data, loading, error };
};

export default useFetchData;
