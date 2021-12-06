import React from 'react'
import MovieSlider from '../components/MovieSlider';
import TrendingSection from '../components/TrendingSection';
import {Button} from '@mui/material';

const Home = () => {
    return (
        <div>
            <div className="media-card-container">
                <h1 className="media-title">Popular Movies</h1>
                <MovieSlider endPoint="api/tmdb/popular/1">Popular</MovieSlider>
            </div>
            <TrendingSection></TrendingSection>
            <Button variant="contained">Button</Button>
        </div>
    )
}

export default Home
