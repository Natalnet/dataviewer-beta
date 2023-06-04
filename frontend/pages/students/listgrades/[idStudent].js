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

  // objeto de notas da unidade 1
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
  // objeto de notas da unidade 2
  // u2 -> notas unidade 2
  // r -> Repetição condicional
  // c -> Repetição contada
  // r -> Resolvida
  // p -> Prática
  // e -> Exercícios
  const u2 = {
    rr: findProgress(data, 'Repetição condicional', 'Resolvida'),
    rp: findProgress(data, 'Repetição condicional', 'Prática'),
    re: findProgress(data, 'Repetição condicional', 'Exercícios'),
    cr: findProgress(data, 'Repetição contada', 'Resolvida'),
    cp: findProgress(data, 'Repetição contada', 'Prática'),
    ce: findProgress(data, 'Repetição contada', 'Exercícios'),
    m: 0
  }
  u2.m = (
    (parseFloat(u2.rr) +
      parseFloat(u2.rp) +
      parseFloat(u2.re) +
      parseFloat(u2.cr) +
      parseFloat(u2.cp) +
      parseFloat(u2.ce)) /
    6
  ).toFixed(1)
  // objeto de notas da unidade 3
  // u2 -> notas unidade 3
  // v -> Vetores
  // r -> Resolvida
  // p -> Prática
  // e -> Exercícios
  const u3 = {
    vr: findProgress(data, 'Vetores', 'Resolvida'),
    vp: findProgress(data, 'Vetores', 'Prática'),
    ve: findProgress(data, 'Vetores', 'Exercícios'),
    m: 0
  }
  u3.m = (
    (parseFloat(u3.vr) + parseFloat(u3.vp) + parseFloat(u3.ve)) /
    3
  ).toFixed(1)
  console.log(u1)
  // Esta organização do grid permite que as divisões se ajustem automaticamente em duas
  //colunas e quando a tela é muito curta seja ajustado para uma coluna apenas
  return (
    <div style={{ width: '100%' }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Paper>
                <Box sx={{ paddingTop: '10px', paddingLeft: '20px' }}>
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
              <Paper>
                <Box
                  sx={{
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    paddingLeft: '20px'
                  }}
                >
                  <Typography variant="h5">Unidade II</Typography>
                  <Typography variant="h6">Repetição condicional</Typography>
                  <Typography variant="body1"> Resolvida {u2.rr}</Typography>
                  <Typography variant="body1"> Prática {u2.rp}</Typography>
                  <Typography variant="body1"> Exercícios {u2.re}</Typography>
                  <Typography variant="h6">Repetição contada</Typography>
                  <Typography variant="body1"> Resolvida {u2.cr}</Typography>
                  <Typography variant="body1"> Prática {u2.cp}</Typography>
                  <Typography variant="body1"> Exercícios {u2.ce}</Typography>
                  <Typography variant="h6"> Média {u2.m}</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item>
              <Paper style={{ height: '200px' }}>
                <Box
                  sx={{
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    paddingLeft: '20px'
                  }}
                >
                  <Typography variant="h5">Unidade III</Typography>
                  <Typography variant="h6">Vetores</Typography>
                  <Typography variant="body1"> Resolvida {u3.vr}</Typography>
                  <Typography variant="body1"> Prática {u3.vp}</Typography>
                  <Typography variant="body1"> Exercícios {u3.ve}</Typography>
                  <Typography variant="h6"> Média {u3.m}</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ height: '100%' }}>
            <Box
              sx={{
                paddingTop: '10px',
                paddingBottom: '10px',
                paddingLeft: '20px'
              }}
            >
              <LinearWithValueLabel data={data} />
            </Box>
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
