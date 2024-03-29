import { PasswordProp } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchData = async (id: string | undefined) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/password/${id}`
  );
  if (data.status === 200) {
    const passwords = await data.json();
    return passwords as PasswordProp[];
  }
  return [];
};

const usePasswordByIdQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: ["password", id],
    queryFn: () => fetchData(id),
  });
};

export default usePasswordByIdQuery;
