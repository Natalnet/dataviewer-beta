import { getAPIClient } from '../../../utils/axiosapi'
import { parseCookies } from 'nookies'
import StudentListPanel from '../../../components/students/StudentListPanel'

function StudentListGradesPage({ data }) {
  return <StudentListPanel data={data} />
}

export async function getServerSideProps(context) {
  const apiClient = getAPIClient(context)

  const { ['nextautht1.token']: token } = parseCookies(context)

  const { ['nextautht1.mat']: mat } = parseCookies(context)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  let { data } = await apiClient.get(`students/listgradesbymat/${mat}`)

  return {
    props: {
      data
    }
  }
}

export default StudentListGradesPage
