import StudentListPanel from '../../../components/students/StudentListPanel'
import { getAPIClient } from '../../../utils/axiosapi'
import { parseCookies } from 'nookies'

function StudentListPage({ data }) {
  return <StudentListPanel data={data} />
}

export async function getServerSideProps(context) {
  const { params } = context
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

  let { data } = await apiClient.get(`students/listgrades/${params.idStudent}`)

  return {
    props: {
      data
    }
  }
}

export default StudentListPage
