import { useState, useEffect } from "react";

export default function useSolutions() {
	const [solutions, setSolutions] = useState([]);

	useEffect(() => {
		async function callSolutionsApiEndpoint() {
			const response = await fetch("https://aocbot.zerobot.xyz/solutions");
			const data = await response.json();
			setSolutions(data);
		}
		callSolutionsApiEndpoint();
	}, []);

	return solutions;
}
