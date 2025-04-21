import { useEffect, useState } from "react";
import { fetchItems } from "../services/items";
import ItemIcon from "../componenets/ItemIcon";
import { ItemType } from "../utils/types";

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
		<>
			{items.map((item) => (
				<ItemIcon item={item} augment={null} itemPage={true} />
			))}
		</>
	);
};

export default ItemPage;
