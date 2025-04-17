import { Query } from "../query";

const getItems = (): Promise<any[]> =>
	Query<any>(
		`
   SELECT * from loa_items;
    `
	);
const getItemTags = (): Promise<any[]> =>
	Query<any>(
		`
   SELECT 
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
