import { Box, Typography } from '@mui/material'

import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import LinearWithValueLabel from '../../../components/StudentProgress'

function StudentListPage({ data }) {
  console.log(data)
  return (
    <div style={{ width: '100%' }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Paper>
                <Typography variant="h5">Unidade I</Typography>
                <Typography variant="h6">Expressões Aritiméticas</Typography>
                <Typography variant="body1"> Resolvida 10</Typography>
                <Typography variant="body1"> Prática 10</Typography>
                <Typography variant="body1"> Exercícios 10</Typography>
                <Typography variant="h6">
                  Estruturas de Decisão Aritiméticas
                </Typography>
                <Typography variant="body1"> Resolvida 10</Typography>
                <Typography variant="body1"> Prática 10</Typography>
                <Typography variant="body1"> Exercícios 10</Typography>
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
  const data = [
    {
      fullName: '(Lop) Estruturas de decisão - Múltiplas decisões',
      progress: 100
    },
    {
      fullName: 'Repetição condicional - Lista Resolvida (LOP)',
      progress: 50
    },
    {
      fullName: 'Repetição condicional - Lista de Exercícios (LOP)',
      progress: 30
    }
  ]

  return {
    props: {
      data
    }
  }
}

export default StudentListPage
