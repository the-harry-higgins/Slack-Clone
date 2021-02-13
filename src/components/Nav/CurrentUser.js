import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';
import { logout } from '../../store/actions/authentication';


const CurrentUser = ({ currentuser, logout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!currentuser.displayName) return null;

  return (
    <div>
      <IconButton onClick={handleClick} color="inherit" >
        <Avatar alt={currentuser.displayName} >
          {currentuser.displayName[0].toUpperCase()}
        </Avatar>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem disabled >{currentuser.displayName}</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>

  );
}

const CurrentUserContainer = () => {
  const currentuser = useSelector((state) => state.currentuser);
  const dispatch = useDispatch();

  return (
    <CurrentUser
      currentuser={currentuser}
      logout={() => dispatch(logout())} />
  );
}

export default CurrentUserContainer;