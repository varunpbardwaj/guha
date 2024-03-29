import { useMutation } from "@tanstack/react-query";

export type User = {
  username: string;
  password: string;
};

const fetchData = async (body: User) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  return await data.json();
};

const useSignupMutation = () => {
  return useMutation({
    mutationFn: async (body: User) => {
      return await fetchData(body);
    },
  });
};

export default useSignupMutation;
