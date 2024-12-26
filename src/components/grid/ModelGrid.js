import React from 'react';
import { Grid, Box } from '@mui/material';
import ModelCard from '../model/ModelCard';

const ModelGrid = ({ models }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Grid 
        container 
        spacing={1} 
        justifyContent="center"
      >
        {models.map((model, index) => (
          <Grid 
            item 
            key={index}
            xs={12}    // Full width on mobile
            sm={6}     // 2 cards per row on small screens
            md={4}     // 3 cards per row on medium screens
            lg={3}     // 4 cards per row on large screens
          >
            <ModelCard model={model} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ModelGrid;
