"use client";

import useFetchSession from "@/app/hooks/useSession";
import ShowFiles from "../show-files";
import TopBar from "../topbar";
import UploadFiles from "../upload-files";

const HomeComponent = () => {
  const { session } = useFetchSession();
  const user = session?.user?.email;
  return (
    <div>
      <TopBar />
      {session && user ? (
        <>
          <UploadFiles user={user} />
          <ShowFiles user={user} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default HomeComponent;
