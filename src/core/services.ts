import { api } from "./api";

export const AuthService = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),

  register: (email: string, password: string) =>
    api.post("/auth/register", { email, password }),
};
