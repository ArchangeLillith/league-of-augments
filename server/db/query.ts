import mysql, { ResultSetHeader } from 'mysql2';

import pool from './pool';
import metadataPool from './poolMetadata';

export const Query = async <T = mysql.RowDataPacket>(
	sql: string,
	values?: any
): Promise<T> => {
	const [results] = await pool.execute(sql, values);
	return results as T;
};

export const QueryMetadata = async (
	sql: string,
	values: any[] = [] // Default to empty array if no values provided
): Promise<ResultSetHeader> => {
	// Ensure values is an array
	if (!Array.isArray(values)) {
		throw new Error('Values must be an array.');
	}

	// Execute the query
	const [results] = await metadataPool.execute(sql, values);

	// Check if results is a ResultSetHeader
	if ('affectedRows' in results) {
		return results as ResultSetHeader;
	}
	throw new Error('Unexpected result type from query.');
};
