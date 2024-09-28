import { forwardRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { GetJobByColumnIdResponseBody } from "@/api/jobs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  WrenchIcon,
  DollarSignIcon,
  UserIcon,
  ClipboardIcon,
  CalendarIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const WorkCard = forwardRef<
  HTMLDivElement,
  GetJobByColumnIdResponseBody & { className?: string }
>(({ className, ...props }, ref) => {
  return (
    <Card className={cn("w-full cursor-move", className)} ref={ref}>
      <CardHeader className="relative">
        <Badge className="absolute top-2 right-2 bg-yellow-500 text-black">
          {props.customerLocation === "waiting"
            ? "Customer Waiting"
            : "Offsite"}
        </Badge>
        <CardTitle className="text-lg">{props.title}</CardTitle>
        <CardDescription>Order: {props.order}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center space-x-2">
              <DollarSignIcon className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">
                Est. cost: {props.costEstimate}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">
                Est. completion:{" "}
                {props.completionEstimate instanceof Date
                  ? props.completionEstimate.toLocaleDateString()
                  : props.completionEstimate}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <UserIcon className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">
                Assignee: {props.assignee.name}
              </span>
              <Avatar className="w-6 h-6">
                <AvatarImage
                  src={props.assignee.image}
                  alt={props.assignee.name}
                />
                <AvatarFallback>{props.assignee.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{props.currentProgress}%</span>
            </div>
            <Progress value={props.currentProgress} className="w-full" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <WrenchIcon className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Tasks:</span>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {props.tasks.map((task) => (
                <li key={task.id}>
                  {task.title} - {task.cost} ({task.timeEstimate} hrs)
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <ClipboardIcon className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Notes:</span>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {props.notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
