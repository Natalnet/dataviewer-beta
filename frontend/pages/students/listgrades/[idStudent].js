import { Box, Typography } from '@mui/material'

import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import LinearWithValueLabel from '../../../components/StudentProgress'
import { getAPIClient } from '../../../utils/axiosapi'

function StudentListPage({ data }) {
  function findProgress(dt, listName, listKind) {
    const element = dt.find(
      e =>
        e.fullName.indexOf(listName) !== -1 &&
        e.fullName.indexOf(listKind) !== -1
    )

    if (element !== undefined)
      return (parseFloat(element.progress) / 10).toFixed(1)
    return '-'
  }

  // objeto de notas
  // u1 -> notas unidade 1
  // a -> Expressões Aritiméticas
  // d -> Estruturas de Decisão
  // r -> Resolvida
  // p -> Prática
  // e -> Exercícios
  const u1 = {
    ar: findProgress(data, 'Expressões Aritméticas', 'Resolvida'),
    ap: findProgress(data, 'Expressões Aritméticas', 'Prática'),
    ae: findProgress(data, 'Expressões Aritméticas', 'Exercícios'),
    dr: findProgress(data, 'Estruturas de Decisão', 'Resolvida'),
    dp: findProgress(data, 'Estruturas de Decisão', 'Prática'),
    de: findProgress(data, 'Estruturas de Decisão', 'Exercícios'),
    m: 0
  }
  u1.m = (
    (parseFloat(u1.ar) +
      parseFloat(u1.ap) +
      parseFloat(u1.ae) +
      parseFloat(u1.dr) +
      parseFloat(u1.dp) +
      parseFloat(u1.de)) /
    6
  ).toFixed(1)
  console.log(u1)
  return (
    <div style={{ width: '100%' }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Paper>
                <Box sx={{ marginTop: '10px', marginLeft: '20px' }}>
                  <Typography variant="h5">Unidade I</Typography>
                  <Typography variant="h6">Expressões Aritiméticas</Typography>
                  <Typography variant="body1"> Resolvida {u1.ar}</Typography>
                  <Typography variant="body1"> Prática {u1.ap}</Typography>
                  <Typography variant="body1"> Exercícios {u1.ae}</Typography>
                  <Typography variant="h6">Estruturas de Decisão</Typography>
                  <Typography variant="body1"> Resolvida {u1.dr}</Typography>
                  <Typography variant="body1"> Prática {u1.dp}</Typography>
                  <Typography variant="body1"> Exercícios {u1.de}</Typography>
                  <Typography variant="h6"> Média {u1.m}</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item>
              <Paper style={{ height: '200px' }}>Card 3</Paper>
            </Grid>
            <Grid item>
              <Paper style={{ height: '200px' }}>Card 4</Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ height: '100%' }}>
            <LinearWithValueLabel data={data} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { params } = context
  const apiClient = getAPIClient(context)

  let { data } = await apiClient.get(`students/listgrades/${params.idStudent}`)
  console.log(data)
  return {
    props: {
      data
    }
  }
}

export default StudentListPage
