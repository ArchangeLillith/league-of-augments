import { Query } from "../query";

const getTags = (): Promise<any[]> =>
	Query<any>(
		`
   SELECT * from loa_tags;
    `
	);

export default { getTags };
