import React, { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  href?: string; // New href prop for navigation
  asChild?: boolean; // New prop to support Slot functionality
}

const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ children, className, href, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    const content = (
      <Comp
        ref={ref}
        className={cn(
          "flex cursor-pointer items-center gap-x-4 pl-4 py-2",
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    );

    // If href is provided, wrap the content with Link
    return href ? (
      <Link
        href={href}
        className={cn(
          "flex cursor-pointer items-center gap-x-4 pl-4 py-2",
          className,
        )}
      >
        {children}
      </Link>
    ) : (
      content
    );
  },
);

export { Box };
