'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDecision: (choice: "continue" | "cancel") => void;
};

export function UpdateUITabAlert({ open, onOpenChange, onDecision }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update UI Tab?</AlertDialogTitle>
          <AlertDialogDescription>
            You're about to overwrite the updates you made in the skeleton code tab. Are you sure you want to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onDecision("cancel")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => onDecision("continue")}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
