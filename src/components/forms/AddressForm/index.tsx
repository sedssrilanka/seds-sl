"use client";
import type React from "react";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddresses } from "@payloadcms/plugin-ecommerce/client/react";
import { defaultCountries as supportedCountries } from "@payloadcms/plugin-ecommerce/client/react";
import type { Address, Config } from "@/payload-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { titles } from "./constants";
import { Button } from "@/components/ui/button";
import { deepMergeSimple } from "payload/shared";
import { FormError } from "@/components/forms/FormError";
import { FormItem } from "@/components/forms/FormItem";
import posthog from "posthog-js";

type AddressFormValues = {
  title?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  company?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;
  phone?: string | null;
};

type Props = {
  addressID?: Config["db"]["defaultIDType"];
  initialData?: Omit<Address, "country" | "id" | "updatedAt" | "createdAt"> & {
    country?: string;
  };
  callback?: (data: Partial<Address>) => void;
  /**
   * If true, the form will not submit to the API.
   */
  skipSubmission?: boolean;
};

export const AddressForm: React.FC<Props> = ({
  addressID,
  initialData,
  callback,
  skipSubmission,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AddressFormValues>({
    defaultValues: {
      country: "LK",
      ...initialData,
    },
  });

  const countryList = useMemo(() => {
    const list = supportedCountries.map((country) => {
      const value = typeof country === "string" ? country : country.value;
      const label =
        typeof country === "string"
          ? country
          : typeof country.label === "string"
            ? country.label
            : value;
      return { label, value };
    });

    const lkIndex = list.findIndex((c) => c.value === "LK");
    if (lkIndex === -1) {
      list.unshift({ label: "Sri Lanka", value: "LK" });
    } else {
      const [lk] = list.splice(lkIndex, 1);
      if (lk) list.unshift(lk);
    }

    return list;
  }, []);

  const { createAddress, updateAddress } = useAddresses();

  const onSubmit = useCallback(
    async (data: AddressFormValues) => {
      const newData = deepMergeSimple(initialData || {}, data);

      if (!skipSubmission) {
        if (addressID) {
          await updateAddress(addressID, newData);
        } else {
          await createAddress(newData);
        }
        posthog.capture("address_saved", {
          action: addressID ? "updated" : "created",
        });
      }

      if (callback) {
        callback(newData);
      }
    },
    [
      initialData,
      skipSubmission,
      callback,
      addressID,
      updateAddress,
      createAddress,
    ],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full overflow-hidden">
      <div className="grow overflow-y-auto max-h-[calc(80vh-130px)] px-1 py-1 pr-2">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <FormItem className="md:col-span-2">
            <Label htmlFor="title">Title</Label>
            <Select
              {...register("title")}
              onValueChange={(value) => {
                setValue("title", value, { shouldValidate: true });
              }}
              defaultValue={initialData?.title || ""}
            >
              <SelectTrigger id="title">
                <SelectValue placeholder="Title" />
              </SelectTrigger>
              <SelectContent>
                {titles.map((title) => (
                  <SelectItem key={title} value={title}>
                    {title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.title && <FormError message={errors.title.message} />}
          </FormItem>

          <FormItem className="md:col-span-2">
            <Label htmlFor="firstName">First name*</Label>
            <Input
              id="firstName"
              autoComplete="given-name"
              {...register("firstName", {
                required: "First name is required.",
              })}
            />
            {errors.firstName && (
              <FormError message={errors.firstName.message} />
            )}
          </FormItem>

          <FormItem className="md:col-span-2">
            <Label htmlFor="lastName">Last name*</Label>
            <Input
              autoComplete="family-name"
              id="lastName"
              {...register("lastName", { required: "Last name is required." })}
            />
            {errors.lastName && <FormError message={errors.lastName.message} />}
          </FormItem>

          <FormItem className="md:col-span-3">
            <Label htmlFor="phone">Phone</Label>
            <Input
              type="tel"
              id="phone"
              autoComplete="mobile tel"
              {...register("phone")}
            />
            {errors.phone && <FormError message={errors.phone.message} />}
          </FormItem>

          <FormItem className="md:col-span-3">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              autoComplete="organization"
              {...register("company")}
            />
            {errors.company && <FormError message={errors.company.message} />}
          </FormItem>

          <FormItem className="md:col-span-6">
            <Label htmlFor="addressLine1">Address line 1*</Label>
            <Input
              id="addressLine1"
              autoComplete="address-line1"
              {...register("addressLine1", {
                required: "Address line 1 is required.",
              })}
            />
            {errors.addressLine1 && (
              <FormError message={errors.addressLine1.message} />
            )}
          </FormItem>

          <FormItem className="md:col-span-6">
            <Label htmlFor="addressLine2">Address line 2</Label>
            <Input
              id="addressLine2"
              autoComplete="address-line2"
              {...register("addressLine2")}
            />
            {errors.addressLine2 && (
              <FormError message={errors.addressLine2.message} />
            )}
          </FormItem>

          <FormItem className="md:col-span-2">
            <Label htmlFor="city">City*</Label>
            <Input
              id="city"
              autoComplete="address-level2"
              {...register("city", { required: "City is required." })}
            />
            {errors.city && <FormError message={errors.city.message} />}
          </FormItem>

          <FormItem className="md:col-span-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              autoComplete="address-level1"
              {...register("state")}
            />
            {errors.state && <FormError message={errors.state.message} />}
          </FormItem>

          <FormItem className="md:col-span-2">
            <Label htmlFor="postalCode">Zip Code*</Label>
            <Input
              id="postalCode"
              {...register("postalCode", {
                required: "Postal code is required.",
              })}
            />
            {errors.postalCode && (
              <FormError message={errors.postalCode.message} />
            )}
          </FormItem>

          <FormItem className="md:col-span-6">
            <Label htmlFor="country">Country*</Label>
            <Select
              {...register("country", {
                required: "Country is required.",
              })}
              onValueChange={(value) => {
                setValue("country", value, { shouldValidate: true });
              }}
              required
              defaultValue={initialData?.country || "LK"}
            >
              <SelectTrigger id="country" className="w-full">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                {countryList.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && <FormError message={errors.country.message} />}
          </FormItem>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-border flex justify-end gap-3 shrink-0">
        <Button type="submit" className="w-full sm:w-auto">
          Save Address
        </Button>
      </div>
    </form>
  );
};
