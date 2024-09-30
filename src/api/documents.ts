import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";

export type DocumentType = "Document" | "Image" | "Spreadsheet" | "PDF";
export type DocumentStatus = "Approved" | "Pending Approval";

export type HOADocument = {
  id: string;
  name: string;
  type: DocumentType;
  status: DocumentStatus;
  uploadDate: string;
  size: string;
  uploader: string;
};

const getDocuments = async () => {
  return api.get("/documents").json<HOADocument[]>();
};

export const useDocuments = () => {
  return useQuery({ queryKey: ["documents"], queryFn: getDocuments });
};

const deleteDocument = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  alert(`TODO: Document ${id} deleted`);
};

export const useDeleteDocumentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDocument,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
};
