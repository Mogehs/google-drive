import { database } from "@/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const addFile = async (
  imageLink: string,
  imageName: string,
  parentId?: string,
  userEmail?: string
) => {
  try {
    const docRef = await addDoc(collection(database, "files"), {
      imageLink: imageLink,
      imageName: imageName,
      isFolder: false,
      parentId: parentId || "",
      userEmail: userEmail || "",
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
  parentId: string;
  userEmail: string;
}) => {
  try {
    const docRef = await addDoc(collection(database, "files"), {
      folderName: payload.folderName,
      isFolder: payload.isFolder,
      filesList: payload.filesList,
      parentId: payload.parentId,
      userEmail: payload.userEmail,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding file to Firestore:", error);
    throw error;
  }
};
