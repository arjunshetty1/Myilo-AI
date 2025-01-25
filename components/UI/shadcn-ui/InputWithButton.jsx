import { Button } from "@/components/UI/shadcn-ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/shadcn-ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI/shadcn-ui/tooltip";
import { Input } from "@/components/UI/shadcn-ui/input";
import { Label } from "@/components/UI/shadcn-ui/label";
import { useState } from "react";
import { UserRoundPlus } from "lucide-react";

export function InputWithButton({ setNewEmail, newEmail, addEmailUser }) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    const success = await addEmailUser();
    if (success) {
      setOpen(false);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className="pl-[0.7rem] pr-[0.7rem]"
            onClick={() => setOpen(true)}
          >
            <UserRoundPlus className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Manually add a new subscriber</p>
        </TooltipContent>
      </Tooltip>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] z-50">
          <DialogHeader>
            <DialogTitle>Add a User</DialogTitle>
            <DialogDescription>
              Enter the email address of the user you want to add.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Email
              </Label>
              <Input
                id="name"
                type="email"
                className="col-span-3"
                onChange={(e) => setNewEmail(e.target.value)}
                value={newEmail}
                placeholder="Enter the email of a user"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-[var(--third)] hover:bg-[var(--third-hover)]"
              type="submit"
              onClick={handleSubmit}
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
