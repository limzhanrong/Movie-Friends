import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box } from '@mui/system';
import AddToWatchListModal from './AddToWatchListModal';
// const ITEM_HEIGHT = 48;


const MediaDropDown = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openModal, setOpenModal] = useState(false)
    const open = Boolean(anchorEl);

    const handleModalClose = (event) =>{
        event.stopPropagation();
        setOpenModal(false);
        setAnchorEl(null);
    }
    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    const handleAddButton = (event) => {
        event.stopPropagation();
        setOpenModal(true);
        setAnchorEl(null);
    };
    const handleClose = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
    }
  
    return (
      <Box sx={{position:"absolute", right:"0", margin:"0.5rem"}} onMouseDown={event => event.stopPropagation()}>
          <MoreHorizIcon
          sx={{color:"white"}}
          size="large"
          onClick={handleClick}
          />
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
            <MenuItem onClick={handleAddButton}>
              Add
            </MenuItem>
        </Menu>
        <AddToWatchListModal open={openModal} handleClose={handleModalClose}></AddToWatchListModal>
      </Box>
    );
}

export default MediaDropDown
