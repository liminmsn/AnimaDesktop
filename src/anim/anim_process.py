import subprocess
from pathlib import Path

from src.core.resources import ROOT

CLI = ROOT / "runtime" / "sd-cli.exe"
MODEL = ROOT / "models" / "Anima-P3-Turbo-AIO-Q4_K.gguf"


def generate_image(prompt: str, out_file) -> Path:
    out_file = Path(out_file)

    if not CLI.is_file():
        raise FileNotFoundError(f"找不到引擎：{CLI}")
    if not MODEL.is_file():
        raise FileNotFoundError(f"找不到模型：{MODEL}")

    out_file.parent.mkdir(parents=True, exist_ok=True)

    command = [
        str(CLI),
        "-m", str(MODEL),
        "--vae-tiling",
        "--offload-to-cpu",
        "--steps", "16",
        "--cfg-scale", "1",
        "-W", "512",
        "-H", "768",
        "--sampling-method", "er_sde",
        "--scheduler", "smoothstep",
        "--seed", "666",
        "-p", prompt,
        "-o", str(out_file),
    ]

    # 用 Popen 才能流式读取；cwd 传 CLI 的父目录
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
        print(line, end="", flush=True)

    return_code = process.wait()
    
    # print(f"\n引擎退出码：{return_code}")

    if return_code != 0:
        raise RuntimeError(f"Stable Diffusion.cpp 执行失败，退出码：{return_code}")

    if not out_file.is_file():
        raise RuntimeError("引擎退出，但没有找到输出图片。")

    return out_file