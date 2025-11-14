# Installation Script for Windows PowerShell

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Email & SMS Marketing Platform Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js version
Write-Host "Checking Node.js version..." -ForegroundColor Yellow
$nodeVersion = node --version
if ($nodeVersion) {
    Write-Host "✓ Node.js installed: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js not found. Please install Node.js 18+ from nodejs.org" -ForegroundColor Red
    exit 1
}

# Check npm
Write-Host "Checking npm..." -ForegroundColor Yellow
$npmVersion = npm --version
if ($npmVersion) {
    Write-Host "✓ npm installed: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "✗ npm not found" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Step 1: Installing Dependencies" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Dependencies installed successfully" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Step 2: Environment Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if (Test-Path .env) {
    Write-Host "! .env file already exists" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to overwrite it? (y/N)"
    if ($overwrite -eq "y") {
        Copy-Item .env.example .env -Force
        Write-Host "✓ .env file created from template" -ForegroundColor Green
    }
} else {
    Copy-Item .env.example .env
    Write-Host "✓ .env file created from template" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Step 3: Database Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "Please configure your DATABASE_URL in .env file first" -ForegroundColor Yellow
$continue = Read-Host "Have you configured the database URL? (y/N)"

if ($continue -eq "y") {
    Write-Host "Generating Prisma Client..." -ForegroundColor Yellow
    npm run prisma:generate
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Prisma Client generated" -ForegroundColor Green
        
        Write-Host "Pushing schema to database..." -ForegroundColor Yellow
        npm run prisma:push
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ Database schema created" -ForegroundColor Green
        } else {
            Write-Host "✗ Failed to push schema. Please check your database connection" -ForegroundColor Red
        }
    } else {
        Write-Host "✗ Failed to generate Prisma Client" -ForegroundColor Red
    }
} else {
    Write-Host "! Skipping database setup. Run 'npm run prisma:push' after configuring database" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Edit .env file with your API keys" -ForegroundColor White
Write-Host "2. Configure database connection" -ForegroundColor White
Write-Host "3. Run 'npm run prisma:push' if you skipped database setup" -ForegroundColor White
Write-Host "4. Run 'npm run dev' to start development server" -ForegroundColor White
Write-Host ""
Write-Host "Documentation:" -ForegroundColor Yellow
Write-Host "- README.md - Project overview" -ForegroundColor White
Write-Host "- docs/DEPLOYMENT.md - Deployment guide" -ForegroundColor White
Write-Host "- docs/API.md - API documentation" -ForegroundColor White
Write-Host "- docs/USER_GUIDE.md - User manual" -ForegroundColor White
Write-Host ""
Write-Host "Happy coding! 🚀" -ForegroundColor Cyan
