import { gemMap } from "../utils/constants";
import { ETagNames } from "../utils/enums";
import { ItemIconProps } from "../utils/interfaces";
import TooltipWrapper from "./TooltipWrapper";

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
			item.tags?.filter((tag) => augment?.tags?.includes(tag)) || [];

	//Renders the gem so we don't bog down our actual return, haha
	const renderGem = (tag: string) => (
		<div className={`settings ${gemMap[tag as ETagNames]}`} key={tag}>
			<div className={`tinted-gem ${tag.replace(/\s+/g, "-")}`}>
				<TooltipWrapper tooltipText={tag} gem={true}>
					<img
						src={`/gems/${gemMap[tag as ETagNames]}.png`}
						className={`base-gem ${gemMap[tag as ETagNames]}`}
					/>
				</TooltipWrapper>
			</div>
		</div>
	);

	//Our full return, utalizing the above html render so it's not super bulky
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
