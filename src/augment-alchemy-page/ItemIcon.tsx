import TooltipWrapper from "../componenets/TooltipWrapper";
import { Augment, ItemType } from "../utils/types";
import { gemMap } from "./augmentAlchemy.utils";

interface ItemIconProps {
	item: ItemType;
	augment: Augment | null;
}

const ItemIcon: React.FC<ItemIconProps> = ({ item, augment }) => {
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
			<div className="sugg-item-frame">
				<TooltipWrapper item={true} itemObj={item} tooltipText={item.name}>
					<img src={item.url} className="sugg-item-img" />
				</TooltipWrapper>
			</div>
			<div className="item-gem-box">
				<>
					{matchingTags.map((tag: string) => (
						<>
							<div className={`settings ${gemMap[tag]}`}>
								{tag && (
									<div className={`tinted-gem ${tag.replace(/\s+/g, "-")}`}>
										<TooltipWrapper tooltipText={tag} gem={true}>
											<img
												src={`/gems/${gemMap[tag]}.png`}
												className={`base-gem ${gemMap[tag]}`}
											/>
										</TooltipWrapper>
									</div>
								)}
							</div>
						</>
					))}
				</>
			</div>
		</div>
	);
};

export default ItemIcon;
