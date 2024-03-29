import { PasswordProp } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type PasswordType = Omit<PasswordProp, "id">;

const updateData = async (id: number, body: PasswordType) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/passwords/${id}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const passwords = await data.json();
  if (passwords.errors) {
    return { status: 400, data: passwords.errors };
  }
  return { status: 200, data: passwords };
};

const useUpdatePasswordMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, body }: { id: number; body: PasswordType }) => {
      return await updateData(id, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["passwords"],
      });
    },
  });
};

export default useUpdatePasswordMutation;
