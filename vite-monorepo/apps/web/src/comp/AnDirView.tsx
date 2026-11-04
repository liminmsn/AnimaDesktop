import type { FileNode } from "@/components/FileTreeNode"
import { useEditContext } from "@/hooks/EditProvider"
import FileTreeNode from "@/components/FileTreeNode"
import { useRouter } from "@/hooks/RouterProvider"
import LodingView from "@/components/LodingView"
import { useEffect, useState } from "react"
import { RadioGroup } from "@base-ui/react"
import CoumtTItle from "@/components/CoumtTItle"
import { joinPath } from "@/lib/path"
import { add_monitor } from "@/pyNotify"

export default function () {
  const { reducer } = useRouter()
  const path_ = reducer.state.path;
  //目录所有文件、选择文件
  const [files, setFiles] = useState<FileNode[]>([])
  const { state, dispatch } = useEditContext()

  const [coumt, setCoumt] = useState(0)
  add_monitor((data: any) => {
    if (data.msg == "ref_dir") {
      setCoumt(coumt + 1)
    }
  })

  useEffect(() => {
    setTimeout(() => {
      window.pywebview.api.load_dir(path_).then(res => {
        dispatch({ type: "SELECT_DIR", path: res["path"] })
        setFiles([res])
        console.log(res);
      })
    }, 500);
  }, [dispatch, path_, coumt])

  return <>
    <CoumtTItle label="项目" />
    <LodingView show={files.length > 0}
      children={files.map((node, idx) =>
        <RadioGroup defaultValue={node.path} key={idx}>
          <FileTreeNode
            key={node.path}
            node={node}
            selected={state.current_file!}
            onRadio={(path) => dispatch({ type: "SELECT_DIR", path })}
            onSelect={(key, path) => {
              switch (key) {
                case "select":
                  dispatch({ type: "SELECT_FILE", path: joinPath(path_!, path) })
                  break;
                case "del":
                  window.pywebview.api.dele_file(joinPath(path_!, path))
                  break;
                case "view":
                  dispatch({ type: "SELECT_FILE", path: joinPath(path_!, path) })
                  break;
              }
            }} />
        </RadioGroup>)
      }
    />
  </>
}
