import React, { createContext, useContext, useReducer, useState } from "react";
import ViewHome from "@/view/ViewHome";
import ViewEdit from "@/view/ViewEdit";
import type { GenParams } from "./EditProvider";

type RouterState = {
  remember: boolean
  path: string | undefined
  path_hostory: { path: string, select_dir: string, gen_params?: GenParams }[]
};
type Action =
  | { type: "OPEN_PATH"; path: string | undefined }
  | { type: "SET_SELECT_DIR"; path: string }
  | { type: "REMEMBER"; checked: boolean }
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

const ROUTER_DATA = "router_data"
const RouterViewEnum = {
  HOME: ViewHome,
  EDIT: ViewEdit
}

export function getLocalData(): RouterState {
  const data = localStorage.getItem(ROUTER_DATA)
  if (data) {
    return JSON.parse(data)
  }
  return { remember: false, path: undefined, path_hostory: [] }
}

export function update_select_dir(select_dir: string) {
  const obj = getLocalData()
  obj.path_hostory.filter(item => {
    if (item.path == obj.path) {
      item.select_dir = select_dir;
    }
  })
  localStorage.setItem(ROUTER_DATA, JSON.stringify(obj));
}

export function saveRouderData(data: RouterState) {
  localStorage.setItem(ROUTER_DATA, JSON.stringify(data))
}

function getDefaultView(data: RouterState) {
  if (data.path) {
    return () => RouterViewEnum.EDIT
  }
  return () => RouterViewEnum.HOME
}

const RouterProvider = createContext<RouterProviderType | undefined>(undefined);

export default function ({ children }: { children: React.ReactNode }) {
  // 路由
  const [current, setCurrent] = useState(getDefaultView(getLocalData()));
  function to(page: RouterViewEnumType) {
    setCurrent(() => RouterViewEnum[page])
  }

  // 数据
  function globalStateReducer(state: RouterState, action: Action): RouterState {
    switch (action.type) {
      case "REMEMBER":
        {
          const data = { ...state, remember: action.checked }
          saveRouderData(data);
          return data
        }
      case "OPEN_PATH":
        {
          to("EDIT")
          if (action.path) {
            if (state.path_hostory.filter(item => item.path == action.path).length == 0) {
              state.path_hostory.push({
                gen_params: undefined,
                path: action.path,
                select_dir: ""
              })
            }
          }
          const data = { ...state, path: action.path }

          // 是否记录上一次打开的项目
          saveRouderData(data.remember ? data : { ...data, path: undefined });
          return data;
        }
      case "SET_SELECT_DIR":
        {
          state.path_hostory.filter(item => {
            if (state.path == item.path) {
              item.select_dir = action.path;
            }
          });
          localStorage.setItem(ROUTER_DATA, JSON.stringify(state));
          return { ...state };
        }
      case "RESET":
        to("HOME")
        return { ...state, path: undefined };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(globalStateReducer, getLocalData());

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