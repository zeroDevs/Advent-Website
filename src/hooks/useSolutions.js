import { useState, useEffect } from "react";

export default function useSolutions(year) {
	const [solutions, setSolutions] = useState([]);

	useEffect(() => {
		async function callSolutionsApiEndpoint() {
			if (year) setSolutions(require(`../data/${year}.data.json`).solutions);
			else {
				const response = await fetch("https://aocbot.zerobot.xyz/solutions");
				const data = await response.json();
				setSolutions(data);
			}
		}
		callSolutionsApiEndpoint();
	}, []);

	return solutions;
}
