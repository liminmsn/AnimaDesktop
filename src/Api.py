from src.anim.anim_process import generate_image

class Api:
    def create_png(self,prompt,out_file):
        generate_image(prompt,out_file)
    def get_message(self):        
        return {
            "success": True,
            "message": "pywebview 初始化成功",
        }

    def greet(self, name):
        name = str(name).strip()[:100] or "朋友"
        return f"你好，{name}！"
