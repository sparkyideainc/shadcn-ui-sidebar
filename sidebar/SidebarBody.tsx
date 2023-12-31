import { SidebarItem } from "./SidebarItem";
import { SidebarMenu } from "./main-nav";
import { PopupSearch } from "./PopupSearch";
import React, { useMemo } from "react";
import { ScrollArea,ScrollBar } from "@/components/ui/scroll-area"
import { LayoutDashboard, Search, HelpCircle, Settings } from "lucide-react";


interface SidebarBodyProps {
  isMinimized: boolean;
}

export function SidebarBody(props: SidebarBodyProps) {
  const { isMinimized } = props;
  const routes = useMemo(() => {
    return SidebarMenu.map((item) => ({
      ...item,
      isMinimized: isMinimized,
    }));
  }, [isMinimized]);

  return (
    <>
      <ScrollArea className="flex-1">
        <PopupSearch isMinimized={isMinimized} />
        <SidebarItem
          label="Dashboard"
          icon={LayoutDashboard}
          href={"/dashboard"}
          isMinimized={isMinimized}
        />
        {routes.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </ScrollArea>
      <SidebarItem
        label="Settings"
        icon={Settings}
        href={"/settings"}
        isMinimized={isMinimized}
      />
      <SidebarItem
        label="Help"
        icon={HelpCircle}
        href="/help"
        isMinimized={isMinimized}
      />
    </>
  );
}
