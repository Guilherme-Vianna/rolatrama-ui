import {Label} from "@radix-ui/react-label";
import {IMiniInputProps} from "@/app/services/types";

export default function MiniInput({
                                      title,
                                      size,
                                      quantity,
                                      mainValue = "",
                                      miniValues = [],
                                      onValueChange,
                                      fieldName
                                  } :  IMiniInputProps) {
    const generateMiniInputs = (quantity :any) => {
        return (
            <>
                {Array.from({length: parseInt(quantity)}).map((_, idx) => {
                    const miniFieldName = `${fieldName}_${idx + 1}`;
                    return (
                        <input
                            key={idx}
                            className={`w-${size} text-sm text-center border-x-1`}
                            value={miniValues[idx] || ""}
                            onChange={(e) => onValueChange(miniFieldName)(e.target.value)}
                        />
                    );
                })}
            </>
        );
    };

    return (
        <div className="flex items-center justify-between gap-1">
            <Label className="text-sm">{title}</Label>
            <input
                className={`w-${size} text-sm text-center border`}
                value={mainValue}
                onChange={(e) => onValueChange(fieldName)(e.target.value)}
            />
            {generateMiniInputs(quantity)}
        </div>
    );
}