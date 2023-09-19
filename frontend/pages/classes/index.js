import ClassCard from '../../components/classCard'
import styles from '../../styles/Home.module.css'

import { getAPIClient } from '../../utils/axiosapi'
import { parseCookies } from 'nookies'
import Link from 'next/link'

import { Box, styled } from '@mui/material'
import { H2 } from '../../components/Typography'

const Title2 = styled('div')({
  margin: '0 0 1rem 0',
  fontSize: '1.5rem',
  fontWeight: 700
})

export default function Classes({ classes }) {
  return (
    <>
      <Box
        sx={{
          width: '100%'
        }}
      >
        <Box className={styles.maincard}>
          <H2> Turmas </H2>

          <Box className={styles.containerclasses}>
            {classes && classes.map(classe => (
              <Link href={`/classes/${classe.class_id}`} key={classe._id}>
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

  const { data } = await apiClient.get('classes')

  const classes = data
  return {
    props: {
      classes
    }
  }
}
