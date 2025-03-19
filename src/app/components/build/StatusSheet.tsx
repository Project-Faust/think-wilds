"use client";

// import ArmorTalismanStatus from "./ArmorTalismanStatus";
// import WeaponStatus from "./WeaponStatus";
import useEquipmentStore from "../storage/EquipmentStorage";

export default function StatusSheet() {

    const formatLabel = (text: string) =>
        text.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).trim();


    const {
        inventoryCharms,
        conditionalSkills,
        consumableBuffs,
        toggleInventoryCharm,
        toggleConditionalSkill,
        toggleConsumableBuff,
    } = useEquipmentStore();

    return (
        <div className="max-w-full">
            <h1 className="text-center text-3xl font-bold p-5 m-5">Hunter Status</h1>

            {/* parent flex */}
            <div className="flex flex-wrap justify-evenly m-0">

                {/* base stats flex container */}
                <div className="basis-1/4 flex flex-wrap justify-center gap-x-5 border border-3 rounded-lg p-5 m-5">

                    {/* Base Stats */}
                    <div className="basis-1/2 m-5">
                        <h2 className="text-center text-xl p-3">Base Modifiers</h2>
                        <ul className="text-end border rounded-lg p-3">
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
                    <div className="basis-1/2 m-5">
                        <h2 className="text-center text-xl p-3">Modified Stats</h2>
                        <ul className="text-end border rounded-lg p-3">
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

                {/* skills flex conatiner */}
                <div className="basis-1/4 flex flex-wrap justify-center gap-x-5 border border-3 rounded-lg p-5 m-5">

                    {/* weapon skills */}
                    <div className="basis-1/2 m-5">
                        <h2 className="text-center text-xl p-3">Weapon Skills</h2>
                        <ul className="text-end border rounded-lg p-3">
                            **Placeholder for .map()**
                        </ul>
                    </div>

                    <div className="basis-1/2 m-5">
                        <h2 className="text-center text-xl p-3">Armor Skills</h2>
                        <ul className="text-end border rounded-lg p-3">
                            **Placeholder for .map()**
                        </ul>
                    </div>

                </div>

                {/* toggle for conditionals */}
                <div className="basis-1/4 inline-flex flex-col flex-wrap items-center gap-x-5 border border-3 rounded-lg p-5 m-5">
                    <h2 className="text-center text-2xl p-3">Buffs & Conditionals</h2>

                    {/* Inventory Charms */}
                    <div className="flex-row mx-0 my-5">
                        <h3 className="text-lg font-bold mb-2">Inventory Charms</h3>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={inventoryCharms.armorCharm} onChange={() => toggleInventoryCharm("armorCharm")} />
                            Armor Charm
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={inventoryCharms.powerCharm} onChange={() => toggleInventoryCharm("powerCharm")} />
                            Power Charm
                        </label>
                    </div>

                    {/* Conditional Skills */}
                    <div className="flex-row mx-0 my-2">
                        <h3 className="text-lg font-bold">Conditional Skills</h3>
                        {Object.keys(conditionalSkills).map((skill) => (
                            <label key={skill} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={conditionalSkills[skill as keyof typeof conditionalSkills]}
                                    onChange={() => toggleConditionalSkill(skill as keyof typeof conditionalSkills)}
                                />
                                {formatLabel(skill)}
                            </label>
                        ))}
                    </div>

                    {/* Consumables */}
                    <div className="flex-row mx-0 my-5">
                        <h3 className="text-lg font-bold">Consumables</h3>
                        {Object.keys(consumableBuffs).map((buff) => (
                            <label key={buff} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={consumableBuffs[buff as keyof typeof consumableBuffs]}
                                    onChange={() => toggleConsumableBuff(buff as keyof typeof consumableBuffs)}
                                />
                                {formatLabel(buff)}
                            </label>
                        ))}
                    </div>


                    <aside className="text-center p-5 m-5">Items that share a type such as Might Seed and Might Pill are mutually exclusive. <br /> Do not enable both at the same time.</aside>
                </div>
            </div>
        </div>
    )
}