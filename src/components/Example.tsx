import Card from "./Card";

function Example() {
    const ExamplesCodes = [
        {
            title: "213375",
            content: [
                {
                    subtitle: "Leonardo Toledo Velazco",
                    code: `automata estado: 3 - 123 ; 
inicio: 1; 
aceptacion : 3;`,
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