import AnTopBar from "./comp/AnTopBar";
import { useRouter } from "./hooks/RouterProvider";

export default function () {
  const { current } = useRouter()
  return <div className="h-screen flex flex-col">
    <AnTopBar />
    {current}
  </div>
}
