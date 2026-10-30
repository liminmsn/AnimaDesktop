import { Menubar, MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarShortcut, MenubarTrigger } from "@workspace/ui/components/menubar"
import { Kbd, KbdGroup } from "@workspace/ui/components/kbd"

export default function () {
    return <Menubar className="rounded-none">
        <MenubarMenu>
            <MenubarTrigger>本地绘画师</MenubarTrigger>
            <MenubarContent>
                <MenubarGroup>
                    <MenubarItem>
                        <span className="text-nowrap">退出程序</span>
                        <MenubarShortcut>
                            <KbdGroup>
                                <Kbd>Ctrl</Kbd>
                                <span>+</span>
                                <Kbd>Q</Kbd>
                            </KbdGroup>
                        </MenubarShortcut>
                    </MenubarItem>
                </MenubarGroup>
            </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
            <MenubarTrigger>关于</MenubarTrigger>
        </MenubarMenu>
    </Menubar>
}
