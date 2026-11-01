import { Button } from "@workspace/ui/components/button";
import { Textarea } from "@workspace/ui/components/textarea";
import { IconPhotoAi } from "@tabler/icons-react";
import AnFileLinkView from "@/comp/AnFileLinkView";

const test_obj = {
    w: 500,
    h: 500,
    steps: 16,
    cfg_scale: 1,
    seed: 666,
    scheduler: "smoothstep",
    sampling_method: "er_sde",
    out_file: "C:/Users/limin/Desktop/test/test.png",
    prompt: "masterpiece, best quality, a peaceful Japanese garden"
}

async function test() {
    const result = await window.pywebview.api.create_png(test_obj);
    console.log(result);
}


export default function () {
    return <>
        <AnFileLinkView />
        <div className="p-2">
            <h1 className="font-medium text-sm leading-loose">提示词</h1>
            <Textarea className="h-40" placeholder="这里输入提示词" />
            <Button className="mt-2" onClick={test}><IconPhotoAi />生成</Button>
        </div>
    </>
}