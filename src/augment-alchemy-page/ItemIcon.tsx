import { Augment, ItemType } from "../utils/types";

interface ItemIconProps {
	item: ItemType;
	augment: Augment | null;
}

const ItemIcon: React.FC<ItemIconProps> = ({ item, augment }) => {
	const gemMap: Record<string, string> = {
		"Ability Haste": "stats",
		Active: "misc",
		AD: "stats",
		"Adaptive Force": "stats",
		ADC: "role",
		Aggressive: "playstyle",
		// "AOE": "stats",
		AP: "stats",
		"Apex Inventor Synergy": "misc",
		Armour: "stats",
		"Armour Pen": "stats",
		"Armour Scaling": "scalings",
		"Armour Shred": "stats",
		Assassin: "role",
		"Attack Speed": "stats",
		"Auto Attacking": "playstyle",
		"Auto Reset": "effects",
		"Auto Weaving": "playstyle",
		// "Autocast": "stats",
		Bleed: "effects",
		Block: "effects",
		Bruiser: "role",
		Burn: "effects",
		// "Burst": "stats",
		"Cooldown Reduction": "effects",
		Crit: "stats",
		"Crit Damage": "stats",
		"Crit Scaling": "scalings",
		"Current Health Damage": "scalings",
		"Damage Steroid": "effects",
		Defensive: "playstyle",
		Dragon: "misc",
		Energized: "effects",
		"Enhanced Auto Attack": "effects",
		Execute: "effects",
		Gambling: "misc",
		Grievous: "effects",
		Heal: "effects",
		"Heal and Shield Power": "stats",
		Health: "stats",
		"Health Regen": "stats",
		Hybrid: "role",
		Immobilize: "effects",
		"Immobilize Enhancer": "effects",
		Income: "misc",
		Kiting: "playstyle",
		Lethality: "stats",
		Lifesteal: "stats",
		"Lil Guys": "misc",
		// "Long Range": "stats",
		Mage: "role",
		"Magic Pen": "stats",
		"Magic Resist": "stats",
		"Magic Resist Scaling": "scalings",
		"Magic Resist Shred": "stats",
		Mana: "stats",
		"Mana Regen": "stats",
		"Mana Scaling": "scalings",
		"Max Health Damage": "scalings",
		"Max Health Scaling": "scalings",
		"Missing Health Damage": "scalings",
		"Missing Health Scaling": "scalings",
		"Move Speed": "stats",
		Movement: "effects",
		Omnivamp: "stats",
		"On Takedown Effect": "effects",
		"On-Hit": "effects",
		// "Only Child": "stats",
		"Positioning Pattern": "playstyle",
		// "Projectile": "stats",
		Quest: "misc",
		"Range Increase": "stats",
		// "Range Only": "stats",
		Shield: "effects",
		Slow: "effects",
		Sniper: "role",
		"Spell Heavy": "playstyle",
		"Spell Weaving": "playstyle",
		Stacking: "playstyle",
		// "Sticky": "stats",
		// "Summoner Spell Cooldown": "stats",
		Support: "role",
		Tank: "role",
		Targeted: "misc",
		Tenacity: "stats",
		Threshold: "misc",
		"True Damage": "misc",
		Twinning: "misc",
		"Ultimate Scaling": "effects",
		Untargetability: "misc",
		"Win More": "misc",
	};

	console.log(`item`, item);
	const matchingTags = [];
	if (augment !== null && item.tags) {
		for (let tag of augment.tags) {
			for (let itemTag of item.tags) {
				if (itemTag === tag) {
					matchingTags.push(itemTag);
				}
			}
		}
	}
	return (
		<div className="suggested-item">
			<img src={item.url} />
			<div className="item-gem-box">
				<>
					{matchingTags.map((tag: string) => (
						<>
							<div className={`settings ${gemMap[tag]}`}>
								<div className={`tinted-gem ${tag.replace(/\s+/g, "-")}`}>
									<img
										src={`/gems/${gemMap[tag]}.png`}
										className={`base-gem ${gemMap[tag]}`}
									/>
								</div>
							</div>
						</>
					))}
				</>
			</div>
		</div>
	);
};

export default ItemIcon;
