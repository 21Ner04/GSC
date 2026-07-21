"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link" | "accent";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex max-w-full items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold font-montserrat transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-primary text-white hover:bg-accent hover:shadow-lg sm:hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]":
              variant === "default",
            "bg-secondary text-white hover:bg-accent hover:shadow-lg sm:hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]":
              variant === "secondary",
            "bg-accent text-white hover:bg-accent/90 hover:shadow-lg sm:hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]":
              variant === "accent",
            "border-2 border-primary text-primary hover:bg-primary hover:text-white active:scale-[0.98]":
              variant === "outline",
            "hover:bg-muted hover:text-foreground": variant === "ghost",
            "text-primary underline-offset-4 hover:underline": variant === "link",
            "h-11 min-h-[2.75rem] px-5 py-2 sm:h-10 sm:min-h-0 sm:px-6":
              size === "default",
            "h-10 min-h-[2.5rem] rounded-md px-3 sm:h-9 sm:min-h-0":
              size === "sm",
            "h-12 min-h-[3rem] rounded-lg px-6 text-base sm:px-8":
              size === "lg",
            "h-11 w-11 sm:h-10 sm:w-10": size === "icon",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
