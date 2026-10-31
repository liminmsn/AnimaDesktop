import { Menubar, MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarTrigger } from "@workspace/ui/components/menubar"
import { Badge } from "@workspace/ui/components/badge"
import { useRouter } from "@/hooks/RouterProvider"

export default function () {
    const { reducer } = useRouter()

    return <Menubar className="rounded-none">
        <MenubarMenu>
            <MenubarTrigger className="hght">本地绘画师</MenubarTrigger>
            <MenubarContent>
                <MenubarGroup>
                    <MenubarItem>
                        <span className="text-nowrap" onClick={() => {
                            reducer.dispatch({ type: "RESET" })
                        }}>关闭项目</span>
                    </MenubarItem>
                    <MenubarItem>
                        <span className="text-nowrap" onClick={() => {
                            window.pywebview.api.exit_app()
                        }}>退出</span>
                    </MenubarItem>
                </MenubarGroup>
            </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
            <MenubarTrigger>
                <span>关于</span>
            </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
            {
                reducer.state.path &&
                <Badge>
                    {reducer.state.path}
                </Badge>
            }
        </MenubarMenu>
    </Menubar>
}
