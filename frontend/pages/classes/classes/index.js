import { Box, Grid, Paper } from "@mui/material"

import { H2 } from "../../../components/Typography"
import { getAPIClient } from "../../../utils/axiosapi"
import { parseCookies } from "nookies"
import ClassClassTable from "../../../components/classes/ClassClassTable"
import ClassFrequencyTable from "../../../components/classes/ClassFrequenciesTable"

import dynamic from "next/dynamic"

const NoSSRClassFrequenciesChart = dynamic(
  () => import("../../../components/classes/ClassFrequenciesChart"),
  { ssr: false }
)

function ClassClassesPage({ dataClasses, classFreqArray }) {
  //console.log(classFreqArray);
  return (
    <>
      <Box
        sx={{
          width: "85%",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Paper elevation={9}>
              <Box
                sx={{
                  padding: "20px",
                }}
              >
                <H2> Cronograma de Aulas </H2>
                <ClassClassTable rows={dataClasses} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={12}>
            <Paper elevation={9}>
              <Box
                sx={{
                  padding: "20px",
                }}
              >
                <H2> Frequência Diária </H2>
                <ClassFrequencyTable rows={classFreqArray} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={12}>
            <Paper elevation={9}>
              <Box
                sx={{
                  padding: "20px",
                }}
              >
                <H2> Gráfico de Frequência Diária </H2>
                <NoSSRClassFrequenciesChart data={classFreqArray} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
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
