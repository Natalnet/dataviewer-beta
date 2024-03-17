import { Box } from "@mui/material"
import styles from "../../../styles/Home.module.css"
import { H2 } from "../../../components/Typography"
import { getAPIClient } from "../../../utils/axiosapi"
import { parseCookies } from "nookies"
import StudentFrequencyTable from "../../../components/students/StudentFrequencyTable"
import MainCard from "../../../components/layout/MainCard"

function StudentFrequencyPage({ data }) {
  console.log(data)
  return (
    <>
      <MainCard title="Frequência">
        <StudentFrequencyTable rows={data} />
      </MainCard>
    </>
  )
}

export async function getServerSideProps(context) {
  const apiClient = getAPIClient(context)

  const { ["nextautht1.token"]: token } = parseCookies(context)
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  const { ["nextautht1.mat"]: regNumber } = parseCookies(context)

  let freqTable = {}
  let freqArray = []
  let res
  if (regNumber != "undefined") {
    console.log(regNumber)
    res = await apiClient.get(`students/frequency/${regNumber}`)
    let classFrequency = res.data
    let clcl
    if (classFrequency.classCode != null) {
      res = await apiClient.get(`classes/classes/${classFrequency.classCode}`)
      clcl = res.data
      console.log(clcl)
    }
    //Criando um dicionário para guardar a frequência de cada aula de um aluno
    for (let i = 0; i < clcl.length; i++) {
      freqTable[clcl[i].date] = {}
      freqTable[clcl[i].date].classTitle = clcl[i].classTitle
      freqTable[clcl[i].date].presence = 0
    }
    //Preenchendo o dicionário com a frequência do aluno no dia que ele esteve presente
    for (let i = 0; i < classFrequency.classFreqs.length; i++) {
      if (typeof freqTable[classFrequency.classFreqs[i]] !== "undefined")
        freqTable[classFrequency.classFreqs[i]].presence = 2
    }
    //console.log(freqTable);
    for (let d in freqTable) {
      freqArray.push({
        date: d,
        title: freqTable[d].classTitle,
        presence: freqTable[d].presence,
      })
    }
  }
  let data = freqArray
  return {
    props: { data },
  }
}

export default StudentFrequencyPage
