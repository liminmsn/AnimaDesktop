import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { IconFolder, IconPhoto } from "@tabler/icons-react"
import type { FileNode } from "@/components/FileTreeNode"
import { useEditContext } from "@/hooks/EditProvider"
import FileTreeNode from "@/components/FileTreeNode"
import { useRouter } from "@/hooks/RouterProvider"
import LodingView from "@/components/LodingView"
import { useEffect, useState } from "react"

export default function () {
  const { reducer } = useRouter()
  const path = reducer.state.path;
  //目录所有文件、选择文件
  const [files, setFiles] = useState<FileNode[]>([])
  const { state, dispatch } = useEditContext()

  useEffect(() => {
    dispatch({ type: "RESET" })
    setTimeout(() => {
      window.pywebview.api.load_dir(path).then(res => {
        setFiles([res])
        console.log(res);
      })
    }, 500);
  }, [dispatch, path])

  return <div className="flex w-full max-w-xs flex-col text-sm">
    <Tabs defaultValue="overview" className="w-full gap-y-1">
      <TabsList className="mt-1 ml-2">
        <TabsTrigger value="overview"><IconFolder />目录</TabsTrigger>
        <TabsTrigger value="analytics"><IconPhoto />绘图集</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <LodingView show={files.length > 0} children={files.map((node) => <FileTreeNode
          key={node.path}
          node={node}
          selected={state.current_file || ""}
          onSelect={(path) => dispatch({ type: "SELECT_FILE", path })}
        />)} />
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
