$ErrorActionPreference = "Stop"

$files = Get-ChildItem -Path "app\", "components\" -Recurse -Filter "*.tsx" | Where-Object { 
  $_.FullName -notmatch "theme-provider|theme-toggle|layout.tsx|header.tsx" 
}

foreach ($file in $files) {
    Write-Host "Processing: $($file.Name)"
    $content = Get-Content $file.FullName -Raw
    
    # Text
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, '\btext-white\b(?!/[0-9])', 'text-foreground')
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, '\btext-white/([0-9]+)\b', 'text-foreground/$1')
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, '\btext-black\b(?!/[0-9])', 'text-background')
    
    # Backgrounds
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, '\bbg-black\b(?!/[0-9])', 'bg-background')
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, '\bbg-black/([0-9]+)\b', 'bg-background/$1 dark:bg-black/$1')
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, '\bbg-white\b(?!/[0-9])', 'bg-foreground')
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, '\bbg-white/([0-9]+)\b', 'bg-foreground/$1 dark:bg-white/$1')
    
    # Borders
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, '\bborder-white/([0-9]+)\b', 'border-border')
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, '\bborder-white\b(?!/[0-9])', 'border-border')
    
    # Gradients
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, '\bfrom-black\b(?!/[0-9])', 'from-background')
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, '\bto-black\b(?!/[0-9])', 'to-background')
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, '\bvia-black/([0-9]+)\b', 'via-background/$1 dark:via-black/$1')
    $content = [System.Text.RegularExpressions.Regex]::Replace($content, '\bfrom-black/([0-9]+)\b', 'from-background/$1 dark:from-black/$1')
    
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
}

Write-Host "Global Refactor Complete!"
