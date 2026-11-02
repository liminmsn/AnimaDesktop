declare module 'use-auto-scroller' {
  import { RefObject } from 'react';

  /**
   * 自动滚动到底部的 Hook。
   * @param dependencies 依赖项数组，变化时触发滚动。
   * @returns 应该绑定到容器内最后一个元素的 ref。
   */
  function useAutoScroll<T extends HTMLElement = HTMLDivElement>(
    dependencies?: ReadonlyArray<any>
  ): RefObject<T | null>;

  export default useAutoScroll;
}