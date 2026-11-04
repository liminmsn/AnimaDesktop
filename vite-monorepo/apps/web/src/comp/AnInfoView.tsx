import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@workspace/ui/components/resizable"
import { Empty, EmptyDescription, EmptyMedia } from "@workspace/ui/components/empty"
import { useEditContext } from "@/hooks/EditProvider"
import { IconFolderCode } from "@tabler/icons-react"
import CoumtTItle from "@/components/CoumtTItle"
import AnInfoViewLog from "./AnInfoViewLog"
import { useEffect, useState } from "react"
// import { Label } from "@workspace/ui/components/label"
export default function () {
  const { state } = useEditContext()

  const [view_img, setViewImg] = useState()

  useEffect(() => {
    if (state.current_file) {
      window.pywebview.api.view_image(state.current_file).then(setViewImg)
    }
  }, [state.current_file])

  return <ResizablePanelGroup orientation="vertical">
    <ResizablePanel defaultSize="35%">
      <div className="absolute to-0"><CoumtTItle label="预览" /></div>
      {
        view_img ?
          <img className="w-full h-full border-none" style={{ objectFit: "scale-down" }} src={view_img} /> :
          <Empty className="gap-y-0 pt-15">
            <EmptyMedia variant="icon">
              <IconFolderCode />
            </EmptyMedia>
            <EmptyDescription>请选择一个图像</EmptyDescription>
          </Empty>
      }
    </ResizablePanel>
    <ResizableHandle withHandle />
    <ResizablePanel defaultSize="65%">
      <AnInfoViewLog />
    </ResizablePanel>
  </ResizablePanelGroup>
}