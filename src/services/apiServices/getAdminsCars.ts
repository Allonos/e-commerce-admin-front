import api from "../api/api";

// interface IProps {
//   id: string;
// }

export const getAdminsCars = async () => {
  const response = await api.get("/cars");
  return response.data;
};
