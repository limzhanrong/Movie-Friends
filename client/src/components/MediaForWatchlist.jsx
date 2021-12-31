import React from 'react'
import {Grid, Box} from '@mui/material'
import MediaCardWatchlist from './MediaCardWatchlist'


const MediaForWatchlist = ({ mediaList, isOwner, page, numberOfMediaPerPage }) => {
    console.log("mediaList", mediaList)
    // const { useAuthState, fetchUserInfo} = useContext(AuthContext)
    // const [isOwner, setIsOwner] = useState(false)
    const start = (page - 1) * numberOfMediaPerPage
    const end = Math.min(start + numberOfMediaPerPage, mediaList.length)
    const slicedMediaList = mediaList.slice(start, end)
    return (
        <Box>
            <Grid container spacing={{ xs: 1, md: 1 }}>
            {slicedMediaList.map((ele) => {
                return (
                <Grid item xs={12} sm={6} md={4} lg={2} key={ele.film_id}>
                    <MediaCardWatchlist id={ele.film_id} media_type={ele.film_type} isOwner={isOwner}></MediaCardWatchlist>
                </Grid>)
            })}
            </Grid>
        </Box>
    )
}

export default MediaForWatchlist
