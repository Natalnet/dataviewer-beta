import styles from '../styles/Student.module.css'

import ImageIcon from '@mui/icons-material/Image'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

function StudentSmallCard({ name, progress }) {
  return (
    <div className={styles.card}>
      <ListItem>
        <ListItemAvatar>
          <Avatar> <ImageIcon /></Avatar> 
        </ListItemAvatar>      
        <ListItemText primary={name} secondary={`Progress ${progress}%`} />
      </ListItem>
    </div>
  )
}

export default StudentSmallCard