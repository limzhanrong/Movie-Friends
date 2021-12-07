import React, {useState} from 'react'
import { Modal, Box, Typography, MenuItem , Divider, IconButton, 
  FormGroup, FormControlLabel, Checkbox, List, TextField, Input,
  InputLabel, Button
} 
  from '@mui/material'
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { AuthContext, AddToWatchListModalContext } from '../global/StateContext';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  maxWidth: "70%",
  bgcolor: 'background.paper',
  border: '0px solid white',
  boxShadow: 24
};

const AddToWatchListModal = ({watchListModalState, handleClose}) => {
  let { useAuthState } = React.useContext(AuthContext);
  let { useUserWatchListState } = React.useContext(AddToWatchListModalContext);
    // eslint-disable-next-line
  const [userWatchLists, setUserWatchLists] = useUserWatchListState
  // eslint-disable-next-line
  const [auth, setAuth] = useAuthState
  const [showCreateWatchListForm, setShowCreateWatchListForm] = useState(false)
  console.log(watchListModalState)
  const closeAll = (()=>{
    handleClose()
    setShowCreateWatchListForm(false)
  })
  return (
      <Modal
      open={watchListModalState.open}
      onClose={closeAll}
      onMouseDown={event => event.stopPropagation()}
    >
    <Box sx={{...style}}>
    {auth ?
    <>
        <Box sx={{display:"flex",py:1, px:2, alignItems:"center", justifyContent:"space-between"}}>
          <Typography variant="subtitle1" component="p">
            Add to...
          </Typography>
          <IconButton disableFocusRipple={true} onClick={closeAll}>
            <CloseSharpIcon fontSize="small"/>
          </IconButton>
        </Box>
        
        <Divider/>

        <List
          sx={{
            width: '100%',
            position: 'relative',
            overflow: 'auto',
            '& ul': { padding: 0 },
          }}
        >
        {userWatchLists.map(option=>{
          return (
            <form onSubmit={e=>alert(e)}>
            <FormGroup key={option}>
            <MenuItem  selected={option==="hi"} onClick={(e)=>{e.stopPropagation()}}>
              <FormControlLabel control={<Checkbox defaultChecked />} label={option} sx={{width:"100%"}} />
            </MenuItem>
            </FormGroup>
            </form>
          )})}
          </List>

        <Divider/>
          {
            showCreateWatchListForm ? 
            (
              <FormGroup sx={{mx:"20px", my:"20px",display:"flex", justifyContent:"flex-end"}}>
                <InputLabel shrink>Name</InputLabel>
                <Input placeholder="Enter watchlist name..." />
                <InputLabel shrink sx={{marginTop:3}}>Description</InputLabel>
                <TextField
                  multiline
                  rows={3}
                  variant="standard"
                  placeholder="Enter watchlist description..."
                />
                <Box sx={{mt:1,mb:-1,display:"flex", justifyContent:"flex-end"}}>
                <Button sx={{width:"50%"}} variant="text">Create</Button>
                </Box>
              </FormGroup>

            )
            :(
              <MenuItem 
              sx={{display:"flex",py:1, px:2, alignItems:"center", backGroundColor:'transparent'}}
              onClick={(e)=>{
                e.stopPropagation()
                setShowCreateWatchListForm(true)
              }}
              >
                <IconButton disableFocusRipple={true}>
                  <AddSharpIcon fontSize="small"/>
                </IconButton>
                <Typography variant="subtitle1" component="p">
                    Create new watchlist
                </Typography>
              </MenuItem>
            )
          }
              
      </>
        :
        <>
          <Typography>To create a watchlist, login or register</Typography>
        </>
        }
       </Box> 
    </Modal>
  )
}

export default AddToWatchListModal





  