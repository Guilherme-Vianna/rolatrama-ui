import {Label} from "@radix-ui/react-label";

export default function BaseAttribute({
                                          name,
                                          quantity,
                                          values = [],
                                          modifier = "",
                                          onValueChange,
                                          attributeName
                                      }: any) {
    const generateInputs = (quantity: any) => {
        return (
            <>
                {Array.from({length: parseInt(quantity)}).map((_, idx) => {
                    const fieldName = parseInt(quantity) === 1 ? attributeName : `${attributeName}_${idx + 1}`;

                    return (
                        <input
                            key={idx}
                            className="border-1 text-2xl w-10 h-10 text-center"
                            value={values[idx] || ""}
                            onChange={(e) => {
                                onValueChange(fieldName)(e);
                            }}
                        />
                    );
                })}
            </>
        );
    };

    return (
        <div className="flex items-center gap-3">
            <Label className="flex text-2xl min-w-[50px] max-w-[50px] text-center">
                {name}
            </Label>
            <div
                className="flex justify-between items-center gap-1"
                style={{minWidth: `${70 * parseInt(quantity)}px`, maxWidth: `${70 * parseInt(quantity)}px`}}
            >
                {generateInputs(quantity)}
                <input
                    className="border-x-2 w-10 h-6 text-center"
                    value={modifier || ""}
                    onChange={(e) => {
                        onValueChange(`${attributeName}_mod`)(e);
                    }}
                />
            </div>
        </div>
    );
}