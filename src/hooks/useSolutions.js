import { useState, useEffect } from "react";

export default function useSolutions(year) {
	const [solutions, setSolutions] = useState([]);

	useEffect(() => {
		const y = year;
		async function callSolutionsApiEndpoint() {
			if (y) {
				try {
					const response = await fetch(
						`https://aocbot.zerobot.app/archive/${y}`
					);
					const data = await response.json();
					if (y === 2018) setSolutions(data.solutions);
					else setSolutions(data);
				} catch (err) {
					// Do nothing, user is notified no data exists for this year
				}
			} else {
				const response = await fetch("https://aocbot.zerobot.app/solutions");
				const data = await response.json();
				setSolutions(data);
			}
		}
		callSolutionsApiEndpoint();
	}, [year]);

	return solutions;
}
