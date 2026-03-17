// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { Metric } from "./home";
export interface MetricSelectionProps {
  setUnit: (unit: Metric) => void;
  unit: Metric;
}
export const MetricSelection = ({ setUnit, unit }: MetricSelectionProps) => {
  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button variant="outline">Open</Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent>
    //     <DropdownMenuGroup>
    //       <DropdownMenuLabel>My Account</DropdownMenuLabel>
    //       <DropdownMenuItem>Profile</DropdownMenuItem>
    //       <DropdownMenuItem>Billing</DropdownMenuItem>
    //     </DropdownMenuGroup>
    //     <DropdownMenuSeparator />
    //     <DropdownMenuGroup>
    //       <DropdownMenuItem>Team</DropdownMenuItem>
    //       <DropdownMenuItem>Subscription</DropdownMenuItem>
    //     </DropdownMenuGroup>
    //   </DropdownMenuContent>
    // </DropdownMenu>
    <div></div>
  );
};
