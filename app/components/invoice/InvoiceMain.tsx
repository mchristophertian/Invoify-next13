"use client";

// RHF
import { useFormContext } from "react-hook-form";

// Shadcn
import { Form } from "@/components/ui/form";

// Custom components
import { InvoiceActions, InvoiceForm } from "@/app/components";

// Context
import { useInvoiceContext } from "@/app/contexts/InvoiceContext";

// Types
import { ValuesType } from "@/app/types/types";

const InvoiceMain = () => {
    const { handleSubmit } = useFormContext<ValuesType>();

    //* Get the values from invoice context
    const {
        invoicePdf,
        invoicePdfLoading,
        savedInvoices,
        generatePdf,
        downloadPdf,
        previewPdfInTab,
        saveInvoice,
        deleteInvoice,
        sendPdfToMail,
    } = useInvoiceContext();

    const onSubmit = (values: ValuesType) => {
        console.log("VALUE");
        console.log(values);
        generatePdf(values);
    };

    return (
        <>
            <Form {...useFormContext<ValuesType>()}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-wrap">
                        <InvoiceForm
                            savedInvoices={savedInvoices}
                            deleteInvoice={deleteInvoice}
                            onSubmit={onSubmit}
                        />

                        <InvoiceActions
                            invoicePdfLoading={invoicePdfLoading}
                            invoicePdf={invoicePdf}
                            downloadPdf={downloadPdf}
                            previewPdfInTab={previewPdfInTab}
                            saveInvoice={saveInvoice}
                            sendPdfToMail={sendPdfToMail}
                        />
                    </div>
                </form>
            </Form>
        </>
    );
};

export default InvoiceMain;
