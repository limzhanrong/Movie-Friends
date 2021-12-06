import React, {useState} from 'react';
import MediaDropDown from './MediaDropDown';
import { CardActionArea, CardContent, CardMedia, Typography, Card } from '@mui/material';
import { useHistory } from "react-router-dom"


export default function ActionAreaCard({movieObject}) {
  const [image, setImage] = useState()
  const [link, setLink] = useState("")
  const history = useHistory()
  
  React.useEffect(() => {
    setImage(`https://image.tmdb.org/t/p/w185/${movieObject.poster_path ? movieObject.poster_path: movieObject.profile_path}`)
    const str = `/${movieObject.media_type ? movieObject.media_type : 'movie'}/${movieObject.id}`
    setLink(str)
  }, [movieObject])


  const redirect = (link) => {
    history.push(link);
  }

  return (
    <Card className="media-card" key={movieObject.id} onClick={()=>redirect(link)} sx={{marginBottom:"5px"}}>
        <CardActionArea sx={{PointerEvent:"none"}}>
        <MediaDropDown sx={{position:"absolute", width:"100px", height:"100px"}}/>
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
            {
            movieObject.title || movieObject.original_name || movieObject.name
            }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}