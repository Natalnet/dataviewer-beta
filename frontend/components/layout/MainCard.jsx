import { Box, Paper, Container, Typography } from "@mui/material"

export default function MainCard({ children, title }) {
  return (
    <>
      <Box
        sx={{
          width: "90%",
          marginRight: "1vw",
        }}
      >
        <Paper elevation={9}>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingTop: "30px",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" gutterBottom style={{ color: "#373737" }}>
              {title}
            </Typography>

            {children}
          </Container>
        </Paper>
      </Box>
    </>
  )
}
