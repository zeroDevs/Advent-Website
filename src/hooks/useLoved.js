import { useState, useEffect } from "react";

export default function useRecent() {
	const [loved, setLoved] = useState([]);

	useEffect(isMobile => {
		console.log(isMobile);
		async function callLovedApiEndpoint() {
			const qty = isMobile ? `?qty=3` : "";
			const response = await fetch(
				`https://aocbot.zerobot.xyz/solutions/top${qty}`
			);
			const data = await response.json();
			setLoved(data);
		}
		callLovedApiEndpoint();
	}, []);
	return loved;
}
