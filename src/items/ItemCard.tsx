import TooltipWrapper from "../componenets/TooltipWrapper";
import { gemMap, ETagNames, ItemType } from "../utils/types";
import ItemBody from "./ItemBody";

interface ItemCardProps {
	item: ItemType;
}

const ItemCard = ({ item }: ItemCardProps) => {
	//Renders the gem so we don't bog down our actual return, haha
	const renderGem = (tag: string) => (
		<div className={`settings ${gemMap[tag as ETagNames]}`} key={tag}>
			<div className={`tinted-gem ${tag.replace(/\s+/g, "-")}`}>
				<img
					src={`/gems/${gemMap[tag as ETagNames]}.png`}
					className={`base-gem ${gemMap[tag as ETagNames]}`}
				/>
			</div>
		</div>
	);

	return (
    <div className="item-card-background">
		<div className="item-card">
			<div className="item-card-frame">
				<img src={item.url} className="item-img" />
			</div>
			{item !== null && <ItemBody item={item} />}
			<div className="item-gem-box">{item.tags.map(renderGem)}</div>
		</div></div>
	);
};

export default ItemCard;
