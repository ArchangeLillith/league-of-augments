import { useEffect, useState } from "react";
import { fetchItems } from "./services/items";

interface Item {
	item_id: number;
	name: string;
	tier: string;
	cost: number;
	sell: number;
	[key: string]: string | number;
}

const statLabels: Record<string, string> = {
	ability_power: "AP",
	ability_haste: "Ability Haste",
	omnivamp: "Omnivamp",
	adaptive_force: "Adaptive Force",
	attack_damage: "Attack Damage",
	crit_chance: "Crit Chance",
	crit_damage: "Crit Damage",
	attack_speed: "Attack Speed",
	lethality: "Lethality",
	lifesteal: "Lifesteal",
	move_speed: "Move Speed",
	armour_pen: "Armor Pen",
	magic_pen: "Magic Pen",
	health: "Health",
	mana: "Mana",
	mana_regen: "Mana Regen",
	health_regen: "Health Regen",
	heal_and_shield_power: "Heal & Shield Power",
	armour: "Armor",
	magic_resist: "Magic Resist",
	tenacity: "Tenacity",
};

const ItemPage = () => {
	const [items, setItems] = useState<Item[]>([]);

	useEffect(() => {
		const getItems = async () => {
			const data = await fetchItems();
			setItems(data);
		};
		getItems();
	}, []);

	return (
		<div className="item-page">
			{items.map((item) => (
				<div className="item-card" key={item.item_id}>
					<h3>{item.name}</h3>
					<p>
						<strong>Tier:</strong> {item.tier}
					</p>
					<p>
						<strong>Cost:</strong> {item.cost}
					</p>
					<p>
						<strong>Sell:</strong> {item.sell}
					</p>
					<div className="item-stats">
						{Object.entries(statLabels).map(([key, label]) => {
							const value = item[key];
							if (typeof value === "number" && value !== 0) {
								return (
									<p key={key}>
										<strong>{label}:</strong> {value}
									</p>
								);
							}
							return null;
						})}
					</div>
				</div>
			))}
		</div>
	);
};

export default ItemPage;
