import React from 'react'
import { Link } from 'react-router-dom'
import { Stack } from '@mui/material'
import Logo from '../assets/images/icon.png'
const Navbar = () => { 
  return (
    <Stack direction="row"
    justifyContent= "space-round", sx={{ gap: { sm: '122px', xs: 
    '48px'}, mt: { sm: '322px', xs: '20px'}, justifyContent: 
    'none'}} px="20px">
      <Link to="/">
        <img src={Logo} alt="Logo" style={{ 
        width: '50px', height: '50px', margin: '0 20px' }} />
      </Link>
      <Stack
        direction="row"
        gap="40px"
        fontSize="25px"
        alignItems="flex-end"
      >
        <Link to="/" style={{ textDecoration: 
        'none', colour: 'white',
        borderBottom: '3px solid white' }} 
        >Home</Link>
        <a href="Training" style={
          {textCecoration: 'none', color:
          'white'}}>Training</a>
      </Stack>
    </Stack>
  )
}

export default Navbar