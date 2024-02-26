'use client'
import React, { useState } from "react";
import Monaco from "@monaco-editor/react";
import Example from "../../components/Example";

export default function table() {
    const [codigo, setCodigo] = useState<string>("");
    const [resul, setResul] = useState<string[]>([]);
    const [esValido, setEsValido] = useState<boolean | null>(null);

    function handleValidarClick() {
        analizarCodigo();
    }

    const analizarCodigo = () => {
        const cadenaS: string = codigo.replace(/\s/g, "");
        const { esValida, infoPila } = validacion(cadenaS);
        setEsValido(esValida);
        setResul(infoPila);
    };

    function setEditorTheme(monaco: any) {
        monaco.editor.defineTheme("predictiva", {
            base: "vs-dark",
            inherit: true,
            rules: [],
            colors: {},
        });
    }

    return (
        <>
            <Example />
            <div className="bg-[#1e1e1e] h-[520px]">
                <Monaco
                    beforeMount={setEditorTheme}
                    width="800"
                    height="20vh"
                    theme="predictiva"
                    value={codigo}
                    options={{
                        selectOnLineNumbers: false,
                        mouseStyle: "text",
                        acceptSuggestionOnEnter: "off",
                        quickSuggestions: false,
                    }}
                    onChange={(newValue) => {
                        console.log("Valor:", newValue);
                        if (typeof newValue === "string") {
                            setCodigo(newValue);
                        }
                    }}
                />

                <div className="flex items-center justify-center text-[#ffffff]">
                    <div className="flex justify-center flex-col">
                        <button 
                        className="bg-[#ff5e91] text-black p-2 rounded-md hover:bg-[#ff76a2] duration-300"
                        onClick={handleValidarClick}>Verificar</button>
                        {esValido !== null && <p className={esValido ? "text-[#52bd3d] mt-2": "text-[#bd3d3d] mt-2"}>{esValido ? "Código válido" : "Hubo un error, verifique sus parámetros"}</p>}
                    </div>
                </div>
                <center>
                <div className="ml-2 text-white overflow-auto h-64">
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        {resul.map((info: string, index: number) => (
                            <li key={index} style={{ marginTop: "1cm" }}>
                                {info}
                            </li>
                        ))}
                    </ul>
                </div>
            </center>
            </div>
        </>
    );
}

function validacion(codigo: string) {
    let pila: string[] = ["$"];
    let contador: number = 0;
    let infoPila: string[] = [];
    pila[1] = "S";

    const pushInfo = (X: string) => {
        infoPila.push(`Push: ${X} -- ${codigo.slice(contador)}`);
    };
    const popInfo = (X: string) => {
        infoPila.push(`Pop: ${X} --  ${codigo.slice(contador)}`);
    };
    while (pila.length > 0) {
        const X: string | undefined = pila.pop();
        if (!X) {
            break;
        }
        const a: string | undefined = codigo[contador];

        if (X === "$") {
            infoPila.push("Fin");
            break;
        }

        if (X === a) {
            contador++;
        } else if (esNoTerminal(X)) {
            const produccion: any = obtenerProduccion(X, a);

            if (produccion) {
                pushInfo(X);
                if (produccion[0] !== "ε") {
                    for (let i: number = produccion.length - 1; i >= 0; i--) {
                        pila.push(produccion[i]);
                    }
                }
            } else {
                infoPila.push(`Error: No encontró algo válido para ${X}.`);
                return { esValida: false, infoPila };
            }
        } else {
            popInfo(X);
            return { esValida: false, infoPila };
        }
    }
    return { esValida: contador === codigo.length, infoPila };
}

// automata estado: 3 - 123 ; inicio: 1; aceptacion : 2123;
function esNoTerminal(simbolo: string) {
    const terminales: string[] = ["automata", "estado", ";", "[", ",", "]"];
    return !terminales.includes(simbolo);
}

function obtenerProduccion(noTerminal: string, siguiente: string) {
    console.log("Siguiente:", siguiente);

    const producciones: { [key: string]: string[] | RegExp | null } = {
        S: ["A", "B", ":", "D", "-", "C", ";", "Q", ":", "D", ";", "P", ":", "C", ";"],
        A: ["a", "u", "t", "o", "m", "a", "t", "a"],
        B: ["e", "s", "t", "a", "d", "o"],
        D: /[0-9]/.test(siguiente) ? [siguiente] : null,
        C: /[0-9]/.test(siguiente) ? ["D", "C"] : ["ε"],
        Q: ["i", "n", "i", "c", "i", "o"],
        P: ["a", "c", "e", "p", "t", "a", "c", "i", "o", "n"],
    };

    return producciones[noTerminal];
}

