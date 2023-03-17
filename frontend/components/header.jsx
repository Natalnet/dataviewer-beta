import { AuthContext } from "../contexts/AuthContext"
import Image from 'next/image'
import { Box, Typography } from '@mui/material'

export default function Header() {
  const { user } = useContext(AuthContext)
  return (
    <Box
      sx={{
        p: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <Image src="/logo_name_h.svg" width={160} height={26} priority="true" />
      <Typography variant='h5'> Nome Usuário </Typography>
      {user?.userEmail}
    </Box>
  );
}