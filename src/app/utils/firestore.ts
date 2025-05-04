import { database } from "@/firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";

export const addFile = async (
  imageLink: string,
  imageName: string,
  parentId?: string,
  userEmail?: string,
  sharedTo?: object
) => {
  try {
    const docRef = await addDoc(collection(database, "files"), {
      imageLink: imageLink,
      imageName: imageName,
      isFolder: false,
      parentId: parentId || "",
      userEmail: userEmail || "",
      sharedTo: sharedTo || "",
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding file to Firestore:", error);
    throw error;
  }
};

export const addFolder = async (payload: {
  folderName: string;
  isFolder: boolean;
  filesList: object;
  parentId?: string;
  userEmail?: string;
  sharedTo?: object;
}) => {
  try {
    const docRef = await addDoc(collection(database, "files"), {
      folderName: payload.folderName,
      isFolder: payload.isFolder,
      filesList: payload.filesList,
      parentId: payload.parentId || "",
      userEmail: payload.userEmail || "",
      sharedTo: payload.sharedTo || "",
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding file to Firestore:", error);
    throw error;
  }
};

export const shareItem = async (docId: string, email: string) => {
  try {
    const docRef = doc(database, "files", docId);
    await updateDoc(docRef, {
      sharedTo: arrayUnion(email),
    });
    console.log(`Shared with ${email}`);
  } catch (error) {
    console.error("Error sharing item:", error);
    throw error;
  }
};
