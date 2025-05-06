import { useEffect, useRef, useState } from "react";
import { fetchItems } from "../services/items";
import ItemIcon from "../componenets/ItemIcon";
import { ETagNames, ItemType } from "../utils/types";

const ItemPage = () => {
	//Two states that hold data we only set once
	const [items, setItems] = useState<ItemType[]>([]);
	const [tags, setTags] = useState<ItemType[]>([]);
	//The state that holds the tags we're filtering by
	const [filters, setFilters] = useState<Set<ETagNames>>();
	//The state that holds our filtered items
	const [filteredItems, setFilteredItems] = useState<ItemType[]>([]);
	const timeoutRef = useRef<number | null>(null);

	useEffect(() => {
		const setup = async () => {
			const items = await fetchItems(true, true);
			const tags = await fetchItems(true, true);
			setItems(items);
			setTags(tags);
		};
		setup();
	}, []);

	useEffect(() => {
		//Debounce for like .5 sec

		//We remove the current timeout if there is one
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			// The call that we're debouncing
			const newFiltered = filterItems();
			setFilteredItems(newFiltered);
		}, 500); // The timing handler for the debouncer

		// Cleanup the timeout
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
		//Watches the filters to ensure we refilter on change
	}, [filters]);

	//Zach let's fix this it's ugly lol
	const filterItems = () => {
		let newFiltered = [];
		if (!filters) return items;
		for (let tag of filters) {
			for (let item of items) {
				if (item.tags.includes(tag)) {
					newFiltered.push(item);
				}
			}
		}
		return newFiltered;
	};
	const tagToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const tagName = e.currentTarget.value;

		if (filters?.has(tagName as ETagNames)) {
			filters.delete(tagName as ETagNames);
		} else {
			filters?.add(tagName as ETagNames);
		}
	};

	return (
		<div className="item-page">
			<div className="top-box">
				<div className="tag-toggle">
					{tags.map((tag) => (
						<button onClick={tagToggle} className={`${tag.name}`}>
							{tag.name}
						</button>
					))}
				</div>
				<button className="gold-button">Reset</button>
			</div>
			<div className="item-container">
				{items.map((item) => (
					<ItemIcon item={item} augment={null} itemPage={true} />
				))}
			</div>
		</div>
	);
};

export default ItemPage;
