import { useState, useEffect } from "react";

export default function useRecent() {
	const [loved, setLoved] = useState([]);

	useEffect(() => {
		async function callLovedApiEndpoint() {
			const width = window.innerWidth < 600;
			const qty = width ? 3 : 6;
			const response = await fetch(
				`https://aocbot.zerobot.app/solutions/top?qty=${qty}`
			);
			const data = await response.json();
			setLoved(data);
		}
		callLovedApiEndpoint();
	}, []);
	return loved;
}
