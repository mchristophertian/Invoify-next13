import React from "react";

// Components
import { BaseButton } from "@/app/components";

// Icons
import { Check } from "lucide-react";

// Types
import { SignatureColor } from "@/app/types/types";

type SignatureColorSelectorProps = {
    colors: SignatureColor[];
    selectedColor: string;
    handleColorButtonClick: (color: string) => void;
};

const SignatureColorSelector = ({
    colors,
    selectedColor,
    handleColorButtonClick,
}: SignatureColorSelectorProps) => {
    return (
        <div className="flex gap-2">
            {colors.map((color) => (
                <BaseButton
                    key={color.name}
                    size="icon"
                    tooltipLabel={color.label}
                    style={{
                        backgroundColor: color.color,
                    }}
                    className="flex justify-center items-center h-6 w-6 rounded-full"
                    onClick={() => handleColorButtonClick(color.name)}
                >
                    {selectedColor === color.name && (
                        <span className="text-white">
                            <Check size={16} />
                        </span>
                    )}
                </BaseButton>
            ))}
        </div>
    );
};

export default SignatureColorSelector;
