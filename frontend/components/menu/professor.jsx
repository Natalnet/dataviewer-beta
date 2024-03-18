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
  ListItemIcon,
} from "@mui/material"
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined"
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined"
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined"
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined"

export default function MenuProfessor() {
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
            href="/classes/dashboard"
            sx={{
              backgroundColor:
                router.pathname.includes("/dashboard") && "#248df4",
            }}
          >
            <ListItemIcon sx={{ color: "#248df4" }}>
              <DashboardOutlinedIcon
                sx={{
                  color: router.pathname.includes("/dashboard") && "white",
                }}
              />
            </ListItemIcon>

            <ListItemText
              primary="Dashboard"
              sx={{
                color: router.pathname.includes("/dashboard") && "white",
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ color: "#248df4" }} disablePadding>
          <ListItemButton
            component="a"
            href="/classes"
            sx={{
              backgroundColor:
                router.pathname.localeCompare("/classes") == 0 && "#248df4",
            }}
          >
            <ListItemIcon sx={{ color: "#248df4" }}>
              <SchoolOutlinedIcon
                sx={{
                  color:
                    router.pathname.localeCompare("/classes") == 0 && "white",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Turmas"
              sx={{
                color:
                  router.pathname.localeCompare("/classes") == 0 && "white",
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ color: "#248df4" }} disablePadding>
          <ListItemButton
            component="a"
            href="/classes/assessments"
            sx={{
              backgroundColor:
                router.pathname.localeCompare("/classes/assessments") == 0 &&
                "#248df4",
            }}
          >
            <ListItemIcon sx={{ color: "#248df4" }}>
              <GradingOutlinedIcon
                sx={{
                  color:
                    router.pathname.localeCompare("/classes/assessments") ==
                      0 && "white",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Avaliações"
              sx={{
                color:
                  router.pathname.localeCompare("/classes/assessments") == 0 &&
                  "white",
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ color: "#248df4" }} disablePadding>
          <ListItemButton
            component="a"
            href="/classes/classes"
            sx={{
              backgroundColor:
                router.pathname.localeCompare("/classes/classes") == 0 &&
                "#248df4",
            }}
          >
            <ListItemIcon sx={{ color: "#248df4" }}>
              <ClassOutlinedIcon
                sx={{
                  color:
                    router.pathname.localeCompare("/classes/classes") == 0 &&
                    "white",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Aulas"
              sx={{
                color:
                  router.pathname.localeCompare("/classes/classes") == 0 &&
                  "white",
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ color: "#248df4" }} disablePadding>
          <ListItemButton
            component="a"
            href="/classes/configuration"
            sx={{
              backgroundColor:
                router.pathname.localeCompare("/classes/configuration") == 0 &&
                "#248df4",
            }}
          >
            <ListItemIcon sx={{ color: "#248df4" }}>
              <SettingsSuggestOutlinedIcon
                sx={{
                  color:
                    router.pathname.localeCompare("/classes/configuration") ==
                      0 && "white",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Configurações"
              sx={{
                color:
                  router.pathname.localeCompare("/classes/configuration") ==
                    0 && "white",
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
