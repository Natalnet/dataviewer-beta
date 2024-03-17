import { Box, Typography } from "@mui/material"

export default function ClassCard(props) {
  return (
    <Box
      border={2}
      borderColor="grey.300"
      borderRadius={2}
      minWidth={260}
      alignItems="center"
      justifyContent="center"
      margin={1}
      textDecoration="none"
      sx={{
        "&:hover": {
          borderColor: "grey.900",
          textDecorationLine: "underline",
        },
      }}
    >
      <Typography variant="h6">{props.title}</Typography>
      <Box>
        <Typography variant="body2"> Ano: {props.year} </Typography>
        <Typography variant="body2"> Semestre: {props.semester} </Typography>
      </Box>
    </Box>
  )
}
