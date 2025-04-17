import { Augment, ItemType } from "../utils/types";

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
			<img src={item.url} />
			<div className="item-bubble-box">
				<>
					{matchingTags.map((tag: string) => (
						<div className={`${tag.replace(/\s+/g, "-")}`}></div>
					))}
				</>
			</div>
		</div>
	);
};

export default ItemIcon;
