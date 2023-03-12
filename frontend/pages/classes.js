import { AuthContext } from "../contexts/AuthContext"
import { useContext } from "react"

export default function Classes() {
   const { user } = useContext(AuthContext)
   return (
      <>
         <h1>Infos</h1>
         <p>{user?.email} </p>
         <p>{user?.name}</p>
      </>
   )
}

export async function getServerSideProps(context) {
   console.log("Server side: ", context.req.cookies)
   return {
      props: {},
   }
}
