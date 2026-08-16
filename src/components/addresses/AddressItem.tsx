"use client";

import type React from "react";
import type { Address } from "@/payload-types";
import { CreateAddressModal } from "@/components/addresses/CreateAddressModal";
import { MapPin, Phone, Building2 } from "lucide-react";

type Props = {
  address: Partial<Omit<Address, "country">> & { country?: string }; // Allow address to be partial and entirely optional as this is entirely for display purposes
  /**
   * Completely override the default actions
   */
  actions?: React.ReactNode;
  /**
   * Insert elements before the actions
   */
  beforeActions?: React.ReactNode;
  /**
   * Insert elements after the actions
   */
  afterActions?: React.ReactNode;
  /**
   * Hide all actions
   */
  hideActions?: boolean;
};

export const AddressItem: React.FC<Props> = ({
  address,
  actions,
  hideActions = false,
  beforeActions,
  afterActions,
}) => {
  if (!address) {
    return null;
  }

  const fullName = [address.title, address.firstName, address.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-xs transition-all hover:border-border/80 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
      <div className="flex gap-3 items-start grow">
        <div className="p-2 rounded-lg bg-muted text-muted-foreground shrink-0 mt-0.5">
          <MapPin className="size-4" />
        </div>
        <div className="space-y-1 text-sm">
          {fullName && (
            <div className="flex items-center gap-2 font-medium text-foreground text-base">
              <span>{fullName}</span>
              {address.company && (
                <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                  <Building2 className="size-3" />
                  {address.company}
                </span>
              )}
            </div>
          )}

          <p className="text-foreground/90 font-medium">
            {address.addressLine1}
            {address.addressLine2 && `, ${address.addressLine2}`}
          </p>

          <p className="text-muted-foreground">
            {[address.city, address.state, address.postalCode, address.country]
              .filter(Boolean)
              .join(", ")}
          </p>

          {address.phone && (
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 pt-1">
              <Phone className="size-3 text-muted-foreground/70" />
              <span>{address.phone}</span>
            </p>
          )}
        </div>
      </div>

      {!hideActions && (
        <div className="shrink-0 flex sm:flex-col gap-2 justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-border">
          {actions ? (
            actions
          ) : (
            <>
              {beforeActions}
              {address.id && (
                <CreateAddressModal
                  addressID={address.id}
                  initialData={address}
                  buttonText={"Edit"}
                  modalTitle={"Edit address"}
                />
              )}
              {afterActions}
            </>
          )}
        </div>
      )}
    </div>
  );
};
