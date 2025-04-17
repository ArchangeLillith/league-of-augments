import { ItemType } from "../utils/types";

interface ItemIconProps {
	item: ItemType;
}

const ItemIcon: React.FC<ItemIconProps> = ({ item }) => {
	return (
		<div className="suggested-item">
			<img src={item.url} />
			<div className="item-bubble-box">
				<>
					{item.tags.map((tag: string) => (
						<div className={`${tag.replace(/\s+/g, "-")}`}></div>
					))}
				</>
			</div>
		</div>
	);
};

export default ItemIcon;
