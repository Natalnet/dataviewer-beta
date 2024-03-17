import { AuthContext } from "../contexts/AuthContext"
import { useContext } from "react"
import Image from "next/image"
import { Box, Typography } from "@mui/material"

export default function Header() {
  const { user } = useContext(AuthContext)

  return (
    <Box
      sx={{
        p: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: "20px",
        marginRight: "8vw",
      }}
    >
      <Image
        src="/logo_name_h.svg"
        width={220}
        height={36}
        priority="true"
        alt="DataViewer Image"
      />
      <Box>
        <h3> {user?.name} </h3>
        <p> {user?.email} </p>
      </Box>
    </Box>
  )
}
