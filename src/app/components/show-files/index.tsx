import React from "react";
import useFetchData from "@/app/hooks/useFetchData";
import styles from "./showFile.module.scss";
import { FaFileImage } from "react-icons/fa"; // File icon

const ShowFiles = () => {
  const { data, loading, error } = useFetchData("files");

  if (loading)
    return (
      <div
        className={`${styles.mainContainer} flex justify-center items-center`}
      >
        <progress className="progress w-56"></progress>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  const handleFileClick = (imageLink: string) => {
    window.open(imageLink, "_blank");
  };

  return (
    <div className={styles.mainContainer}>
      <ul className={styles.imagesGrid}>
        {data.map((file: any) => (
          <li
            key={file.id}
            className={styles.fileItem}
            onClick={() => handleFileClick(file.imageLink)}
          >
            <div className={styles.fileBox}>
              <FaFileImage className={styles.fileIcon} />
              <p className={styles.fileName}>{file.imageName}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowFiles;
