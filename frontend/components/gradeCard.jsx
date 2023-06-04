import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function GradeCard() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 539,
          height: 211,
        },
      }}
    >
      <Paper elevation={3} />
    </Box>
  );
}