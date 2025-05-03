import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "@/firebaseConfig";

const useFetchData = (collectionName: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, collectionName),
      (snapshot) => {
        const docsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(docsData);
        setLoading(false); // Set loading to false once data is received
      },
      (err) => {
        setError(err.message || "Failed to fetch data");
        setLoading(false);
      }
    );

    // Cleanup the listener when the component unmounts or collectionName changes
    return () => unsubscribe();
  }, [collectionName]); // Only re-run if collectionName changes

  return { data, loading, error };
};

export default useFetchData;
