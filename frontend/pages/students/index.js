import StudentGradesPanel from '../../components/students/StudentGradesPanel'
import { getAPIClient } from '../../utils/axiosapi'
import { parseCookies } from 'nookies'

function StudentGradesMainPage({ data }) {
  return (
    <>
      <StudentGradesPanel data={data} />
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

  const { ['nextautht1.mat']: regNumber } = parseCookies(context)

  console.log(regNumber)

  let { data } = await apiClient.get(`students/examgrades/${regNumber}`)
  let examGrades = data
  let res = await apiClient.get(`students/participations/${regNumber}`)
  let participations = res.data

  res = await apiClient.get(`students/listgradesbymat/${regNumber}`)
  let listgrades = res.data
  //console.log(listgrades)

  data = {
    grades: { u1: 0, u2: 0, u3: 0, average: 0 },
    unit1: { participation: 0, lists: 0, exam: 9.8, average: 0 },
    unit2: { participation: 0, lists: 8.7, exam: 0, average: 0 },
    unit3: { participation: 0, lists: 6.7, exam: 0, average: 0 },
    participation1: { presence: 0, activities: 0, average: 0 },
    participation2: { presence: 0, activities: 0, average: 0 },
    participation3: { presence: 0, activities: 0, average: 0 },
    comments1: '-',
    comments2: '-',
    comments3: '-'
  }

  return {
    props: {
      data
    }
  }
}

export default StudentGradesMainPage
