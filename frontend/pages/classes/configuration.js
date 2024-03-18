import { getAPIClient } from "../../utils/axiosapi"
import { parseCookies } from "nookies"

import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { readAsText } from "promise-file-reader"

import MainCard from "../../components/layout/MainCard"
import {
  Button,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"

export default function Configuration() {
  const [fileLines, setFileLines] = useState([])
  const [listOptions, setListOptions] = useState([])
  const [isUploaded, setIsUploaded] = useState(false)
  const [selectedValues, setSelectedValues] = useState({})
  const { getRootProps, getInputProps } = useDropzone({
    "text/html": [".html", ".csv"],
    onDrop: async (acceptedFiles) => {
      try {
        const file = acceptedFiles[0]
        const content = await readAsText(file)
        const lines = content.split("\n")
        setFileLines(lines)

        let firstLineWords = []
        if (fileLines.length > 0) {
          const firstLine = fileLines[0]
          firstLineWords = firstLine.split(",")
          firstLineWords.splice(0, 2)
          setListOptions(firstLineWords)
          console.log(firstLineWords)
          setIsUploaded(true)
        }
      } catch (err) {
        console.error(err)
      }
    },
  })

  return (
    <>
      <MainCard title="Configurações">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>
            Arraste e solte um arquivo txt aqui, ou clique para selecionar um
            arquivo
          </p>
        </div>
        {isUploaded ? (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Listas</TableCell>
                    <TableCell>Escolha a Unidade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listOptions.map((line, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{line}</TableCell>
                      <TableCell align="center">
                        <Select
                          size="small"
                          label="Unidade"
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={selectedValues[index] || ""}
                          onChange={(event) => {
                            setSelectedValues({
                              ...selectedValues,
                              [index]: event.target.value,
                            })
                          }}
                        >
                          <MenuItem value={"1"}>1</MenuItem>
                          <MenuItem value={"2"}>2</MenuItem>
                          <MenuItem value={"3"}>3</MenuItem>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              onClick={() => {
                console.log(selectedValues)
                console.log(listOptions)
              }}
            >
              Cadastrar
            </Button>
          </>
        ) : (
          " - - - "
        )}
      </MainCard>
    </>
  )
}
