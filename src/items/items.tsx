import { useEffect, useRef, useState } from "react";
import { fetchItems } from "../services/items";
import { ETagNames, ItemType } from "../utils/types";
import { fetchTags } from "../services/fetchTags";
import ItemCard from "./ItemCard";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const ItemPage = () => {
	//Two states that hold data we only set once
	const [items, setItems] = useState<ItemType[]>([]);
	const [itemMap, setItemMap] = useState<
		Partial<Record<ETagNames, ItemType[]>>
	>({});
	const [tags, setTags] = useState<{ tag_id: number; tag_name: ETagNames }[]>(
		[]
	);
	//The state that holds the tags we're filtering by
	const [filters, setFilters] = useState<Set<ETagNames>>(new Set());
	//The state that holds our filtered items
	const [filteredItems, setFilteredItems] = useState<ItemType[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		const setup = async () => {
			const items = await fetchItems(true);
			const tags = await fetchTags();
			makeMap(items);
			setItems(items);
			setTags(tags);
		};
		setup();
	}, []);

	useEffect(() => {
		const newFiltered: ItemType[] = [];
		for (let filter of filters) {
			itemMap[filter]?.map((item) => newFiltered.push(item));
		}
		setFilteredItems(newFiltered);
		// Watches the filters to ensure we refilter on change
	}, [filters]);

	const makeMap = (items: ItemType[]) => {
		const newMap: Partial<Record<ETagNames, ItemType[]>> = {};
		for (let item of items) {
			for (let tag of item.tags) {
				if (!newMap[tag]) {
					newMap[tag] = [];
				}
				newMap[tag].push(item);
			}
		}
		setItemMap(newMap);
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
				<button
					className="gold-button champ-page"
					onClick={() => navigate("/home")}
				>
					<FaHome className="btn-icon" />
				</button>
				<div className="tag-box">
					{tags.map((tag) => (
						<button
							onClick={tagToggle}
							key={tag.tag_id}
							className={
								filters.has(tag.tag_name)
									? "tag-button selected-tag"
									: "tag-button"
							}
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
