import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@workspace/ui/components/empty"
import { IconFolder, IconFolderPlus } from "@tabler/icons-react"
import { Button } from "@workspace/ui/components/button"
import logo from "@/assets/logo.png"
import { useRouter } from "@/hooks/RouterProvider"
import { Card } from "@workspace/ui/components/card"
import { FieldLabel } from "@workspace/ui/components/field"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Label } from "@workspace/ui/components/label"

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
        <div className="">
            <img width={155} srcSet={logo} />
            <Card className="absolute right-20 top-15 px-3 max-w-55">
                <Label className="text-left">Hi～我是绘图师🥰<br/>
                    主打 Q 版拟人、日系动漫风格 LOGO 与图标设计。
                    喜欢把想法揉成软萌又有记忆点的小形象，偏爱简洁好识别的构图，适配 1:1 方形图标。
                    依托 Anima-P3-Turbo-AIO-Q4_K 出图，一起把脑洞变成好看的画面！</Label>
            </Card>
        </div>
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
        <Button variant="default" className="hght" onClick={select_folder}><IconFolder />打开目录</Button>
        {/* <EmptyContent className="flex-row justify-center gap-2">
        </EmptyContent> */}
        {/* <div className="text-muted-foreground font-mono text-xs">
            (Press <kbd>d</kbd> to toggle dark mode)
        </div> */}
        {/* <Button disabled variant="link" className="text-muted-foreground" size="sm" nativeButton={false} render={<a href="#">帮助<ArrowUpRightIcon /></a>} /> */}
        <div className="flex gap-x-1.5">
            <Checkbox checked={state.remember} onCheckedChange={(checked) => reducer.dispatch({ type: "REMEMBER", checked })} />
            <FieldLabel>自动打开上次项目</FieldLabel>
        </div>
        {
            path_hostory.length > 0 &&
            <Card className="gap-y-0 py-1">
                <ul className="text-left px-1 overflow-y-auto max-h-45 min-h-45">
                    {path_hostory.map(item => {
                        return <FieldLabel
                            className="cursor-pointer border-b py-1 flex items-center gap-x-1.5"
                            onClick={() => reducer.dispatch({ type: "OPEN_PATH", path: item })}
                            key={item}
                            title={`${item}`} >
                            <EmptyMedia variant="icon" className="mb-0">
                                <IconFolder />
                            </EmptyMedia>
                            <span className="block w-55 max-w-55 overflow-hidden text-ellipsis">{item}</span>
                        </FieldLabel>
                    }
                    )}
                </ul>
            </Card>
        }
    </Empty>
}
