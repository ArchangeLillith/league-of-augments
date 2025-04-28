import storage from "../utils/storage";

//This screws your prod, make sure you have the prod info here lol
const makeFetch = async (url: string, info: RequestInit) => {
	const response = await fetch(url, info);

	if (!response.ok) {
		const errorData = await response.json();
		console.error(`ERROR`, errorData);
		if (response.status === 403) {
			alert(`${errorData.message}`);
		}
		throw new Error(errorData.message || "Something went wrong");
	}
	return response;
};

/**
 *
 * @param url - the target backend url for this request
 * @param method - get/put/post/delete as a string
 * @param body - the request body, deleted here if there is one and it's a GET
 * The base of our routing from the frontend, handles all the requests to the backend.
 * @returns whatever we expect from the backend or an error if something went wrong
 */
const json = async (url: string, method: string, body: object = {}) => {
	const TOKEN = storage.getToken();
	const headers: HeadersInit = {
		"Content-Type": "application/json",
	};

	//If there's a token in storage, then we add it here to show that the user is either authorized by the token or is spoofing the token which will casue an error on the backend if so.
	if (TOKEN) {
		headers["Authorization"] = `Bearer ${TOKEN}`;
	}

	const data: RequestInit = {
		method,
		headers,
		body: method !== "GET" ? JSON.stringify(body) : undefined,
	};

	const fetchResponse = await makeFetch(url, data);
	return await fetchResponse.json();
};
/**
 * Catchers for the different types of requests, formatting the data and passing into out base json function what it needs to understand what type of request we want.
 * @param url - the target backend url for the request
 * @returns whatever we expect from the backend or an error if one was thrown
 */
const get = (url: string) => {
	return json(url, "GET");
};
const post = (url: string, payload: object) => {
	return json(url, "POST", payload);
};
const put = (url: string, payload: object) => {
	return json(url, "PUT", payload);
};
const destroy = (url: string) => {
	return json(url, "DELETE");
};

export default {
	get,
	post,
	put,
	destroy,
};
