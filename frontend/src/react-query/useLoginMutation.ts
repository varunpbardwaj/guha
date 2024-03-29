import { useMutation } from "@tanstack/react-query";

export type User = {
  username: string;
  password: string;
};

const fetchData = async (body: User) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const getUser = await data.json();
  if (getUser.errors) {
    return { status: 400, data: getUser.errors };
  }
  return { status: 200, data: getUser };
};

const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (body: User) => {
      return await fetchData(body);
    },
  });
};

export default useLoginMutation;
