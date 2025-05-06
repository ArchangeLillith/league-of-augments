import { Query } from "../query";
import { Augment } from "../../utils/types";

/**
 * Gets all augments from the database, not including their associated tags
 * @returns An Augment[] of all augments, tags NOT included
 */
const getAllAugs = async (): Promise<Augment[]> => {
	const augmentReturn: Augment[] = await Query(
		`SELECT
      * 
    FROM 
      loa_augments`
	);
	return augmentReturn;
};

/**
 * Gets all augments including tags associated with them
 * @returns An Augment[] that includes the associated tags as a string[]
 */
const getAllAugsWithTags = async (): Promise<Augment[]> => {
	const augmentReturn: Augment[] = await Query(
		`SELECT
      a.augment_id,
      a.name,
      a.description,
      a.tier,
      a.url,
    COALESCE(
      CONCAT('[', GROUP_CONCAT('"' , t.tag_name , '"' ORDER BY at.weight ASC), ']'),
      JSON_ARRAY()
    ) 
    AS tags
    FROM 
      loa_augments a
    LEFT JOIN 
      loa_augment_tags at ON a.augment_id = at.augment_id
    LEFT JOIN 
      loa_tags t ON at.tag_id = t.tag_id
    GROUP BY
      a.augment_id;
		`
	);
	return augmentReturn;
};

export default { getAllAugs, getAllAugsWithTags };
