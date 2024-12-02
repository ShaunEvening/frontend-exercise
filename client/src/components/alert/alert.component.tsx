import React from "react";
import {
  InfoCircledIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import { Callout as BaseAlert } from "@radix-ui/themes";

export interface AlertProps {
  type: "info" | "error";
  children: React.ReactNode;
}

export const Alert = ({ type, children }: AlertProps) => {
  const color = type === "error" ? "red" : "purple";
  const Icon = type === "error" ? ExclamationTriangleIcon : InfoCircledIcon;

  return (
    <BaseAlert.Root
      color={color}
      variant="surface"
      aria-role={type === "error" ? "alert" : undefined}
    >
      <BaseAlert.Icon>
        <Icon />
      </BaseAlert.Icon>
      <BaseAlert.Text>{children}</BaseAlert.Text>
    </BaseAlert.Root>
  );
};
