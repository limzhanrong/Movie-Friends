import React, {useState, useCallback} from 'react';
import MediaDropDown from './MediaDropDown';
import { CardActionArea, CardContent, CardMedia, Typography, Card } from '@mui/material';
import { useHistory } from "react-router-dom"
import serverAPI from '../APIs/serverAPI';

const MediaCardWatchlist = ({id, media_type, isOwner }) => {
    const [movieObject, setMovieObject] = useState({})
    const [image, setImage] = useState()
    const [link, setLink] = useState("")
    const history = useHistory()


    const fetchData = useCallback(
      async () => {
        try{
          const response = await serverAPI.get(`/api/tmdb/${media_type}/${id}`)
          const obj = response.data.results
          setMovieObject(obj)
          let str = "https://image.tmdb.org/t/p/w500/" + (obj?.poster_path ? obj.poster_path : obj.profile_path)
          setImage(str)
          str = `/${media_type ? media_type : 'movie'}/${id}`
          setLink(str)
        }catch(err){
            console.log(err)
        }
      },
      [id, media_type],
    )
    
    React.useEffect(() => {
      fetchData()
      
    }, [fetchData])
  
    const redirect = (link) => {
      history.push(link);
    }
  
    return (
      <Card className="media-card" key={movieObject.id} onClick={()=>redirect(link)} sx={{marginBottom:"5px"}}>
          <CardActionArea sx={{PointerEvent:"none"}}>
            {movieObject?.media_type !== "person" && 
            <MediaDropDown movieObject={movieObject} sx={{position:"absolute", width:"100px", height:"100px"}}/>}
          <CardMedia 
            sx={{minHeight:223}}
            className="media-image"
            component="img"
            height=""
            image={image}
            alt="Movie Image"
          />      
          <CardContent sx={{minHeight:80}}>
            {movieObject.vote_average}
            <Typography gutterBottom variant="subtitle2" component="div" fontSize="0.7rem">
              {movieObject.title || movieObject.original_name || movieObject.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
}

export default MediaCardWatchlist
