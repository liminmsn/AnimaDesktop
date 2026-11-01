import CoumtTItle from "@/components/CoumtTItle"
import { useEditContext } from "@/hooks/EditProvider"

export default function () {
    const { state } = useEditContext()
    return <CoumtTItle label={state.cureent_dir ? `本次生成会写入到[${state.cureent_dir}]目录下` : "稍等以一下下..."} />
}
