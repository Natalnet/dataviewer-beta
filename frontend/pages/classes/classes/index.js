import { Box, Grid, Paper, Typography } from "@mui/material"

import { H2 } from "../../../components/Typography"
import { getAPIClient } from "../../../utils/axiosapi"
import { parseCookies } from "nookies"
import ClassClassTable from "../../../components/classes/ClassClassTable"
import ClassFrequencyTable from "../../../components/classes/ClassFrequenciesTable"

import dynamic from "next/dynamic"
import MainCard from "../../../components/layout/MainCard"

const NoSSRClassFrequenciesChart = dynamic(
  () => import("../../../components/classes/ClassFrequenciesChart"),
  { ssr: false }
)

function ClassClassesPage({ dataClasses, classFreqArray }) {
  //console.log(classFreqArray);
  return (
    <>
      <MainCard title="Aulas">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography variant="h5"> Gráfico de Frequência Diária </Typography>
            <NoSSRClassFrequenciesChart data={classFreqArray} />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h5"> Frequência Diária </Typography>
            <ClassFrequencyTable rows={classFreqArray} />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h5">Cronograma de Aulas</Typography>
            <ClassClassTable rows={dataClasses} />
          </Grid>
        </Grid>
      </MainCard>
    </>
  )
}

export async function getServerSideProps(context) {
  const apiClient = getAPIClient(context)
  const { ["nextautht1.token"]: token } = parseCookies(context)
  const { ["nextautht1.lastClassCode"]: lastClassCode } = parseCookies(context)

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  //console.log(lastClassCode);
  const { data } = await apiClient.get(`classes/classes/${lastClassCode}`)
  //console.log(data);
  const dataClasses = data

  const dataFreqs = await apiClient.get(`classes/frequency/${lastClassCode}`)
  //console.log(dataFreqs.data.classFreqs);
  const studentNumber = parseFloat(dataFreqs.data.studentNumber)
  let classFreqArray = []
  if (dataFreqs.status === 200) {
    for (let i = 0; i < dataClasses.length; i++) {
      let row = {}
      row["frequencies"] =
        dataFreqs.data.classFreqs[dataClasses[i].date] == undefined
          ? 0
          : dataFreqs.data.classFreqs[dataClasses[i].date]
      row["date"] = dataClasses[i].date
      row["classTitle"] = dataClasses[i].classTitle
      row["percentage"] = Math.floor(
        (parseFloat(row["frequencies"]) / studentNumber) * 100
      )
      classFreqArray.push(row)
      //console.log(row);
    }
  }

  return {
    props: {
      classFreqArray,
      dataClasses,
    },
  }
}

export default ClassClassesPage
