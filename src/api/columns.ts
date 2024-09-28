import { useQuery } from "@tanstack/react-query";
import { api } from "./api";

export type GetColumnsParams = never;

export type GetColumnsRequestBody = never;

export type GetColumnResponseBody = {
  name: string;
  id: string;
  order: number;
};

export type GetColumnsResponseBody = GetColumnResponseBody[];

const getColumns = async () => {
  return await api.get<GetColumnsResponseBody>("/columns").json();
};

export const useColumns = () => {
  return useQuery({
    queryKey: ["columns"],
    queryFn: getColumns,
  });
};
