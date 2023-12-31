import { Box } from "./Box";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SidebarHeaderProps {
  isMinimized: boolean;
}

export function SidebarHeader(props: SidebarHeaderProps) {
  const { isMinimized } = props;

  return (
    <Box className="pt-5 px-3 gap-x-3 pb-1">
    
    <div className="">
        <svg
        className="fill-primary"
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 500 500"
        width="32"
        height="32"
        >
            <path d="m461.73,0H148.39C82.4,24.21,38.27,87.4,38.27,157.69s44.13,133.49,110.13,157.69L461.73,0h0Z"/>
            <path d="m38.27,500h313.34c66-24.21,110.13-87.4,110.13-157.69s-44.13-133.49-110.13-157.69L38.27,500h0Z"/>
        </svg>
    </div>


      <h1
        className={`overflow-hidden whitespace-nowrap text-[32px] font-bold transition-all ${
          isMinimized ? "w-0" : "w-min"
        } `}
      >
        DashSeller
      </h1>
    </Box>
  );
}