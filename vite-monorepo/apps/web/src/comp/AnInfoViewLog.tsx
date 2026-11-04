import { CircleCheckIcon, LoaderCircleIcon } from "lucide-react"
import { Trace, TraceIcon, TraceLine, TraceTitle, } from "@workspace/ui/components/trace"
import CoumtTItle from "@/components/CoumtTItle"
import { add_monitor } from "@/pyNotify"
import { EmptyDescription } from "@workspace/ui/components/empty"
import { useEditContext } from "@/hooks/EditProvider"
import useAutoScroll from 'use-auto-scroller';
import { useState } from "react"

export default function () {
    const { state } = useEditContext()
    const [logs, setLog] = useState<string[]>([])
    const bottomRef = useAutoScroll([logs]);

    add_monitor<{ key: "anim", msg: string }>((data) => {
        if (data.key == "anim") {
            // console.log(data.msg);
            setLog([...logs, data.msg])
        }
    })

    return <div className="h-full relative overflow-y-auto">
        <CoumtTItle label="日志" />
        <EmptyDescription className="rounded-tr-2xl text-[6pt] p-1">
            {logs.map((log, i) => {
                return <pre key={i} className="">{log}</pre>
            })}
            <div ref={bottomRef} />
        </EmptyDescription >
        <Trace className="bg-primary w-full fixed bottom-0">
            <TraceLine status={state.generate ? "running" : "pending"} className="text-primary-foreground px-1">
                <TraceIcon>
                    {state.generate ? <LoaderCircleIcon className="animate-spin" /> : <CircleCheckIcon />}
                </TraceIcon>
                <TraceTitle>
                    {state.generate ? "执行中..." : "就绪"}
                </TraceTitle>
            </TraceLine>
        </Trace>
    </div >
}
