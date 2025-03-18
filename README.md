# Ready to <a href="https://think-wilds.vercel.app" rel="noreferrer" target="blank">Think Wilds</a>?

## A fan-made set builder for Monster Hunter: Wilds

> This is a bit of a passion project that came into being just as Monster Hunter: Wilds launched at the beginning of March 2025. In the early days after the game's release, there were no apparent set builders that had all three of the requirements that I wanted: all of the current item data, a GUI for users to search and select items, and a final status sheet (even without all of the calculations like critical damage, effective raw (EFR) calculations, etc.) <br/> This project would not be nearly as feasible for a single contributor like myself without fantastic resources such as the Monster Hunter Wilds DB API. Please visit and give the contributors to that project your full support, as I do. Browse their <a href=https://github.com/LartTyler/MHWDB-API>GitHub</a> to view and support them there.

## v 0.9.0 Current
- Finished the base structure for selecting a weapon, each of the five slots for armor, and a charm (talisman). The selection of both primary and secondary weapons persist after switching back and forth between the two.
- Most all of the primary formatting concerns should be largely acceptable for the time being; there will likely be revisions to color and font later for visually impaired users.
- All available item data (thank you MHWDB-API) is available using API fetching. Weapons and charms/talismans are populated on page load, each specific type of weapon (i.e. each equippable Longsword) is only fetched and rendered when a weapon type is selected.

## v 0.9.1 Development (Coming changes)
- Status page to display hunter stats such as base true raw, base affinity, base defense, base elemental resistances
- Skill display to show which armor skills (including set bonuses) are active

## v 0.9.2 Development (Coming Changes)
- Additional API functionality to provide data for decorations
- Decoration manager: allow the use of slotting decorations in weapon and armor based on slots provided from equipped items
- Integrate skills from decorations to existing skills from weapon, armor, and charm/talisman

## v 0.9.3 Development (Coming Changes)
- Incorporate additional conditional settings such as monster state (enraged), max health (Peak Performance), max stamina (Maximum Might), health thresholds for Heroics, food, item consumables, etc
- Create and incorporate arithmetic/logic functionality to calculate stats such as effective raw (EFR), conditional affinity, effective critical damage (1.25 base multiplier), conditional buffs (Agitator, Maximum Might, etc), consumables (Demon Powder, DemonDrug, etc), food buffs

## Technologies Utilized
- <a href="https://vercel.com/" rel="noreferrer noopener" target="blank">Vercel</a>
- <a href="https://nextjs.org/" rel="noreferrer noopener" target="blank">NextJs</a>
- <a href="https://tailwindcss.com/" rel="noreferrer noopener" target="blank">TailwindCSS</a>
- <a href="https://daisyui.com/" rel="noreferrer noopener" target="blank">DaisyUI</a>
- <a href="https://docs.mhw-db.com/" rel="noreferrer noopener" target="blank">MHW-DB API</a>