import { Box } from "@mui/material";
import styles from "../../../styles/Home.module.css";
import { H2 } from "../../../components/Typography";
import { getAPIClient } from "../../../utils/axiosapi";
import { parseCookies } from "nookies";

function ClassClassesPage({ data }) {
  console.log(data);
  return (
    <>
      <Box
        sx={{
          width: "85%",
        }}
      >
        <Box className={styles.maincard}>
          <H2> Cronograma de Aulas </H2>
        </Box>
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  const apiClient = getAPIClient(context);
  const { ["nextautht1.token"]: token } = parseCookies(context);
  const { ["nextautht1.lastClassCode"]: lastClassCode } = parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { data } = await apiClient.get(`classes/classes/${lastClassCode}`);

  return {
    props: {
      data,
    },
  };
}

export default ClassClassesPage;
