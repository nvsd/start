import { useQuery } from "@tanstack/react-query";
import { api } from "./api";

export type GetJobsByColumnIdParams = never;

export type GetJobsByColumnIdRequestBody = never;

export type GetJobByColumnIdResponseBody = {
  id: string;
  title: string;
  order: number;
  costEstimate: string;
  notes: string[];
  customerLocation: "waiting" | "offsite";
  currentProgress: number;
  completionEstimate: string | Date;
  // @rowdy - I'm making some assumptions here
  tasks: {
    title: string;
    id: string;
    cost: string;
    timeEstimate: number;
  }[];
  assignee: {
    name: string;
    id: string;
    image?: string;
  };
  columnId: string;
};

export type GetJobsByColumnIdResponseBody = GetJobByColumnIdResponseBody[];

const getJobsByColumnId = (id: string) => async () => {
  return await api
    .get<GetJobsByColumnIdResponseBody>(`/columns/${id}/jobs`)
    .json();
};

export const useJobsByColumnId = (id: string) => {
  return useQuery({
    queryKey: ["columns", id, "jobs"],
    queryFn: getJobsByColumnId(id),
  });
};
