import { useState } from "react";

export default function NotasTextarea({ value, onChange }: any) {
    const [rows, setRows] = useState(4);

    const handleBlur = (e:any) => {
        const lines = e.target.value.split('\n').length;
        setRows(Math.max(4, lines));
    };

    return (
        <textarea
            className="w-full resize-none"
            rows={rows}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={handleBlur}
    />
);
}