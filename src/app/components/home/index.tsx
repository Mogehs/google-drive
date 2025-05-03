"use client";

import ShowFiles from "../show-files";
import TopBar from "../topbar";
import UploadFiles from "../upload-files";

const HomeComponent = () => {
  return (
    <div>
      <TopBar />
      <UploadFiles />
      <ShowFiles />
    </div>
  );
};

export default HomeComponent;
