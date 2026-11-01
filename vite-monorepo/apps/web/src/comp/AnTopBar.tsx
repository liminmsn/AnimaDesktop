import { Menubar, MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarTrigger } from "@workspace/ui/components/menubar"
import { useRouter } from "@/hooks/RouterProvider"
import { BreadcrumbItem, BreadcrumbList } from "@workspace/ui/components/breadcrumb"
import { FolderIcon } from "lucide-react"

export default function () {
    const { reducer } = useRouter()
    const { path } = reducer.state

    return <Menubar className="rounded-none">
        <MenubarMenu>
            <MenubarTrigger className="hght">本地绘画师</MenubarTrigger>
            <MenubarContent>
                <MenubarGroup>
                    <MenubarItem disabled={!path} onClick={() => { reducer.dispatch({ type: "RESET" }) }}>
                        关闭项目
                    </MenubarItem>
                    <MenubarItem onClick={() => { window.pywebview.api.exit_app() }}>
                        退出程序
                    </MenubarItem>
                </MenubarGroup>
            </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
            <MenubarTrigger>
                说明
            </MenubarTrigger>
        </MenubarMenu>
        {path &&
            <MenubarMenu>
                <BreadcrumbList className="gap-0! items-start">
                    <div className="bg-primary px-1">
                        <FolderIcon size={15} color="var(--primary-foreground)" />
                    </div>
                    <BreadcrumbItem className="px-1.5 text-[8pt] bg-primary-foreground text-primary rounded-br-sm">
                        {path}
                    </BreadcrumbItem>
                </BreadcrumbList>
            </MenubarMenu>
        }
    </Menubar>
}
