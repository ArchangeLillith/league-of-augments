import { Query } from "../query";

const getItems = (): Promise<any[]> =>
	Query<any>(
		`
   SELECT * from loa_items;
    `
	);

export default { getItems };
