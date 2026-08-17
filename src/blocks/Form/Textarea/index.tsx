import type { TextField } from "@payloadcms/plugin-form-builder/types";
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Textarea as TextAreaComponent } from "@/components/ui/textarea";
import type React from "react";

import { Width } from "../Width";
import { capitaliseFirstLetter } from "@/utilities/capitaliseFirstLetter";
import { FormItem } from "@/components/forms/FormItem";
import { FormError } from "@/components/forms/FormError";

export const Textarea: React.FC<
  TextField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any;
      }>
    >;
    register: UseFormRegister<FieldValues>;
    rows?: number;
  }
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required: requiredFromProps,
  rows = 3,
  width,
}) => {
  return (
    <Width width={width}>
      <FormItem>
        <Label htmlFor={name}>{label}</Label>

        <TextAreaComponent
          defaultValue={defaultValue}
          id={name}
          rows={rows}
          className="w-full bg-transparent border-0 border-b border-border/60 px-0 py-2 rounded-none min-h-[140px] focus-visible:ring-0 focus-visible:outline-none focus-visible:border-b-foreground text-foreground placeholder:text-muted-foreground/60"
          placeholder="Type here"
          {...register(name, {
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
