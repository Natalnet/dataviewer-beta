import { AuthContext } from "../contexts/AuthContext"
import { useContext } from "react"
import Image from "next/image"
import { Box } from "@mui/material"
import HeaderAvatarCard from "./layout/HeaderAvatarCard"

export default function Header() {
  const { user } = useContext(AuthContext)

  return (
    <Box
      sx={{
        p: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: "25px",
        marginRight: "1vw",
        marginTop: "1vw",
        marginBottom: "1vw",
      }}
    >
      <Image
        src="/logo_name_h.svg"
        width={220}
        height={36}
        priority="true"
        alt="DataViewer Image"
      />
      <HeaderAvatarCard userName={user.name} userImgGithubName={user.avatar} />
    </Box>
  )
}
