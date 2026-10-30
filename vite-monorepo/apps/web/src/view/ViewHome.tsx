import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@workspace/ui/components/dialog"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@workspace/ui/components/empty"
import { ArrowUpRightIcon } from "lucide-react"
import { IconFolderPlus } from "@tabler/icons-react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field"

async function select_folder() {
    const result = await window.pywebview.api.select_folder()
    console.log(result);
}


export default function (_args: any) {
    console.log(_args);
    return <Empty className="pt-0">
        <EmptyHeader>
            <EmptyMedia variant="icon">
                <IconFolderPlus />
            </EmptyMedia>
            <EmptyTitle>暂无项目</EmptyTitle>
            <EmptyDescription>
                立即创建、导入您的第一个项目吧！
            </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
            <Dialog>
                <DialogTrigger>
                    <div className="border  p-2.5 py-1.5 rounded-xl bg-primary hght text-primary-foreground">
                        创建项目
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>

                        <FieldGroup className="gap-y-3 mt-2">
                            <Field>
                                <FieldLabel htmlFor="fieldgroup-path">存放目录</FieldLabel>
                                <div className="flex gap-x-1.5">
                                    <Input id="fieldgroup-path" placeholder="系统路径" />
                                    <Button onClick={select_folder}>选择</Button>
                                </div>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="fieldgroup-name">项目名称</FieldLabel>
                                <Input id="fieldgroup-name" placeholder="易记的名称" />
                            </Field>
                            <Field orientation="horizontal">
                                <Button type="reset" variant="outline">清空</Button>
                                <Button type="submit">确定</Button>
                            </Field>
                        </FieldGroup>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Button variant="outline" className="hght">导入项目</Button>
        </EmptyContent>
        <Button disabled variant="link" className="text-muted-foreground" size="sm" nativeButton={false} render={<a href="#">帮助<ArrowUpRightIcon /></a>} />
    </Empty>
}
