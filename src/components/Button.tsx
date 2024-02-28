import React, { useState, useEffect } from "react";

export default function Button(props: any) {
    const [code, setCode] = useState("");

    useEffect(() => {
        setCode(props.code.toString());
    }, []);


    return (
        <center>
            <pre>
                <p className="text-white font-extralight">{code}</p>
            </pre>
        </center>
    );
}