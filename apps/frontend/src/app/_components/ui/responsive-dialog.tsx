import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";

export function ResponsiveDialog(
  props: React.ComponentProps<typeof Drawer> &
    React.ComponentProps<typeof Dialog>,
): React.ReactElement {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop)
    return (
      <Dialog
        onOpenChange={(val) => {
          setOpen(val);
        }}
        open={open}
        {...props}
      />
    );
  return (
    <Drawer
      onOpenChange={(val) => {
        setOpen(val);
      }}
      open={open}
      shouldScaleBackground
      {...props}
    />
  );
}

export function ResponsiveDialogTrigger(
  props: React.ComponentProps<typeof DrawerTrigger>,
): React.ReactElement {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) return <DialogTrigger {...props} />;
  return <DrawerTrigger {...props} />;
}

export function ResponsiveDialogContent(
  props: React.ComponentProps<typeof DrawerContent>,
): React.ReactElement {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) return <DialogContent {...props} />;
  return <DrawerContent className="min-h-[50vh] px-8" {...props} />;
}

export function ResponsiveDialogHeader(
  props: React.ComponentProps<typeof DrawerHeader>,
): React.ReactElement {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) return <DialogHeader {...props} />;
  return <DrawerHeader className="px-0" {...props} />;
}

export function ResponsiveDialogTitle(
  props: React.ComponentProps<typeof DrawerTitle>,
): React.ReactElement {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) return <DialogTitle {...props} />;
  return <DrawerTitle {...props} />;
}

export function ResponsiveDialogDescription(
  props: React.ComponentProps<typeof DrawerDescription>,
): React.ReactElement {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) return <DialogDescription {...props} />;
  return <DrawerDescription {...props} />;
}

export function ResponsiveDialogClose(
  props: React.ComponentProps<typeof DrawerClose>,
): React.ReactElement {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) return <DialogClose {...props} />;
  return <DrawerClose {...props} />;
}
export function ResponsiveDialogFooter(
  props: React.ComponentProps<typeof DrawerFooter>,
): React.ReactElement {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) return <DialogFooter {...props} />;
  return <DrawerFooter {...props} />;
}
