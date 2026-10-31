import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@workspace/ui/components/collapsible"
import { Button } from "@workspace/ui/components/button"
import { IconFolder, IconPhoto } from "@tabler/icons-react"
import { useRouter } from "@/hooks/RouterProvider"
import { useEffect, useState } from "react"

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

type FileNode =
  | { type: "file"; name: string; path: string }
  | { type: "folder"; name: string; path: string; children: FileNode[] }

function FileTreeNode({ node, selected, onSelect }: { node: FileNode; selected: string; onSelect: (path: string) => void }) {
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
  const [selected, setSelected] = useState("components/ui/button.tsx")
  const { reducer } = useRouter()
  const path = reducer.state.path;
  const [files, setFiles] = useState<FileNode[]>([])

  useEffect(() => {
    setTimeout(() => {
      window.pywebview.api.load_dir(path).then(res => {
        setFiles([res])
        console.log(res);
      })
    }, 500);
  }, [path])

  return <div className="flex w-full max-w-xs flex-col text-sm">
    <Tabs defaultValue="overview" className="w-full gap-y-1">
      <TabsList className="mt-1 ml-2">
        <TabsTrigger value="overview">
          <IconFolder />
          目录
        </TabsTrigger>
        <TabsTrigger value="analytics">
          <IconPhoto />
          绘图集
        </TabsTrigger>
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
        {/* <Card>
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
        </Card> */}
      </TabsContent>
    </Tabs>
  </div>
}
