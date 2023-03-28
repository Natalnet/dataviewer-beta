import styles from '../../styles/Home.module.css'
import axios from 'axios'

import { useRouter } from 'next/router'

import dynamic from 'next/dynamic'
import StudentCards from '../../components/StudentCards'

const ClassChart = dynamic(() => import('../../components/PerformanceChart'), {
  ssr: false
})

function ClassDetails({ subjects, difficulties, listsSubs, students }) {
  const router = useRouter()
  const classId = router.query.classId
  return (
    <div className={styles.maincontainer}>
      <div className={styles.maincard}>
        <h2>Turma</h2>
        <p> {classId} </p>
      </div>
      <div className={styles.maincard}>
        <h3>Gráfico de Desempenho por Listas</h3>
        <ClassChart data={listsSubs} width={1000} />
      </div>
      <div className={styles.containercharts}>
        <div className={styles.secondarycard}>
          <h3> Gráfico de Desempenho por Assuntos </h3>
          <ClassChart data={subjects} width={430} />
        </div>
        <div className={styles.secondarycard}>
          <h3> Gráfico de Desempenho por Dificuldade </h3>
          <ClassChart data={difficulties} width={500} />
        </div>
      </div>
      <div className={styles.maincard}>
        <h3>Estudantes da Turma</h3>
        <StudentCards students={students} />
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { params } = context
  console.log(params.classId) // Adicionar a busca da turma por id
  /*
  const response = await axios.get(
    `${process.env.API_URL}/api/tests/subject_submissions`
  )
  const data1 = await response.data

  const response2 = await axios.get(
    `${process.env.API_URL}/api/tests/difficulty_subs`
  )
  const data2 = await response2.data

  const response3 = await axios.get(
    `${process.env.API_URL}/api/tests/lists_subs`
  )
  const data3 = await response3.data

  const response4 = await axios.get(
    `${process.env.API_URL}/api/tests/stutents_progress`
  )
  const data4 = await response4.data
*/
  const data1 = []
  const data2 = []
  const data3 = []
  const data4 = []
  return {
    props: {
      subjects: data1,
      difficulties: data2,
      listsSubs: data3,
      students: data4
    }
  }
}

export default ClassDetails
