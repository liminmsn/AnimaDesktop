import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@workspace/ui/components/resizable"
import AnDirView from "@/comp/AnDirView"
import AnEditView from "@/comp/AnEditView"
import AnFileLinkView from "@/comp/AnFileLinkView"
import AnInfoView from "@/comp/AnInfoView"

export default function (_args:any) {
    console.log(_args);
    return <ResizablePanelGroup orientation="horizontal" className="w-full">
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
}