import { useState, useEffect } from "react";

export default function useUsers(year) {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		async function callUsersApiEndpoint() {
			if (year) {
				try {
					setUsers(require(`../data/${year}.data.json`).users);
				} catch (err) {
					// Do nothing, user is notified no data exists for this year
				}
			} else {
				const response = await fetch("https://aocbot.zerobot.xyz/users");
				const data = await response.json();
				setUsers(data);
			}
		}
		callUsersApiEndpoint();
	}, []);

	return users;
}
