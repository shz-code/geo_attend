import { cn } from "@/lib/utilities";
import { cva, type VariantProps } from "class-variance-authority";
import React, { FC, ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

const buttonVariants = cva("py-3 px-6 items-center rounded-md w-full", {
  variants: {
    variant: {
      primary: "bg-white",
      secondary: "bg-primary",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

const labelVariants = cva("font-bold text-lg", {
  variants: {
    textType: {
      primary: "text-primary",
      secondary: "text-white",
    },
  },
  defaultVariants: {
    textType: "primary",
  },
});

export interface ButtonProps
  extends TouchableOpacityProps,
    VariantProps<typeof buttonVariants>,
    VariantProps<typeof labelVariants> {
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({
  className,
  variant,
  textType,
  children,
  ...rest
}) => {
  return (
    <TouchableOpacity
      className={cn(buttonVariants({ className, variant }))}
      {...rest}
    >
      <Text className={cn(labelVariants({ textType }))}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
