import { createRoot } from "react-dom/client"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import "./pyNotify.ts"
import App from "./App.tsx"
import "@workspace/ui/globals.css"
import "@/style.css"
import RouterProvider from "./hooks/RouterProvider.tsx"

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <RouterProvider>
      <App />
    </RouterProvider>
  </ThemeProvider>
)
