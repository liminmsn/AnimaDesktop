export function timeFileName(ext = "png") {
    const d = new Date();
    const p = (n: any) => String(n).padStart(2, "0");
    const s = `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}_${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
    return `${s}.${ext}`;
}