import ClassCard from "../../components/classCard"

import { getAPIClient } from "../../utils/axiosapi"
import { parseCookies, setCookie } from "nookies"
import Link from "next/link"

import { Box } from "@mui/material"

import MainCard from "../../components/layout/MainCard"

export default function Classes({ classes, lastClassCode }) {
  setCookie(null, "nextautht1.lastClassCode", lastClassCode, {
    maxAge: 60 * 90 * 1,
  })

  return (
    <>
      <MainCard title="Turmas">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
        >
          {classes &&
            classes.map((classe) => (
              <Link
                href={`/classes/${classe.class_id}`}
                key={classe._id}
                underline="hover"
                textDecoration="none"
              >
                <ClassCard
                  title={classe.name}
                  year={classe.year}
                  semester={classe.semester}
                />
              </Link>
            ))}
        </Box>
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

  const { data } = await apiClient.get("classes")
  const lastClass = await apiClient.get("classes/teacher/last")

  const classes = data
  const lastClassCode = lastClass.data
  return {
    props: {
      classes,
      lastClassCode,
    },
  }
}
