import { Button } from "@workspace/ui/components/button"
import { ArrowUpRightIcon } from "lucide-react"
import { IconFolderCode } from "@tabler/icons-react"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@workspace/ui/components/empty"

export default function (_args: any) {
    console.log(_args);
    return <Empty>
        <EmptyHeader>
            <EmptyMedia variant="icon">
                <IconFolderCode />
            </EmptyMedia>
            <EmptyTitle>No Projects Yet</EmptyTitle>
            <EmptyDescription>
                You haven&apos;t created any projects yet. Get started by creating
                your first project.
            </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
            <Button>Create Project</Button>
            <Button variant="outline">Import Project</Button>
        </EmptyContent>
        <Button variant="link" className="text-muted-foreground" size="sm" nativeButton={false} render={<a href="#">Learn More <ArrowUpRightIcon /></a>} />
    </Empty>
}
