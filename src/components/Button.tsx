import React, { useState, useEffect } from "react";

export default function Button(props: any) {
    const [code, setCode] = useState("");
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        setCode(props.code.toString());
    }, []);

    const handleCopyClick = async () => {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 1500);
    };

    return (
        <center>
            <div>
                <button onClick={handleCopyClick}>
                    Copiar código
                </button>
            </div>
            <pre>
                <code>{code}</code>
            </pre>
        </center>
    );
}