import React from "react";
import styles from "./progress.module.scss";

const Progress = ({ progress }: Progress) => {
  return (
    <progress
      className={`progress w-56 ${styles.progressBar}`}
      value={progress}
      max="100"
    ></progress>
  );
};

export default Progress;
