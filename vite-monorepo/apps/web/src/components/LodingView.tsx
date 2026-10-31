import { Label } from "@workspace/ui/components/label"
import { LoaderPinwheel } from "lucide-react"
import { cn } from "cn"
import type React from "react"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
    return <LoaderPinwheel
        role="status"
        aria-label="Loading"
        className={cn("size-4 animate-spin", className)}
        {...props}
    />
}

export default function ({ show, children }: { show: boolean, children: React.ReactNode }) {
    if (show) {
        return children
    }
    return <div className="flex justify-center w-full py-10">
        <Spinner />
        <Label className="ml-1">加载中...</Label>
    </div>
}
