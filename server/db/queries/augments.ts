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

export default { getAugs, getAllAugs };
