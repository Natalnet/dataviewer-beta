import { Box, Tabs, Tab } from '@mui/material'

import styles from '../../styles/Home.module.css'
import { getAPIClient } from '../../utils/axiosapi'

import dynamic from 'next/dynamic'
import StudentCards from '../../components/StudentCards'

import { useState } from 'react'

const ClassChart = dynamic(() => import('../../components/PerformanceChart'), {
  ssr: false
})

import ClassRanking from '../../components/ClassRanking'
import RadarGraph from '../../components/RadarGraph'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

function ClassDetails({ subjects, difficulties, listsSubs, students }) {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
    //.log('handle: ' + newValue)
  }

  return (
    <div className={styles.maincontainer}>
      <div className={styles.containercharts}>
        <div className={styles.secondarycard}>
          <h2>Desempenho</h2>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Por Listas" {...a11yProps(0)} />
              <Tab label="Por Assuntos" {...a11yProps(1)} />
              <Tab label="Por Dificuldades" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <ClassChart data={listsSubs} width={800} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ClassChart data={subjects} width={800} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ClassChart data={difficulties} width={800} />
          </TabPanel>
        </div>
        <div className={styles.secondarycard}>
          <h2>Ranking da Turma</h2>
          <RadarGraph data={subjects} />
        </div>
      </div>
      <div className={styles.containercharts}>
        <div className={styles.secondarycard}>
          <h2>Estudantes da Turma</h2>
          <StudentCards students={students} />
        </div>
        <div className={styles.secondarycard}>
          <h2>Ranking da Turma</h2>
          <ClassRanking rows={students} />
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { params } = context
  const apiClient = getAPIClient(context)
  // Adicionar a busca da turma por id

  let { data } = await apiClient.get(`classes/listsubject/${params.idClass}`)
  const data1 = data

  const lists = await apiClient.get(`classes/lists/${params.idClass}`)

  const difficulties = await apiClient.get(
    `classes/difficulties/${params.idClass}`
  )

  const students = await apiClient.get(`classes/students/${params.idClass}`)

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
  console.log(students.data)
  const data4 = [
    {
      name: 'Davi da Rosa',
      progress: '57',
      id: 'kMyLWXKlNlYTYc'
    },
    {
      name: 'Leandro Costela',
      progress: '16',
      id: 'dqYRuGPogQEuYz'
    },
    {
      name: 'Miguel Viana',
      progress: '24',
      id: 'yNkQxXeTLeuoXR'
    }
  ]
  return {
    props: {
      subjects: data1,
      difficulties: difficulties.data,
      listsSubs: lists.data,
      students: students.data
    }
  }
}

export default ClassDetails
