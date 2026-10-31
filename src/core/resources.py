from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent.parent.parent / "resources"

IGNORE = {"node_modules", ".git", ".next", "__pycache__", ".DS_Store"}

def scan_tree(root: str) -> dict[str, Any]:
    root_path = Path(root)

    def walk(dir_path: Path, rel: str) -> dict[str, Any]:
        entries = sorted(dir_path.iterdir(), key=lambda p: (p.is_file(), p.name.lower()))
        children = []

        for entry in entries:
            if entry.name in IGNORE:
                continue
            child_rel = f"{rel}/{entry.name}"
            if entry.is_dir():
                children.append(walk(entry, child_rel))
            else:
                children.append({
                    "type": "file",
                    "name": entry.name,
                    "path": root,
                })

        return {
            "type": "folder",
            "name": dir_path.name,
            "path": rel,
            "children": children,
        }
    return walk(root_path, root_path.name)