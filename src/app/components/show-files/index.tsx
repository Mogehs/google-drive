"use client";
import React, { useState } from "react";
import useFetchData from "@/app/hooks/useFetchData";
import styles from "./showFile.module.scss";
import { FaFileImage, FaEllipsisV } from "react-icons/fa";
import { FaFolder } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { shareItem } from "@/app/utils/firestore";

interface ShowFilesProps {
  parentId?: string;
  user?: string;
}

const ShowFiles = ({ parentId, user }: ShowFilesProps) => {
  const { data, loading, error } = useFetchData("files", parentId, user);
  const router = useRouter();

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [email, setEmail] = useState("");

  const openModal = (item: any) => {
    setSelectedItem(item);
    (document.getElementById("email_modal") as HTMLInputElement).checked = true;
  };

  const handleSubmit = async () => {
    if (selectedItem && email) {
      try {
        await shareItem(selectedItem.id, email);
        alert("Shared successfully!");
      } catch (err) {
        alert("Error sharing item.");
      }
      setEmail("");
      (document.getElementById("email_modal") as HTMLInputElement).checked =
        false;
    }
  };

  if (loading)
    return (
      <div
        className={`${styles.mainContainer} flex justify-center items-center`}
      >
        <progress className="progress w-56"></progress>
      </div>
    );

  if (error) return <p>Error: {error}</p>;

  const folders = data.filter((item: any) => item.isFolder);
  const files = data.filter((item: any) => !item.isFolder);

  const handleFileClick = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <div className={styles.mainContainer}>
      <ul className={styles.imagesGrid}>
        {/* Folders */}
        {folders.map((folder: any) => (
          <li key={folder.id} className={styles.fileItem}>
            <div
              className={styles.fileBox}
              onClick={() => router.push(`/folder?id=${folder.id}`)}
            >
              <FaFolder className={styles.fileIcon} color="#facc15" />
              <p className={styles.fileName}>{folder.folderName || "Folder"}</p>
            </div>
            <FaEllipsisV
              className="text-gray-400 cursor-pointer mt-1"
              onClick={() => openModal(folder)}
            />
          </li>
        ))}

        {/* Files */}
        {files.map((file: any) => (
          <li key={file.id} className={styles.fileItem}>
            <div
              className={styles.fileBox}
              onClick={() => handleFileClick(file.imageLink)}
            >
              <Image
                src={file.imageLink}
                alt={file.imageName}
                width={100}
                height={100}
                className="w-20 h-20"
              />
              <p className={styles.fileName}>{file.imageName}</p>
            </div>
            <FaEllipsisV
              className="text-gray-400 cursor-pointer mt-1"
              onClick={() => openModal(file)}
            />
          </li>
        ))}
      </ul>

      {/* Shared Modal */}
      <input type="checkbox" id="email_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Share {selectedItem?.folderName || selectedItem?.imageName}
          </h3>
          <p className="py-2">Enter an email to share:</p>
          <input
            type="email"
            placeholder="example@example.com"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="modal-action">
            <label className="btn btn-primary" onClick={handleSubmit}>
              Share
            </label>
            <label htmlFor="email_modal" className="btn">
              Cancel
            </label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="email_modal">
          Close
        </label>
      </div>
    </div>
  );
};

export default ShowFiles;
