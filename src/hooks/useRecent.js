import { useState, useEffect } from "react";

export default function useRecent() {
	const [recent, setRecent] = useState([]);

	useEffect(() => {
		async function callRecentApiEndpoint() {
			const width = window.innerWidth < 600;
			const qty = width ? 3 : 6;
			window.addEventListener("resize", abc);
			const response = await fetch(`https://aocbot.zerobot.xyz/solutions/recent?qty=${qty}`);
			const data = await response.json();
			setRecent(data);
		}
		callRecentApiEndpoint();
	}, []);
	return recent;
}
