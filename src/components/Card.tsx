import React from "react";
import Button from "./Button";

export default function Card(props: any) {
    return (
        <div>
            <h2>{props.title}</h2>
            {props.content.map((example: any, index: any) => (
                <div key={index}>
                    <h3>{example.subtitle}</h3>
                    <Button code={example.code} />
                </div>
            ))}
        </div>
    );
}