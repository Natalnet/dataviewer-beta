import React from 'react'
import { Box, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { indigo, red, orange, grey } from '@mui/material/colors'

const useStyles = makeStyles(theme => ({
  grade: {
    display: 'flex',
    flexDirection: 'column',
    paddingRight: '3vh',
    borderRight: `1px solid ${grey[200]}`,
    alignItems: 'center'
  }
}))

export default function GradeAndLabel({ grade, label }) {
  const classes = useStyles()
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
      <Box className={classes.grade}>
        <Box>
          <Typography variant="h4" color={colorSelected}>
            {parseFloat(grade).toFixed(1)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" color={grey[400]} fontWeight="bold">
            {label}
          </Typography>
        </Box>
      </Box>
    </>
  )
}
