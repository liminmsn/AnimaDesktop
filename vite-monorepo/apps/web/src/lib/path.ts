export function joinPath(base: string, rel: string) {
    base = base.replace(/\/+$/, "");
    rel = rel.replace(/^\/+/, "");

    const baseLast = base.split("/").pop();
    const parts = rel.split("/");

    if (parts[0] === baseLast) {
        parts.shift();
    }
    return base + "/" + parts.join("/");
}

export function joinPathDir(base: string, rel: string) {
    return (joinPath(base, rel) + "/").replaceAll("//", "/")
}