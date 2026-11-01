import type { FileNode } from "@/components/FileTreeNode"
import { useEditContext } from "@/hooks/EditProvider"
import FileTreeNode from "@/components/FileTreeNode"
import { useRouter } from "@/hooks/RouterProvider"
import LodingView from "@/components/LodingView"
import { useEffect, useState } from "react"
import { RadioGroup } from "@base-ui/react"
import CoumtTItle from "@/components/CoumtTItle"

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
        dispatch({ type: "SELECT_DIR", path: res["path"] })
        setFiles([res])
        console.log(res);
      })
    }, 500);
  }, [dispatch, path])

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
            onSelect={(path) => dispatch({ type: "SELECT_FILE", path })} />
        </RadioGroup>)
      }
    />
  </>
}
