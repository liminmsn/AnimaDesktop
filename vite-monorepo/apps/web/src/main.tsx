import { createRoot } from "react-dom/client"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import RouterProvider from "@/hooks/RouterProvider.tsx"
import App from "@/App.tsx"
import "@/pyNotify.ts"
import "@workspace/ui/globals.css"
import "@/style.css"

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <RouterProvider>
      <App />
    </RouterProvider>
  </ThemeProvider>
)
