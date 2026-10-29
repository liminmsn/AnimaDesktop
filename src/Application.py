import webview
from src.Api import Api
from src.core.resources import ROOT

STORAGE_DIR = ROOT / "data"

DEV = True
if DEV:
    INDEX_HTML = "http://localhost:5173"
else:
    INDEX_HTML = (ROOT / "www/index.html").as_uri()

WINDOW_TITLE = "Anima-P3"
RENDERER_CLASS = "Chrome_Anima_P3"
WINDOW_WIDTH = 800
WINDOW_HEIGHT = 600

class Application:
    def __init__(self):
        self.win = webview.create_window(
            title=WINDOW_TITLE,
            url=INDEX_HTML,
            js_api=Api(),
            width=WINDOW_WIDTH,
            height=WINDOW_HEIGHT,
            min_size=(800, 600),
            resizable=True,
            frameless=True,
        )

        webview.start(
            private_mode=False,
            storage_path=str(STORAGE_DIR),
            debug=DEV
        )