import { TagTable } from "../../utils/types";
import { Query } from "../query";

/**
 * Gets all tags from the database, their name and id
 * @returns All tags from the db
 */
const getTags = (): Promise<TagTable[]> =>
	Query<TagTable[]>(`SELECT * from loa_tags;`);

export default { getTags };
