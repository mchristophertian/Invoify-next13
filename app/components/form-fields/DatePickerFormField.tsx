"use client";

import React, { useEffect, useState } from "react";

// Shadcn components
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

// Utils
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Icons
import { CalendarIcon } from "lucide-react";

// RHF
import { Control, UseFormSetValue } from "react-hook-form";

interface DatePickerFormFieldProps {
    control: Control<any>;
    name: string;
    label?: string;
    setValue: UseFormSetValue<any>;
}

const DatePickerFormField = ({
    control,
    name,
    label,
    setValue
}: DatePickerFormFieldProps) => {

    const formatDate = (date: Date) => {
        const formattedDate = format(date, "MMMM dd yyyy");

        return formattedDate;
    }

    return (
        <>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <div className="flex justify-between gap-5 items-center text-sm">
                            <div>
                                <Label>{label}:</Label>
                            </div>
                            <div>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[13.5rem]",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </div>
                        </div>
                    </FormItem>
                )}
            />
        </>
    );
};

export default DatePickerFormField;

// field.onChange
// setValue(name, formatDate(date))
// console.log(formatDate(date))