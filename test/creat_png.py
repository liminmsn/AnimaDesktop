from PIL import Image
from PIL.PngImagePlugin import PngInfo
import json

def make_carrier(path, size, key, obj, bg=(0, 0, 0, 0)):
    info = PngInfo()
    info.add_itxt(key, json.dumps(obj, ensure_ascii=False))
    Image.new("RGBA", size, bg).save(path, pnginfo=info)

make_carrier("carrier.png", (500, 500), "myjson", {"id": 42, "tags": ["a", "b"]})