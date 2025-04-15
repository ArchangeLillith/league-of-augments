import { useState, useEffect } from "react";

const AugmentAlchemy = () => {
	const [data, setData] = useState<any[] | undefined>([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getData();
			setData(data); // Set the fetched data
		};

		fetchData();
	}, []);

	const getData = async () => {
		try {
			const res = await fetch(`/api/items/tags`);
			if (!res.ok) throw new Error("Failed to fetch tags");

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
							<div key={item.item_id} style={{ marginBottom: "20px" }}>
								<img src={item.url} />
								<h3>{item.item_name}</h3>
								<p>
									<strong>Item ID:</strong> {item.item_id}
								</p>
								<p>
									<strong>Tags:</strong>
								</p>
								<ul>
									{item.tags.split(",").map((tag: string, index: number) => (
										<li key={index}>{tag}</li>
									))}
								</ul>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default AugmentAlchemy;
