import { PasswordProp } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchData = async () => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/passwords`
  );
  if (data.status === 200) {
    const passwords = await data.json();
    return passwords as PasswordProp[];
  }
  return [];
};

const usePasswordsQuery = () => {
  return useQuery({
    queryKey: ["passwords"],
    queryFn: fetchData,
  });
};

export default usePasswordsQuery;
