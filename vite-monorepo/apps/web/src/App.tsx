import AnTopBar from "./comp/AnTopBar";
import { useRouter } from "./hooks/RouterProvider";

export default function () {
  const { current: Component } = useRouter()
  return <div className="h-screen flex flex-col">
    <AnTopBar />
    <Component />
  </div>
}
