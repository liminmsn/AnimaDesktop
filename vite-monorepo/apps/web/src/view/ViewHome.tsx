import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@workspace/ui/components/empty"
import { ArrowUpRightIcon } from "lucide-react"
import { IconFolderPlus } from "@tabler/icons-react"
import { Button } from "@workspace/ui/components/button"
import logo from "@/assets/logo.png"
import { useRouter } from "@/hooks/RouterProvider"

export default function () {
    const { reducer } = useRouter()
    function select_folder() {
        window.pywebview.api.select_folder().then(path => {
            if (path) {
                console.log(path);
                reducer.dispatch({ type: "OPEN_PATH", path })
            }
        })
    }

    return <Empty className="pt-0">
        <EmptyHeader>
            <img width={165} srcSet={logo} />
            <div className="flex items-center gap-1.5">
                <EmptyMedia variant="icon" >
                    <IconFolderPlus />
                </EmptyMedia>
                <EmptyTitle>暂无项目</EmptyTitle>
            </div>
            <EmptyDescription>
                导入您的第一个项目吧！
            </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
            <Button variant="default" className="hght" onClick={select_folder}>打开目录</Button>
        </EmptyContent>
        <div className="text-muted-foreground font-mono text-xs">
            (Press <kbd>d</kbd> to toggle dark mode)
        </div>
        <Button disabled variant="link" className="text-muted-foreground" size="sm" nativeButton={false} render={<a href="#">帮助<ArrowUpRightIcon /></a>} />
    </Empty>
}
