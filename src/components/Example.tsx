import Card from "./Card";

function Example() {
    const ExamplesCodes = [
        {
            title: "213375  -  Gramática 2",
            content: [
                {
                    subtitle: "Leonardo Toledo Velazco",
                    code: `automata estado: 2 - 396 ; 
inicio: 2; 
aceptacion : 962;
fin`,
                },
            ],
        },
    ];

    return (
        <>
            <div>
                <div className="bg-[#1e1e1e] text-[#ff5e91] pl-12 py-4">
                    <div className="pb-12">
                        {ExamplesCodes.map((example, index) => {
                            return (
                                <Card
                                    key={index}
                                    title={example.title}
                                    content={example.content}
                                />
                            );
                        })}
                    </div>
                </div>
            </div >
        </>
    );
}

export default Example;