import json
import webview
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
        from src.anim.anim_process import generate_image
        return generate_image(self, prompt, out_file)

    def select_folder(self):
        """打开原生文件夹选择器，返回选中目录的绝对路径"""
        if not self._app or not self._app.win:
            return None
        
        # 调用核心 API，指定对话框类型为 FOLDER_DIALOG
        result = self._app.win.create_file_dialog(
            dialog_type=webview.FOLDER_DIALOG,
            allow_multiple=False,  # 通常只选一个文件夹
            directory=""           # 可以设置一个默认打开的起始路径
        )
        # 用户取消选择时，result 通常是 None 或空元组
        if result:
            return result[0]  # 返回选中的第一个路径
        return None

    def get_message(self):
        return {"success": True, "message": "pywebview 初始化成功"}

    def greet(self, name):
        name = str(name).strip()[:100] or "朋友"
        return f"你好，{name}！"