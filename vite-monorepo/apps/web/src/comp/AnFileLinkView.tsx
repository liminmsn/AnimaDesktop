import { useEditContext } from "@/hooks/EditProvider"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@workspace/ui/components/breadcrumb"

export default function () {
    const { state } = useEditContext()
    return <Breadcrumb>
        <BreadcrumbList className="gap-0! items-start">
            <BreadcrumbSeparator className="py-0.5 bg-primary text-primary-foreground" />
            <BreadcrumbItem className="px-1.5 text-[8pt] bg-primary-foreground text-primary rounded-br-sm">
                {state.cureent_dir ? `本次生成会写入到[${state.cureent_dir}]目录下`:"稍等以一下下..."}
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
}
