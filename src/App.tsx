import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {Alert, Box, Container, Divider, MenuItem, Stack, TextField, Typography} from "@mui/material";
import MainAppBar from "./components/MainAppBar";
import {Search} from "@mui/icons-material";
import LoadingButton from '@mui/lab/LoadingButton';
import {searchMovie} from "./api";

import WorkerBuilder from './workers/worker-builder';
import Worker from './workers/group-movies-worker';
import MovieCard from "./components/MovieCard";

export interface MovieDetail {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string,
}

const SearchTypes = [
    {
        value: 'movie',
        label: 'Movie',
    },
    {
        value: 'series',
        label: 'Series',
    },
    {
        value: 'episode',
        label: 'Episode',
    }
];

function App() {

    const [title, setTitle] = useState("");
    const [type, setType] = useState(SearchTypes[0].value);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [moviesList, setMoviesList] = useState<{ [key: string]: MovieDetail[] }>({});

    /**
     * Initialize worker and start listening for messages
     */
    const sortMoviesWorker = new WorkerBuilder(Worker);
    sortMoviesWorker.onmessage = (message) => {
        if (message) {
            setMoviesList(message.data);
        }
        setIsSearching(false);
    };

    const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event?.target?.value;
        setError(false);
        setTitle(value);
    }

    const onTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event?.target?.value;
        setType(value);
    }

    /**
     * Search results
     */
    const searchMovies = () => {
        if (!title) {
            setError(true);
            return;
        }

        setErrorMessage("");
        setIsSearching(true);

        searchMovie(title, type).then((res) => {
            if (res.data.Error) {
                setErrorMessage(res.data.Error);
                setMoviesList({});
                setIsSearching(false);
                return;
            }
            sortMoviesWorker.postMessage(res.data.Search);
        });
    }

    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <MainAppBar/>
                <Container>
                    <Box>
                        <Typography sx={{marginTop: '20px', marginBottom: '15px'}} variant="h5" align={"center"}>
                            Find more about your favourite movies!
                        </Typography>

                        <Box sx={{
                            '& .MuiTextField-root': {m: 1, width: '25ch'},
                        }} component={'form'}>
                            <div>
                                <TextField sx={{marginBottom: '10px'}}
                                           error={error}

                                           onChange={onTitleChange} label="Title"
                                           id="movieTitle"/>
                                <TextField
                                    select
                                    label="Type"
                                    value={type}
                                    onChange={onTypeChange}
                                    sx={{width: "300px"}}
                                >
                                    {SearchTypes.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <LoadingButton sx={{marginBottom: '10px'}} startIcon={<Search/>} variant="outlined"
                                           color="primary"
                                           onClick={searchMovies}
                                           loading={isSearching} loadingIndicator={"Searching"}
                                           style={{textTransform: "none"}}>{`${isSearching ? "Searching" : "Search"}`}</LoadingButton>
                        </Box>
                    </Box>
                    <Divider/>
                    <Box>
                        <Typography sx={{marginTop: '20px'}} variant="h5">
                            Search Result
                        </Typography>
                        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                        {Object.keys(moviesList).map(key => {
                                return (<>
                                    <Divider textAlign="left">
                                        <Typography color={"primary"} sx={{marginBottom: '10px'}} variant="h5"
                                                    align={"left"}>{key}</Typography>
                                    </Divider>
                                    <Stack
                                        direction="row"
                                        divider={<Divider orientation="vertical" flexItem/>}
                                        spacing={2}
                                    >
                                        {
                                            moviesList[key].map(movie => <MovieCard {...movie} />)
                                        }
                                    </Stack>
                                </>)
                            }
                        )
                        }
                    </Box>
                </Container>
            </Box>
        </div>
    );
}

export default App;
