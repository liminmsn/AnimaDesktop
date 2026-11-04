import webview
import os
import json
import base64
import pathlib

from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from src.Application import Application

class Api:
    def __init__(self):
        self._app = None
    
    def attach(self, app: "Application"):
        self._app = app

    def notify(self, message):
        if self._app and self._app.win:
            self._app.win.evaluate_js(
                f"window.dispatchEvent(new CustomEvent('py-notify', "
                f"{{ detail: {json.dumps(message, ensure_ascii=False)} }}))"
            )

    def exit_app(self):
        """退出程序"""
        if not self._app or not self._app.win:
            return None
        return self._app.win.destroy()
    
    def load_dir(self,path:str):
        """加载文件树"""
        from src.core.resources import scan_tree
        return scan_tree(path)
    
    def select_folder(self):
        """打开原生文件夹选择器，返回选中目录的绝对路径"""
        if not self._app or not self._app.win:
            return None
        result = self._app.win.create_file_dialog(
            dialog_type=webview.FOLDER_DIALOG,
            allow_multiple=False,
            directory=""
        )
        if result:
            return result[0].replace("\\","/")
        return None
    
    def dele_file(self,path_:str):
        """删除文件"""
        path = pathlib.Path(path_)
        if os.path.exists(path):
            os.remove(path)
        self.notify({"msg":"ref_dir"})
    
    def view_image(self, path: str) -> str:
        """预览图片"""
        p = pathlib.Path(path)
        with open(p, "rb") as f:
            data = f.read()

        b64 = base64.b64encode(data).decode("ascii")
        return f"data:image/png;base64,{b64}"

    def create_png(self,  params: dict):
            """调用本地模型生成图片"""
            from src.anim.anim_process import GenParams
            from src.anim.anim_process import generate_image
            gen_params = GenParams(**params) 
            return generate_image(self, gen_params)