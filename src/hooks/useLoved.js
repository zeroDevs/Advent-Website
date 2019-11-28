import { useState, useEffect } from "react";

export default function useRecent() {
	const [loved, setLoved] = useState([]);

	useEffect(() => {
		async function callLovedApiEndpoint() {
			const response = await fetch("https://aocbot.zerobot.xyz/solutions/top");
			const data = await response.json();
			setLoved(data);
		}
		callLovedApiEndpoint();
	}, []);
	return loved;
}
