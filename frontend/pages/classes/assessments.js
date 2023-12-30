import styles from "../../styles/Home.module.css"

import { getAPIClient } from "../../utils/axiosapi"
import { parseCookies } from "nookies"

import { Box } from "@mui/material"
import { H2 } from "../../components/Typography"

export default function Classes({ classes }) {
  return (
    <>
      <Box
        sx={{
          width: "85%",
        }}
      >
        <Box className={styles.maincard}>
          <H2> Avaliações </H2>
        </Box>
      </Box>
    </>
  )
}

export async function getServerSideProps(context) {
  const apiClient = getAPIClient(context)
  const { ["nextautht1.token"]: token } = parseCookies(context)

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  //const { data } = await apiClient.get('classes/overallperformance/lop2023_2t01')

  const classes = {}
  return {
    props: {
      classes,
    },
  }
}
