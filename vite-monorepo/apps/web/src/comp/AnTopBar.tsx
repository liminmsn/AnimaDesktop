import { Menubar, MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarTrigger } from "@workspace/ui/components/menubar"
import { BreadcrumbItem, BreadcrumbList } from "@workspace/ui/components/breadcrumb"
import { useRouter } from "@/hooks/RouterProvider"
import { FolderIcon } from "lucide-react"

export default function () {
    const { reducer } = useRouter()
    const { path } = reducer.state

    return <Menubar className="rounded-none">
        <MenubarMenu>
            <MenubarTrigger className="font-bold">本地绘画师</MenubarTrigger>
            <MenubarContent>
                <MenubarGroup>
                    <MenubarItem disabled={!path} onClick={() => { reducer.dispatch({ type: "RESET" }) }}>
                        关闭工程
                    </MenubarItem>
                    <MenubarItem>
                        说明
                    </MenubarItem>
                    <MenubarItem onClick={() => { window.pywebview.api.exit_app() }}>
                        退出
                    </MenubarItem>
                </MenubarGroup>
            </MenubarContent>
        </MenubarMenu>
        {path &&
            <MenubarMenu>
                <BreadcrumbList className="gap-0! items-start">
                    <div className="bg-primary p-1">
                        <FolderIcon size={12} color="var(--primary-foreground)" />
                    </div>
                    <BreadcrumbItem className="px-1.5 text-[10.5pt] bg-primary-foreground text-primary rounded-r-sm">
                        <span className="yw">{path}</span>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </MenubarMenu>
        }
    </Menubar>
}
