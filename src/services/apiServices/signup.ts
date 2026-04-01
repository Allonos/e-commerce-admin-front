import api from "../api/api";

interface IProps {
  username: string;
  email: string;
  password: string;
}

export const signup = async ({ username, email, password }: IProps) => {
  const response = await api.post("/users/create-user", {
    username,
    email,
    password,
  });
  return response.data;
};
