import React, { useEffect, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import Button from "@/app/components/common/button/Button";
import useFetchSession from "@/app/hooks/useSession";
import styles from "./topbar.module.scss";
import Image from "next/image";

const TopBar = () => {
  const { session } = useFetchSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={styles.authBtn}>
      {session?.user?.image ? (
        <Image
          src={session.user.image}
          alt="User Profile Image"
          width={40}
          height={40}
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
