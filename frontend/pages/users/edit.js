import EditForm from '../../components/user/EditForm'
import MainCard from '../../components/layout/MainCard'
import { getAPIClient } from '../../utils/axiosapi'
import { parseCookies } from 'nookies'

import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'

export default function EditUser({ info }) {
  const { updateUser } = useContext(AuthContext)
  async function updateInfo(dataToUp) {
    const name = 'Teste N'
    const avatar = 'Teste A'
    const registrationNumber = 'Teste R'
    console.log(dataToUp)
    await updateUser(dataToUp.name,dataToUp.registrationNumber,dataToUp.avatar)
  }

  return (
    <>
      <MainCard title="Editar informações">
        <EditForm info={info} updateData={updateInfo} />
      </MainCard>
    </>
  )
}

export async function getServerSideProps(context) {
  const apiClient = getAPIClient(context)
  const { ['nextautht1.token']: token } = parseCookies(context)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const { data } = await apiClient.get('users/info')
 
  let info = data

  return {
    props: {
      info
    }
  }
}
