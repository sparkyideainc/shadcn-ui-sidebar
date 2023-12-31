"use client";

import React, { useState, useCallback } from "react";
import { ChevronRight } from "lucide-react";

import { SidebarHeader } from "./SidebarHeader";
import { SidebarBody } from "./SidebarBody";
import { SidebarFooter } from "./SidebarFooter";

interface SidebarProps {
  children: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.touches[0];
      setTouchStartX(touch.clientX);
    },
    [],
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.changedTouches[0];
      const touchEndX = touch.clientX;

      // Swipe left to minimize
      if (touchStartX - touchEndX > 50 && !isMinimized) {
        setIsMinimized(true);
      }

      // Swipe right to open
      if (touchEndX - touchStartX > 50 && isMinimized) {
        setIsMinimized(false);
      }
    },
    [isMinimized, touchStartX],
  );

  return (
    <div className="hidden h-screen bg-background md:flex">
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`group/sidebar fixed bottom-0 left-0 top-0 z-50 flex flex-col transition-all duration-300 ease-in-out ${
          isMinimized ? "w-[56px]" : "w-[250px]"
        } h-full border-r bg-background`}
      >
        <SidebarHeader isMinimized={isMinimized} />
        <SidebarBody isMinimized={isMinimized} />
        <SidebarFooter isMinimized={isMinimized} />

        <button
          onClick={toggleSidebar}
          className={`invisible absolute -right-3.5 bottom-9 rounded-full bg-secondary p-1 text-foreground 
          transition-transform hover:bg-primary hover:text-white group-hover/sidebar:visible ${
            isMinimized ? "rotate-0" : "rotate-180"
          }`}
        >
          <ChevronRight size={18} />
        </button>
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isMinimized ? "ml-[56px]" : "ml-[250px]"
        } overflow-x-auto`}
      >
        {children}
      </div>
    </div>
  );
}
