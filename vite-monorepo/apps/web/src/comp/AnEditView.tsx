import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@workspace/ui/components/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { Textarea } from "@workspace/ui/components/textarea"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button";
import { IconPhotoAi } from "@tabler/icons-react";
import AnFileLinkView from "@/comp/AnFileLinkView";
import { useEditContext } from "@/hooks/EditProvider";
import { useState } from "react";
import { joinPathDir } from "@/lib/path";
import { useRouter } from "@/hooks/RouterProvider";
import { timeFileName } from "@/lib/file";

const schedulers = [
    { label: "smoothstep", value: "smoothstep" },
    { label: "karras", value: "karras" },
    { label: "exponential", value: "exponential" },
    { label: "sgm_uniform", value: "sgm_uniform" },
    { label: "simple", value: "simple" },
    { label: "ddim_uniform", value: "ddim_uniform" },
    { label: "beta", value: "beta" },
    { label: "normal", value: "normal" },
    { label: "linear_quadratic", value: "linear_quadratic" },
]

const samplers = [
    { label: "er_sde", value: "er_sde" },
    { label: "euler", value: "euler" },
    { label: "euler_ancestral", value: "euler_ancestral" },
    { label: "heun", value: "heun" },
    { label: "dpm_2", value: "dpm_2" },
    { label: "dpm_2_ancestral", value: "dpm_2_ancestral" },
    { label: "lms", value: "lms" },
    { label: "dpmpp_2m", value: "dpmpp_2m" },
    { label: "dpmpp_2m_sde", value: "dpmpp_2m_sde" },
    { label: "dpmpp_sde", value: "dpmpp_sde" },
    { label: "ddim", value: "ddim" },
    { label: "uni_pc", value: "uni_pc" },
]

export type GenParams = {
    w: number
    h: number
    steps: number
    cfg_scale: number
    seed: number
    scheduler: string
    sampling_method: string
    out_file: string
    prompt: string
}

const defaultParams: GenParams = {
    w: 500,
    h: 500,
    steps: 16,
    cfg_scale: 1,
    seed: 666,
    scheduler: "smoothstep",
    sampling_method: "er_sde",
    out_file: "",
    prompt: "",
}


