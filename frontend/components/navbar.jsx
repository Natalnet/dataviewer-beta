import { AuthContext } from '../contexts/AuthContext'

import { useContext } from 'react'

import MenuProfessor from './menu/professor'
import MenuStudent from './menu/student'

export default function Navbar() {
  const { user } = useContext(AuthContext)

  if (user?.profile == 'PROFESSOR') {
    console.log('Perfil professor')
    return <MenuProfessor />
  }
  return <MenuStudent />
}
