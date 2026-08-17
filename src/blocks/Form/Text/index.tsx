import type { TextField } from "@payloadcms/plugin-form-builder/types";
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
  Control,
} from "react-hook-form";
import { Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import type React from "react";

import { Width } from "../Width";
import { FormItem } from "@/components/forms/FormItem";
import { FormError } from "@/components/forms/FormError";
import { capitaliseFirstLetter } from "@/utilities/capitaliseFirstLetter";

export const Text: React.FC<
  TextField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any;
      }>
    >;
    register: UseFormRegister<FieldValues>;
    control: any;
  }
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  control,
  required: requiredFromProps,
  width,
}) => {
  const isPhone = name.toLowerCase().includes("phone");

  return (
    <Width width={width}>
      <FormItem>
        <Label htmlFor={name}>{label}</Label>

        {isPhone ? (
          <Controller
            control={control}
            name={name}
            defaultValue={defaultValue || ""}
            rules={{
              required: requiredFromProps
                ? `${capitaliseFirstLetter(label || name)} is required.`
                : undefined,
            }}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                defaultCountry="LK"
                value={value as string}
                onChange={onChange}
                id={name}
                className="w-full bg-transparent border-0 border-b border-border/60 rounded-none"
              />
            )}
          />
        ) : (
          <Input
            defaultValue={defaultValue}
            id={name}
            type="text"
            className="w-full bg-transparent border-0 border-b border-border/60 px-0 py-2 rounded-none focus-visible:ring-0 focus-visible:outline-none focus-visible:border-b-foreground text-foreground placeholder:text-muted-foreground/60"
            placeholder="Type here"
            {...register(name, {
              required: requiredFromProps
                ? `${capitaliseFirstLetter(label || name)} is required.`
                : undefined,
            })}
          />
        )}

        {errors?.[name]?.message &&
          typeof errors?.[name]?.message === "string" && (
            <FormError message={errors?.[name]?.message} />
          )}
      </FormItem>
    </Width>
  );
};
