import { useMutation } from "@tanstack/react-query";

const fetchData = async () => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/auth/cookie`,
    {
      method: "DELETE",
    }
  );
  if (data.status !== 200) {
    return { status: 400, data: "Session not found" };
  }
  return { status: 200, data: "Logged out" };
};

const useLogoutMutation = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: async () => {
      return await fetchData();
    },
    onSuccess: () => {
      onSuccess && onSuccess();
    },
  });
};

export default useLogoutMutation;
