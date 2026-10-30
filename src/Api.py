import json
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

    def get_message(self):
        return {"success": True, "message": "pywebview 初始化成功"}

    def greet(self, name):
        name = str(name).strip()[:100] or "朋友"
        return f"你好，{name}！"