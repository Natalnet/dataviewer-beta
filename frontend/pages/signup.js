import React, { useState, useContext } from 'react'
import Image from 'next/image'
import { AuthContext } from '../contexts/AuthContext'


import Link from 'next/link'
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  IconButton,
  AlertTitle,
  Dialog,
  DialogTitle,
  Slide,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material'
import { Close } from '@mui/icons-material'
import DialogTransitionPage from '../components/messages/DialogTransitionPage'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [openAlert, setOpenAlert] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp } = useContext(AuthContext)

  async function handleSubmit(e) {
    e.preventDefault()
    if (password !== passwordConfirm) {
      setAlertMessage('Senhas não conferem!')
      setOpenAlert(true)
      return
    }
    try {
      setLoading(true)

      const signUpResponse = await signUp(name, email, password)
    } catch {
      setAlertMessage('Falha ao criar uma conta!')
      setOpenAlert(true)
    }
    setOpenDialog(true)
    setLoading(false)
  }

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box className="card">
        <Image
          src="/dataviewer_full.svg"
          width={200}
          height={115}
          alt="Logo do DataViewer"
        />
        <h2>Cadastro</h2>
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
        <form className="form" onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            label="Nome"
            type="name"
            size="small"
            required
            fullWidth
            sx={{
              my: 1
            }}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            size="small"
            required
            fullWidth
            sx={{
              my: 1
            }}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Senha"
            type="password"
            size="small"
            required
            fullWidth
            sx={{
              my: 1
            }}
            onChange={e => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Confirmação da senha"
            type="password"
            size="small"
            required
            fullWidth
            sx={{
              my: 1
            }}
            onChange={e => setPasswordConfirm(e.target.value)}
          />
          <Button
            disabled={loading}
            className="button"
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: '#273b73',
              textTransform: 'none',
              color: '#efefef',
              '&:hover': {
                bgcolor: '#4163bf'
              }
            }}
          >
            Cadastrar
          </Button>
        </form>

        <Box className="smalltext">
          Já tem conta? <Link href="/">Faça Login.</Link>
        </Box>
        <DialogTransitionPage
          title={'Usuário cadastrado com sucesso!'}
          content={"Clique em 'Ok' para acessar a tela de Login."}
          openStatus={openDialog}
        />
      </Box>
    </Container>
  )
}
