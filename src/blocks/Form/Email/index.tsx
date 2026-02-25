import type { EmailField } from "@payloadcms/plugin-form-builder/types";
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type React from "react";

import { Width } from "../Width";
import { FormItem } from "@/components/forms/FormItem";
import { FormError } from "@/components/forms/FormError";
import { capitaliseFirstLetter } from "@/utilities/capitaliseFirstLetter";

export const Email: React.FC<
  EmailField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any;
      }>
    >;
    register: UseFormRegister<FieldValues>;
  }
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required: requiredFromProps,
  width,
}) => {
  return (
    <Width width={width}>
      <FormItem>
        <Label htmlFor={name}>{label}</Label>
        <Input
          defaultValue={defaultValue}
          id={name}
          type="text"
          className="!bg-transparent border-0 border-b border-b-border px-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-primary"
          placeholder="Type here"
          {...register(name, {
            pattern: /^\S[^\s@]*@\S+$/,
            required: requiredFromProps
              ? `${capitaliseFirstLetter(label || name)} is required.`
              : undefined,
          })}
        />

        {errors?.[name]?.message &&
          typeof errors?.[name]?.message === "string" && (
            <FormError message={errors?.[name]?.message} />
          )}
      </FormItem>
    </Width>
  );
};
