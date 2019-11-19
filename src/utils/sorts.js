export function sortByName(dataSet = [], order = "asc") {
	try {
		const mutableCopy = [...dataSet];
		order = typeof order === "string" ? order.toLowerCase() : order;
		return mutableCopy.sort((a, b) => {
			if (order === "asc" || order === 1) {
				return a.userName.toLowerCase() > b.userName.toLowerCase() ? 1 : -1;
			} else if (order === "desc" || order === -1) {
				return a.userName.toLowerCase() > b.userName.toLowerCase() ? -1 : 1;
			} else {
				throw new Error("Not a valid order option");
			}
		});
	} catch (error) {
		console.log(`There was an error while trying to sort: ${error}`);
		return dataSet;
	}
}

export function sortByDate(dataSet, order = "asc") {
	try {
		const mutableCopy = [...dataSet];
		order = typeof order === "string" ? order.toLowerCase() : order;
		return mutableCopy.sort((a, b) => {
			const dateA = a.Time.split("T")[0];
			const dateB = b.Time.split("T")[0];
			if (order === "asc" || order === 1) {
				return dateA > dateB ? 1 : -1;
			} else if (order === "desc" || order === -1) {
				return dateA > dateB ? -1 : 1;
			} else {
				throw new Error("Not a valid order option");
			}
		});
	} catch (error) {
		console.log(`There was an error while trying to sort: ${error}`);
		return dataSet;
	}
}

export function filterByLanguage(selectedLanguages, dataSet) {
	try {
		return dataSet.filter(data => selectedLanguages.includes(data.langName));
	} catch (error) {
		console.log(`There was an error while trying to filter: ${error}`);
		return dataSet;
	}
}

export function filterByDates(from, to, dataSet) {
	try {
		const parsedFrom = parseInt(from);
		const parsedTo = parseInt(to);
		return dataSet.filter(data => {
			const parsedDay = parseInt(data.dayNumber);
			return parsedDay >= parsedFrom && parsedDay <= parsedTo;
		});
	} catch (error) {
		console.log(`There was an error while trying to filter: ${error}`);
		return dataSet;
	}
}
