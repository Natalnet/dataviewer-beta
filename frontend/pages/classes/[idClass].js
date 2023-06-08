import { Box, Grid, Tabs, Tab, Paper } from '@mui/material'

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
    <Box sx={{ flexGrow: 1 }}>
      <div className={styles.maincontainer}>
        <div className={styles.containercharts}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <div className={styles.secondarycard}>
                <h2>Desempenho</h2>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Por Listas" {...a11yProps(0)} />
                  <Tab label="Por Assuntos" {...a11yProps(1)} />
                  <Tab label="Por Dificuldades" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                  <ClassChart data={listsSubs} width={600} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <ClassChart data={subjects} width={600} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <ClassChart data={difficulties} width={600} />
                </TabPanel>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <div className={styles.secondarycard}>
                <h2>Desempenho por assuntos</h2>
                <RadarGraph data={subjects} />
              </div>
            </Grid>
          </Grid>
        </div>
        <div className={styles.containercharts}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <div className={styles.secondarycard}>
                <h2>Estudantes da Turma</h2>
                <StudentCards students={students} />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <div className={styles.secondarycard}>
                <h2>Ranking da Turma</h2>
                <ClassRanking rows={students} />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </Box>
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
