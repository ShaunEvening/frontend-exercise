import React from "react";
import { Button as BaseButton } from "@radix-ui/themes";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color: "purple" | "gray" | "red";
  ghost?: boolean;
  loading?: boolean;
  size?: "1" | "2" | "3" | "4";
}

const computeVariant = (ghost: boolean, color: ButtonProps["color"]) => {
  if (ghost) return "ghost";
  if (color !== "purple") return "surface";
  return "solid";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, color = "purple", ghost = false, ...props }, ref) => {
    const variant = computeVariant(ghost, color);
    return (
      <BaseButton variant={variant} color={color} ref={ref} {...props}>
        {children}
      </BaseButton>
    );
  }
);
