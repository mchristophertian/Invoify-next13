"use client";

import { useEffect, useRef, useState } from "react";

// RHF
import { useWatch } from "react-hook-form";

// Shadcn components
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

// Custom components
import { BaseButton, ChargeInput } from "@/app/components";

// React signature canvas
import SignatureCanvas from "react-signature-canvas";

// Helpers
import { formatNumberWithCommas, formatPriceToString } from "@/lib/helpers";

// Types
import { ControlType, UseFormSetValueType } from "@/types";

type InvoiceFooterProps = {
    control: ControlType;
    setValue: UseFormSetValueType;
};

const InvoiceFooter = ({ control, setValue }: InvoiceFooterProps) => {
    // Switch states. On/Off
    const [discountSwitch, setDiscountSwitch] = useState<boolean>(false);
    const [taxSwitch, setTaxSwitch] = useState<boolean>(false);
    const [shippingSwitch, setShippingSwitch] = useState<boolean>(false);

    // Initial subtotal and total
    const [subTotal, setSubTotal] = useState<number>(0);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    // Types for discount, tax, and shipping. Amount | Percentage
    const [discountType, setDiscountType] = useState("amount");
    const [taxType, setTaxType] = useState("amount");
    const [shippingType, setShippingType] = useState("amount");

    // Signature
    const signatureRef = useRef<SignatureCanvas | null>(null);

    const clearSignature = () => {
        signatureRef.current?.clear();
        setValue("details.signature", "");
    };

    const handleCanvasEnd = () => {
        if (signatureRef.current) {
            const canvas = signatureRef.current;
            setValue("details.signature", canvas.toDataURL("base64"));
        }
    };

    // Form Fields
    const itemsArray = useWatch({
        name: `details.items`,
        control,
    });

    const discount = useWatch({
        name: `details.discountDetails`,
        control,
    });

    const tax = useWatch({
        name: `details.taxDetails`,
        control,
    });

    const shipping = useWatch({
        name: `details.shippingDetails`,
        control,
    });

    const currency = useWatch({
        name: `details.currency`,
        control,
    });

    // Charge check
    useEffect(() => {
        if (discount.amount) {
            setDiscountSwitch(true);
        }

        if (tax.amount) {
            setTaxSwitch(true);
        }

        if (shipping.cost) {
            setShippingSwitch(true);
        }

        if (discount.amountType == "amount") {
            setDiscountType("amount");
        } else {
            setDiscountType("percentage");
        }

        if (tax.amountType == "amount") {
            setTaxType("amount");
        } else {
            setTaxType("percentage");
        }

        if (shipping.costType == "amount") {
            setShippingType("amount");
        } else {
            setShippingType("percentage");
        }
    }, [discount.amount, tax.amount, shipping.cost]);

    useEffect(() => {
        console.log(formatPriceToString(150.05));
    }, []);

    // Calculate total when values change
    useEffect(() => {
        calculateTotal();
    }, [
        itemsArray,
        discountSwitch,
        discountType,
        discount.amount,
        taxSwitch,
        taxType,
        tax.amount,
        shippingSwitch,
        shippingType,
        shipping.cost,
    ]);

    // TODO: Maybe move this and above useEffect logic into a separate hook
    // Calculate total amount in the invoice
    const calculateTotal = () => {
        const totalSum: number = itemsArray.reduce(
            (sum: number, item: any) => sum + item.total,
            0
        );
        setValue("details.subTotal", totalSum.toString());
        setSubTotal(totalSum);

        let discountAmount: number = parseFloat(discount.amount) ?? 0;
        let taxAmount: number = parseFloat(tax.amount) ?? 0;
        let shippingCost: number = parseFloat(shipping.cost) ?? 0;

        let discountAmountType: string = "amount";
        let taxAmountType: string = "amount";
        let shippingCostType: string = "amount";

        let total: number = totalSum;

        if (discountSwitch) {
            if (discountType == "amount") {
                total -= discountAmount;
                discountAmountType = "amount";
            } else {
                total -= total * (discountAmount / 100);
                discountAmountType = "percentage";
            }
        }

        if (taxSwitch) {
            if (taxType == "amount") {
                total += taxAmount;
                taxAmountType = "amount";
            } else {
                total += total * (taxAmount / 100);
                taxAmountType = "percentage";
            }
        }

        if (shippingSwitch) {
            if (shippingType == "amount") {
                total += shippingCost;
                shippingCostType = "amount";
            } else {
                total += total * (shippingCost / 100);
                shippingCostType = "percentage";
            }
        }

        setTotalAmount(total);
        setValue("details.discountDetails.amount", discountAmount);
        setValue("details.taxDetails.amount", taxAmount);
        setValue("details.shippingDetails.cost", shippingCost);

        setValue("details.discountDetails.amountType", discountAmountType);
        setValue("details.taxDetails.amountType", taxAmountType);
        setValue("details.shippingDetails.costType", shippingCostType);

        setValue("details.totalAmount", total.toString());
        setValue("details.totalAmountInWords", formatPriceToString(total));
    };

    const switchAmountType = (
        type: string,
        setType: (type: string) => void
    ) => {
        if (type == "amount") {
            setType("percentage");
        } else {
            setType("amount");
        }
    };

    return (
        <div className="flex flex-wrap gap-5">
            <div className="flex flex-col gap-3">
                <FormField
                    control={control}
                    name="details.additionalNotes"
                    render={({ field }) => (
                        <FormItem>
                            <Label>Additional Notes</Label>
                            <div className="flex justify-between gap-5 items-center text-sm">
                                <div>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Your additional notes"
                                            className="w-[15rem] h-0"
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
                    name="details.paymentTerms"
                    render={({ field }) => (
                        <FormItem>
                            <Label>Payment terms</Label>
                            <div className="flex justify-between gap-5 items-center text-sm">
                                <div>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Ex: Net 30"
                                            className="w-[15rem] h-0"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </div>
                        </FormItem>
                    )}
                />
            </div>

            <div className="flex flex-col gap-3 min-w-[22rem]">
                <div className="flex justify-center gap-x-10 pb-6">
                    <FormField
                        control={control}
                        name="discount-switch"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Discount</Label>

                                <div>
                                    <FormControl>
                                        <Switch
                                            checked={discountSwitch}
                                            onCheckedChange={(value) => {
                                                setDiscountSwitch(value);
                                            }}
                                        />
                                    </FormControl>
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="tax-switch"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Tax</Label>

                                <div>
                                    <FormControl>
                                        <Switch
                                            checked={taxSwitch}
                                            onCheckedChange={(value) => {
                                                setTaxSwitch(value);
                                            }}
                                        />
                                    </FormControl>
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="shipping-switch"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Shipping</Label>

                                <div>
                                    <FormControl>
                                        <Switch
                                            checked={shippingSwitch}
                                            onCheckedChange={(value) => {
                                                setShippingSwitch(value);
                                            }}
                                        />
                                    </FormControl>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col px-10 justify-around gap-y-3">
                    <div className="flex justify-between items-center">
                        <div>Sub total</div>

                        <div>
                            {formatNumberWithCommas(subTotal)} {currency}
                        </div>
                    </div>
                    {discountSwitch && (
                        <ChargeInput
                            label="Discount"
                            control={control}
                            name="details.discountDetails.amount"
                            switchAmountType={switchAmountType}
                            type={discountType}
                            setType={setDiscountType}
                            currency={currency}
                        />
                    )}

                    {taxSwitch && (
                        <ChargeInput
                            label="Tax"
                            control={control}
                            name="details.taxDetails.amount"
                            switchAmountType={switchAmountType}
                            type={taxType}
                            setType={setTaxType}
                            currency={currency}
                        />
                    )}

                    {shippingSwitch && (
                        <ChargeInput
                            label="Shipping"
                            control={control}
                            name="details.shippingDetails.cost"
                            switchAmountType={switchAmountType}
                            type={shippingType}
                            setType={setShippingType}
                            currency={currency}
                        />
                    )}

                    <div className="flex justify-between items-center">
                        <div>Total Amount</div>

                        <div>
                            {formatNumberWithCommas(totalAmount)} {currency}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-y-5">
                <Label>Signature:</Label>
                <SignatureCanvas
                    ref={signatureRef}
                    penColor="rgba(25, 25, 112, 1)"
                    canvasProps={{
                        height: "auto",
                        width: "auto",
                        style: {
                            backgroundColor: "rgba(230, 230, 230, 1)",
                            border: "2px solid black",
                            borderRadius: "10px",
                        },
                    }}
                    onEnd={handleCanvasEnd}
                />
                <BaseButton
                    tooltipLabel="Clear the signature board"
                    variant="destructive"
                    className="w-fit gap-2"
                    onClick={clearSignature}
                >
                    Clear Signature
                </BaseButton>
            </div>
        </div>
    );
};

export default InvoiceFooter;
