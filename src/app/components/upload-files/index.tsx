"use client";

import React, { useState } from "react";
import Button from "../common/button/Button";
import styles from "./upload.module.scss";
import { uploadFile } from "@/app/utils/uploadFile";
import { addFile } from "@/app/utils/firestore";
import Progress from "../common/progress/Progress";

const UploadFiles = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const { url, name } = await uploadFile(file, setProgress);
      addFile(url, name);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <>
      <div className={styles.uploadMain}>
        <Button
          title="Add A File"
          btnClass="btn-success"
          onClick={() => setIsVisible(!isVisible)}
        />

        {isVisible && (
          <input
            type="file"
            className={`file-input file-input-ghost ${styles.inputFile}`}
            onChange={handleChange}
          />
        )}

        <Button title="Create A Folder" btnClass="btn-success" />
      </div>
      <div className={styles.progressMain}>
        {progress ? <Progress progress={progress} /> : <></>}
      </div>
    </>
  );
};

export default UploadFiles;
