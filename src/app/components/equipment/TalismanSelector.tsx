"use client";

import { useEffect, useState } from "react";

// API endpoint for talismans
const API_URL_TALISMAN = "https://wilds.mhdb.io/en/charms";

// Define expected structure of API response
interface Skill {
    skill: {
        name: string;
    };
    level: number;
    description: string;
}

interface TalismanRank {
    id: number;
    name: string;
    level: number;
    rarity: number;
    skills: Skill[];
}

interface TalismanAPIResponse {
    ranks: TalismanRank[];
}

// Processed structure for UI
interface ProcessedTalisman {
    id: number;
    name: string;
    level: number;
    rarity: number;
    skills: {
        name: string;
        level: number;
        description: string;
    }[];
}

export default function TalismanSelector() {
    const [talismanData, setTalismanData] = useState<ProcessedTalisman[]>([]);
    const [selectedTalisman, setSelectedTalisman] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        const fetchTalismans = async () => {
            try {
                const res = await fetch(API_URL_TALISMAN);
                const data: TalismanAPIResponse[] = await res.json();

                // Flatten `ranks` arrays to get all talisman levels
                const talismanList: ProcessedTalisman[] = data.flatMap((talisman) =>
                    talisman.ranks.map((rank) => ({
                        id: rank.id,
                        name: rank.name,
                        level: rank.level,
                        rarity: rank.rarity,
                        skills: rank.skills.map((s) => ({
                            name: s.skill.name,
                            level: s.level,
                            description: s.description,
                        })),
                    }))
                );

                // Group by base talisman name (highest level first)
                const uniqueTalismans: ProcessedTalisman[] = Object.values(
                    talismanList.reduce((acc: Record<string, ProcessedTalisman>, talisman) => {
                        if (!acc[talisman.name] || talisman.level > acc[talisman.name].level) {
                            acc[talisman.name] = talisman;
                        }
                        return acc;
                    }, {})
                );

                setTalismanData(uniqueTalismans);
            } catch (e) {
                console.error("Error fetching talisman data:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchTalismans();
    }, []);

    const handleTalismanSelect = (talismanName: string) => {
        setSelectedTalisman(talismanName);
        document.getElementById("talisman-popover")?.hidePopover(); // Close popover after selection
    };

    return (
        <div className="relative flex flex-row items-center justify-center m-5">
            {loading ? (
                <p>Loading talismans...</p>
            ) : (
                <>
                    {/* Talisman Selector */}
                    <div className="relative z-50">
                        {/* Button to trigger the popover */}
                        <button
                            className="btn btn-accent"
                            popoverTarget="talisman-popover"
                            style={{ anchorName: "--anchor-talisman" } as React.CSSProperties}
                        >
                            {selectedTalisman || "Select Talisman"}
                        </button>

                        {/* Popover content */}
                        <ul
                            className="dropdown menu w-52 rounded-box bg-base-100 shadow-lg z-50"
                            popover="auto"
                            id="talisman-popover"
                            style={{ positionAnchor: "--anchor-talisman" } as React.CSSProperties}
                        >
                            {/* Search Bar */}
                            <li className="p-2">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="input input-bordered w-full"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </li>

                            {/* Scrollable List */}
                            <li>
                                <ul className="max-h-60 overflow-y-auto">
                                    {talismanData
                                        .filter((talisman) =>
                                            talisman.name.toLowerCase().includes(searchQuery.toLowerCase())
                                        )
                                        .map((talisman) => (
                                            <li key={talisman.id}>
                                                <button onClick={() => handleTalismanSelect(talisman.name)}>
                                                    {talisman.name} (Lv. {talisman.level})
                                                </button>
                                            </li>
                                        )) || <li>No talismans available</li>}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}
