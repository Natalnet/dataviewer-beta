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
  const [file, setFile] = useState(null)
  const [listOptions, setListOptions] = useState([])
  const [isUploaded, setIsUploaded] = useState(false)
  const [selectedValues, setSelectedValues] = useState({})
  const { getRootProps, getInputProps } = useDropzone({
    "text/html": [".html", ".csv"],
    onDrop: async (acceptedFiles) => {
      try {
        const fileIn = acceptedFiles[0]
        const content = await readAsText(fileIn)
        const lines = content.split("\n")
        setFile(fileIn)
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
        /*
        // Create a new FormData instance
        const formData = new FormData()
        // Append the file to the formData
        formData.append("file", file)

        // Send the file to the backend
        const response = await fetch("http://localhost:3333/classes/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error("File upload failed")
        }*/
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
              onClick={async () => {
                console.log(selectedValues)
                console.log(listOptions)
                let strSelectedValues = "{"

                for (let key in selectedValues) {
                  if (selectedValues.hasOwnProperty(key)) {
                    // Verifica se a chave é realmente uma propriedade do objeto e não da cadeia de protótipos
                    console.log(`Key: ${key}, Value: ${selectedValues[key]}`)
                    // Reduz o tamamnho da string removendo que que está depois do ' ('

                    strSelectedValues += `"${listOptions[key].trimEnd()}":"${
                      selectedValues[key]
                    }", `
                  }
                }
                // remove the last comma and space
                strSelectedValues = strSelectedValues.slice(0, -2)
                strSelectedValues += "}"
                console.log(strSelectedValues)
                console.log(JSON.parse(strSelectedValues))

                // Create a new FormData instance
                const formData = new FormData()
                // Append the file to the formData
                formData.append("file", file)
                formData.append("listUnits", strSelectedValues)

                // Send the file to the backend
                const response = await fetch(
                  "http://localhost:3333/classes/upload",
                  {
                    method: "POST",
                    body: formData,
                  }
                )

                if (!response.ok) {
                  throw new Error("File upload failed")
                }
                //TODO: Adicionar mensagem de sucesso
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
