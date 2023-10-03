import StudentListPanel from '../../../components/students/StudentListPanel'
import { getAPIClient } from '../../../utils/axiosapi'

function StudentListPage({ data }) {
  return <StudentListPanel data={data} />
}

export async function getServerSideProps(context) {
  const { params } = context
  const apiClient = getAPIClient(context)

  let { data } = await apiClient.get(`students/listgrades/${params.idStudent}`)

  return {
    props: {
      data
    }
  }
}

export default StudentListPage
