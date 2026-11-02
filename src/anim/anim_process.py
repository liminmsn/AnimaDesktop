import subprocess
from pathlib import Path
from src.core.resources import ROOT
from typing import TYPE_CHECKING
from dataclasses import dataclass
if TYPE_CHECKING:
    from src.Api import Api

CLI = ROOT / "runtime" / "sd-cli.exe"
MODEL = ROOT / "models" / "Anima-P3-Turbo-AIO-Q4_K.gguf"


@dataclass
class GenParams:
    w: int
    h: int
    steps: int
    cfg_scale: float
    seed: int
    scheduler: str
    sampling_method: str
    out_file: str
    prompt: str

def generate_image(api:'Api', params:'GenParams'):
    if not CLI.is_file():
        raise FileNotFoundError(f"找不到引擎：{CLI}")
    if not MODEL.is_file():
        raise FileNotFoundError(f"找不到模型：{MODEL}")

    out_file = Path(params.out_file)
    out_file.parent.mkdir(parents=True, exist_ok=True)

    command = [
        str(CLI),
        "-m", str(MODEL),
        "--vae-tiling",
        "--offload-to-cpu",
        "-W", str(params.w),
        "-H", str(params.h),
        "--seed", str(params.seed),
        "--steps", str(params.steps),
        "--cfg-scale", str(params.cfg_scale),
        "--sampling-method", params.sampling_method,
        "--scheduler", params.scheduler,
        "-p", params.prompt,
        "-o", str(out_file),
    ]

    process = subprocess.Popen(
        command,
        cwd=str(CLI.parent),
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        encoding="utf-8",
        errors="replace",
    )

    assert process.stdout is not None
    for line in process.stdout:
        api.notify({
            "key":"anim",
            "msg":line
        })
        # print(line, end="", flush=True)
    
    return_code = process.wait()

    api.notify({"key":"anim","msg":"END"})

    result={
        "code":return_code,
        "out_file":params.out_file,
        "message":"图片生成完毕！"
    }

    if return_code != 0:
        result["message"] = "Stable Diffusion.cpp 执行失败，退出码：{return_code}"
    if not out_file.is_file():
        result["message"] = "引擎退出，但没有找到输出图片。"
    return result