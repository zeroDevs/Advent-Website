import { useState, useEffect } from "react";

export default function useSolutions(year) {
	const [solutions, setSolutions] = useState([]);

	useEffect(() => {
		const y = year;
		async function callSolutionsApiEndpoint() {
			if (y) {
				try {
					setSolutions(require(`../data/${y}.data.json`).solutions);
				} catch (err) {
					// Do nothing, user is notified no data exists for this year
				}
			} else {
				const response = await fetch("https://aocbot.zerobot.xyz/solutions");
				const data = await response.json();
				setSolutions(data);
			}
		}
		callSolutionsApiEndpoint();
	}, [year]);

	return solutions;
}
