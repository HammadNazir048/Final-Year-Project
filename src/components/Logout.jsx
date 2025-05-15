import { doLogout } from "@/app/actions"

const Logout = () => {
  return (
    <form action={doLogout}>
        <button className="bg-gray-700 my-1 text-white p-1 rounded" type="submit" >Logout</button>
    </form>
  )
}
export default Logout