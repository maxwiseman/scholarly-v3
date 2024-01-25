import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { IconLoader } from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:border disabled:border-input disabled:bg-secondary disabled:text-muted-foreground disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactElement;
}

export interface LinkButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactElement;
  href: string;
  target?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const StyledIcon = props.icon
      ? React.cloneElement(props.icon, { className: "h-4 w-4 mr-2" })
      : null;
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={props.disabled || props.loading}
      >
        <div
          className={cn(
            "overflow-hidden transition-[width]",
            props.loading ? "mr-2 w-4" : "mr-0 w-0",
          )}
        >
          <IconLoader className={cn("h-4 w-4 animate-spin")} />
        </div>
        {props.icon ? (
          <div
            className={cn(
              "overflow-hidden transition-[width]",
              !props.loading ? "mr-2 w-4" : "mr-0 w-0",
            )}
          >
            {!props.loading && StyledIcon}
          </div>
        ) : null}
        {props.children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

const LinkButton = React.forwardRef<HTMLButtonElement, LinkButtonProps>(
  (
    { href, target, className, variant, size, asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const StyledIcon = props.icon
      ? React.cloneElement(props.icon, { className: "h-4 w-4 mr-2" })
      : null;
    return (
      <Link href={href} tabIndex={-1} target={target}>
        <Comp
          className={cn("w-full", buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
          disabled={props.disabled || props.loading}
        >
          <div
            className={cn(
              "overflow-hidden transition-[width]",
              props.loading ? "mr-2 w-4" : "mr-0 w-0",
            )}
          >
            <IconLoader className={cn("h-4 w-4 animate-spin")} />
          </div>
          {props.icon ? (
            <div
              className={cn(
                "overflow-hidden transition-[width]",
                !props.loading ? "mr-2 w-4" : "mr-0 w-0",
              )}
            >
              {!props.loading && StyledIcon}
            </div>
          ) : null}
          {props.children}
        </Comp>
      </Link>
    );
  },
);
LinkButton.displayName = "LinkButton";

export { Button, LinkButton, buttonVariants };
