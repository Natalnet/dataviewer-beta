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
            alignItems: 'baseline',
            paddingBottom: '10px',
            paddingTop: '10px',
            paddingLeft: '25px',
            paddingRight: '25px',
            justifyContent: 'space-between'
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
