"use client";

import { useEffect, useState } from "react";

// initialize armorSlots as lowercase for consistency
const armorSlots = ["head", "chest", "arms", "waist", "legs"] as const;
const API_URL_ARMOR = "https://wilds.mhdb.io/en/armor";

export default function ArmorSelector() {
    const [armorData, setArmorData] = useState<Record<typeof armorSlots[number], any[]>>({
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

    // tracks popover open
    const [activePopover, setActivePopover] = useState<string | null>(null);

    useEffect(() => {
        const fetchArmor = async () => {
            try {
                const res = await fetch(API_URL_ARMOR);
                const data = await res.json();
                const armorList = Array.isArray(data) ? data : [data];

                // debug log to test API filtering
                // console.log("Processed (Total: ", armorList.length, "items):", armorList);

                // Initialize armorBySlot with lowercase keys to match 
                const armorBySlot: Record<typeof armorSlots[number], any[]> = {
                    head: [],
                    chest: [],
                    arms: [],
                    waist: [],
                    legs: [],
                };

                armorList.forEach((armor) => {
                    // maintain lowercase
                    const slot = armor.kind?.trim().toLowerCase();

                    if (armorSlots.includes(slot as any)) {
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
                console.error("Error fetching armor data: ", e);
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
        <div className="relative flex flex-col gap-10 m-10">
            {loading ? (
                <p>Loading armor...</p>
            ) : (
                <>
                    {/* Background Overlay when Popover is Open */}
                    {activePopover && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-1 z-40"
                            onClick={() => setActivePopover(null)} // Click outside to close
                        ></div>
                    )}

                    {/* Armor Selection */}
                    {armorSlots.map((slot, index) => (
                        <div key={slot} className="relative z-50">
                            {/* Button to trigger the popover */}
                            <button
                                className="btn btn-secondary"
                                popoverTarget={`popover-${index}`}
                                style={{ anchorName: `--anchor-${index}` } as React.CSSProperties}
                                onClick={() => setActivePopover(`popover-${index}`)}
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