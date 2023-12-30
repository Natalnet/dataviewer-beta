import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { H4 } from "../Typography"

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
]

export default function AssessmentTable({ rows }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>
              <H4> Matrícula </H4>
            </TableCell>
            <TableCell align="right">
              <H4>P1</H4>
            </TableCell>
            <TableCell align="right">
              <H4>L1</H4>
            </TableCell>
            <TableCell align="right">
              <H4>PV1</H4>
            </TableCell>
            <TableCell align="right">
              <H4>M. U1</H4>
            </TableCell>
            <TableCell align="right">
              <H4>P2</H4>
            </TableCell>
            <TableCell align="right">
              <H4>L2</H4>
            </TableCell>
            <TableCell align="right">
              <H4>PV2</H4>
            </TableCell>
            <TableCell align="right">
              <H4>M. U2</H4>
            </TableCell>
            <TableCell align="right">
              <H4>P3</H4>
            </TableCell>
            <TableCell align="right">
              <H4>L3</H4>
            </TableCell>
            <TableCell align="right">
              <H4>PV3</H4>
            </TableCell>
            <TableCell align="right">
              <H4>M. U3</H4>
            </TableCell>
            <TableCell align="right">
              <H4>Média Final</H4>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.reg}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.reg}
              </TableCell>
              <TableCell align="right">{row.p1}</TableCell>
              <TableCell align="right">{row.l1}</TableCell>
              <TableCell align="right">{row.g1}</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {row.m1}
              </TableCell>
              <TableCell align="right">{row.p2}</TableCell>
              <TableCell align="right">{row.l2}</TableCell>
              <TableCell align="right">{row.g2}</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {row.m2}
              </TableCell>
              <TableCell align="right">{row.p3}</TableCell>
              <TableCell align="right">{row.l3}</TableCell>
              <TableCell align="right">{row.g3}</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {row.m3}
              </TableCell>
              <TableCell align="right">{row.average}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
