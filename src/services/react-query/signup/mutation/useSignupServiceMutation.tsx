import { useMutation } from "@tanstack/react-query";
import { signup } from "../../../apiServices/signup";

interface IProps {
  username: string;
  email: string;
  password: string;
}

export const useSignupServiceMutation = () => {
  return useMutation({
    mutationFn: ({ username, email, password }: IProps) =>
      signup({ username, email, password }),
  });
};
