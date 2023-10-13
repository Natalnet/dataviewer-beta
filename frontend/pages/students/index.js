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
  const avU1 = (av1Participation + listgrades?.meanU1*4 +  examGrades?.grade1*5)/10
  const avU2 = (av2Participation + listgrades?.meanU2*4 +  examGrades?.grade2*5)/10 
  const avU3 = (av3Participation + listgrades?.meanU3*4 +  examGrades?.grade3*5)/10  
  const finalAverage = (avU1 + avU2 + avU3)/3

  data = {
    grades: { u1: avU1, u2: avU2, u3: avU3, average: finalAverage},
    unit1: { participation: av1Participation, lists: listgrades?.meanU1, exam: examGrades?.grade1, average: avU1 },
    unit2: { participation: av2Participation, lists: listgrades?.meanU2, exam: examGrades?.grade2, average: avU2 },
    unit3: { participation: av3Participation, lists: listgrades?.meanU3, exam: examGrades?.grade3, average: avU3 },
    participation1: { presence: ptps?.presence1, activities: ptps?.activities1, average: av1Participation },
    participation2: { presence: ptps?.presence2, activities: ptps?.activities2, average: av2Participation },
    participation3: { presence: ptps?.presence3, activities: ptps?.activities3, average: av3Participation },
    comments1: examGrades?.comment1=='nan' ? '-' : examGrades?.comment1,
    comments2: examGrades?.comment2=='nan' ? '-' : examGrades?.comment2,
    comments3: examGrades?.comment3=='nan' ? '-' : examGrades?.comment3
  }

  return {
    props: {
      data
    }
  }
}

export default StudentGradesMainPage
