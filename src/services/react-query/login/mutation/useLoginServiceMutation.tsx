import { useMutation } from "@tanstack/react-query";
import { login } from "../../../apiServices/login";

interface IProps {
  email: string;
  password: string;
}

export const useLoginServiceMutation = () => {
  return useMutation({
    mutationFn: ({ email, password }: IProps) => login({ email, password }),
  });
};
