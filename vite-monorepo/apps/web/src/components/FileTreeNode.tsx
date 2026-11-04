import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuShortcut, ContextMenuTrigger } from "@workspace/ui/components/context-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@workspace/ui/components/collapsible";
import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { RadioGroupItem } from "@workspace/ui/components/radio-group";
import { Label } from "@workspace/ui/components/label";

// const files_: FileNode[] = [
//   {
//     type: "folder",
//     name: "app",
//     path: "app",
//     children: [
//       { type: "file", name: "layout.tsx", path: "app/layout.tsx" },
//       { type: "file", name: "page.tsx", path: "app/page.tsx" },
//     ],
//   },
//   {
//     type: "folder",
//     name: "components",
//     path: "components",
//     children: [
//       {
//         type: "folder",
//         name: "ui",
//         path: "components/ui",
//         children: [
//           {
//             type: "file",
//             name: "button.tsx",
//             path: "components/ui/button.tsx",
//           },
//         ],
//       },
//       {
//         type: "file",
//         name: "login-form.tsx",
//         path: "components/login-form.tsx",
//       },
//     ],
//   },
// ]

export type FileNode =
    | { type: "file"; name: string; path: string }
    | { type: "folder"; name: string; path: string; children: FileNode[] }

type FileTreeNodeType = {
    node: FileNode;
    selected: string;
    onSelect: (key: string, path: string) => void;
    onRadio?: (path: string) => void;
}


export default function FileTreeNode({ node, selected, onSelect, onRadio }: FileTreeNodeType) {
    switch (node.type) {
        case "folder":
            return <Collapsible defaultOpen>
                <CollapsibleTrigger
                    render={
                        <Button variant="ghost" size="sm"
                            className="w-full justify-start font-normal aria-expanded:bg-transparent aria-expanded:hover:bg-muted dark:aria-expanded:hover:bg-muted/50">
                            <ChevronRightIcon className="transition-transform group-data-panel-open/button:rotate-90" />
                            <FolderIcon color="var(--primary-foreground)" />
                            {node.name}
                            {onRadio &&
                                <div className="w-full overflow-hidden" dir="rtl">
                                    <RadioGroupItem value={node.path} id={node.path} onClick={(e) => {
                                        e.stopPropagation()
                                        onRadio(node.path)
                                    }} />
                                </div>
                            }
                        </Button>
                    } />
                <CollapsibleContent>
                    <div className="ml-4 flex flex-col">
                        {node.children.map((child) => (
                            <FileTreeNode
                                key={child.path}
                                node={child}
                                selected={selected}
                                onSelect={onSelect}
                                onRadio={onRadio}
                            />
                        ))}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        case "file":
            return <ContextMenu>
                <ContextMenuTrigger>
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`w-full justify-start font-normal ${selected === node.path ? "bg-accent text-accent-foreground" : ""
                            }`}
                        aria-current={selected === node.path ? "true" : undefined}
                        onClick={() => onSelect("select", node.path)}
                    >
                        <FileIcon color="var(--primary)" />
                        {node.name}
                    </Button>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-48">
                    <ContextMenuGroup>
                        <ContextMenuItem onClick={() => onSelect("del", node.path)}>
                            <Label className="text-red-500">删除</Label>
                            <ContextMenuShortcut>从本地删文件</ContextMenuShortcut>
                        </ContextMenuItem>
                        <ContextMenuItem onClick={() => onSelect("view", node.path)}>
                            预览
                            <ContextMenuShortcut>查看文件</ContextMenuShortcut>
                        </ContextMenuItem>
                    </ContextMenuGroup>
                </ContextMenuContent>
            </ContextMenu>
        default: {
            const unreachable: never = node
            return unreachable
        }
    }
}