import { useState, useEffect } from "react";

export default function useRecent() {
	const [recent, setRecent] = useState([]);

	useEffect(() => {
		async function callRecentApiEndpoint() {
			const response = await fetch(
				"https://aocbot.zerobot.xyz/solutions/recent?qty=3"
			);
			const data = await response.json();
			setRecent(data);
		}
		callRecentApiEndpoint();
	}, []);
	return recent;
}
