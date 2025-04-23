import TooltipWrapper from "./TooltipWrapper";
import { Augment, ItemType } from "../utils/types";
import { gemMap } from "../augment-alchemy-page/augmentAlchemy.utils";

interface ItemIconProps {
	item: ItemType;
	augment: Augment | null;
	itemPage: boolean;
}

const ItemIcon: React.FC<ItemIconProps> = ({
	item,
	augment,
	itemPage = false,
}) => {
	if (!item.name) return null;

	// Determine which tags to display
	const displayTags = itemPage
		? //If we're in the item page, we don't need to filter, we just show all the item tags
		  item.tags || []
		: //Otherwise, we only allow the tags that are a match to the augment tags!
		  //Then we flip it with the reverse to show the most important tags first like the items
		  item.tags?.filter((tag) => augment?.tags?.includes(tag)).reverse() || [];

	//Renders the gem so we don't bog down our actual return, haha
	const renderGem = (tag: string) => (
		<div className={`settings ${gemMap[tag]}`} key={tag}>
			<div className={`tinted-gem ${tag.replace(/\s+/g, "-")}`}>
				<TooltipWrapper tooltipText={tag} gem={true}>
					<img
						src={`/gems/${gemMap[tag]}.png`}
						className={`base-gem ${gemMap[tag]}`}
					/>
				</TooltipWrapper>
			</div>
		</div>
	);

	return (
		<div className="suggested-item">
			<div className="sugg-item-frame">
				<TooltipWrapper item={true} itemObj={item} tooltipText={item.name}>
					<img src={item.url} className="sugg-item-img" />
				</TooltipWrapper>
			</div>
			<div className="item-gem-box">{displayTags.map(renderGem)}</div>
		</div>
	);
};

export default ItemIcon;
