import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import * as React from "react";

export type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <Search className="absolute left-300 top-1/2 -translate-y-1/2 size-4 text-neutral-200" />
        <input
          type="text"
          className={cn(
            "flex w-full items-center gap-200",
            "bg-neutral-800 text-neutral-200 text-lg-medium",
            "rounded-12 px-300 py-200 pl-[calc(var(--spacing-300)+var(--spacing-200)+16px)]",
            "placeholder:text-neutral-200",
            "outline-none transition-colors",
            "hover:bg-neutral-700",
            "focus:bg-neutral-700",
            "disabled:cursor-not-allowed disabled:opacity-60",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
