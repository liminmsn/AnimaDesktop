import { useEditContext } from "@/hooks/EditProvider"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@workspace/ui/components/breadcrumb"

export default function () {
    const { state } = useEditContext()
    const path_arr = state.current_file.split("/")
    return <Breadcrumb>
        <BreadcrumbList>
            {
                path_arr.map((item, idx) => {
                    return <span key={item} className="flex items-center">
                        <BreadcrumbItem>
                            {item}
                        </BreadcrumbItem>
                        {idx != (path_arr.length - 1) && <BreadcrumbSeparator />}
                    </span>
                })
            }
            <BreadcrumbItem>
                <sub>[本次生成会写入该文件]</sub>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
}
