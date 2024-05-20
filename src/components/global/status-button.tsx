"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

type StatusButtonProps = {
  className?: string;
  variant?: "outline" | "default";
  defaultText: string;
  pendingText: string;
};

const StatusButton = ({
  className,
  variant = "default",
  defaultText,
  pendingText,
}: StatusButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className={className}
      variant={variant}
      disabled={pending}
    >
      {pending ? pendingText : defaultText}
    </Button>
  );
};

export default StatusButton;
