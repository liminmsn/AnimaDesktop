import { Menubar, MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarTrigger } from "@workspace/ui/components/menubar"
import { useRouter } from "@/hooks/RouterProvider"

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
                <div className="bg-primary text-primary-foreground text-[9pt] rounded-sm px-1">{path}</div>
            </MenubarMenu>
        }
    </Menubar>
}
