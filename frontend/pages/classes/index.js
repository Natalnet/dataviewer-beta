import ClassCard from '../../components/classCard'
import styles from '../../styles/Home.module.css'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'
import { getAPIClient } from '../../utils/axiosapi'
import { parseCookies } from 'nookies'
import Link from 'next/link'

import { Box, Typography } from '@mui/material'

export default function Classes({ classes }) {
  const { user } = useContext(AuthContext)
  return (
    <>
      <Box
        sx={{
          width: '100%'
        }}
      >
        <Box className={styles.maincard}>
          <Typography
            variant="h2"
            sx={{
              margin: '0 0 1rem 0',
              fontSize: '1.5rem',
              fontWeight: 700
            }}
          >
            Turmas
          </Typography>
          <Box className={styles.containerclasses}>
            {classes.map(classe => (
              <Link href={`/classes/${classe.class_id}`} key={classe.id_class}>
                <ClassCard
                  title={classe.name}
                  year={classe.year}
                  semester={classe.semester}
                />
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export async function getServerSideProps(context) {
  const apiClient = getAPIClient(context)
  const { ['nextautht1.token']: token } = parseCookies(context)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  //console.log("Server side token: ", token)
  const { data } = await apiClient.get('classes')
  console.log(data)
  const classes = data
  return {
    props: {
      classes
    }
  }
}
