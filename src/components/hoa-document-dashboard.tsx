import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  FileIcon,
  ImageIcon,
  FileTextIcon,
  FileSpreadsheetIcon,
  MoreHorizontalIcon,
  UploadIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Types
type DocumentType = "Document" | "Image" | "Spreadsheet" | "PDF";
type DocumentStatus = "Approved" | "Pending Approval";

interface HOADocument {
  id: string;
  name: string;
  type: DocumentType;
  status: DocumentStatus;
  uploadDate: string;
  size: string;
  uploader: string;
}

// Mock data
const mockDocuments: HOADocument[] = [
  {
    id: "1",
    name: "HOA Bylaws.docx",
    type: "Document",
    status: "Approved",
    uploadDate: "2023-09-15",
    size: "2.5 MB",
    uploader: "Board Secretary",
  },
  {
    id: "2",
    name: "Community Map.png",
    type: "Image",
    status: "Approved",
    uploadDate: "2023-09-14",
    size: "1.2 MB",
    uploader: "Facilities Manager",
  },
  {
    id: "3",
    name: "Annual Budget.xlsx",
    type: "Spreadsheet",
    status: "Approved",
    uploadDate: "2023-09-13",
    size: "3.7 MB",
    uploader: "Treasurer",
  },
  {
    id: "4",
    name: "Maintenance Schedule.pdf",
    type: "PDF",
    status: "Approved",
    uploadDate: "2023-09-12",
    size: "5.1 MB",
    uploader: "Maintenance Supervisor",
  },
  {
    id: "5",
    name: "Meeting Minutes.docx",
    type: "Document",
    status: "Pending Approval",
    uploadDate: "2023-09-11",
    size: "1.8 MB",
    uploader: "Board Secretary",
  },
];

// Mock API functions
const fetchDocuments = async (): Promise<HOADocument[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
  return mockDocuments;
};

const deleteDocument = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
  console.log(`Document ${id} deleted`);
};

const uploadDocument = async (file: File): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
  console.log(`File ${file.name} uploaded`);
};

// Custom hooks
const useDocuments = () => {
  return useQuery<HOADocument[], Error>({
    queryKey: ["documents"],
    queryFn: fetchDocuments,
  });
};

const useDeleteDocumentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
};

const useUploadDocumentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
};

const DocumentIcon = ({ type }: { type: DocumentType }) => {
  switch (type) {
    case "Document":
      return <FileTextIcon className="mr-2 h-4 w-4 text-muted-foreground" />;
    case "Image":
      return <ImageIcon className="mr-2 h-4 w-4 text-muted-foreground" />;
    case "Spreadsheet":
      return (
        <FileSpreadsheetIcon className="mr-2 h-4 w-4 text-muted-foreground" />
      );
    case "PDF":
      return <FileIcon className="mr-2 h-4 w-4 text-muted-foreground" />;
  }
};

const DocumentRow = (document: HOADocument) => {
  const deleteMutation = useDeleteDocumentMutation();
  return (
    <TableRow key={document.id}>
      <TableCell>
        <div className="flex items-center">
          <DocumentIcon type={document.type} />
          <div>
            <div className="font-medium">{document.name}</div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              {document.uploader}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">{document.type}</TableCell>
      <TableCell className="hidden sm:table-cell">
        <Badge
          className="text-xs"
          variant={document.status === "Approved" ? "secondary" : "outline"}
        >
          {document.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {document.uploadDate}
      </TableCell>
      <TableCell className="text-right">{document.size}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View document</DropdownMenuItem>
            <DropdownMenuItem>Edit details</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => deleteMutation.mutate(document.id)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete document"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export function HoaDocumentDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const { data: documents, isLoading, isError, error } = useDocuments();
  const uploadMutation = useUploadDocumentMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      uploadMutation.mutate(file);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>HOA Documents</CardTitle>
          <CardDescription>
            Manage and view documents for your Homeowners Association.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="mb-6 p-4 border-2 border-dashed rounded-lg"
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
            role="button"
            tabIndex={0}
            aria-label="Upload area. Drag and drop a file here or click to select a file."
          >
            <div className="text-center">
              <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-2">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
                >
                  Upload a file
                </label>
                <Input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">or drag and drop</p>
            </div>
            <p className="mt-2 text-xs text-center text-gray-500">
              PDF, DOC, DOCX, XLS, XLSX up to 10MB
            </p>
            {file && (
              <div className="mt-2 text-sm text-center">
                <p className="text-green-600">File selected: {file.name}</p>
                <Button
                  onClick={handleUpload}
                  disabled={uploadMutation.isPending}
                  className="mt-2"
                >
                  {uploadMutation.isPending ? "Uploading..." : "Upload"}
                </Button>
              </div>
            )}
            {uploadMutation.isError && (
              <p className="mt-2 text-sm text-center text-red-600">
                Error uploading file. Please try again.
              </p>
            )}
          </div>

          {isLoading && <p>Loading documents...</p>}
          {isError && (
            <p className="text-red-600">
              Error loading documents:{" "}
              {error instanceof Error ? error.message : "Unknown error"}
            </p>
          )}
          {documents && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Upload Date
                  </TableHead>
                  <TableHead className="text-right">Size</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((document) => (
                  <DocumentRow key={document.id} {...document} />
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
