"use client";

import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { Box } from "./Box";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";
import { LucideIcon } from "lucide-react";

interface ThemeSwitcherProps {
  isMinimized: boolean;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ isMinimized }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    switch (theme) {
      case "light":
        setTheme("dark");
        break;
      case "dark":
        setTheme("system");
        break;
      case "system":
        setTheme("light");
        break;
    }
  };

  if (!isClient) {
    return (
      <Box>
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-4 w-[90px]" />
      </Box>
    );
  }

  function themeContent(Icon: LucideIcon, label: string) {
    return (
      <>
        <div className="text-primary">
          <Icon size={24} />
        </div>
        <span
          className={`overflow-hidden whitespace-nowrap transition-all ${
            isMinimized ? "w-0" : "flex-1"
          }`}
        >
          {label}
        </span>
  
        {/* {isMinimized && (
          <div
            className={`
              invisible absolute left-full -translate-x-2 whitespace-nowrap rounded-r-lg py-2.5
              pr-3.5 text-sm opacity-20 transition-all bg-secondary text-foreground
              group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
            `}
          >
            {label}
          </div>
        )} */}
      </>
    );
  }  

  return (
    <Box onClick={toggleTheme} className="group hover:bg-secondary">
    {theme === "light" ? themeContent(Sun, "Light Mode") :
     theme === "dark" ? themeContent(Moon, "Dark Mode") :
     themeContent(SunMoon, "System Mode") // This will handle cases where theme is none of the above
    }
  </Box>
  );
};

export { ThemeSwitcher };
