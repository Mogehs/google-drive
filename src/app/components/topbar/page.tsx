import React, { useEffect, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import Button from "@/app/components/common/button/Button";
import useFetchSession from "@/app/hooks/useSession";
import styles from "./topbar.module.scss";
import Image from "next/image";

const TopBar = () => {
  const { session } = useFetchSession();

  return (
    <div className={styles.authBtn}>
      {session?.user?.image ? (
        <Image
          src={session.user.image}
          alt="User Profile Image"
          width={70}
          height={70}
          className={styles.profileImg}
          onClick={() => signOut()}
          priority
        />
      ) : (
        <Button
          btnClass="btn-primary"
          title="Sign In"
          onClick={() => signIn()}
        />
      )}
    </div>
  );
};

export default TopBar;
