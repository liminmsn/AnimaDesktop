import type { FileNode } from "@/components/FileTreeNode"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { IconFolder, IconPhoto } from "@tabler/icons-react"
import { useRouter } from "@/hooks/RouterProvider"
import { useEffect, useState } from "react"
import FileTreeNode from "@/components/FileTreeNode"
import LodingView from "../components/LodingView"

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
        <TabsTrigger value="overview"><IconFolder />目录</TabsTrigger>
        <TabsTrigger value="analytics"><IconPhoto />绘图集</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <LodingView show={files.length > 0} children={files.map((node) => (
          <FileTreeNode
            key={node.path}
            node={node}
            selected={selected}
            onSelect={setSelected}
          />
        ))} />
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
