import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@workspace/ui/components/empty"
import { ArrowUpRightIcon } from "lucide-react"
import { IconFolder, IconFolderPlus } from "@tabler/icons-react"
import { Button } from "@workspace/ui/components/button"
import logo from "@/assets/logo.png"
import { useRouter } from "@/hooks/RouterProvider"
import { Card } from "@workspace/ui/components/card"
import { FieldLabel } from "@workspace/ui/components/field"
import { Checkbox } from "@workspace/ui/components/checkbox"

export default function () {
    const { reducer } = useRouter()
    const { state } = reducer
    const { path_hostory } = reducer.state
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
            {
                path_hostory.length == 0 && <>
                    <div className="flex items-center gap-1.5">
                        <EmptyMedia variant="icon" >
                            <IconFolderPlus />
                        </EmptyMedia>
                        <EmptyTitle>暂无项目</EmptyTitle>
                    </div>
                    <EmptyDescription>
                        导入您的第一个项目吧！
                    </EmptyDescription>
                </>
            }
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
            <Button variant="default" className="hght" onClick={select_folder}>打开目录</Button>
        </EmptyContent>
        <div className="text-muted-foreground font-mono text-xs">
            (Press <kbd>d</kbd> to toggle dark mode)
        </div>
        <Button disabled variant="link" className="text-muted-foreground" size="sm" nativeButton={false} render={<a href="#">帮助<ArrowUpRightIcon /></a>} />
        <div className="flex gap-x-1.5">
            <Checkbox checked={state.remember} onCheckedChange={(checked) => reducer.dispatch({ type: "REMEMBER", checked })} />
            <FieldLabel>自动打开上次项目</FieldLabel>
        </div>
        {
            path_hostory.length > 0 &&
            <Card className="gap-y-0 py-1">
                <ul className="text-left px-1 overflow-y-auto max-h-45 min-h-45 max-w-65">
                    {path_hostory.map(item => {
                        return <FieldLabel
                            className="cursor-pointer border-b py-1 flex items-center gap-x-1.5"
                            onClick={() => reducer.dispatch({ type: "OPEN_PATH", path: item })}
                            key={item}
                            title={`${item}`} >
                            <EmptyMedia variant="icon" className="mb-0">
                                <IconFolder />
                            </EmptyMedia>
                            <span className="overflow-hidden text-ellipsis">{item}</span>
                        </FieldLabel>
                    }
                    )}
                </ul>
            </Card>
        }
    </Empty>
}
