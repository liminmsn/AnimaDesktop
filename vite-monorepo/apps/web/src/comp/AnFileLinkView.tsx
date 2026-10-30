import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@workspace/ui/components/breadcrumb"

export default function () {
    return <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
                home
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                test
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                a.png
            </BreadcrumbItem>
            <BreadcrumbItem>
                <sub>[本次生成会写入该文件]</sub>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
}
