$dir = ".\vite-monorepo"
$nodeModulesPath = Join-Path $dir "node_modules"

if (-not (Test-Path $nodeModulesPath -PathType Container)) {
    Write-Host "node_modules 不存在，执行 npm install"
    Push-Location $dir
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Error "npm install 失败"
        Pop-Location
        exit 1
    }
    Pop-Location
}
else {
    Write-Host "node_modules 已存在，跳过安装"
}

Write-Host "启动 dev（新窗口）..."
# 使用系统自带 powershell.exe
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location $(Resolve-Path $dir); npm run dev"
