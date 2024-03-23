import { getAPIClient } from "../../utils/axiosapi"
import { parseCookies } from "nookies"

import { styled } from "@mui/system"
import Box from "@mui/material/Box"
import { blue } from "@mui/material/colors"

import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { readAsText } from "promise-file-reader"

import MainCard from "../../components/layout/MainCard"
import {
  Alert,
  AlertTitle,
  Button,
  IconButton,
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
  Typography,
} from "@mui/material"
import { Close } from "@mui/icons-material"

const StyledBox = styled(Box)(({ theme }) => ({
  border: "3px dashed",
  borderColor: blue[600],
  padding: theme.spacing(4),
  marginBottom: theme.spacing(5),
  marginTop: theme.spacing(5),
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: blue[50],
  },
}))

export default function Configuration() {
  const [openAlert, setOpenAlert] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState("success")
  const [alertMessage, setAlertMessage] = useState("")
  const [alertTitle, setAlertTitle] = useState("")
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
          <Typography variant="h5">Escolha o arquivo CSV</Typography>
          <StyledBox>
            <Typography variant="body1">
              Arraste e solte um arquivo CSV aqui, ou clique para selecionar um
              arquivo.
            </Typography>
          </StyledBox>
        </div>
        {isUploaded ? (
          <>
            <Typography variant="h5">
              Escolha a unidade de cada lista
            </Typography>
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
              }}
            >
              Cadastrar
            </Button>
          </>
        ) : (
          " - - - "
        )}
        <Box
          sx={{
            marginTop: "10px",
            marginBottom: 4,
            textAlign: "left",
          }}
        >
          {openAlert && (
            <Alert
              sx={{
                width: "100%",
              }}
              severity={alertSeverity}
              variant="filled"
              action={
                <IconButton size="small" onClick={() => setOpenAlert(false)}>
                  <Close />
                </IconButton>
              }
            >
              <AlertTitle>{alertTitle}</AlertTitle>
              {alertMessage}
            </Alert>
          )}
        </Box>
      </MainCard>
    </>
  )
}

export async function getServerSideProps(context) {
  const apiClient = getAPIClient(context)
  const { ["nextautht1.token"]: token } = parseCookies(context)
  console.log(token)

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}
