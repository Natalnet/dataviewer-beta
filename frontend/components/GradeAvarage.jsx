import React from 'react'
import { Box, Typography  } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { green, grey } from '@mui/material/colors'

const useStyles = makeStyles((theme) => ({
  grade: {
    display: 'flex', 
    flexDirection: 'column', 
    paddingRight: '3vh',  
    alignItems: 'center' 
  },
}));

export default function GradeAverage({ grade, label }) {
  const classes = useStyles();
  return (
    <>
    <Box className={classes.grade} >
      <div>
        <Typography variant="h3" color={green[400]}>
          { parseFloat(grade).toFixed(1)}
        </Typography>
      </div>
      <div>
        <Typography variant="body1" color={grey[400]} fontWeight='bold'>
          {label}
        </Typography>
      </div>   
    </Box>    
    </>
  )

}