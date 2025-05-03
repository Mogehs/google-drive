import { useSession } from "next-auth/react";

const useFetchSession = () => {
  const { data: session } = useSession();

  return { session };
};

export default useFetchSession;
