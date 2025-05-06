import { useEffect, useRef, useState } from "react";
import { fetchItems } from "../services/items";
import { ETagNames, ItemType } from "../utils/types";
import { fetchTags } from "../services/fetchTags";
import ItemCard from "./ItemCard";

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
			const items = await fetchItems(true, true);
			const tags = await fetchTags(true);
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
		// Watches the filters to ensure we refilter on change
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
			setFilters((prev) => {
				const newSet = new Set(prev);
				newSet.delete(tagName as ETagNames);
				return newSet;
			});
		} else {
			setFilters((prev) => new Set(prev).add(tagName as ETagNames));
		}
	};

	return (
		<div className="item-page">
			<h3 className="items-title">Item Search</h3>
			<div className="top-box">
				<button>Home</button>
				<div className="tag-box">
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
				<button onClick={() => setFilters(new Set())} className="gold-button">
					Reset
				</button>
			</div>
			<div className="item-container">
				{filters.size > 0 ? (
					<>
						{filteredItems.map((item) => (
							<ItemCard item={item} />
						))}
					</>
				) : (
					<>
						{items.map((item) => (
							<ItemCard item={item} />
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default ItemPage;
