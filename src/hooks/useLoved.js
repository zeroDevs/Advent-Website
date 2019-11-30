import { useState, useEffect } from "react";

export default function useRecent() {
	const [loved, setLoved] = useState([]);

	useEffect(() => {
		async function callLovedApiEndpoint() {
			let qty;
			if(window.matchMedia(`(max-width:600px)`)) {
				qty = 3;
			} else {
				qty = 6;
			}
			const response = await fetch(`https://aocbot.zerobot.xyz/solutions/top?qty=${qty}`);
			const data = await response.json();
			setLoved(data);
		}
		callLovedApiEndpoint();
	}, []);
	return loved;
}
