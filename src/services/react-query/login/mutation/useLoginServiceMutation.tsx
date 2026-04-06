import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../../apiServices/login";

interface IProps {
  email: string;
  password: string;
}

export const useLoginServiceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }: IProps) => login({ email, password }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkAuth"] });
    },
  });
};
