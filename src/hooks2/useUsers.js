import { useEffect, useState } from "react";
import { userss } from "../userss";
import userServices from "../services/user-services";
import { CanceledError } from "../services/api-client";

const useUser = () => {
  const [users, setUsers] = useState(userss);
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    //getting all users
    setLoading(true);
    const { request, cancel } = userServices.getAll();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);
  return { users, error, isLoading, setError, setUsers };
};
export default useUser;
