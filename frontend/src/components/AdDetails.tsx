import { useParams } from "react-router"

export const AdDetails = () => {
    const { id } = useParams()
  return (
    <div>AdDetails { id }</div>
  )
}
