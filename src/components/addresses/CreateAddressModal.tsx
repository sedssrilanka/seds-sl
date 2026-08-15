"use client";
import { Button } from "@/components/ui/button";
import type React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddressForm } from "@/components/forms/AddressForm";
import type { Address } from "@/payload-types";
import type { DefaultDocumentIDType } from "payload";

type Props = {
  addressID?: DefaultDocumentIDType;
  initialData?: Partial<Omit<Address, "country">> & { country?: string };
  buttonText?: string;
  modalTitle?: string;
  callback?: (address: Partial<Address>) => void;
  skipSubmission?: boolean;
  disabled?: boolean;
};

export const CreateAddressModal: React.FC<Props> = ({
  addressID,
  initialData,
  buttonText = "Add a new address",
  modalTitle = "Add a new address",
  callback,
  skipSubmission,
  disabled,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (state: boolean) => {
    setOpen(state);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleCallback = (data: Partial<Address>) => {
    closeModal();

    if (callback) {
      callback(data);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild disabled={disabled}>
        <Button variant={"outline"}>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl md:max-w-2xl max-h-[90vh] flex flex-col p-6 overflow-hidden">
        <DialogHeader className="shrink-0 pb-2">
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>
            Enter your shipping or billing details below.
          </DialogDescription>
        </DialogHeader>

        <AddressForm
          addressID={addressID}
          initialData={initialData}
          callback={handleCallback}
          skipSubmission={skipSubmission}
        />
      </DialogContent>
    </Dialog>
  );
};
