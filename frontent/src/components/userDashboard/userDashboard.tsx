import { toast, Bounce } from "react-toastify";
const Dashboard = () => {
  return (
    <>
    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti quas ex veniam!</h1>
    Dashboard
    <button
  type="button"
  onClick={() =>
    toast.info("🦄 Wow so easy!", {
      position: "bottom-right",
      transition: Bounce,
    })
  }
>
  Test Toast
</button>
    </>
  )
}

export default Dashboard
