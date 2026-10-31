import React, { createContext, useContext, useReducer, useState } from "react";
import ViewHome from "@/view/ViewHome";
import ViewEdit from "@/view/ViewEdit";

type RouterState = {
  path: string | undefined
};
type Action =
  | { type: "OPEN_PATH"; path: string | undefined }
  | { type: "RESET" };
type RouterContextValue = {
  state: RouterState;
  dispatch: React.Dispatch<Action>;
};
type RouterViewEnumType = keyof typeof RouterViewEnum;
interface RouterProviderType {
  current: () => React.JSX.Element;
  reducer: RouterContextValue
}

const RouterViewEnum = {
  HOME: ViewHome,
  EDIT: ViewEdit
}

const RouterProvider = createContext<RouterProviderType | undefined>(undefined);
export default function ({ children }: { children: React.ReactNode }) {
  // 路由
  const [current, setCurrent] = useState(() => RouterViewEnum.HOME);
  function to(page: RouterViewEnumType) {
    setCurrent(() => RouterViewEnum[page])
  }
  // 数据
  function globalStateReducer(state: RouterState, action: Action): RouterState {
    switch (action.type) {
      case "OPEN_PATH":
        to("EDIT")
        return { ...state, path: action.path };
      case "RESET":
        to("HOME")
        return { path: undefined };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(globalStateReducer, { path: undefined });
  return <RouterProvider.Provider value={{ current, reducer: { state, dispatch } }}>
    {children}
  </RouterProvider.Provider>
}

export function useRouter() {
  const ctx = useContext(RouterProvider);
  if (!ctx) {
    throw new Error("useRouter 必须在 <CounterProvider> 内部使用");
  }
  return ctx;
}