import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@workspace/ui/components/breadcrumb";

export default function ({ label }: { label: string }) {
    return <Breadcrumb className="sticky top-0">
        <BreadcrumbList className="gap-0! items-start">
            <BreadcrumbSeparator className="py-0.5 bg-primary text-primary-foreground" />
            <BreadcrumbItem className="px-1.5 text-[8pt] bg-primary-foreground text-primary rounded-br-sm">
                {label}
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
}