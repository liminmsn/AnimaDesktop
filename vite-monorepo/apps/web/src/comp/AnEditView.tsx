import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@workspace/ui/components/empty";
import { Button } from "@workspace/ui/components/button";
import { Textarea } from "@workspace/ui/components/textarea";
import { IconPhotoAi } from "@tabler/icons-react";
import AnFileLinkView from "@/comp/AnFileLinkView";
import { useEditContext } from "@/hooks/EditProvider";
import { ArrowUpRightIcon } from "lucide-react";


async function test() {
    const result = await window.pywebview.api.create_png("masterpiece, best quality, a peaceful Japanese garden", "C:/Users/limin/Desktop/test.png");
    console.log(result);
}

export default function () {
    const { state } = useEditContext()
    if (!state.current_file) {
        return <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <IconPhotoAi />
                </EmptyMedia>
                <EmptyTitle>未选择png文件</EmptyTitle>
                <EmptyDescription>
                    左侧文件栏，选择一个文件作为输出载体,
                    绘图集里面可以创建模板载体文件
                </EmptyDescription>
            </EmptyHeader>
            <Button variant="link" className="text-muted-foreground" size="sm" nativeButton={false} render={<span>帮助<ArrowUpRightIcon /></span>} />
        </Empty>
    }

    return <div className="p-2">
        <AnFileLinkView />
        <h1 className="font-medium text-sm leading-loose">提示词</h1>
        <Textarea className="h-40" placeholder="这里输入提示词" />
        <Button className="mt-2" onClick={test}><IconPhotoAi />生成</Button>
    </div>
}