import { Menubar, MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarTrigger } from "@workspace/ui/components/menubar"
// import { Kbd, KbdGroup } from "@workspace/ui/components/kbd"
import { IconPhotoAi } from "@tabler/icons-react"

export default function () {
    return <Menubar className="rounded-none">
        <MenubarMenu disabled={true}>
            <MenubarTrigger className="px-0"><IconPhotoAi /></MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
            <MenubarTrigger className="hght">本地绘画师</MenubarTrigger>
            <MenubarContent>
                <MenubarGroup>
                    <MenubarItem>
                        <span className="text-nowrap">退出程序</span>
                        {/* <MenubarShortcut>
                            <KbdGroup>
                                <Kbd>Ctrl</Kbd>
                                <span>+</span>
                                <Kbd>Q</Kbd>
                            </KbdGroup>
                        </MenubarShortcut> */}
                    </MenubarItem>
                </MenubarGroup>
            </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
            <MenubarTrigger>
                <span>关于</span>
            </MenubarTrigger>
        </MenubarMenu>
    </Menubar>
}
