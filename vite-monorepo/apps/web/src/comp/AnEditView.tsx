import { Button } from "@workspace/ui/components/button";
import { IconPhotoAi } from "@tabler/icons-react";
import AnFileLinkView from "@/comp/AnFileLinkView";
import { useEditContext } from "@/hooks/EditProvider";

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

export default function () {
    const { state, dispatch } = useEditContext()
    
    async function fun_generate() {
        dispatch({ type: "SET_GENERATE", generate: true })
        const result = await window.pywebview.api.create_png(test_obj);
        console.log(result);
        dispatch({ type: "SET_GENERATE", generate: false })
    }

    return <>
        <AnFileLinkView />
        <div className="p-2">
            <div>

            </div>
            <Button className="mt-2" disabled={state.generate} onClick={fun_generate}><IconPhotoAi />生成</Button>
        </div>
    </>
}