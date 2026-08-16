"use client";

import { AddressItem } from "@/components/addresses/AddressItem";
import { CreateAddressModal } from "@/components/addresses/CreateAddressModal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Address } from "@/payload-types";
import { useAddresses } from "@payloadcms/plugin-ecommerce/client/react";
import { useState } from "react";
import { MapPin, Plus } from "lucide-react";

type Props = {
  selectedAddress?: Address;
  setAddress: React.Dispatch<
    React.SetStateAction<Partial<Address> | undefined>
  >;
  heading?: string;
  description?: string;
  setSubmit?: React.Dispatch<React.SetStateAction<() => void | Promise<void>>>;
};

export const CheckoutAddresses: React.FC<Props> = ({
  setAddress,
  heading = "Addresses",
  description = "Please select or add your shipping and billing addresses.",
}) => {
  const { addresses } = useAddresses();

  if (!addresses || addresses.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-6 text-center flex flex-col items-center gap-3 bg-muted/30">
        <div className="p-3 rounded-full bg-muted text-muted-foreground">
          <MapPin className="size-5" />
        </div>
        <div>
          <p className="font-medium text-foreground">{heading}</p>
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        </div>
        <CreateAddressModal buttonText="Add New Address" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-medium text-foreground">{heading}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <AddressesModal setAddress={setAddress} />
    </div>
  );
};

const AddressesModal: React.FC<Props> = ({ setAddress }) => {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (state: boolean) => {
    setOpen(state);
  };

  const closeModal = () => {
    setOpen(false);
  };
  const { addresses } = useAddresses();

  if (!addresses || addresses.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          No saved addresses found.
        </p>
        <CreateAddressModal buttonText="Add Address" />
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="w-full justify-start gap-2 h-11">
          <MapPin className="size-4 text-muted-foreground" />
          <span>Select from saved addresses</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl md:max-w-2xl max-h-[90vh] flex flex-col p-6 overflow-hidden">
        <DialogHeader className="shrink-0 pb-2">
          <DialogTitle>Select an address</DialogTitle>
        </DialogHeader>

        <div className="grow overflow-y-auto max-h-[calc(85vh-140px)] pr-1 flex flex-col gap-4">
          <ul className="flex flex-col gap-3">
            {addresses.map((address) => (
              <li key={address.id}>
                <AddressItem
                  address={address}
                  beforeActions={
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        setAddress(address);
                        closeModal();
                      }}
                    >
                      Select
                    </Button>
                  }
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 mt-2 border-t border-border flex justify-end shrink-0">
          <CreateAddressModal buttonText="Add a new address" />
        </div>
      </DialogContent>
    </Dialog>
  );
};
