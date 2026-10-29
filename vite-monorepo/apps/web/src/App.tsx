import { Button } from "@workspace/ui/components/button"

async function test() {
  const result = await window.pywebview.api.create_png("masterpiece, best quality, a peaceful Japanese garden", "C:/Users/limin/Desktop/test.png");
  console.log(result);
}

export default function () {
  return <div className="flex min-h-svh p-6 rounded-2xl overflow-hidden">
    <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
      <div>
        <h1 className="font-medium">Project ready!</h1>
        <p>You may now add components and start building.</p>
        <p>We&apos;ve already added the button component for you.</p>
        <Button className="mt-2" onClick={test}>Button</Button>
      </div>
      <div className="text-muted-foreground font-mono text-xs">
        (Press <kbd>d</kbd> to toggle dark mode)
      </div>
    </div>
  </div>
}
