import React, { forwardRef } from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { Box } from "./Box";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Slot } from "@radix-ui/react-slot";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  icon: LucideIcon;
  href?: string;
  subitem?: Array<{
    label: string;
    href: string;
  }>;
  hasAlert?: boolean;
  isMinimized: boolean;
  asChild?: boolean;
}

const SidebarItem = forwardRef<HTMLDivElement, SidebarItemProps>(
  (
    {
      icon: Icon,
      label,
      hasAlert,
      href,
      subitem,
      isMinimized,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "div";
    const pathname = usePathname();
    const isActive =
      pathname === href || subitem?.some((child) => pathname === child.href);
    const [isOpen, setIsOpen] = React.useState(false);
    const isDropdown = !!subitem;

    const itemContent = () => (
      <>
        <div
          className={`relative text-primary 
        ${isActive ? "text-white" : "text-primary"}`}
        >
          <Icon size={24} />
          {hasAlert && (
            <div className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red"></div>
          )}
        </div>

        <span
          className={`overflow-hidden whitespace-nowrap transition-all ${
            isMinimized ? "w-0" : "flex-1"
          }`}
        >
          {label}
        </span>
      </>
    );

    const minimizeItemContent = () => (
      <>
        {href ? (
          <Link
            href={href}
            className={`px-3.5 py-2.5 transition-all
              ${
                isActive
                  ? "rounded-r-lg bg-primary text-white"
                  : "hover:underline"
              }
              `}
          >
            <span>{label}</span>
          </Link>
        ) : (
          <div
            className={`px-3.5 py-2.5 transition-all
              ${isActive ? "rounded-r-lg bg-primary text-white" : ""}
              `}
          >
            {label}
          </div>
        )}

        {subitem?.map((child) => {
          const childIsActive = pathname === child.href;
          return child.href ? (
            <Link
              href={child.href}
              className={`px-3.5 py-2.5 transition-all
                ${childIsActive ? "text-primary" : "hover:underline"}
                `}
            >
              <span>{child.label}</span>
            </Link>
          ) : (
            <span>{child.label}</span>
          );
        })}
      </>
    );

    const dropDownContent = () => (
      <>
        {isOpen && !isMinimized && (
          <>
            {subitem?.map((child) => {
              const childIsActive = pathname === child.href;
              return (
                <Box
                  href={child.href}
                  className={`bg-popover pl-16 transition
                ${
                  childIsActive
                    ? "bg-primary/75 text-white"
                    : "hover:bg-secondary"
                }
                `}
                >
                  {child.label}
                </Box>
              );
            })}
          </>
        )}
      </>
    );

    return (
      <Comp ref={ref} className="transition-all hover:bg-secondary" {...props}>
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger asChild>
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <div
                className={`flex items-center transition-all
            ${isActive ? "bg-primary text-white" : ""}
            ${isOpen && !isMinimized && !isActive && isDropdown ? "bg-popover" : ""}
          `}
              >
                {href ? (
                  <Box href={href} className="flex-1">
                    {itemContent()}
                  </Box>
                ) : (
                  <CollapsibleTrigger asChild>
                    <Box className="flex-1">{itemContent()}</Box>
                  </CollapsibleTrigger>
                )}
                {isDropdown && !isMinimized && (
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`mr-4 h-7 w-7 transition-all hover:bg-transparent ${
                        isOpen ? "-rotate-90" : "rotate-0"
                      }`}
                    >
                      <ChevronLeft className="h-5 w-5" />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                )}
              </div>
              <CollapsibleContent>{dropDownContent()}</CollapsibleContent>
            </Collapsible>
          </HoverCardTrigger>
          {isMinimized && (
            <HoverCardContent
              side="right"
              align="start"
              sideOffset={-10}
              className="flex w-min flex-col whitespace-nowrap rounded-lg border-none bg-secondary p-0 text-sm shadow-none"
            >
              {minimizeItemContent()}
            </HoverCardContent>
          )}
        </HoverCard>
      </Comp>
    );
  },
);

export { SidebarItem };
