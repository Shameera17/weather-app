import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "bg-blue-500 text-neutral-0 hover:bg-blue-600 active:bg-blue-700 focus:bg-blue-600 rounded-12 text-lg-medium disabled:opacity-60 [&_svg]:text-neutral-0",
        primary:
          "bg-blue-500 text-neutral-0 hover:bg-blue-600 active:bg-blue-700 focus:bg-blue-600 rounded-12 text-lg-medium disabled:opacity-60 [&_svg]:text-neutral-0",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        dropdown:
          "bg-neutral-800 text-neutral-0 hover:bg-neutral-700 active:bg-neutral-800 rounded-8 text-md-medium [&_svg]:text-neutral-0",
        search:
          "bg-blue-500 text-neutral-0 hover:bg-blue-600 active:bg-blue-700 focus:bg-blue-600 rounded-12 text-lg-medium disabled:opacity-60 [&_svg]:text-neutral-0",
      },
      size: {
        default: "px-300 py-200 gap-100 [&_svg]:size-4",
        primary: "px-300 py-200 gap-100 [&_svg]:size-4",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        dropdown: "px-200 py-150 gap-125 [&_svg]:size-4",
        search: "px-300 py-200 gap-100 [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
