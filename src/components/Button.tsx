import React, { useState, useEffect } from "react";

export default function Button(props: any) {
    const [code, setCode] = useState("");

    useEffect(() => {
        setCode(props.code.toString());
    }, []);


    return (
        <center>
            <pre>
                <code>{code}</code>
            </pre>
        </center>
    );
}