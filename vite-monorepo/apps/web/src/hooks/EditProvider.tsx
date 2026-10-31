import type React from "react";
import { createContext, useContext, useReducer, type Dispatch } from "react";
type EditProviderType = {
    state: EditState;
    dispatch: Dispatch<Action>
}
type EditState = {
    current_file?: string
}
type Action =
    | { type: "SELECT_FILE", path: string }
    | { type: "RESET" }

function editReducer(state: EditState, action: Action): EditState {
    switch (action.type) {
        case "SELECT_FILE":
            return { ...state, current_file: action.path }
        case "RESET":
            return { ...state, current_file: undefined }
        default:
            return state
    }
}

const EditProvider = createContext<EditProviderType | undefined>(undefined);
export default function ({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(editReducer, { current_file: undefined })

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