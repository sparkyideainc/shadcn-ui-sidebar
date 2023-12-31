import { UserNav } from "./user-nav";
import { ThemeSwitcher } from "./ThemeSwitcher";

interface SidebarFooterProps {
  isMinimized: boolean;
}

export function SidebarFooter(props: SidebarFooterProps) {
  const { isMinimized } = props;

  return (
    <>
      <ThemeSwitcher isMinimized={isMinimized} />

      <UserNav>
        <span
          className={`overflow-hidden whitespace-nowrap transition-all ${
            isMinimized ? "w-0" : "flex-1"
          }`}
        >
          Olivia Martin
        </span>
      </UserNav>
    </>
  );
}
