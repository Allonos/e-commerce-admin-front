import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../../../apiServices/signup";

interface IProps {
  username: string;
  email: string;
  password: string;
}

export const useSignupServiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ username, email, password }: IProps) =>
      signup({ username, email, password }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkAuth"] });
    },
  });
};
