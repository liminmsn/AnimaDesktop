import { Menubar, MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarTrigger } from "@workspace/ui/components/menubar"
import { Popover, PopoverTrigger, PopoverContent } from "@workspace/ui/components/popover"
import { BreadcrumbItem, BreadcrumbList } from "@workspace/ui/components/breadcrumb"
import { useRouter } from "@/hooks/RouterProvider"
import { FolderIcon } from "lucide-react"
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useTheme } from "@/components/theme-provider"

export const animaModelDoc: string = `# Anima-P3-Turbo-AIO-Q4_K.gguf 模型介绍与使用提示

## 一、模型简介

\`Anima-P3-Turbo-AIO-Q4_K.gguf\` 是一个专为**低显存或纯 CPU 环境**设计的一体化量化生图模型。

- 基于 Anima Preview3 的 All In One 版本
- 已将 VAE、文本编码器、DiT 合并打包，无需额外加载组件
- 融合了 Turbo LoRA，支持低步数快速出图
- 量化为 \`Q4_K\` 格式，体积约 **1.79 GB**
- 已嵌入本桌面程序，开箱即用

> ⚠️ **运行环境说明**：该模型基于 \`stable-diffusion.cpp\` 运行，不兼容 ComfyUI / Forge 等常规前端。本程序已内置运行环境，用户无需手动配置。

---

## 二、推荐生图参数

程序内已预设以下参数，如需手动调整可参考：

| 参数 | 推荐值 | 说明 |
|------|--------|------|
| 步数（Steps） | \`16\` | 融合 Turbo LoRA，低步数即可出图 |
| CFG Scale | \`1\` | Turbo 模型典型设置，无需高 CFG 引导 |
| 采样器 | \`er_sde\` | 作者推荐采样器 |
| 调度器 | \`smoothstep\` | 作者推荐调度器 |
| 分辨率 | \`832 × 1216\` | 竖版人像常用比例，可按需调整 |
| 缓存模式 | \`spectrum\` | 缓存模式设置 |
| 随机种子 | 任意整数 | 固定种子可复现结果 |

---

## 三、提示词编写指南

### 1. 质量词（开头必加）

建议在提示词最开头加入质量词：

\`\`\`
score_9, masterpiece, best quality, newest
\`\`\`

### 2. 画师风格标签

如需指定画师风格，画师名**必须加 \`@\` 前缀**，否则效果很弱：

\`\`\`
@artist_name
\`\`\`

### 3. 标签书写规范

- 模型主要基于 **Danbooru 标签**训练
- 使用**小写**、**空格代替下划线**
- 复杂动作或关系用简短短语描述，比罗列标签更准确
  - ✅ 推荐：\`holding a board\`
  - ❌ 不推荐：\`board, holding\`

### 4. 负向提示词（推荐）

\`\`\`
worst quality, low quality, score_1, score_2, score_3, blurry
\`\`\`

---

## 四、提示词示例

**示例一：人物立绘**

\`\`\`
score_9, masterpiece, best quality, newest, 1girl, solo, cowboy shot, facing viewer, holding a board with 'AIO ANIMA TURBO' written on it
\`\`\`

**示例二：带画师风格**

\`\`\`
score_9, masterpiece, best quality, newest, @artist_name, 1girl, solo, upper body, looking at viewer, soft lighting
\`\`\`

**示例三：场景构图**

\`\`\`
score_9, masterpiece, best quality, newest, 1girl, solo, full body, standing, city street, night, neon lights, cinematic angle
\`\`\`

---

## 五、使用小贴士

1. **出图不理想时**，优先调整提示词中的标签顺序和短语描述，而非大幅改动参数。
2. **想复现某张图**，记录当时的随机种子即可。
3. **想换风格**，在提示词中加入 \`@画师名\` 是最直接的方式。
4. **画面模糊**，确认负向提示词中包含 \`blurry\`，并检查步数是否过低。
5. **复杂手部动作**，用短语块描述（如 \`holding a cup\`）比堆叠标签更有效。
`;

export default function () {
    const { theme } = useTheme()
    const { reducer } = useRouter()
    const { path } = reducer.state

    return <Menubar className="rounded-none">
        <MenubarMenu>
            <MenubarTrigger className="font-bold">本地绘画师</MenubarTrigger>
            <MenubarContent>
                <MenubarGroup>
                    <MenubarItem disabled={!path} onClick={() => { reducer.dispatch({ type: "RESET" }) }}>
                        关闭工程
                    </MenubarItem>
                    <MenubarItem onClick={() => { window.pywebview.api.exit_app() }}>
                        退出
                    </MenubarItem>
                </MenubarGroup>
            </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
            <Popover>
                <PopoverTrigger render={<button>说明</button>} />
                <PopoverContent className="bg-background/10 backdrop-blur-md w-100 h-100 overflow-y-auto p-6">
                    <MarkdownPreview wrapperElement={{
                        "data-color-mode": theme as any,
                    }}
                        style={{
                            backgroundColor: 'transparent',
                            fontSize: '10px'
                        }}
                        source={animaModelDoc} />
                </PopoverContent>
            </Popover>
        </MenubarMenu>
        {path &&
            <MenubarMenu>
                <BreadcrumbList className="gap-0! items-start ml-2">
                    <div className="bg-primary p-1">
                        <FolderIcon size={12} color="var(--primary-foreground)" />
                    </div>
                    <BreadcrumbItem className="px-1.5 text-[10.5pt] bg-primary-foreground text-primary rounded-r-sm">
                        <span className="yw">{path}</span>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </MenubarMenu>
        }
    </Menubar>
}
