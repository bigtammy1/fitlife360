import React, { useState } from 'react';
import { Box } from '@mui/material';

import HeroBanner from '../components/HeroBanner';
import SearchTraining from '../components/SearchTraining';
import Training from '../components/Training';
const Home = () => {
  return (
    <Box>
      <HeroBanner />
      <SearchTraining />
      <Training />
    </Box>
  )
}

export default Home