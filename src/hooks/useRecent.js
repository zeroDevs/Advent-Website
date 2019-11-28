import { useState, useEffect } from "react";

export default function useRecent() {
	const [recent, setRecent] = useState([]);

	useEffect(isMobile => {
		async function callRecentApiEndpoint() {
			const qty = isMobile ? "?qty=3" : "";
			const response = await fetch(
				`https://aocbot.zerobot.xyz/solutions/recent${qty}`
			);
			const data = await response.json();
			setRecent(data);
		}
		callRecentApiEndpoint();
	}, []);
	return recent;
}
