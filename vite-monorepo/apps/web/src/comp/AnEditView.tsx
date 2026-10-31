import { IconPhotoAi } from "@tabler/icons-react";
import { Button } from "@workspace/ui/components/button";
import { Textarea } from "@workspace/ui/components/textarea";


async function test() {
    const result = await window.pywebview.api.create_png("masterpiece, best quality, a peaceful Japanese garden", "C:/Users/limin/Desktop/test.png");
    console.log(result);
}

export default function () {
    return <div>
        <h1 className="font-medium text-sm leading-loose">提示词</h1>
        <Textarea className="h-40" placeholder="这里输入提示词" />
        <Button className="mt-2" onClick={test}><IconPhotoAi />生成</Button>
    </div>
}