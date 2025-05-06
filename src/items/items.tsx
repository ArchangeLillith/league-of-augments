import { useEffect, useRef, useState } from "react";
import { fetchItems } from "../services/items";
import ItemIcon from "../componenets/ItemIcon";
import { ETagNames, ItemType } from "../utils/types";
import { fetchTags } from "../services/fetchTags";

const ItemPage = () => {
	//Two states that hold data we only set once
	const [items, setItems] = useState<ItemType[]>([]);
	const [tags, setTags] = useState<{ tag_id: number; tag_name: ETagNames }[]>(
		[]
	);
	//The state that holds the tags we're filtering by
	const [filters, setFilters] = useState<Set<ETagNames>>(new Set());
	//The state that holds our filtered items
	const [filteredItems, setFilteredItems] = useState<ItemType[]>([]);
	const timeoutRef = useRef<number | null>(null);

	useEffect(() => {
		const setup = async () => {
			const items = await fetchItems(true);
			const tags = await fetchTags();
			console.log(`Tags`, tags);
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
		let newFilters = filters;
		const tagName = e.currentTarget.value;
		console.log(e.currentTarget.value);
		if (newFilters.has(tagName as ETagNames)) {
			newFilters.delete(tagName as ETagNames);
		} else {
			newFilters.add(tagName as ETagNames);
		}
		console.log(`oldFilters`, filters);
		console.log(`newFilters`, newFilters);
		setFilters(newFilters);
	};

	return (
		<div className="item-page">
			<div className="top-box">
				<div className="tag-toggle">
					{tags.map((tag) => (
						<button
							onClick={tagToggle}
							key={tag.tag_id}
							className={`${tag.tag_name}`}
							value={tag.tag_name}
						>
							{tag.tag_name}
						</button>
					))}
				</div>
				<button className="gold-button">Reset</button>
			</div>
			{filters ? (
				<>
					{filteredItems.map((item) => (
						<ItemIcon item={item} augment={null} itemPage={true} />
					))}
				</>
			) : (
				<>
					{items.map((item) => (
						<ItemIcon item={item} augment={null} itemPage={true} />
					))}
				</>
			)}
			<div className="item-container"></div>
		</div>
	);
};

export default ItemPage;
