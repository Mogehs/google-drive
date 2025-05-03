import { database } from "@/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const addFile = async (imageLink: string, imageName: string) => {
  try {
    const docRef = await addDoc(collection(database, "files"), {
      imageLink: imageLink,
      imageName: imageName,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding file to Firestore:", error);
    throw error;
  }
};

export const getFiles = async () => {};
