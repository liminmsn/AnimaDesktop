from PIL import Image
import json, os

PATH, KEY = "carrier.png", "myjson"

if not os.path.exists(PATH):
    raise SystemExit(f"找不到 {PATH}，当前目录: {os.getcwd()}")

with Image.open(PATH) as img:
    img.load()
    raw = img.text.get(KEY) or img.info.get(KEY)

if raw is None:
    print("未找到 key:", KEY)
    print("现有文本字段:", list(img.text.keys()))
else:
    print("原始字符串:", raw)
    print("解析结果:", json.loads(raw))