onmessage = (message) => {
	const movies = message.data;
	const orderedMovies = movies.sort((a, b) => b.Year - a.Year);
	const groupedMovies = orderedMovies.reduce(
		(hash, obj) => ({
			...hash,
			[obj.Year]: (hash[obj.Year] || []).concat(obj),
		}),
		{}
	);

	postMessage(groupedMovies);
};
