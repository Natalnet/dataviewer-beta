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
  let ptps = res.data

  res = await apiClient.get(`students/listunitgrades/${regNumber}`)
  let listgrades = res.data
 
  const av1Participation = (ptps?.presence1 + ptps?.activities1)/2
  const av2Participation = (ptps?.presence2 + ptps?.activities2)/2
  const av3Participation = (ptps?.presence3 + ptps?.activities3)/2

  data = {
    grades: { u1: 0, u2: 0, u3: 0, average: 0 },
    unit1: { participation: av1Participation, lists: listgrades?.meanU1, exam: 0, average: 0 },
    unit2: { participation: av2Participation, lists: listgrades?.meanU2, exam: 0, average: 0 },
    unit3: { participation: av3Participation, lists: listgrades?.meanU3, exam: 0, average: 0 },
    participation1: { presence: ptps?.presence1, activities: ptps?.activities1, average: av1Participation },
    participation2: { presence: ptps?.presence2, activities: ptps?.activities2, average: av2Participation },
    participation3: { presence: ptps?.presence3, activities: ptps?.activities3, average: av3Participation },
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
