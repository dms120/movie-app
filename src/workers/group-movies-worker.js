//group-movies-worker.js
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    // eslint-disable-next-line no-restricted-globals
    self.onmessage = (message) => {
        const movies = message.data;
        const orderedMovies = movies.sort((a, b) => b.Year - a.Year);
        console.log(orderedMovies)
        const groupedMovies = orderedMovies.reduce((hash, obj) => ({
            ...hash,
            [obj.Year]: (hash[obj.Year] || []).concat(obj)
        }), {});

        postMessage(groupedMovies);
    };
};