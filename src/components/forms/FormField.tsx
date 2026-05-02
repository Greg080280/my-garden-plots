import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";

/**
 * FormField wrapper (spec §4.5).
 * Label · input · helper/error.
 * Input height 40, garden-100 border, garden-600 focus, rounded-lg.
 */
interface BaseProps {
  label?: string;
  helper?: string;
  error?: string;
  required?: boolean;
  className?: string;
  /** Optional left-side adornment (icon). */
  leading?: ReactNode;
}

const labelClass = "block font-ui text-sm font-medium text-garden-900 mb-1.5";
const helperClass = "mt-1.5 text-xs font-ui text-garden-700/65";
const errorClass = "mt-1.5 text-xs font-ui text-destructive";

export const FormField = ({ label, helper, error, required, children, className }:
  BaseProps & { children: ReactNode }) => (
  <div className={cn("w-full", className)}>
    {label && (
      <label className={labelClass}>
        {label}{required && <span className="text-destructive ml-0.5">*</span>}
      </label>
    )}
    {children}
    {error
      ? <p className={errorClass}>{error}</p>
      : helper && <p className={helperClass}>{helper}</p>}
  </div>
);

interface TextProps extends InputHTMLAttributes<HTMLInputElement>, BaseProps {}

export const TextField = forwardRef<HTMLInputElement, TextProps>(
  ({ label, helper, error, required, leading, className, ...rest }, ref) => (
    <FormField label={label} helper={helper} error={error} required={required} className={className}>
      <div className="relative">
        {leading && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-garden-700/60 pointer-events-none">
            {leading}
          </span>
        )}
        <Input
          ref={ref}
          className={cn(
            "h-10 rounded-lg bg-cream-white border-garden-100 focus-visible:border-garden-600 focus-visible:ring-2 focus-visible:ring-garden-100 font-ui text-[15px] text-garden-900 placeholder:text-garden-700/40",
            error && "border-destructive focus-visible:border-destructive",
            leading && "pl-10",
          )}
          {...rest}
        />
      </div>
    </FormField>
  )
);
TextField.displayName = "TextField";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, BaseProps {}

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, helper, error, required, className, ...rest }, ref) => (
    <FormField label={label} helper={helper} error={error} required={required} className={className}>
      <Textarea
        ref={ref}
        className={cn(
          "rounded-lg bg-cream-white border-garden-100 focus-visible:border-garden-600 focus-visible:ring-2 focus-visible:ring-garden-100 font-ui text-[15px] text-garden-900 placeholder:text-garden-700/40",
          error && "border-destructive focus-visible:border-destructive",
        )}
        {...rest}
      />
    </FormField>
  )
);
TextAreaField.displayName = "TextAreaField";
