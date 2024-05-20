"use client";

import addDataSource from "@/action/addDataSource";
import StatusButton from "@/components/global/status-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { DataSource } from "@prisma/client";
import { Lock } from "lucide-react";
import { User } from "next-auth";
import { useState } from "react";
import { useFormState } from "react-dom";

type DataFormProps = {
  dataSource: DataSource | null;
  user: User;
};

const DataForm = ({ dataSource, user }: DataFormProps) => {
  const { toast } = useToast();
  const [state, action] = useFormState(addDataSource, {
    message: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const defaultDataSource = dataSource || {
    data: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: user.id,
  };

  const handleSubmit = () => {
    if (state?.message) {
      toast({
        title: state.message,
      });
    }

    setTimeout(() => setIsDisabled(true), 800);
  };

  if (!dataSource || !isDisabled) {
    return (
      <form
        action={action}
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-y-6"
      >
        <Input type="hidden" name="id" value={user.id} />
        <Textarea
          rows={20}
          placeholder="Paste your notes..."
          name="data-source"
          defaultValue={defaultDataSource.data}
          maxLength={80000}
          minLength={6000}
          required
        />
        <StatusButton defaultText="Save data" pendingText="Saving..." />
        <p className="text-center text-xs text-muted-foreground">
          <b>Note:</b> Support for .docx, .pdf and all the common image formats
          is coming soon.
        </p>
      </form>
    );
  }

  return (
    <div className="flex w-full flex-col gap-y-6">
      <div className="flex h-[416px] w-full flex-col items-center justify-center gap-y-3 rounded-md border">
        <Lock className="h-20 w-20" strokeWidth={1.5} />
        <div className="text-sm">This source is locked</div>
      </div>
      <Button className="flex gap-x-3" onClick={() => setIsDisabled(false)}>
        Unlock Data Source
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        <b>Note:</b> Support for .docx, .pdf and all the common image formats is
        coming soon.
      </p>
    </div>
  );
};

export default DataForm;
