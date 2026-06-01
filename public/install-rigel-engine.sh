#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────
# install-rigel-engine.sh
# One-line installer for RIGEL Engine on Linux
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/Zerone-Laboratories/RIGEL/main/install-rigel-engine.sh | bash
#   OR
#   bash install-rigel-engine.sh
# ──────────────────────────────────────────────────────────────

set -euo pipefail

BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'
BOLD='\033[1m'

REPO_URL="https://github.com/Zerone-Laboratories/RIGEL.git"
INSTALL_DIR="${RIGEL_INSTALL_DIR:-$HOME/RIGEL}"

info()  { echo -e "${BLUE}[INFO]${NC}  $*"; }
ok()    { echo -e "${GREEN}[OK]${NC}    $*"; }
warn()  { echo -e "${YELLOW}[WARN]${NC}  $*"; }
fail()  { echo -e "${RED}[FAIL]${NC}  $*"; exit 1; }

banner() {
  echo ""
  echo -e "${BLUE}${BOLD}"
  echo "  ╔═══════════════════════════════════════════╗"
  echo "  ║       RIGEL Engine Installer v1.0         ║"
  echo "  ║       Zerone Laboratories                 ║"
  echo "  ╚═══════════════════════════════════════════╝"
  echo -e "${NC}"
  echo ""
}

check_command() {
  command -v "$1" &>/dev/null
}

# ── Banner ──────────────────────────────────────────────────
banner

# ── Pre-flight checks ──────────────────────────────────────
info "Checking prerequisites..."

if ! check_command git; then
  fail "git is not installed. Install it first: sudo apt install git"
fi
ok "git found"

if ! check_command python3; then
  fail "python3 is not installed. Install it first: sudo apt install python3 python3-venv"
fi

PY_VERSION=$(python3 -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')")
ok "Python $PY_VERSION found"

if ! python3 -c "import venv" 2>/dev/null; then
  warn "python3-venv not found. Attempting to install..."
  sudo apt-get install -y python3-venv || fail "Could not install python3-venv"
fi

# ── Clone repository ───────────────────────────────────────
if [ -d "$INSTALL_DIR" ]; then
  warn "Directory $INSTALL_DIR already exists"
  read -rp "  Overwrite? [y/N] " ans
  if [[ "$ans" =~ ^[Yy]$ ]]; then
    rm -rf "$INSTALL_DIR"
  else
    info "Using existing directory"
  fi
fi

if [ ! -d "$INSTALL_DIR" ]; then
  info "Cloning RIGEL repository..."
  git clone "$REPO_URL" "$INSTALL_DIR"
  ok "Repository cloned to $INSTALL_DIR"
fi

cd "$INSTALL_DIR"

# ── Python virtual environment ─────────────────────────────
if [ ! -d ".venv" ]; then
  info "Creating Python virtual environment..."
  python3 -m venv .venv
  ok "Virtual environment created"
else
  ok "Virtual environment already exists"
fi

source .venv/bin/activate

# ── Install Python dependencies ────────────────────────────
info "Installing Python dependencies..."
pip install --upgrade pip -q
if [ -f "requirements.txt" ]; then
  pip install -r requirements.txt -q
  ok "Python dependencies installed"
else
  warn "requirements.txt not found, skipping pip install"
fi

# ── D-Bus configuration ───────────────────────────────────
if [ -f "install_dbus_config.sh" ]; then
  info "Installing D-Bus configuration..."
  read -rp "  Install D-Bus config? (requires sudo) [Y/n] " dbus_ans
  if [[ ! "$dbus_ans" =~ ^[Nn]$ ]]; then
    sudo bash install_dbus_config.sh
    ok "D-Bus configuration installed"
  else
    warn "Skipped D-Bus configuration"
  fi
fi

# ── D-Bus system dependencies ─────────────────────────────
info "Checking D-Bus system dependencies..."
if check_command apt-get; then
  PKG_MANAGER="apt"
elif check_command dnf; then
  PKG_MANAGER="dnf"
else
  PKG_MANAGER="unknown"
fi

install_dbus_deps() {
  if [ "$PKG_MANAGER" = "apt" ]; then
    sudo apt-get install -y python3-gi python3-gi-cairo gir1.2-gtk-3.0 2>/dev/null && ok "D-Bus dependencies installed" || warn "Some D-Bus deps failed"
  elif [ "$PKG_MANAGER" = "dnf" ]; then
    sudo dnf install -y python3-gobject python3-gobject-cairo gtk3-devel 2>/dev/null && ok "D-Bus dependencies installed" || warn "Some D-Bus deps failed"
  else
    warn "Unknown package manager. Install D-Bus deps manually."
  fi
}

read -rp "  Install D-Bus system libraries? [Y/n] " dbus_libs_ans
if [[ ! "$dbus_libs_ans" =~ ^[Nn]$ ]]; then
  install_dbus_deps
fi

# ── Ollama ─────────────────────────────────────────────────
if ! check_command ollama; then
  info "Ollama not found."
  read -rp "  Install Ollama? [Y/n] " ollama_ans
  if [[ ! "$ollama_ans" =~ ^[Nn]$ ]]; then
    info "Installing Ollama..."
    curl -fsSL https://ollama.ai/install.sh | sh
    ok "Ollama installed"
  fi
else
  ok "Ollama already installed"
fi

if check_command ollama; then
  read -rp "  Pull llama3.2 model? (~2GB) [Y/n] " model_ans
  if [[ ! "$model_ans" =~ ^[Nn]$ ]]; then
    info "Pulling llama3.2..."
    ollama pull llama3.2
    ok "llama3.2 model ready"
  fi
fi

# ── Voice dependencies (optional) ─────────────────────────
info "Voice features require Piper TTS, PulseAudio, and SDL2."
read -rp "  Install voice dependencies? [y/N] " voice_ans
if [[ "$voice_ans" =~ ^[Yy]$ ]]; then
  if [ "$PKG_MANAGER" = "apt" ]; then
    sudo apt-get install -y pulseaudio pulseaudio-utils libsdl2-2.0-0
  elif [ "$PKG_MANAGER" = "dnf" ]; then
    sudo dnf install -y pulseaudio pulseaudio-utils SDL2
  fi
  ok "Voice system dependencies installed"
  warn "Piper TTS must be installed manually: https://github.com/rhasspy/piper/releases"
fi

# ── Done ───────────────────────────────────────────────────
echo ""
echo -e "${GREEN}${BOLD}  ╔═══════════════════════════════════════════╗${NC}"
echo -e "${GREEN}${BOLD}  ║       RIGEL Engine installed!             ║${NC}"
echo -e "${GREEN}${BOLD}  ╚═══════════════════════════════════════════╝${NC}"
echo ""
echo -e "  ${BOLD}To get started:${NC}"
echo -e "    cd $INSTALL_DIR"
echo -e "    source .venv/bin/activate"
echo -e "    python main.py"
echo ""
echo -e "  ${BOLD}Docker alternative:${NC}"
echo -e "    docker compose up"
echo ""
echo -e "  ${BLUE}Docs:${NC} https://github.com/Zerone-Laboratories/RIGEL"
echo ""
