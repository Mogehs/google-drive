"use client";

import useFetchSession from "@/app/hooks/useSession";
import ShowFiles from "../show-files/page";
import TopBar from "../topbar/page";
import UploadFiles from "../upload-files/page";

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
