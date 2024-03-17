import { getAPIClient } from "../../utils/axiosapi"
import { parseCookies } from "nookies"

import AssessmentTable from "../../components/classes/AssessmentTable"
import MainCard from "../../components/layout/MainCard"

export default function Classes({ assessments }) {
  return (
    <>
      <MainCard title="Avaliações">
        <AssessmentTable rows={assessments} />
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

  const { data } = await apiClient.get(
    `classes/overallperformance/${lastClassCode}`
  )

  const studentNames = await apiClient.get(
    `classes/studantnames/${lastClassCode}`
  )

  function formatNum(n) {
    return parseFloat(n).toFixed(1)
  }
  function convertNum(n) {
    return n == "nan" || n == "NaN" || n == undefined ? 0 : parseFloat(n)
  }
  const assessments = []

  // Se viver vazio, não faz nada
  if (Object.keys(data).length !== 0) {
    for (const d of studentNames.data) {
      console.log(d)
      data[d.regNum].name = d.name
      data[d.regNum].subClass = d.subClass
    }

    for (const d in data) {
      const average1 =
        (convertNum(data[d].presence1) +
          convertNum(data[d].list1) * 4 +
          convertNum(data[d].grade1) * 5) /
        10
      const average2 =
        (convertNum(data[d].presence2) +
          convertNum(data[d].list2) * 4 +
          convertNum(data[d].grade2) * 5) /
        10
      const average3 =
        (convertNum(data[d].presence3) +
          convertNum(data[d].list3) * 4 +
          convertNum(data[d].grade3) * 5) /
        10
      assessments.push({
        reg: d,
        name: data[d].name,
        subClass: data[d].subClass,
        p1: formatNum(data[d].presence1),
        l1: formatNum(data[d].list1),
        g1: formatNum(data[d].grade1),
        m1: formatNum(average1),
        p2: formatNum(data[d].presence2),
        l2: formatNum(data[d].list2),
        g2: formatNum(data[d].grade2),
        m2: formatNum(average2),
        p3: formatNum(data[d].presence3),
        l3: formatNum(data[d].list3),
        g3: formatNum(data[d].grade3),
        m3: formatNum(average3),
        average: formatNum((average1 + average2 + average3) / 3),
      })
    }
  }

  //console.log(assessments)
  return {
    props: {
      assessments,
    },
  }
}
