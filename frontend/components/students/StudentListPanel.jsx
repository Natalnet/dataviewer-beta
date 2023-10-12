import { Box, Typography } from '@mui/material'

import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import LinearWithValueLabel from '../StudentProgress'

import GradeGroup from '../GradeGroup'

function StudentListPanel({ data }) {
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

  // Esta organização do grid permite que as divisões se ajustem automaticamente em duas
  //colunas e quando a tela é muito curta seja ajustado para uma coluna apenas.
  // Inclusão na segunda coluna do componente de progresso nas listas de um estudante
  return (
    <div style={{ width: '90%' }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6} sx={{ paddingRight: '30px' }}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Paper elevation={9}>
                <Box
                  sx={{
                    paddingTop: '20px',
                    paddingLeft: '20px',
                    paddingBottom: '20px'
                  }}
                >
                  <Typography variant="h5">Unidade I</Typography>
                  <Box sx={{ marginRight: '23%' }}>
                    <GradeGroup
                      title="Expressões Aritiméticas"
                      grades={[
                        { v: u1.ar, l: 'Resolvida' },
                        { v: u1.ap, l: 'Prática' },
                        { v: u1.ae, l: 'Exercícios' }
                      ]}
                    />
                  </Box>
                  <GradeGroup
                    title="Estruturas de Decisão"
                    grades={[
                      { v: u1.dr, l: 'Resolvida' },
                      { v: u1.dp, l: 'Prática' },
                      { v: u1.de, l: 'Exercícios' }
                    ]}
                    average={u1.m}
                    averageLabel={'Média U1'}
                  />
                </Box>
              </Paper>
            </Grid>
            <Grid item>
              <Paper elevation={9}>
                <Box
                  sx={{
                    paddingTop: '20px',
                    paddingLeft: '20px',
                    paddingBottom: '20px'
                  }}
                >
                  <Typography variant="h5">Unidade II</Typography>
                  <Box sx={{ marginRight: '23%' }}>
                    <GradeGroup
                      title="Repetição Condicional"
                      grades={[
                        { v: u2.rr, l: 'Resolvida' },
                        { v: u2.rp, l: 'Prática' },
                        { v: u2.re, l: 'Exercícios' }
                      ]}
                    />
                  </Box>
                  <GradeGroup
                    title="Repetição Contada"
                    grades={[
                      { v: u2.cr, l: 'Resolvida' },
                      { v: u2.cp, l: 'Prática' },
                      { v: u2.ce, l: 'Exercícios' }
                    ]}
                    average={u2.m}
                    averageLabel={'Média U2'}
                  />
                </Box>
              </Paper>
            </Grid>
            <Grid item>
              <Paper style={{ height: '220px' }} elevation={9}>
                <Box
                  sx={{
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    paddingLeft: '20px'
                  }}
                >
                  <Typography variant="h5">Unidade III</Typography>

                  <GradeGroup
                    title="Vetores"
                    grades={[
                      { v: u3.vr, l: 'Resolvida' },
                      { v: u3.vp, l: 'Prática' },
                      { v: u3.ve, l: 'Exercícios' }
                    ]}
                    average={u3.m}
                    averageLabel={'Média U3'}
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} sx={{ paddingRight: '30px' }}>
          <Paper style={{ height: '100%' }} elevation={9}>
            <Box
              sx={{
                paddingTop: '20px',
                paddingBottom: '20px',
                paddingLeft: '40px',
                paddingRight: '20px'
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

export default StudentListPanel
