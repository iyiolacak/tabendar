import { DropletOff } from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const GitCard = ({ title, message, icon: Icon = DropletOff }) => {
  return (
    <Tooltip>
          <TooltipTrigger asChild>
      <div className="glass-square-accent flex items-center rounded-2xl py-2 px-3 gap-x-2 max-w-sm">
        <div className="solid-dark-square flex items-center justify-center min-w-14 min-h-14 rounded-xl">
          <Icon className="text-white/80 size-8" />
        </div>
        <div className="flex flex-col max-w-xs">
          <h3 className="text-xl font-medium truncate w-full" title={title}>
            {title}
          </h3>
            <p className="text-sm truncate cursor-pointer">{message}</p>
        </div>
      </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{message}</p>
          </TooltipContent>
    </Tooltip>
  );
};

export default GitCard;
