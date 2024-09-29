import { delay, http, HttpResponse } from "msw";

import {
  GetColumnResponseBody,
  GetColumnsParams,
  GetColumnsRequestBody,
  GetColumnsResponseBody,
} from "@/api/columns";
import {
  GetJobsByColumnIdParams,
  GetJobsByColumnIdRequestBody,
  GetJobsByColumnIdResponseBody,
} from "@/api/jobs";

const initialColumns: [string, GetColumnResponseBody][] = [
  [
    "1",
    {
      name: "Todo",
      id: "1",
      order: 1,
    },
  ],
  [
    "2",
    {
      name: "Doing",
      id: "2",
      order: 2,
    },
  ],
  [
    "3",
    {
      name: "Done",
      id: "3",
      order: 3,
    },
  ],
];

const allColumns = new Map<string, GetColumnResponseBody>(initialColumns);

export const handlers = [
  http.get<
    GetColumnsParams,
    GetColumnsRequestBody,
    GetColumnsResponseBody,
    "/columns"
  >("/columns", async () => {
    await delay();
    return HttpResponse.json(Array.from(allColumns.values()));
  }),

  http.get<
    GetJobsByColumnIdParams,
    GetJobsByColumnIdRequestBody,
    GetJobsByColumnIdResponseBody,
    "/columns/:id/jobs"
  >("/columns/:id/jobs", async ({ params }) => {
    await delay();
    const { id } = params;

    switch (id) {
      case "1":
        return HttpResponse.json(colIdOne);
      case "2":
        return HttpResponse.json(colIdTwo);
      case "3":
        return HttpResponse.json(colIdThree);
    }
  }),
];

const colIdOne: GetJobsByColumnIdResponseBody = [
  {
    id: "task-1",
    title: "Oil Change",
    order: 1,
    costEstimate: "$50",
    notes: ["Regular oil change", "Check filters"],
    customerLocation: "waiting",
    currentProgress: 0,
    completionEstimate: "1 hour",
    tasks: [
      { title: "Change oil", id: "oil-1", cost: "$30", timeEstimate: 0.5 },
      {
        title: "Replace filter",
        id: "filter-1",
        cost: "$20",
        timeEstimate: 0.5,
      },
    ],
    assignee: {
      name: "John Doe",
      id: "john-1",
      image: "/placeholder.svg?height=32&width=32",
    },
    columnId: "1",
  },
  {
    id: "task-2",
    title: "Brake Inspection",
    order: 2,
    costEstimate: "$100",
    notes: ["Customer reported squeaking", "Check brake pads and rotors"],
    customerLocation: "offsite",
    currentProgress: 0,
    completionEstimate: new Date("2023-09-26"),
    tasks: [
      { title: "Inspect brakes", id: "brake-1", cost: "$50", timeEstimate: 1 },
      {
        title: "Replace pads if needed",
        id: "brake-2",
        cost: "$50",
        timeEstimate: 1,
      },
    ],
    assignee: {
      name: "Jane Smith",
      id: "jane-1",
      image: "/placeholder.svg?height=32&width=32",
    },
    columnId: "1`",
  },
];
const colIdTwo: GetJobsByColumnIdResponseBody = [
  {
    id: "task-3",
    title: "Engine Diagnostics",
    order: 3,
    costEstimate: "$200",
    notes: ["Check engine light on", "Perform full diagnostic"],
    customerLocation: "offsite",
    currentProgress: 50,
    completionEstimate: "3 hours",
    tasks: [
      { title: "Run diagnostics", id: "diag-1", cost: "$100", timeEstimate: 1 },
      {
        title: "Interpret results",
        id: "diag-2",
        cost: "$100",
        timeEstimate: 2,
      },
    ],
    assignee: {
      name: "Bob Johnson",
      id: "bob-1",
      image: "/placeholder.svg?height=32&width=32",
    },
    columnId: "2",
  },
];
const colIdThree: GetJobsByColumnIdResponseBody = [
  {
    id: "task-4",
    title: "Tire Rotation",
    order: 4,
    costEstimate: "$40",
    notes: ["Regular maintenance", "Check tire pressure"],
    customerLocation: "waiting",
    currentProgress: 100,
    completionEstimate: "30 minutes",
    tasks: [
      { title: "Rotate tires", id: "tire-1", cost: "$30", timeEstimate: 0.4 },
      { title: "Check pressure", id: "tire-2", cost: "$10", timeEstimate: 0.1 },
    ],
    assignee: {
      name: "Alice Brown",
      id: "alice-1",
      image: "/placeholder.svg?height=32&width=32",
    },
    columnId: "3",
  },
];
