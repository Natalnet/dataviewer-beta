import React, { useEffect, useState } from 'react'

import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  IconButton,
  AlertTitle
} from '@mui/material'

import { Close } from '@mui/icons-material/'

export default function EditForm({ info, updateData }) {
  const [name, setName] = useState('')
  const [registrationNumber, setRegistrationNumber] = useState('')
  const [avatar, setAvatarGitub] = useState('')
  const [openAlert, setOpenAlert] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState('success')
  const [alertMessage, setAlertMessage] = useState('')
  const [alertTitle, setAlertTitle] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setAlertTitle('Sucesso')
    setAlertMessage('Dados atualizados com sucesso!!!')
    setAlertSeverity('success')
    setOpenAlert(true)
    try {
      await updateData({ name, registrationNumber, avatar })
    } catch (error) {
      setAlertMessage('Falha ao atualizar os dados!')
      setAlertTitle('Erro')
      setAlertSeverity('error')
    }
  }

  useEffect( () => {
    setName(info?.name)
    setRegistrationNumber(info?.registrationNumber)
    setAvatarGitub(info?.avatar) 
  }, [])

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingBottom: '70px',

        textAlign: 'left'
      }}
    >
      <Box sx={{ alignItems: 'center' }}>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              paddingTop: '30px',
              paddingBottom: '30px',
              maxWidth: '500px',
              margin: '0 auto',

              flexDirection: 'column',
              textAlign: 'left'
            }}
          >
            <TextField
              label="Digite o seu nome"
              variant="outlined"
              size="small"
              type="text"
              fullWidth
              defaultValue={info?.name}
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
              defaultValue={info?.registrationNumber}
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
              defaultValue={info?.avatar}
              fullWidth
              sx={{
                my: 1
              }}
              onChange={e => setAvatarGitub(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              maxWidth: '500px',
              alignItems: 'center',
              margin: '0 auto',
              justifyContent: 'space-between'
            }}
          >
            <Button variant="outlined" sx={{ width: '150px' }}>
              Cancelar
            </Button>

            <Button
              variant="contained"
              type="submit"
              sx={{
                width: '150px'
              }}
            >
              Atualizar
            </Button>
          </Box>
        </form>
      </Box>
      <Box sx={{ width: '500px', margin: '0 auto', marginTop: '50px' }}>
        {openAlert && (
          <Alert
            severity={alertSeverity}
            variant="filled"
            action={
              <IconButton size="small" onClick={() => setOpenAlert(false)}>
                <Close />
              </IconButton>
            }
          >
            <AlertTitle>{alertTitle}</AlertTitle>
            {alertMessage}
          </Alert>
        )}
      </Box>
    </Container>
  )
}
