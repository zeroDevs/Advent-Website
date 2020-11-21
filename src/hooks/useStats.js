import { useState, useEffect, useCallback } from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
	const [isLoading, setIsLoading] = useState(false);
	const [stats, setStats] = useState({
		// todaysSolutions: 34135,
		// totalSolutions: 18944,
		// totalUsers: 123
	});

	const updateStats = useCallback(async () => {
		setIsLoading(true);
		const data = await fetch("https://aocbot.zerobot.xyz/stats");
		setStats(await data.json());
		setIsLoading(false);
	}, []);

	useEffect(() => {
		updateStats();
	}, [updateStats]);

	return { isLoading, stats, updateStats };
};
