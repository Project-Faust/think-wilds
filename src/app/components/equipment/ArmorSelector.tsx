"use client";

import { useEffect, useState } from "react";

// initialize armorSlots as lowercase for consistency
const armorSlots = ["head", "chest", "arms", "waist", "legs"] as const;
const API_URL_ARMOR = "https://wilds.mhdb.io/en/armor";

// Define expected structure for API response
interface Resistance {
    fire: number;
    water: number;
    ice: number;
    thunder: number;
    dragon: number;
}

interface Skill {
    skill: {
        name: string;
    };
    level: number;
}

interface Armor {
    id: number;
    kind: string;
    name: string;
    description: string;
    rank: string;
    rarity: number;
    resistances: Resistance;
    defense: {
        base: number;
        max: number;
    };
    skills: Skill[];
    slots: number[];
}

export default function ArmorSelector() {
    const [armorData, setArmorData] = useState<Record<typeof armorSlots[number], Armor[]>>({
        head: [],
        chest: [],
        arms: [],
        waist: [],
        legs: [],
    });
    const [selectedArmor, setSelectedArmor] = useState<{ [key in typeof armorSlots[number]]?: string }>({});
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState<Record<typeof armorSlots[number], string>>({
        head: "",
        chest: "",
        arms: "",
        waist: "",
        legs: "",
    });

    useEffect(() => {
        const fetchArmor = async () => {
            try {
                const res = await fetch(API_URL_ARMOR);
                const data: Armor[] = await res.json(); // Explicitly type fetched data
                const armorList = Array.isArray(data) ? data : [data];

                // debug log to test API filtering
                // console.log("Processed (Total: ", armorList.length, "items):", armorList);

                // Initialize armorBySlot with lowercase keys to match 
                const armorBySlot: Record<typeof armorSlots[number], Armor[]> = {
                    head: [],
                    chest: [],
                    arms: [],
                    waist: [],
                    legs: [],
                };

                armorList.forEach((armor) => {
                    // maintain lowercase
                    const slot = armor.kind?.trim().toLowerCase();

                    if (armorSlots.includes(slot as typeof armorSlots[number])) {
                        armorBySlot[slot as keyof typeof armorBySlot].push(armor);
                    }
                    // debug when testing API filtering
                    // else {
                    //     console.warn(`Armor kind '${armor.kind}' does not match expected slots.`);
                    // }
                });

                // more debug
                // console.log("Processed Armor Data: ", armorBySlot);
                setArmorData(armorBySlot);
            } catch (e) {
                console.error("Error fetching armor data:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchArmor();
    }, []);

    const handleArmorSelect = (slot: typeof armorSlots[number], piece: string) => {
        setSelectedArmor((prev) => ({ ...prev, [slot]: piece }));
    };

    const handleSearchChange = (slot: typeof armorSlots[number], query: string) => {
        setSearchQuery((prev) => ({ ...prev, [slot]: query }));
    };

    return (
        <div className="relative flex flex-row flex-wrap items-center justify-center gap-5 m-5">
            {loading ? (
                <p>Loading armor...</p>
            ) : (
                <>
                    {/* Armor Selection */}
                    {armorSlots.map((slot, index) => (
                        <div key={slot} className="relative z-50">
                            {/* Button to trigger the popover */}
                            <button
                                className="btn btn-primary"
                                popoverTarget={`popover-${index}`}
                                style={{ anchorName: `--anchor-${index}` } as React.CSSProperties}
                            >
                                {selectedArmor[slot] || `Select ${slot.charAt(0).toUpperCase() + slot.slice(1)}`}
                            </button>

                            {/* Popover content */}
                            <ul
                                className="dropdown menu w-52 rounded-box bg-base-100 shadow-lg z-50"
                                popover="auto"
                                id={`popover-${index}`}
                                style={{ positionAnchor: `--anchor-${index}` } as React.CSSProperties}
                            >
                                {/* Search Bar */}
                                <li className="p-2">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="input input-bordered w-full"
                                        value={searchQuery[slot]}
                                        onChange={(e) => handleSearchChange(slot, e.target.value)}
                                    />
                                </li>

                                {/* Scrollable List */}
                                <li>
                                    <ul className="max-h-60 overflow-y-auto">
                                        {armorData[slot]
                                            ?.filter((armor) => armor.name.toLowerCase().includes(searchQuery[slot].toLowerCase()))
                                            .map((armor) => (
                                                <li key={armor.id}>
                                                    <button onClick={() => handleArmorSelect(slot, armor.name)}>
                                                        {armor.name}
                                                    </button>
                                                </li>
                                            )) || <li>No armor available</li>}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}
