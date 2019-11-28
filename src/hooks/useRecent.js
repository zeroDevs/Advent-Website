import { useState, useEffect } from "react";

export default function useRecent() {
	const [recent, setRecent] = useState([]);

	useEffect(() => {
		async function callRecentApiEndpoint() {
			const response = await fetch(
				"https://aocbot.zerobot.xyz/solutions/recent"
			);
			const data = await response.json();
			setRecent(data);
		}
		callRecentApiEndpoint();
	}, []);
	console.log(recent);
	return recent;
}
