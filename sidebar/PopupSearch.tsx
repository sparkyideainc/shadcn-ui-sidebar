import { Search } from "lucide-react";
import { SidebarItem } from "./SidebarItem";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Box } from "./Box";

interface PopupSearchProps {
  isMinimized: boolean;
}

export function PopupSearch(props: PopupSearchProps) {
  const { isMinimized } = props;
  const text = "Quick Find";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarItem
            label="Quick Find"
            icon={Search}
            isMinimized={isMinimized}
          />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
