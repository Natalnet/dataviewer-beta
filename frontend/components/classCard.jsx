import styles from '../styles/Components.module.css';
import {
  Box,
  Typography
} from "@mui/material";

export default function ClassCard(props) {
  return (
    <Box className={styles.card}>
      <Typography
        className={styles.title}
      >
        {props.title}
      </Typography>
      <Box className={styles.content}>
        <Typography> Ano: {props.year} </Typography>
        <Typography> Semestre: {props.semester} </Typography>
      </Box>
    </Box>
  )
}