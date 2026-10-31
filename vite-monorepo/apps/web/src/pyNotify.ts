window.addEventListener("contextmenu",(e)=>{
  e.preventDefault()
})
window.addEventListener("py-notify", (e) => {
  const detail = (e as unknown as { detail: string }).detail
  console.log("收到 py-notify", detail);
});