import { useEffect, useState } from "react";

const AugmentAlchemy = () => {
	const [data, setData] = useState<any[]>();

	useEffect(() => {
		const fetchData = async () => {
			const data = await getData(); // Await the result here
			setData(data); // Now this will be the resolved value
		};

		fetchData(); // Call the fetch function
	}, []);

	const getData = async () => {
		try {
			const res = await fetch(`/api/items/tags`);
			if (!res.ok) throw new Error("Failed to fetch tags");
			console.log(res);
			const data = await res.json();
			return data;
		} catch (error) {
			console.error("Something went wrong fetching the tags :(", error);
			return [];
		}
	};

	return (
		<div>
			<h1>Augment Alchemy</h1>
			<div>
				{data && (
					<div>
						{data.map((item) => (
							<div>{JSON.stringify(item)}</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default AugmentAlchemy;
