import { Query } from "../query";
import { Augment } from "../../utils/types";

const getAugs = async (
	champ_name: string,
	user_id: number
): Promise<Augment[]> => {
	console.log(`GET augs query`);
	const sanitizedValues = [champ_name, user_id];
	const augmentReturn: Augment[] = await Query(
		/* sql */ `SELECT
  a.*
FROM
  loa_champ_augments ca
  JOIN loa_champs c ON ca.champ_id = c.id
  JOIN loa_users u ON c.user_id = u.id
  JOIN loa_augments a ON ca.augment_id = a.id
WHERE
  c.champion_name = ? AND u.id = ?`,
		sanitizedValues
	);
	console.log(`aug return`, augmentReturn);
	return augmentReturn;
};

const getAllAugs = async (): Promise<Augment[]> => {
	const augmentReturn: Augment[] = await Query(/* sql */ `SELECT
  * FROM loa_augments`);
	return augmentReturn;
};

const getAllAugsWithTags = async (): Promise<Augment[]> => {
	const augmentReturn: Augment[] = await Query(/* sql */ `
SELECT
  a.augment_id,
  a.name,
  a.description,
  a.tier,
  a.url,
  COALESCE(JSON_ARRAYAGG(t.tag_name ORDER BY at.weight DESC), JSON_ARRAY()) AS tags
FROM loa_augments a
LEFT JOIN loa_augment_tags at ON a.augment_id = at.augment_id
LEFT JOIN loa_tags t ON at.tag_id = t.tag_id
GROUP BY a.augment_id;
		`);
	return augmentReturn;
};

export default { getAugs, getAllAugs, getAllAugsWithTags };
