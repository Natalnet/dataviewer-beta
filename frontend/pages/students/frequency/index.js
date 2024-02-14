import { Box } from "@mui/material";
import styles from "../../../styles/Home.module.css";
import { H2 } from "../../../components/Typography";
import { getAPIClient } from "../../../utils/axiosapi";
import { parseCookies } from "nookies";

function StudentFrequencyPage() {
  return (
    <>
      <Box
        sx={{
          width: "85%",
        }}
      >
        <Box className={styles.maincard}>
          <H2> Frequência </H2>
        </Box>
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  const apiClient = getAPIClient(context);

  const { ["nextautht1.token"]: token } = parseCookies(context);
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { ["nextautht1.mat"]: regNumber } = parseCookies(context);

  let res;
  if (regNumber != "undefined") {
    console.log(regNumber);
    res = await apiClient.get(`students/frequency/${regNumber}`);
    let classFrequency = res.data;
    //res = await apiClient.get(`students/participations/${regNumber}`)
    //let ptps = res.data
    console.log(classFrequency);
  }

  return {
    props: {},
  };
}

export default StudentFrequencyPage;
