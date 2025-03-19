"use client";

import useEquipmentStore from "../storage/EquipmentStorage";

export default function TalismanTest() {
    const { talisman, setTalisman } = useEquipmentStore();

    const sampleTalisman = {
        skills: [
            { name: "Critical Eye", level: 2 },
            { name: "Attack Boost", level: 1 },
        ],
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg text-white">
            <h2 className="text-xl font-bold">Talisman Test</h2>

            <button
                className="bg-blue-500 px-4 py-2 rounded mt-2"
                onClick={() => setTalisman(sampleTalisman)}
            >
                Equip Sample Talisman
            </button>

            {talisman.skills.length > 0 ? (
                <ul className="mt-2">
                    {talisman.skills.map((skill) => (
                        <li key={skill.name}>{skill.name} - Level {skill.level}</li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-400">No talisman equipped</p>
            )}
        </div>
    );
}
