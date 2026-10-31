import json
import webview
from src.core.resources import scan_tree
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

    def create_png(self, prompt, out_file):
        """调用本地模型生成图片"""
        from src.anim.anim_process import generate_image
        return generate_image(self, prompt, out_file)
    
    def exit_app(self):
        if not self._app or not self._app.win:
            return None
        return self._app.win.destroy()
    
    def load_dir(self,path:str):
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
            return result[0]
        return None