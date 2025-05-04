"use client";
import React from "react";
import ShowFiles from "../components/show-files";
import TopBar from "../components/topbar";
import UploadFiles from "../components/upload-files";
import { useSearchParams } from "next/navigation";
import useFetchSession from "../hooks/useSession";

const Folder = () => {
  const params = useSearchParams();
  const id = params.get("id");
  const { session } = useFetchSession();
  const user = session?.user?.email;
  return (
    <>
      <TopBar />
      {session && user ? (
        <>
          <UploadFiles parentId={id || ""} user={user} />
          <ShowFiles parentId={id || ""} user={user} />
        </>
      ) : null}
    </>
  );
};

export default Folder;
