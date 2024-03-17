import { getAPIClient } from "../../utils/axiosapi"
import { parseCookies } from "nookies"

import MainCard from "../../components/layout/MainCard"

export default function Classes({ classes }) {
  return (
    <>
      <MainCard title="Dashboard"> </MainCard>
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

  //const { data } = await apiClient.get('classes')

  const classes = {}
  return {
    props: {
      classes,
    },
  }
}
