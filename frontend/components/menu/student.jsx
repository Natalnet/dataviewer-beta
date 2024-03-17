import { AuthContext } from "../../contexts/AuthContext"
import { useRouter } from "next/router"
import { useContext } from "react"
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined"
import ChecklistRtlOutlinedIcon from "@mui/icons-material/ChecklistRtlOutlined"
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"

export default function MenuStudent() {
  const { logout } = useContext(AuthContext)
  const router = useRouter()

  function handleAnchorLogoutClick() {
    logout()
  }

  return (
    <Box>
      <List sx={{ width: "200px" }}>
        <ListItem sx={{ color: "#248df4" }} disablePadding>
          <ListItemButton
            component="a"
            href="/students"
            sx={{
              backgroundColor:
                router.pathname.localeCompare("/students") == 0 && "#248df4",
            }}
          >
            <ListItemIcon sx={{ color: "#248df4" }}>
              <DashboardOutlinedIcon
                sx={{
                  color:
                    router.pathname.localeCompare("/students") == 0 && "white",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Notas"
              sx={{
                color:
                  router.pathname.localeCompare("/students") == 0 && "white",
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ color: "#248df4" }} disablePadding>
          <ListItemButton
            component="a"
            href="/students/listgrades"
            sx={{
              backgroundColor:
                router.pathname.includes("/listgrades") && "#248df4",
            }}
          >
            <ListItemIcon sx={{ color: "#248df4" }}>
              <ViewListOutlinedIcon
                sx={{
                  color: router.pathname.includes("/listgrades") && "white",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Listas"
              sx={{
                color: router.pathname.includes("/listgrades") && "white",
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ color: "#248df4" }} disablePadding>
          <ListItemButton
            component="a"
            href="/students/frequency"
            sx={{
              backgroundColor:
                router.pathname.includes("/frequency") && "#248df4",
            }}
          >
            <ListItemIcon sx={{ color: "#248df4" }}>
              <ChecklistRtlOutlinedIcon
                sx={{
                  color: router.pathname.includes("/frequency") && "white",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Frequência"
              sx={{
                color: router.pathname.includes("/frequency") && "white",
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ color: "#248df4" }} disablePadding>
          <ListItemButton component="a" onClick={handleAnchorLogoutClick}>
            <ListItemIcon sx={{ color: "#248df4" }}>
              <LogoutOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}
