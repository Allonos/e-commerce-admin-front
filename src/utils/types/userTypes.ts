export type UserResponse = {
  hasNextPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  page: number;
  totalPages: number;
  totalUsers: number;
  users: User[];
};

export type User = {
  id: string;
  bannedAt: string | null;
  bannedReason: string | null;
  createdAt: string;
  email: string;
  isBanned: boolean;
  role: string;
  updatedAt: string;
  username: string;
  adminRole: string | null;
};
