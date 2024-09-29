import { useMutation } from "@tanstack/react-query";

import { api } from "./api";
import { useNavigate } from "@tanstack/react-router";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type LoginRequestBody = {
  email: string;
  password: string;
};

export type LoginResponseBody = User;

const login = (json: LoginRequestBody) => {
  return api.post(`/login`, { json }).json<LoginResponseBody>();
};

export const useLoginMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: LoginRequestBody) => login(payload),
    onSuccess() {
      navigate({ to: "/about" });
    },
  });
};

export const getMe = () => {
  return api.get(`/me`).json<User>();
};

export const useMeMutation = () => {
  return useMutation({ mutationFn: getMe });
};
