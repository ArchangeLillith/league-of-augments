import { ItemType } from "../utils/types";

export const TooltipItemBody = ({ itemObj } : {itemObj: ItemType}) => {
	//Yes this is ugly but I want it to be hard coded like this so we can style things seperatley if we want to later 
	return (
		<div className="item-box-wrapper">
			{itemObj !== null && (
				<div>
					<div>{itemObj.name}</div>
					<div>{itemObj.tier}</div>
					{itemObj.ability_haste > 0 && (
						<div>Ability Haste: {itemObj.ability_haste}</div>
					)}
					{itemObj.ability_power > 0 && <div>AP: {itemObj.ability_power}</div>}
					{itemObj.adaptive_force > 0 && (
						<div>Adaptive Force: {itemObj.adaptive_force}</div>
					)}
					{itemObj.armour > 0 && <div>Armour: {itemObj.armour}</div>}
					{itemObj.armour_pen > 0 && (
						<div>Armour Pen: {itemObj.armour_pen}</div>
					)}
					{itemObj.attack_damage > 0 && (
						<div>Attack Damage: {itemObj.attack_damage}</div>
					)}
					{itemObj.attack_speed > 0 && (
						<div>Attack Speed: {itemObj.attack_speed}</div>
					)}
					{itemObj.crit_chance > 0 && (
						<div>Crit Chance: {itemObj.crit_chance}</div>
					)}
					{itemObj.crit_damage > 0 && (
						<div>Crit Damage: {itemObj.crit_damage}</div>
					)}
					{itemObj.heal_and_shield_power > 0 && (
						<div>Heal & Shield Power: {itemObj.heal_and_shield_power}</div>
					)}
					{itemObj.health > 0 && <div>Health: {itemObj.health}</div>}
					{itemObj.health_regen > 0 && (
						<div>Health Regen: {itemObj.health_regen}</div>
					)}
					{itemObj.lethality > 0 && <div>Lethality: {itemObj.lethality}</div>}
					{itemObj.lifesteal > 0 && <div>Lifesteal: {itemObj.lifesteal}</div>}
					{itemObj.magic_pen > 0 && <div>Magic Pen: {itemObj.magic_pen}</div>}
					{itemObj.magic_resist > 0 && (
						<div>Magic Resist: {itemObj.magic_resist}</div>
					)}
					{itemObj.mana > 0 && <div>Mana: {itemObj.mana}</div>}
					{itemObj.mana_regen > 0 && (
						<div>Mana Regen: {itemObj.mana_regen}</div>
					)}
					{itemObj.move_speed > 0 && (
						<div>Move Speed: {itemObj.move_speed}</div>
					)}
					{itemObj.omnivamp > 0 && <div>Omnivamp: {itemObj.omnivamp}</div>}
					{itemObj.tenacity > 0 && <div>Tenacity: {itemObj.tenacity}</div>}
				</div>
			)}
		</div>
	);
};
