import {MovieDetail} from "../App";
import {Box, Card, CardContent, CardMedia, Link, Typography} from "@mui/material";
import React from "react";

function MovieCard(movie: MovieDetail) {

    return <>
        <Card
            sx={{
                display: 'flex', marginBottom: '20px', minWidth: '33%',
                maxHeight: '150px'
            }}>
            <CardMedia
                component="img"
                sx={{width: 120}}
                image={movie.Poster !== "N/A" ? movie.Poster : 'https://travelpedia.com.br/wp-content/uploads/2018/02/cinema-icon.png'}
                alt="Movie Title"
            />
            <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                <CardContent sx={{flex: '1 0 auto'}}>
                    <Typography sx={{maxHeight:"1em"}} variant="h5">
                        {movie.Title}
                    </Typography>
                </CardContent>
                <Link target="_blank"
                      href={'https://www.imdb.com/title/' + movie.imdbID}>
                    <CardMedia
                        component="img"
                        sx={{width: 120, margin: "auto", padding: "20px"}}
                        image={'https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg'}
                        alt="IMDb"
                    />
                </Link>
            </Box>
        </Card>
    </>
}

export default MovieCard;