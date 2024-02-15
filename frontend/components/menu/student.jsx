import styles from "../../styles/Home.module.css"
import { AuthContext } from "../../contexts/AuthContext"
import { useRouter } from "next/router"
import { useContext } from "react"
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material"

export default function MenuStudent() {
  const { logout } = useContext(AuthContext)
  const router = useRouter()

  function handleAnchorLogoutClick() {
    logout()
  }

  return (
    <Box>
      <List className={styles.ul}>
        <ListItem className={styles.li} disablePadding>
          <ListItemButton
            component="a"
            href="/students"
            sx={{
              backgroundColor:
                router.pathname.localeCompare("/students") == 0 && "#248df4",
            }}
          >
            <ListItemText
              primary="Notas"
              sx={{
                color:
                  router.pathname.localeCompare("/students") == 0 && "white",
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem className={styles.li} disablePadding>
          <ListItemButton
            component="a"
            href="/students/listgrades"
            sx={{
              backgroundColor:
                router.pathname.includes("/listgrades") && "#248df4",
            }}
          >
            <ListItemText
              primary="Listas"
              sx={{
                color: router.pathname.includes("/listgrades") && "white",
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem className={styles.li} disablePadding>
          <ListItemButton
            component="a"
            href="/students/frequency"
            sx={{
              backgroundColor:
                router.pathname.includes("/frequency") && "#248df4",
            }}
          >
            <ListItemText
              primary="Frequência"
              sx={{
                color: router.pathname.includes("/frequency") && "white",
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
