import React from "react";

// Helpers
import { isDataUrl } from "@/lib/helpers";

// Types
import { ValuesType } from "@/app/types/types";

const InvoiceTemplate = async ({ details, sender, receiver }: ValuesType) => {
    const ReactDOMServer = (await import("react-dom/server")).default;
    const content = (
        <>
            <link
                href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
                rel="stylesheet"
            />
            <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-1">
                <div className="sm:w-11/12 lg:w-3/4 mx-auto">
                    <div className="flex flex-col p-4 sm:p-10 bg-white rounded-xl dark:bg-gray-800">
                        <div className="flex justify-between">
                            <div>
                                {details.invoiceLogo && (
                                    <img
                                        src={details.invoiceLogo}
                                        style={{ height: "100px" }}
                                        alt="Logo"
                                    />
                                )}
                                <h1 className="mt-2 text-lg md:text-xl font-semibold text-blue-600 dark:text-white">
                                    {sender.name}
                                </h1>
                            </div>
                            <div className="text-right">
                                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200">
                                    Invoice #
                                </h2>
                                <span className="mt-1 block text-gray-500">
                                    {details.invoiceNumber}
                                </span>
                                <address className="mt-4 not-italic text-gray-800 dark:text-gray-200">
                                    {sender.address}
                                    <br />
                                    {sender.zipCode}, {sender.city}
                                    <br />
                                    {sender.country}
                                    <br />
                                </address>
                            </div>
                        </div>

                        <div className="mt-6 grid sm:grid-cols-2 gap-3">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    Bill to:
                                </h3>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    {receiver.name}
                                </h3>
                                <address className="mt-2 not-italic text-gray-500">
                                    {receiver.address}, {receiver.zipCode}
                                    <br />
                                    {receiver.city}, {receiver.country}
                                    <br />
                                </address>
                            </div>
                            <div className="sm:text-right space-y-2">
                                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                                    <dl className="grid sm:grid-cols-6 gap-x-3">
                                        <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                                            Invoice date:
                                        </dt>
                                        <dd className="col-span-3 text-gray-500">
                                            {details.invoiceDate}
                                        </dd>
                                    </dl>
                                    <dl className="grid sm:grid-cols-6 gap-x-3">
                                        <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                                            Due date:
                                        </dt>
                                        <dd className="col-span-3 text-gray-500">
                                            {details.dueDate}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3">
                            <div className="border border-gray-200 p-1 rounded-lg space-y-1 dark:border-gray-700">
                                <div className="hidden sm:grid sm:grid-cols-5">
                                    <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
                                        Item
                                    </div>
                                    <div className="text-left text-xs font-medium text-gray-500 uppercase">
                                        Qty
                                    </div>
                                    <div className="text-left text-xs font-medium text-gray-500 uppercase">
                                        Rate
                                    </div>
                                    <div className="text-right text-xs font-medium text-gray-500 uppercase">
                                        Amount
                                    </div>
                                </div>
                                <div className="hidden sm:block border-b border-gray-200 dark:border-gray-700"></div>
                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-y-1">
                                    {details.items.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <div className="col-span-full sm:col-span-2 border-b border-gray-300">
                                                <p className="font-medium text-gray-800 dark:text-gray-200">
                                                    {item.name}
                                                </p>
                                                <p className="text-xs text-gray-600 dark:text-gray-200">
                                                    {item.description}
                                                </p>
                                            </div>
                                            <div className="border-b border-gray-300">
                                                <p className="text-gray-800 dark:text-gray-200">
                                                    {item.quantity}
                                                </p>
                                            </div>
                                            <div className="border-b border-gray-300">
                                                <p className="text-gray-800 dark:text-gray-200">
                                                    {item.unitPrice}{" "}
                                                    {details.currency}
                                                </p>
                                            </div>
                                            <div className="border-b border-gray-300">
                                                <p className="sm:text-right text-gray-800 dark:text-gray-200">
                                                    {item.total}{" "}
                                                    {details.currency}
                                                </p>
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </div>
                                <div className="sm:hidden border-b border-gray-200 dark:border-gray-700"></div>
                            </div>
                        </div>

                        <div className="mt-2 flex sm:justify-end">
                            <div className="w-full max-w-2xl sm:text-right space-y-2">
                                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                                    <dl className="grid sm:grid-cols-5 gap-x-3">
                                        <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                                            Subtotal:
                                        </dt>
                                        <dd className="col-span-2 text-gray-500">
                                            {details.subTotal}{" "}
                                            {details.currency}
                                        </dd>
                                    </dl>
                                    {details.discountDetails?.amount !=
                                        undefined &&
                                        details.discountDetails?.amount > 0 && (
                                            <dl className="grid sm:grid-cols-5 gap-x-3">
                                                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                                                    Discount:
                                                </dt>
                                                <dd className="col-span-2 text-gray-500">
                                                    {details.discountDetails
                                                        .amountType === "amount"
                                                        ? `- ${details.discountDetails.amount} ${details.currency}`
                                                        : `- ${details.discountDetails.amount}%`}
                                                </dd>
                                            </dl>
                                        )}
                                    {details.taxDetails?.amount != undefined &&
                                        details.taxDetails?.amount > 0 && (
                                            <dl className="grid sm:grid-cols-5 gap-x-3">
                                                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                                                    Tax:
                                                </dt>
                                                <dd className="col-span-2 text-gray-500">
                                                    {details.taxDetails
                                                        .amountType === "amount"
                                                        ? `+ ${details.taxDetails.amount} ${details.currency}`
                                                        : `+ ${details.taxDetails.amount}%`}
                                                </dd>
                                            </dl>
                                        )}
                                    {details.shippingDetails?.cost !=
                                        undefined &&
                                        details.shippingDetails?.cost > 0 && (
                                            <dl className="grid sm:grid-cols-5 gap-x-3">
                                                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                                                    Shipping:
                                                </dt>
                                                <dd className="col-span-2 text-gray-500">
                                                    {details.shippingDetails
                                                        .costType === "amount"
                                                        ? `+ ${details.shippingDetails.cost} ${details.currency}`
                                                        : `+ ${details.shippingDetails.cost}%`}
                                                </dd>
                                            </dl>
                                        )}
                                    <dl className="grid sm:grid-cols-5 gap-x-3">
                                        <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                                            Total:
                                        </dt>
                                        <dd className="col-span-2 text-gray-500">
                                            {details.totalAmount}{" "}
                                            {details.currency}
                                        </dd>
                                    </dl>
                                    {details.totalAmountInWords && (
                                        <dl className="grid sm:grid-cols-5 gap-x-3">
                                            <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                                                Total in words:
                                            </dt>
                                            <dd className="col-span-2 text-gray-500">
                                                <em>
                                                    {details.totalAmountInWords}{" "}
                                                    {details.currency}
                                                </em>
                                            </dd>
                                        </dl>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="my-4">
                                <div className="my-2">
                                    <p className="font-semibold text-blue-600">
                                        Additional notes:
                                    </p>
                                    <p className="font-regular text-gray-800 dark:text-gray-200">
                                        {details.additionalNotes}
                                    </p>
                                </div>
                                <div className="my-2">
                                    <p className="font-semibold text-blue-600">
                                        Payment terms:
                                    </p>
                                    <p className="font-regular text-gray-800 dark:text-gray-200">
                                        {details.paymentTerms}
                                    </p>
                                </div>
                                <div className="my-2">
                                    <p className="font-semibold text-md text-gray-800 dark:text-gray-200">
                                        Please send the payment to this address
                                        <p className="text-sm">
                                            Bank:{" "}
                                            {
                                                details.paymentInformation
                                                    ?.bankName
                                            }
                                        </p>
                                        <p className="text-sm">
                                            Account name:{" "}
                                            {
                                                details.paymentInformation
                                                    ?.accountName
                                            }
                                        </p>
                                        <p className="text-sm">
                                            Account no:{" "}
                                            {
                                                details.paymentInformation
                                                    ?.accountNumber
                                            }
                                        </p>
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm">
                                If you have any questions concerning this
                                invoice, use the following contact information:
                            </p>
                            <div>
                                <p className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                                    {sender.email}
                                </p>
                                <p className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                                    {sender.phone}
                                </p>
                            </div>
                        </div>

                        {/* Signature */}
                        {details?.signature && isDataUrl(details?.signature) ? (
                            <div className="mt-6">
                                <p className="font-semibold text-gray-800">
                                    Signature:
                                </p>
                                <img
                                    src={details.signature}
                                    style={{ height: "100px" }}
                                    alt=""
                                />
                            </div>
                        ) : details.signature ? (
                            <div className="mt-6">
                                <p className="font-semibold text-gray-800">
                                    Signature:
                                </p>
                                <p style={{ fontSize: 25 }}>
                                    {details.signature}
                                </p>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );

    const htmlContent = ReactDOMServer.renderToStaticMarkup(content);
    return htmlContent;
};

export default InvoiceTemplate;
