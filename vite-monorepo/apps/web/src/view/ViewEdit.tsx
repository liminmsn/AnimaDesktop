import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@workspace/ui/components/resizable"
import EditProvider from "@/hooks/EditProvider"
import AnDirView from "@/comp/AnDirView"
import AnEditView from "@/comp/AnEditView"
import AnInfoView from "@/comp/AnInfoView"

export default function () {
    return <ResizablePanelGroup orientation="horizontal" className="w-full">
        <EditProvider>
            <ResizablePanel minSize="25%">
                <AnDirView />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel minSize="50%">
                <AnEditView />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize="30%">
                <AnInfoView />
            </ResizablePanel>
        </EditProvider>
    </ResizablePanelGroup>
}