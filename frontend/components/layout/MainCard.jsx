import { Box, Paper, Container, Typography } from '@mui/material'

export default function MainCard({ children, title }) {
  return (
    <>
      <Box
        sx={{
          width: '85%'
        }}
      >
        <Paper elevation={9}>
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingTop: '30px',
              textAlign: 'center'
            }}
          >
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>

            {children}
          </Container>
        </Paper>
      </Box>
    </>
  )
}
