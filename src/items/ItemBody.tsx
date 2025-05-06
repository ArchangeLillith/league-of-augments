import { ItemType } from "../utils/types";

const ItemBody = ({ item }: { item: ItemType }) => {
	return (
		<div className="item-body">
			<div className="item-name">{item.name}</div>
			<div className={`item-tier ${item.tier}`}>{item.tier}</div>
			<div className="item-stat-box">
				{" "}
				{item.ability_haste > 0 && (
					<div className="item-stat">Ability Haste: {item.ability_haste}</div>
				)}
				{item.ability_power > 0 && (
					<div className="item-stat">AP: {item.ability_power}</div>
				)}
				{item.adaptive_force > 0 && (
					<div className="item-stat">Adaptive Force: {item.adaptive_force}</div>
				)}
				{item.armour > 0 && (
					<div className="item-stat">Armour: {item.armour}</div>
				)}
				{item.armour_pen > 0 && (
					<div className="item-stat">Armour Pen: {item.armour_pen}</div>
				)}
				{item.attack_damage > 0 && (
					<div className="item-stat">Attack Damage: {item.attack_damage}</div>
				)}
				{item.attack_speed > 0 && (
					<div className="item-stat">Attack Speed: {item.attack_speed}</div>
				)}
				{item.crit_chance > 0 && (
					<div className="item-stat">Crit Chance: {item.crit_chance}</div>
				)}
				{item.crit_damage > 0 && (
					<div className="item-stat">Crit Damage: {item.crit_damage}</div>
				)}
				{item.heal_and_shield_power > 0 && (
					<div className="item-stat">
						Heal & Shield Power: {item.heal_and_shield_power}
					</div>
				)}
				{item.health > 0 && (
					<div className="item-stat">Health: {item.health}</div>
				)}
				{item.health_regen > 0 && (
					<div className="item-stat">Health Regen: {item.health_regen}</div>
				)}
				{item.lethality > 0 && (
					<div className="item-stat">Lethality: {item.lethality}</div>
				)}
				{item.lifesteal > 0 && (
					<div className="item-stat">Lifesteal: {item.lifesteal}</div>
				)}
				{item.magic_pen > 0 && (
					<div className="item-stat">Magic Pen: {item.magic_pen}</div>
				)}
				{item.magic_resist > 0 && (
					<div className="item-stat">Magic Resist: {item.magic_resist}</div>
				)}
				{item.mana > 0 && <div className="item-stat">Mana: {item.mana}</div>}
				{item.mana_regen > 0 && (
					<div className="item-stat">Mana Regen: {item.mana_regen}</div>
				)}
				{item.move_speed > 0 && (
					<div className="item-stat">Move Speed: {item.move_speed}</div>
				)}
				{item.omnivamp > 0 && (
					<div className="item-stat">Omnivamp: {item.omnivamp}</div>
				)}
				{item.tenacity > 0 && (
					<div className="item-stat">Tenacity: {item.tenacity}</div>
				)}
			</div>
		</div>
	);
};

export default ItemBody;
