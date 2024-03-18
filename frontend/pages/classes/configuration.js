import { getAPIClient } from "../../utils/axiosapi"
import { parseCookies } from "nookies"

import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { readAsText } from "promise-file-reader"

import MainCard from "../../components/layout/MainCard"

export default function Configuration() {
  const [fileLines, setFileLines] = useState([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: ".csv, .txt",
    onDrop: async (acceptedFiles) => {
      try {
        const file = acceptedFiles[0]
        const content = await readAsText(file)
        const lines = content.split("\n")
        setFileLines(lines)
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
          {fileLines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </MainCard>
    </>
  )
}
