import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@workspace/ui/components/resizable"
import AnTopBar from "./comp/AnTopBar";
import AnInfoView from "./comp/AnInfoView";
import AnDirView from "./comp/AnDirView";
import AnFileLinkView from "./comp/AnFileLinkView";
import AnEditView from "./comp/AnEditView";


export default function () {
  return <div className="h-screen flex flex-col">
    <AnTopBar />
    <ResizablePanelGroup
      orientation="horizontal"
      className="w-full"
    >
      <ResizablePanel minSize="25%">
        <AnDirView />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize="50%">
        <div className="px-2 mt-1">
          <AnFileLinkView />
          <AnEditView />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="30%">
        <AnInfoView />
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
}
