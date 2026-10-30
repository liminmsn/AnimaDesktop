import React, { createContext, useContext, useState } from "react";
import ViewHome from "@/view/ViewHome";
import ViewEdit from "@/view/ViewEdit";

type RouterViewEnumType = keyof typeof RouterViewEnum;
interface RouterProviderType {
  current: React.ReactNode;
  to: (page: RouterViewEnumType, args?: any) => void;
}

const RouterViewEnum = {
  HOME: ViewHome,
  EDIT: ViewEdit
}
const RouterProvider = createContext<RouterProviderType | undefined>(undefined);

export default function ({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState(RouterViewEnum.HOME(undefined));

  function to(page: RouterViewEnumType, args?: any) {
    setCurrent(RouterViewEnum[page](args))
  }
  return <RouterProvider.Provider value={{ current, to }}>
    {children}
  </RouterProvider.Provider>
}

export function useRouter() {
  const ctx = useContext(RouterProvider);
  if (!ctx) {
    throw new Error("useCounter 必须在 <CounterProvider> 内部使用");
  }
  return ctx;
}