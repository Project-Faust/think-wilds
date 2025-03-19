"use client";

// import ArmorTalismanStatus from "./ArmorTalismanStatus";
// import WeaponStatus from "./WeaponStatus";
import { useState } from "react";

export default function StatusSheet() {
    // const [maxMight, setMaxMight] = useState(false);
    // const [peakPerformance, setPeakPerformance] = useState(false);
    // const [agitator, setAgitator] = useState(false);

    return (
        <div className="">
            <h1 className="text-center text-2xl p-5">Hunter Status</h1>

            {/* flex container */}
            <div className="flex flex-wrap border border-3 rounded-lg p-5 m-5">

                {/* Base Stats */}
                <div className="flex flex-col flex-1 items-center m-5">
                    <h2 className="row text-center text-xl p-3">Stats Before Modifiers</h2>
                    <ul className="row text-end border rounded-lg p-3">
                        <li id="base-raw"
                            className="my-2">
                            Base Raw: --
                        </li>
                        <li id="base-affinity"
                            className="my-2">
                            Base Affinity: --%
                        </li>
                        <li id="base-element"
                            className="my-2">
                            Base Element: --
                        </li>
                        <li id="base-defense"
                            className="my-2">
                            Base Defense: --
                        </li>
                        <li id="base-ele-res"
                            className="border-t my-2">
                                Base Resistances
                            <ul>
                                <li>Fire: --</li>
                                <li>Water: --</li>
                                <li>Ice: --</li>
                                <li>Thunder: --</li>
                                <li>Dragon: --</li>
                            </ul>
                        </li>
                    </ul>
                </div>

                {/* Modified stats */}
                <div className="flex flex-1 flex-col items-center m-5">
                    <h2 className="row text-center text-xl p-3">Modified Stats</h2>
                    <ul className="row text-end border rounded-lg p-3">
                        <li id="efr"
                            className="my-2">
                            Effective Raw (EFR): --
                        </li>
                        <li id="modified-affinity"
                            className="my-2">
                            Effective Affinity: --%
                        </li>
                        <li id="modified-element"
                            className="my-2">
                            Effective Element: --
                        </li>
                        <li id="modified-defense"
                            className="my-2">
                            Effective Defense: --
                        </li>
                        <li id="modified-ele-res"
                            className="border-t my-2">
                                Modified Resistances
                            <ul>
                                <li>Fire: --</li>
                                <li>Water: --</li>
                                <li>Ice: --</li>
                                <li>Thunder: --</li>
                                <li>Dragon: --</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

            {/* skills? */}
            <div className="flex flex-wrap border border-3 rounded-lg p-5 m-5">

                {/* weapon skills */}
                <div className="flex-1 col m-5">
                    <h2 className="text-center text-xl p-3">Weapon Skills</h2>
                    <ul className="row border rounded-lg p-3">
                        **Placeholder for .map()**
                    </ul>
                </div>

                <div className="flex-1 col m-5">
                    <h2 className="text-center text-xl p-3"> Armor Skills</h2>
                    <ul className="row border rounded-lg p-3">
                        **Plcaceholder for .map()**
                    </ul>
                </div>

            </div>
        </div>
    )
}