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
import { useSkeletonStore } from "../stores";



export function UpdateUITabAlert() {
  const {uiSkeletonContraduction, solveContraduction} = useSkeletonStore();
  return (
    <AlertDialog open={uiSkeletonContraduction} onOpenChange={()=>{}}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update UI Tab?</AlertDialogTitle>
          <AlertDialogDescription>
            You're about to overwrite the updates you made in the skeleton code tab. Are you sure you want to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => solveContraduction("cancel")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => solveContraduction("continue")}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
