import styles from '../styles/Home.module.css'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material'

export default function Navbar() {
  const { logout } = useContext(AuthContext)
  const { user } = useContext(AuthContext)

  function handleAnchorLogoutClick() {
    logout()
  }

  return (
    <Box>
      <List className={styles.ul}>
        <ListItem className={styles.li} disablePadding>
          <ListItemButton component="a" href="/">
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem className={styles.li} disablePadding>
          <ListItemButton component="a" href="/classes">
            <ListItemText primary="Turmas" />
          </ListItemButton>
        </ListItem>
        <ListItem className={styles.li} disablePadding>
          <ListItemButton component="a" onClick={handleAnchorLogoutClick}>
            <ListItemText primary="Sair" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}
