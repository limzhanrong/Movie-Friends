import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import serverAPI from '../APIs/serverAPI'
import { Box } from '@mui/system'
import { Typography, Link } from '@mui/material'
import FaceIcon from '@mui/icons-material/Face';
import Loading from '../components/Loading'

const ListSingle = () => {
    const { id }  = useParams()
    const[list, setList] = useState({})
    const[loading,setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        async function retrieve() {
            try{
                const response = await serverAPI.get(`/api/list/public/${id}`)
                setList(response.data)
                console.log(response.data)
            }catch(err){
                console.log(err)
            }
        }
        retrieve()
        setLoading(false)

    }, [id])
    return loading ? <Loading></Loading> : (
        <>
            <Box sx={{margin:"50px"}}>
                <Typography variant="h3">{list.list_name}</Typography>
                <Box sx={{display:"flex"}} onClick={()=>{}}>
                    <FaceIcon/>
                    <Link href="#" underline="hover">
                        <Typography variant="subtitle1">{list.username}'s watchlist count</Typography>
                    </Link>
                </Box>
                <Typography variant="body2">{list.description}</Typography>
            </Box>
        </>
        
    )
}

export default ListSingle

