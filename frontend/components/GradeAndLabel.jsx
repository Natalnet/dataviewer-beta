import React from 'react'
import { Box, Typography } from '@mui/material'

import { indigo, red, orange, grey } from '@mui/material/colors'

export default function GradeAndLabel({ grade, label }) {
  const colorGood = indigo[800]
  const colorAtention = orange[500]
  const colorLow = red[500]
  let colorSelected
  if (grade >= 7.0) {
    colorSelected = colorGood
  } else if (grade >= 5.0) {
    colorSelected = colorAtention
  } else {
    colorSelected = colorLow
  }
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',

          borderRight: `1px solid ${grey[200]}`,
          flexGrow: 1,
          alignItems: 'center'
        }}
      >
        <Box>
          <Typography variant="h4" color={colorSelected}>
            {parseFloat(grade).toFixed(1)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" color={grey[400]} fontWeight="light">
            {label}
          </Typography>
        </Box>
      </Box>
    </>
  )
}
