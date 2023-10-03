import { Box, Typography } from '@mui/material'

import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

import GradeGroup from '../../components/GradeGroup'

export default function StudentGradesPanel({ data }) {
  // Esta organização do grid permite que as divisões se ajustem automaticamente em duas
  //colunas e quando a tela é muito curta seja ajustado para uma coluna apenas.

  return (
    <div style={{ width: '85%' }}>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper elevation={9}>
              <Box
                sx={{
                  paddingTop: '10px',
                  paddingLeft: '20px',
                  height: '160px'
                }}
              >
                <GradeGroup
                  title="Notas"
                  grades={[
                    { v: data.grades.u1, l: 'Unidade 01' },
                    { v: data.grades.u2, l: 'Unidade 02' },
                    { v: data.grades.u3, l: 'Unidade 03' }
                  ]}
                  average={`${data.grades.average}`}
                  averageLabel={'Média Geral'}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={9}>
              <Box
                sx={{
                  paddingTop: '10px',
                  paddingLeft: '20px',
                  height: '160px'
                }}
              >
                <GradeGroup
                  title="Unidade I"
                  grades={[
                    { v: data.unit1.participation, l: 'Presença' },
                    { v: data.unit1.lists, l: 'Listas' },
                    { v: data.unit1.exam, l: 'Prova' }
                  ]}
                  average={`${data.unit1.average}`}
                  averageLabel={'Média U2'}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={9}>
              <Box
                sx={{
                  paddingTop: '10px',
                  paddingLeft: '20px',
                  height: '160px'
                }}
              >
                <GradeGroup
                  title="Unidade II"
                  grades={[
                    { v: data.unit2.participation, l: 'Presença' },
                    { v: data.unit2.lists, l: 'Listas' },
                    { v: data.unit2.exam, l: 'Prova' }
                  ]}
                  average={`${data.unit2.average}`}
                  averageLabel={'Média U2'}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={9}>
              <Box
                sx={{
                  paddingTop: '10px',
                  paddingLeft: '20px',
                  height: '160px'
                }}
              >
                <GradeGroup
                  title="Unidade III"
                  grades={[
                    { v: data.unit3.participation, l: 'Presença' },
                    { v: data.unit3.lists, l: 'Listas' },
                    { v: data.unit3.exam, l: 'Prova' }
                  ]}
                  average={`${data.unit3.average}`}
                  averageLabel={'Média U3'}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </div>
      <div style={{ paddingTop: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper elevation={9}>
              <Box
                sx={{
                  paddingTop: '10px',
                  paddingLeft: '20px',
                  height: '160px'
                }}
              >
                <GradeGroup
                  title="Participação - Unidade I"
                  grades={[
                    { v: data.participation1.presence, l: 'Presença' },
                    { v: data.participation1.activities, l: 'Questões' }
                  ]}
                  average={`${data.participation1.average}`}
                  averageLabel={'Média'}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={9}>
              <Box
                sx={{
                  paddingTop: '10px',
                  paddingLeft: '20px',
                  height: '160px'
                }}
              >
                <GradeGroup
                  title="Participação - Unidade II"
                  grades={[
                    { v: data.participation2.presence, l: 'Presença' },
                    { v: data.participation2.activities, l: 'Questões' }
                  ]}
                  average={`${data.participation2.average}`}
                  averageLabel={'Média U2'}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={9}>
              <Box
                sx={{
                  paddingTop: '10px',
                  paddingLeft: '20px',
                  height: '160px'
                }}
              >
                <GradeGroup
                  title="Participação - Unidade III"
                  grades={[
                    { v: data.participation3.presence, l: 'Presença' },
                    { v: data.participation3.activities, l: 'Questões' }
                  ]}
                  average={`${data.participation3.average}`}
                  averageLabel={'Média'}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={9}>
              <Box
                sx={{
                  paddingTop: '10px',
                  paddingLeft: '20px',
                  height: '160px'
                }}
              >
                <Typography variant="h6"> Comentário - Prova 01 </Typography>
                <Typography variant="body1"> {data.comments1} </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={9}>
              <Box
                sx={{
                  paddingTop: '10px',
                  paddingLeft: '20px',
                  height: '160px'
                }}
              >
                <Typography variant="h6"> Comentário - Prova 02 </Typography>
                <Typography variant="body1"> {data.comments2} </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={9}>
              <Box
                sx={{
                  paddingTop: '10px',
                  paddingLeft: '20px',
                  height: '160px'
                }}
              >
                <Typography variant="h6"> Comentário - Prova 03 </Typography>
                <Typography variant="body1"> {data.comments3} </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
