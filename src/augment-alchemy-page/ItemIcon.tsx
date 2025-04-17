import { ItemType } from "../utils/types";

interface ItemIconProps {
	item: ItemType;
}

const ItemIcon: React.FC<ItemIconProps> = ({ item }) => {
	return (
		<div className="suggested-item">
			<img src={item.url} />
		</div>
	);
};

export default ItemIcon;
