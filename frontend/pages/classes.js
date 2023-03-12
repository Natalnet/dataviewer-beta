import { AuthContext } from "../contexts/AuthContext"
import { useContext } from "react"
import { getAPIClient } from "../utils/axiosapi"
import { parseCookies } from "nookies"

export default function Classes() {
   const { user } = useContext(AuthContext)
   return (
      <>
         <h1>Infos</h1>
         <p>{user?.userEmail} </p>
         <p>{user?.name}</p>
      </>
   )
}

export async function getServerSideProps(context) {
   const apiClient = getAPIClient(context)
   const { ["nextautht1.token"]: token } = parseCookies(context)

   if (!token) {
      return {
         redirect: {
            destination: "/",
            permanent: false,
         },
      }
   }

   //console.log("Server side token: ", token)
   return {
      props: {},
   }
}
