"""
Gera versões otimizadas (WebP) das capturas dos projetos de sites.

Origem:  src/assets/Sites/**           (arquivos originais — nunca são alterados)
Destino: src/assets/sites-web/**       (mesma estrutura de pastas)

Para cada imagem são gerados:
  <nome>.webp        — versão para visualização ampliada (até 2000px de largura)
  <nome>.thumb.webp  — miniatura para cards e galeria (até 900px de largura)

Uso (na raiz do projeto):  python scripts/optimize_site_images.py
Rode novamente sempre que adicionar ou trocar imagens em src/assets/Sites.
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src" / "assets" / "Sites"
OUT = ROOT / "src" / "assets" / "sites-web"
EXTS = {".png", ".jpg", ".jpeg", ".webp"}
SIZES = {"": (2000, 86), ".thumb": (900, 80)}


def export(img: Image.Image, dest: Path, max_w: int, quality: int) -> None:
    if img.width > max_w:
        img = img.resize((max_w, round(img.height * max_w / img.width)), Image.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "WEBP", quality=quality, method=6)


def main() -> None:
    count = 0
    for src in sorted(SRC.rglob("*")):
        if src.suffix.lower() not in EXTS or not src.is_file():
            continue
        rel = src.relative_to(SRC).with_suffix("")
        with Image.open(src) as im:
            im = im.convert("RGBA") if im.mode in ("P", "LA", "RGBA") else im.convert("RGB")
            for suffix, (max_w, q) in SIZES.items():
                dest = OUT / rel.parent / f"{rel.name}{suffix}.webp"
                if dest.exists() and dest.stat().st_mtime >= src.stat().st_mtime:
                    continue
                export(im, dest, max_w, q)
        count += 1
    print(f"{count} imagens verificadas em {SRC}")


if __name__ == "__main__":
    main()
