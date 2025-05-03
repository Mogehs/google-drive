import React from "react";
import styles from "./button.module.scss";

const Button = ({ btnClass, title, onClick }: Button) => {
  return (
    <div className={`btn ${btnClass} ${styles.classBtn}`} onClick={onClick}>
      {title}
    </div>
  );
};

export default Button;
