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
  console.log(listgrades)

  data = {
    grades: { u1: 7.9, u2: 8.7, u3: 9.8, average: 0.0 },
    unit1: {
      participation: 10.0,
      lists: 8.7,
      exam: 9.8,
      average: parseFloat(0)
    },
    unit2: { participation: 5.0, lists: 8.7, exam: 9.8, average: 0 },
    unit3: { participation: 10.0, lists: 6.7, exam: 4.8, average: 8 },
    participation1: { presence: 10, activities: 10, average: 0 },
    participation2: { presence: 10, activities: 0, average: 0 },
    participation3: { presence: 0, activities: 10, average: 0 },
    comments1: 'Ok',
    comments2: 'Link bloqueado',
    comments3:
      'Faltou realizar os testes, melhorar a indentação e as explicações sobre o algoritmo desenvolvido firam incompletas. '
  }

  return {
    props: {
      data
    }
  }
}

export default StudentGradesMainPage
