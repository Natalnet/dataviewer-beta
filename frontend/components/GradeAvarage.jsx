import React from 'react'
import { Box, Typography } from '@mui/material'

import { green, grey } from '@mui/material/colors'

export default function GradeAverage({ grade, label }) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          alignItems: 'center'
        }}
      >
        <div>
          <Typography variant="h3" color={green[400]}>
            {parseFloat(grade).toFixed(1)}
          </Typography>
        </div>
        <div>
          <Typography variant="body1" color={grey[400]}>
            {label}
          </Typography>
        </div>
      </Box>
    </>
  )
}
