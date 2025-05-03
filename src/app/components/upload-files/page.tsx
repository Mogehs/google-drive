"use client";

import React, { useState } from "react";
import Button from "../common/button/Button";
import styles from "./upload.module.scss";
import { uploadFile } from "@/app/utils/uploadFile";
import { addFile, addFolder } from "@/app/utils/firestore";
import Progress from "../common/progress/Progress";

const UploadFiles = ({ parentId, user }: ParentId) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFolderVisible, setIsFolderVisible] = useState(false);
  const [folderName, setFolderName] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const { url, name } = await uploadFile(file, setProgress);
      addFile(url, name, parentId, user);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const handleFolder = () => {
    setIsFolderVisible(!isFolderVisible);
    setIsVisible(false);
  };

  const handleFolderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(event.target.value);
  };

  const uploadFolder = () => {
    let payload = {
      folderName: folderName,
      isFolder: true,
      filesList: [],
      parentId: parentId || "",
      userEmail: user || "",
    };
    setFolderName("");
    setIsFolderVisible(false);
    addFolder(payload);
  };

  return (
    <>
      <div className={styles.uploadMain}>
        <Button
          title="Add A File"
          btnClass="btn-success"
          onClick={() => {
            setIsVisible(!isVisible), setIsFolderVisible(false);
          }}
        />

        {isVisible && (
          <input
            type="file"
            className={`file-input file-input-ghost ${styles.inputFile}`}
            onChange={handleFileChange}
          />
        )}

        <Button
          title="Create A Folder"
          btnClass="btn-success"
          onClick={handleFolder}
        />
        {isFolderVisible && (
          <>
            <input
              type="text"
              placeholder="Type here"
              onChange={handleFolderChange}
              className={`input ${styles.folderInput}`}
            />
            <Button
              title="Create"
              btnClass="btn-success"
              onClick={uploadFolder}
            />
          </>
        )}
      </div>
      <div className={styles.progressMain}>
        {progress && progress !== 100 ? (
          <Progress progress={progress} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default UploadFiles;
