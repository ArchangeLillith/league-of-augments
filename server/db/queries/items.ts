import { ItemsTable } from "../../utils/types";
import { Query } from "../query";

/**
 * Gets the entire item database
 * @returns an array of items
 */
const getItems = (): Promise<ItemsTable[]> =>
	Query<ItemsTable[]>(`SELECT * from loa_items;`);

/**
 * Returns all items, but also includes their associated tags
 * @returns all items and their tags
 */
const getItemTags = (): Promise<(ItemsTable & { tags: string })[]> =>
	Query<(ItemsTable & { tags: string })[]>(
		`SELECT 
      i.*,
    GROUP_CONCAT(t.tag_name ORDER BY t.tag_name ASC) AS tags
    FROM 
      loa_items i
    JOIN 
      loa_item_tags it ON i.item_id = it.item_id
    JOIN 
      loa_tags t ON it.tag_id = t.tag_id
    GROUP BY 
      i.item_id, i.name;
    `
	);

export default { getItems, getItemTags };
