import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@workspace/ui/components/resizable"
import AnInfoViewLog from "./AnInfoViewLog"
export default function () {
  return <ResizablePanelGroup orientation="vertical">
    <ResizablePanel defaultSize="25%">
      <div className="flex h-full items-center justify-center p-6">
        <span className="font-semibold">Two</span>
      </div>
    </ResizablePanel>
    <ResizableHandle withHandle />
    {/* <ResizablePanel defaultSize="25%">
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle /> */}
    <ResizablePanel defaultSize="50%">
      <AnInfoViewLog />
    </ResizablePanel>
  </ResizablePanelGroup>
}