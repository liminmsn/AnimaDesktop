import type React from "react";
import { createContext, useContext, useReducer, type Dispatch } from "react";
import { update_select_dir } from "./RouterProvider";
type EditProviderType = {
    state: EditState;
    dispatch: Dispatch<Action>
}
type EditState = {
    generate: boolean
    current_file?: string
    cureent_dir?: string
}
type Action =
    | { type: "SET_GENERATE", generate: boolean }
    | { type: "SELECT_FILE", path: string }
    | { type: "SELECT_DIR", path: string }
    | { type: "RESET" }

function editReducer(state: EditState, action: Action): EditState {
    switch (action.type) {
        case "SET_GENERATE":
            return { ...state, generate: action.generate }
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
        current_file: undefined,
        cureent_dir: undefined
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