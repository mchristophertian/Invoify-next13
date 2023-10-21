"use client";

import React, { useEffect } from "react";

// RHF
import { UseFormSetValue, useWatch } from "react-hook-form";

// Shadcn UI components
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Icons
import { Trash2 } from "lucide-react";

// Types
import { ControlType, NameType } from "@/app/types/types";

type SingleItemProps = {
    control: ControlType;
    name: NameType;
    index: number;
    removeField: (index: number) => void;
    setValue: UseFormSetValue<any>;
};

const SingleItem = ({
    control,
    name,
    index,
    removeField,
    setValue,
}: SingleItemProps) => {
    // Get rate variable
    const rate = useWatch({
        name: `${name}[${index}].unitPrice`,
        control,
    });

    // Get quantity variable
    const quantity = useWatch({
        name: `${name}[${index}].quantity`,
        control,
    });

    // Get currency variable
    const currency = useWatch({
        name: `details.currency`,
        control,
    });

    useEffect(() => {
        // Calculate total when rate or quantity changes
        if (rate != undefined && quantity != undefined) {
            const calculatedTotal = rate * quantity;
            setValue(`${name}[${index}].total`, calculatedTotal);
        }
    }, [rate, quantity]);

    return (
        <div className="flex flex-col gap-y-5">
            Item #{index + 1}
            <div className="flex flex-wrap gap-x-10 gap-y-5" key={index}>
                <FormField
                    control={control}
                    name={`${name}[${index}].name`}
                    render={({ field }) => (
                        <FormItem>
                            <Label>Name</Label>
                            <div className="flex justify-between gap-5 items-center text-sm">
                                <div>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Item name"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name={`${name}[${index}].quantity`}
                    render={({ field }) => (
                        <FormItem>
                            <Label>Quantity</Label>
                            <div className="flex justify-between gap-5 items-center text-sm">
                                <div>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="w-[10rem]"
                                            placeholder="Quantity"
                                            type="number"
                                            step="any"
                                            min={0}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name={`${name}[${index}].unitPrice`}
                    render={({ field }) => (
                        <FormItem>
                            <Label>Rate</Label>
                            <span className="text-xs">{` (in ${currency})`}</span>
                            <div className="flex justify-between gap-5 items-center text-sm">
                                <div>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Unit price/Rate"
                                            type="number"
                                            step="any"
                                            min={0}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name={`${name}[${index}].total`}
                    render={({ field }) => (
                        <FormItem>
                            <Label>Total</Label>
                            <span className="text-xs">{` (in ${currency})`}</span>
                            <div className="flex justify-between gap-5 items-center text-sm">
                                <div>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            readOnly
                                            placeholder="Item total"
                                            className="border-none font-medium text-lg"
                                            size={10}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </div>
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={control}
                name={`${name}[${index}].description`}
                render={({ field }) => (
                    <FormItem>
                        <Label>Description</Label>
                        <div className="flex justify-between gap-5 items-center text-sm">
                            <div>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Item description"
                                        className="w-[15rem] h-0"
                                    />
                                </FormControl>
                                <FormMessage />
                            </div>
                        </div>
                    </FormItem>
                )}
            />
            <div>
                {/* Making sure that there is always at least 1 item */}
                {index != 0 && (
                    <Button
                        onClick={() => removeField(index)}
                        className="w-fit gap-2"
                        variant="destructive"
                    >
                        <Trash2 />
                        Remove Item
                    </Button>
                )}
            </div>
            <hr />
        </div>
    );
};

export default SingleItem;
