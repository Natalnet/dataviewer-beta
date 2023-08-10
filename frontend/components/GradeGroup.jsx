import React from 'react'
import { Box, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

import GradeAverage from './GradeAvarage'
import GradeAndLabel from './GradeAndLabel'

const useStyles = makeStyles(theme => ({
  grades: {
    display: 'flex',
    paddingLeft: '20px',
    alignItems: 'baseline',
    gap: '3vh',
    marginTop: '10px',
    marginLeft: '25px'
  }
}))

export default function GradeGroup({ title, grades, average, averageLabel }) {
  const classes = useStyles()

  return (
    <>
      <Box sx={{ marginTop: '15px' }}>
        <Typography variant="h6">{title}</Typography>
        <Box className={classes.grades}>
          {grades && grades.map(g => <GradeAndLabel grade={g.v} label={g.l} />)}
          {average && <GradeAverage grade={average} label={averageLabel} />}
        </Box>
      </Box>
    </>
  )
}
