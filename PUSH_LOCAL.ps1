
# Obtener fecha y hora actual
$fecha = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# Crear el mensaje de commit (sin caracteres especiales)
$mensaje = "Deploy automatico (SANITARIOS LUGANO) - $fecha"

# Verificar si hay cambios para commitear
$changes = git status --porcelain

if ($changes) {
    Write-Host "Cambios detectados, realizando commit..."
    git add .
    git commit -m "$mensaje"
    git push origin main
    Write-Host "Deploy completado exitosamente en $fecha"
} else {
    Write-Host "No hay cambios nuevos para commitear. Saltando push."
}
