// pywebview.d.ts
// 放置于前端项目 src/ 目录下，TypeScript 会自动加载全局声明

/**
 * pywebview 注入到前端的核心对象
 * 注意：该对象不保证在 window.onload 时可用，
 * 应监听 'pywebviewready' 事件后再访问 window.pywebview
 */
interface PywebviewObject {
  /**
   * 你的 Python 侧 js_api 实例（或通过 window.expose 暴露的函数）的镜像。
   * 这里先定义一个索引签名作为兜底，你应当根据实际的后端 Bridge 类来具体化类型。
   */
  api: PywebviewApi & Record<string, (...args: any[]) => Promise<any>>

  /**
   * pywebview 6.0+ 引入的双向状态对象。
   * Python 侧 window.state 的顶层属性会同步到此处。
   * 如果使用较低版本，此字段可能不存在。
   */
  state?: Record<string, unknown>

  /**
   * 当前平台标识，如 "edgechromium", "cef", "gtk", "cocoa", "qt" 等。
   */
  platform: string
}

/**
 * 这里用来声明你 Python 侧 Bridge 类暴露给 JS 的具体方法。
 * 每个方法在 JS 侧调用时返回的都是 Promise。
 *
 * 示例：
 * 如果 Python 的 Bridge 类有 `greet(name: str)` 方法，
 * 则在此处声明为 `greet(name: string): Promise<string>`
 */
interface PywebviewApi {
  // TODO: 根据你的 src/Bridge.py 实际方法来填充
  // greet(name: string): Promise<string>
  // select_file_dialog(
  //   title: string,
  //   filters: Array<{ name: string; extensions: string[] }>
  // ): Promise<{ success: boolean; filePath: string | null; message: string }>
}

/**
 * 扩展全局 Window 接口
 */
interface Window {
  pywebview: PywebviewObject

  /**
   * pywebview 就绪后会在 window 上派发此事件。
   * 监听它比依赖 window.onload 更可靠。
   */
  addEventListener(
    type: 'pywebviewready',
    listener: (this: Window, ev: Event) => any,
    options?: boolean | AddEventListenerOptions
  ): void

  removeEventListener(
    type: 'pywebviewready',
    listener: (this: Window, ev: Event) => any,
    options?: boolean | EventListenerOptions
  ): void
}