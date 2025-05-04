"use client";
import React from "react";
import useFetchData from "@/app/hooks/useFetchData";
import styles from "./showFile.module.scss";
import { FaFileImage } from "react-icons/fa";
import { FaFolder } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ShowFilesProps {
  parentId?: string;
  user?: string;
}

const ShowFiles = ({ parentId, user }: ShowFilesProps) => {
  const { data, loading, error } = useFetchData("files", parentId, user);
  const router = useRouter();

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
          <li
            key={folder.id}
            className={styles.fileItem}
            onClick={() => router.push(`/folder?id=${folder.id}`)}
          >
            <div className={styles.fileBox}>
              <FaFolder className={styles.fileIcon} color="#facc15" />
              <p className={styles.fileName}>{folder.folderName || "Folder"}</p>
            </div>
          </li>
        ))}

        {/* Files */}
        {files.map((file: any) => (
          <li
            key={file.id}
            className={styles.fileItem}
            onClick={() => handleFileClick(file.imageLink)}
          >
            <div className={styles.fileBox}>
              <Image
                src={file.imageLink}
                alt={file.imageName}
                width={100}
                height={100}
                className="w-20 h-20"
              />
              <p className={styles.fileName}>{file.imageName}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowFiles;
