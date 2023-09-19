import React from 'react'
import { Box, Typography } from '@mui/material'
 

import GradeAverage from './GradeAvarage'
import GradeAndLabel from './GradeAndLabel'

 

export default function GradeGroup({ title, grades, average, averageLabel }) {
 

  return (
    <>
      <Box sx={{ marginTop: '15px' }}>
        <Typography variant="h6">{title}</Typography>
        <Box
          sx={{
            display: 'flex',
            paddingLeft: '15px',
            alignItems: 'baseline',
            gap: '3vh',
            marginTop: '10px',
            marginLeft: '25px'
          }}
        >
          {grades &&
            grades.map((g, index) => (
              <GradeAndLabel grade={g.v} label={g.l} key={index} />
            ))}
          {average && <GradeAverage grade={average} label={averageLabel} />}
        </Box>
      </Box>
    </>
  )
}
