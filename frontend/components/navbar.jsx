import styles from '../styles/Home.module.css'
import { AuthContext } from '../contexts/AuthContext'
import { useRouter } from 'next/router'
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
  const router = useRouter()
  const { user } = useContext(AuthContext)

  function handleAnchorLogoutClick() {
    logout()
  }

  return (
    <Box>
      <List className={styles.ul}>
        <ListItem className={styles.li} disablePadding>
          <ListItemButton
            component="a"
            href="/classes/dashboard"
            sx={{
              backgroundColor:
                router.pathname.includes('/dashboard') && '#248df4'
            }}
          >
            <ListItemText
              primary="Dashboard"
              sx={{
                color: router.pathname.includes('/dashboard') && 'white'
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem className={styles.li} disablePadding>
          <ListItemButton
            component="a"
            href="/classes"
            sx={{
              backgroundColor:
                router.pathname.localeCompare('/classes') == 0 && '#248df4'
            }}
          >
            <ListItemText
              primary="Turmas"
              sx={{
                color: router.pathname.localeCompare('/classes') == 0 && 'white'
              }}
            />
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
