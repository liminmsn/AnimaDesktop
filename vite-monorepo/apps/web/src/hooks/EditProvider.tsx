import type React from "react";
import { createContext, useContext, useReducer, type Dispatch } from "react";
import { update_select_dir } from "./RouterProvider";
type EditProviderType = {
    state: EditState;
    dispatch: Dispatch<Action>
}

export type GenParams = {
    w: number
    h: number
    steps: number
    cfg_scale: number
    seed: number
    scheduler: string
    sampling_method: string
    out_file: string
    prompt: string
}

type EditState = {
    generate: boolean //ai进程状态
    gen_params: GenParams //参数对象
    current_file?: string //预览图片
    cureent_dir?: string
}

const defaultParams: GenParams = {
    w: 300,
    h: 300,
    steps: 16,
    cfg_scale: 1,
    seed: 666,
    scheduler: "smoothstep",
    sampling_method: "er_sde",
    out_file: "",
    prompt: "",
}

type Action =
    | { type: "SET_GENERATE", generate: boolean }
    | { type: "SET_GENPARAMS", gen_params: GenParams }
    | { type: "SELECT_FILE", path: string }
    | { type: "SELECT_DIR", path: string }
    | { type: "RESET" }

function editReducer(state: EditState, action: Action): EditState {
    switch (action.type) {
        case "SET_GENERATE":
            return { ...state, generate: action.generate }
        case "SET_GENPARAMS":
            
            return { ...state, gen_params: action.gen_params }
        case "SELECT_FILE":
            return { ...state, current_file: action.path }
        case "SELECT_DIR":
            {
                update_select_dir(action.path)
                return { ...state, cureent_dir: action.path }
            }
        case "RESET":
            return { ...state, current_file: undefined }
        default:
            return state
    }
}

const EditProvider = createContext<EditProviderType | undefined>(undefined);
export default function ({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(editReducer, {
        generate: false,
        gen_params: defaultParams,
        current_file: undefined,
        cureent_dir: undefined,
    })

    return <EditProvider.Provider value={{ state, dispatch }}>
        {children}
    </EditProvider.Provider >
}

export function useEditContext() {
    const ctx = useContext(EditProvider);
    if (!ctx) {
        throw new Error("useEditContext 必须在 <EditProvider> 内部使用");
    }
    return ctx;
}