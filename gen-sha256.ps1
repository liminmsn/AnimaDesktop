param([string]$Dir = ".")

$ErrorActionPreference = "Stop"
$exts = @(".rar", ".zip", ".7z", ".exe", ".msi", ".dmg", ".AppImage", ".deb")

Get-ChildItem -Path $Dir -File |
  Where-Object { $exts -contains $_.Extension.ToLower() } |
  ForEach-Object {
    $hash = (Get-FileHash $_.FullName -Algorithm SHA256).Hash.ToLower()
    $out  = "$($_.FullName).sha256"
    [IO.File]::WriteAllText($out, "$hash  $($_.Name)`n", (New-Object System.Text.UTF8Encoding($false)))
    Write-Host ("OK  {0}  ->  {1}" -f $_.Name, (Split-Path $out -Leaf)) -ForegroundColor Green
  }