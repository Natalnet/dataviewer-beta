import { Avatar, Box, Typography, Link } from "@mui/material"

export default function HeaderAvatarCard({ userName, userImgGithubName }) {
  console.log(userImgGithubName)
  return (
    <Box display="flex" alignItems="right" sx={{ marginRight: "5px" }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        sx={{ marginRight: "15px" }}
      >
        <Typography
          variant="h4"
          color="primary"
          style={{ fontFamily: "Arial", color: "#373737" }}
        >
          {userName}
        </Typography>
        <Link href="/users/edit" color="primary" underline="hover">
          Informações do perfil
        </Link>
      </Box>
      <Avatar
        alt={userName}
        src={`https://github.com/${userImgGithubName}.png`}
        sx={{ width: 70, height: 70 }}
      />
    </Box>
  )
}
