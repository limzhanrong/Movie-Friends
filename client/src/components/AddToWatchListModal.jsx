import React from 'react'
import { Modal, Box, Typography, Menu, MenuItem , Divider, IconButton, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
// import ButtonUnstyled from '@mui/base/ButtonUnstyled';


const AddToWatchListModal = ({open, handleClose}) => {
    const options = [
        'None',
        'Atria',
        'Callisto',
        'Dione',

      ];
    return (
        <Modal
        open={open}
        onClose={handleClose}
        onMouseDown={event => event.stopPropagation()}
      >
        <Box sx={{...style}}>
          <Box sx={{display:"flex",py:1, px:2, alignItems:"center", justifyContent:"space-between"}} onClick={(e)=>{
            e.stopPropagation()}}>
              <Typography variant="subtitle1" component="p">
                  Add to...
              </Typography>
              <IconButton disableFocusRipple={true} onClick={handleClose}>
                <CloseSharpIcon fontSize="small"/>
              </IconButton>
          </Box>
          
          <Divider/>
          {options.map(option=>{
            return (
              <FormGroup key={option}>
              <MenuItem  selected={option==="hi"} onClick={
                (e)=>{e.stopPropagation()}}>
                  <FormControlLabel control={<Checkbox defaultChecked />} label={option} />
              </MenuItem>
              </FormGroup>
            )})}
        </Box>
      </Modal>
    )
}

export default AddToWatchListModal


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 260,
    maxWidth: "70%",
    bgcolor: 'background.paper',
    border: '0px solid white',
    boxShadow: 24
  };
  