import { useEffect, useState } from "react";
import { fetchItems } from "../services/items";
import ItemIcon from "../componenets/ItemIcon";
import { ItemType } from "../utils/types";

//!we need to add both percent pen for armour and mr here if we reuse any of this!
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
	const [items, setItems] = useState<ItemType[]>([]);

	useEffect(() => {
		const getItems = async () => {
			const data = await fetchItems(true);
			setItems(data);
		};
		getItems();
	}, []);

	return (
		<div className="item-page">
			{items.map((item) => (
				<ItemIcon item={item} augment={null} />
			))}
		</div>
	);
};

export default ItemPage;
