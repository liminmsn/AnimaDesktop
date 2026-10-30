import * as React from "react"
import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@workspace/ui/components/collapsible"
import { Button } from "@workspace/ui/components/button"


type FileNode =
  | { type: "file"; name: string; path: string }
  | { type: "folder"; name: string; path: string; children: FileNode[] }

const files: FileNode[] = [
  {
    type: "folder",
    name: "app",
    path: "app",
    children: [
      { type: "file", name: "layout.tsx", path: "app/layout.tsx" },
      { type: "file", name: "page.tsx", path: "app/page.tsx" },
    ],
  },
  {
    type: "folder",
    name: "components",
    path: "components",
    children: [
      {
        type: "folder",
        name: "ui",
        path: "components/ui",
        children: [
          {
            type: "file",
            name: "button.tsx",
            path: "components/ui/button.tsx",
          },
        ],
      },
      {
        type: "file",
        name: "login-form.tsx",
        path: "components/login-form.tsx",
      },
    ],
  },
]

function FileTreeNode({
  node,
  selected,
  onSelect,
}: {
  node: FileNode
  selected: string
  onSelect: (path: string) => void
}) {
  switch (node.type) {
    case "folder":
      return <Collapsible defaultOpen>
        <CollapsibleTrigger render={<Button variant="ghost" size="sm" className="w-full justify-start font-normal aria-expanded:bg-transparent aria-expanded:hover:bg-muted dark:aria-expanded:hover:bg-muted/50"><ChevronRightIcon className="transition-transform group-data-panel-open/button:rotate-90" /><FolderIcon />{node.name}</Button>} />
        <CollapsibleContent>
          <div className="ml-4 flex flex-col">
            {node.children.map((child) => (
              <FileTreeNode
                key={child.path}
                node={child}
                selected={selected}
                onSelect={onSelect}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    case "file":
      return <Button
        variant="ghost"
        size="sm"
        className={`w-full justify-start font-normal ${selected === node.path ? "bg-accent text-accent-foreground" : ""
          }`}
        aria-current={selected === node.path ? "true" : undefined}
        onClick={() => onSelect(node.path)}
      >
        <FileIcon />
        {node.name}
      </Button>
    default: {
      const unreachable: never = node
      return unreachable
    }
  }
}

export default function () {
  const [selected, setSelected] = React.useState("components/ui/button.tsx")

  return <div className="flex w-full max-w-xs flex-col text-sm">
    <Tabs defaultValue="overview" className="w-full gap-y-1">
      <TabsList className="mx-1 mt-1">
        <TabsTrigger value="overview">目录</TabsTrigger>
        <TabsTrigger value="analytics">绘图集</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        {files.map((node) => (
          <FileTreeNode
            key={node.path}
            node={node}
            selected={selected}
            onSelect={setSelected}
          />
        ))}
      </TabsContent>
      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>
              Track performance and user engagement metrics. Monitor trends and
              identify growth opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Page views are up 25% compared to last month.
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
}
