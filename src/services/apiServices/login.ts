import api from "../api/api";

interface IProps {
  email: string;
  password: string;
}

export const login = async ({ email, password }: IProps) => {
  const response = await api.post("/users/login", {
    email,
    password,
  });
  return response.data;
};
