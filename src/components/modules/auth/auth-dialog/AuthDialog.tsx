import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "lucide-react";
import { AuthViewMode } from "./lib/types";
import { useState } from "react";
import { AUTH_DIALOG_CONTENT } from "./lib/constants";
import { LoginForm, RegisterForm } from "./components";

const AuthDialog = () => {
  // States
  const [viewMode, setViewMode] = useState<AuthViewMode>(AuthViewMode.LOGIN);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 h-9 px-4 rounded-full border-border/40 hover:bg-accent/80 transition-colors"
        >
          <User size={16} />
          <span className="hidden sm:inline">
            {AUTH_DIALOG_CONTENT[viewMode].triggerText}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] p-6">
        <DialogHeader className="space-y-2">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <User size={20} className="text-primary" />
          </div>
          <DialogTitle className="text-xl font-bold text-center">
            {AUTH_DIALOG_CONTENT[viewMode].title}
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">
            {AUTH_DIALOG_CONTENT[viewMode].description}
          </DialogDescription>
        </DialogHeader>

        {viewMode === AuthViewMode.LOGIN && (
          <LoginForm
            onSwitchViewMode={() => setViewMode(AuthViewMode.REGISTER)}
          />
        )}
        {viewMode === AuthViewMode.REGISTER && (
          <RegisterForm
            onSwitchViewMode={() => setViewMode(AuthViewMode.LOGIN)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
