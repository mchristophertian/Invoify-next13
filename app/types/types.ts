import z from "zod";
import {
    Control,
    FieldPath,
    UseFormGetValues,
    UseFormReset,
    UseFormReturn,
    UseFormSetValue,
} from "react-hook-form";
import { InvoiceSchema } from "../../lib/schemas";

// Form types
export type ValuesType = z.infer<typeof InvoiceSchema>;
export type FormType = UseFormReturn<ValuesType>;
export type ControlType = Control<any>;
export type NameType = FieldPath<ValuesType>;
export type GetValuesType = UseFormGetValues<ValuesType>;
export type UseFormSetValueType = UseFormSetValue<ValuesType>;
export type UseFormResetType = UseFormReset<ValuesType>;

// Signature types
export type SignatureColor = {
    name: string;
    label: string;
    color: string;
};

export type SignatureFont = {
    name: string;
    variable: string;
};
