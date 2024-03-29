import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteData = async (id: string | undefined) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/passwords/${id}`,
    {
      method: "DELETE",
    }
  );
  const passwords = await data.json();
  if (passwords.errors) {
    return { status: 400, data: passwords.errors };
  }
  return { status: 200, data: passwords };
};

const useDeletePasswordByIdMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteData(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["passwords"],
      });
    },
  });
};

export default useDeletePasswordByIdMutation;