export default function () {
    const { reducer } = useRouter()
    const { state, dispatch } = useEditContext()
    const [form, setForm] = useState<GenParams>(defaultParams)

    const [errors, setErrors] = useState<Partial<Record<keyof GenParams, string>>>({})

    function validate(): boolean {
        const e: Partial<Record<keyof GenParams, string>> = {}
        if (!form.w) e.w = "宽度必填"
        if (!form.h) e.h = "高度必填"
        if (!form.steps) e.steps = "步数必填"
        if (form.cfg_scale === null || form.cfg_scale === undefined || isNaN(form.cfg_scale)) e.cfg_scale = "CFG 必填"
        if (!form.seed && form.seed !== 0) e.seed = "种子必填"
        if (!form.scheduler) e.scheduler = "调度器必填"
        if (!form.sampling_method) e.sampling_method = "采样方法必填"
        if (!form.prompt.trim()) e.prompt = "提示词必填"
        setErrors(e)
        return Object.keys(e).length === 0
    }

    function setField<K extends keyof GenParams>(key: K, value: GenParams[K]) {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    function setNumber(key: keyof GenParams, raw: string, integer = true) {
        if (raw === "") {
            setField(key, 0 as never)
            return
        }
        const n = integer ? parseInt(raw, 10) : parseFloat(raw)
        setField(key, (isNaN(n) ? 0 : n) as never)
    }

    async function fun_generate() {
        if (!validate()) return
        dispatch({ type: "SET_GENERATE", generate: true })
        console.log(form);
        //设置输出文件
        form.out_file = `${joinPathDir(reducer.state.path!, state.cureent_dir!)}${timeFileName()}`;
        window.pywebview.api.create_png(form).then((result: { code: number; out_file: string; msg: string }) => {
            setTimeout(() => {
                dispatch({ type: "SELECT_FILE", path: form.out_file })
            }, 1000);
            console.log(result);
            dispatch({ type: "SET_GENERATE", generate: false })
        });
    }

    return <>
        <AnFileLinkView />
        <div className="p-2">
            <form onSubmit={(e) => e.preventDefault()}>
                <FieldGroup>
                    <FieldSet>
                        <FieldGroup className="grid grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel htmlFor="gen-w">宽度 (w)</FieldLabel>
                                <Input
                                    id="gen-w"
                                    type="number"
                                    min={64}
                                    step={64}
                                    value={form.w}
                                    onChange={(e) => setNumber("w", e.target.value)}
                                />
                                <FieldError>{errors.w}</FieldError>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="gen-h">高度 (h)</FieldLabel>
                                <Input
                                    id="gen-h"
                                    type="number"
                                    min={64}
                                    step={64}
                                    value={form.h}
                                    onChange={(e) => setNumber("h", e.target.value)}
                                />
                                <FieldError>{errors.h}</FieldError>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="gen-steps">步数 (steps)</FieldLabel>
                                <Input
                                    id="gen-steps"
                                    type="number"
                                    min={1}
                                    value={form.steps}
                                    onChange={(e) => setNumber("steps", e.target.value)}
                                />
                                <FieldError>{errors.steps}</FieldError>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="gen-cfg">CFG 强度</FieldLabel>
                                <Input
                                    id="gen-cfg"
                                    type="number"
                                    min={0}
                                    step={0.1}
                                    value={form.cfg_scale}
                                    onChange={(e) => setNumber("cfg_scale", e.target.value, false)}
                                />
                                <FieldError>{errors.cfg_scale}</FieldError>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="gen-scheduler">调度器</FieldLabel>
                                <Select value={form.scheduler} onValueChange={(v) => setField("scheduler", String(v))}>
                                    <SelectTrigger id="gen-scheduler">
                                        <SelectValue placeholder="选择调度器" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {schedulers.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FieldError>{errors.scheduler}</FieldError>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="gen-sampler">采样方法</FieldLabel>
                                <Select value={form.sampling_method} onValueChange={(v) => setField("sampling_method", String(v))}                                >
                                    <SelectTrigger id="gen-sampler">
                                        <SelectValue placeholder="选择采样方法" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {samplers.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FieldError>{errors.sampling_method}</FieldError>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="gen-seed">种子 (seed)</FieldLabel>
                                <Input
                                    id="gen-seed"
                                    type="number"
                                    min={0}
                                    value={form.seed}
                                    onChange={(e) => setNumber("seed", e.target.value)}
                                />
                                {/* <FieldDescription>
                                    相同种子 + 相同提示词可复现同一张图
                                </FieldDescription> */}
                                <FieldError>{errors.seed}</FieldError>
                            </Field>

                            {/* <Field>
                                <FieldLabel htmlFor="gen-out">输出文件 (out_file)</FieldLabel>
                                <Input
                                    id="gen-out"
                                    readOnly
                                    placeholder="生成后自动填入"
                                    value={form.out_file}
                                />
                            </Field> */}
                        </FieldGroup>
                    </FieldSet>

                    <FieldSet>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="gen-prompt">提示词 (prompt)</FieldLabel>
                                <Textarea
                                    id="gen-prompt"
                                    placeholder="masterpiece, best quality, ..."
                                    className="resize-none min-h-24"
                                    value={form.prompt}
                                    onChange={(e) => setField("prompt", e.target.value)}
                                />
                                <FieldError>{errors.prompt}</FieldError>
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                </FieldGroup>
            </form>
            <Button className="mt-2" disabled={state.generate} onClick={fun_generate}>
                <IconPhotoAi /> 生成
            </Button>
        </div>
    </>
}