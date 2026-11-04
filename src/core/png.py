from PIL import Image
from PIL.PngImagePlugin import PngInfo
import os
import json

KEY =  "json_info"

# create_png("carrier.png", (500, 500), {"id": 42, "tags": ["a", "b"]})
def create_png(path, size, obj):
    info = PngInfo()
    info.add_itxt(KEY, json.dumps(obj, ensure_ascii=False))
    Image.new("RGBA", size, (0, 0, 0, 0)).save(path, pnginfo=info)

def get_png_json(path):
    if not os.path.exists(path):
        return None
    
    with Image.open(path) as img:
        img.load()
        raw = img.text.get(KEY) or img.info.get(KEY)
        
    if raw is None:
        print("未找到 key:", KEY)
        print("现有文本字段:", list(img.text.keys()))
        return None
    else:
        print("原始字符串:", raw)
        print("解析结果:", json.loads(raw))
        return raw