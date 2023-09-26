import React, { useState } from 'react'

import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  IconButton,
  AlertTitle,
  Paper
} from '@mui/material'

import { Close } from '@mui/icons-material/'

export default function EditForm() {
  const [name, setName] = useState('')
  const [registrationNumber, setRegistrationNumber] = useState('')
  const [avatarGithub, setAvatarGitub] = useState('')
  const [openAlert, setOpenAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setLoading(true)
      await signIn(email, password)
    } catch (error) {
      setAlertMessage('Falha ao atualizar os dados!')
      setOpenAlert(true)
      //console.log(error)
    }
    setLoading(false)
  }

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: '70px',
        textAlign: 'left'
      }}
    >
      {openAlert && (
        <Alert
          severity="error"
          variant="filled"
          action={
            <IconButton size="small" onClick={() => setOpenAlert(false)}>
              <Close />
            </IconButton>
          }
        >
          <AlertTitle>Erro de Login</AlertTitle>
          {alertMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            paddingTop: '30px',
            paddingBottom: '30px',
            maxWidth: '400px',
            margin: '0 auto',
            textAlign: 'left'
          }}
        >
          <TextField
            label="Digite o seu nome"
            variant="outlined"
            size="small"
            type="text"
            fullWidth
            sx={{
              my: 1
            }}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            label="Digite sua matrícula"
            variant="outlined"
            size="small"
            type="text"
            fullWidth
            sx={{
              my: 1
            }}
            onChange={e => setRegistrationNumber(e.target.value)}
          />
          <TextField
            label="Login do github para obter seu avatar"
            variant="outlined"
            size="small"
            type="text"
            fullWidth
            sx={{
              my: 1
            }}
            onChange={e => setRegistrationNumber(e.target.value)}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" sx={{ width: '150px' }}>
            Cancelar
          </Button>

          <Button
            variant="contained"
            type="submit"
            sx={{
              bgcolor: '#273b73',
              width: '150px',
              color: '#efefef',
              '&:hover': {
                bgcolor: '#4163bf'
              }
            }}
          >
            Entrar
          </Button>
        </Box>
      </form>
    </Container>
  )
}
