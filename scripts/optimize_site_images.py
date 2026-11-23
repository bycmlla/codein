"""
Gera versões otimizadas (WebP) das capturas dos projetos do portfólio.

  Sites:    src/assets/Sites/**     →  src/assets/sites-web/**
  Sistemas: src/assets/Sistemas/**  →  src/assets/sistemas-web/**

Os arquivos originais nunca são alterados. Para cada imagem são gerados:
  <nome>.webp        — versão para visualização ampliada (até 2000px de largura)
  <nome>.thumb.webp  — miniatura para cards e galeria (até 900px de largura)

Imagens listadas em scripts/imagens_em_revisao.json não são publicadas
(nenhuma versão web é gerada, e versões antigas são removidas).

Uso (na raiz do projeto):  py scripts/optimize_site_images.py
Rode novamente sempre que adicionar, trocar ou liberar imagens.
"""
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "src" / "assets"
REVIEW_FILE = ROOT / "scripts" / "imagens_em_revisao.json"

# (origem, destino, remover versões web sem original correspondente)
JOBS = [
    (ASSETS / "Sites", ASSETS / "sites-web", False),
    (ASSETS / "Sistemas", ASSETS / "sistemas-web", True),
]
EXTS = {".png", ".jpg", ".jpeg", ".webp"}
SIZES = {"": (2000, 86), ".thumb": (900, 80)}


def load_review() -> set[str]:
    if not REVIEW_FILE.exists():
        return set()
    data = json.loads(REVIEW_FILE.read_text(encoding="utf-8"))
    return {k.replace("\\", "/") for k in data if not k.startswith("_")}


def outputs_for(src_root: Path, out_root: Path, src: Path) -> list[Path]:
    rel = src.relative_to(src_root).with_suffix("")
    return [out_root / rel.parent / f"{rel.name}{suffix}.webp" for suffix in SIZES]


def export(img: Image.Image, dest: Path, max_w: int, quality: int) -> None:
    if img.width > max_w:
        img = img.resize((max_w, round(img.height * max_w / img.width)), Image.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "WEBP", quality=quality, method=6)


def main() -> None:
    review = load_review()

    for src_root, out_root, prune in JOBS:
        if not src_root.exists():
            continue
        published, held = 0, 0
        expected: set[Path] = set()

        for src in sorted(src_root.rglob("*")):
            if src.suffix.lower() not in EXTS or not src.is_file():
                continue
            key = src.relative_to(ASSETS).as_posix()
            dests = outputs_for(src_root, out_root, src)

            if key in review:
                held += 1
                for d in dests:
                    d.unlink(missing_ok=True)
                continue

            expected.update(dests)
            pending = [
                (d, size)
                for d, size in zip(dests, SIZES.values())
                if not (d.exists() and d.stat().st_mtime >= src.stat().st_mtime)
            ]
            if pending:
                with Image.open(src) as im:
                    im = im.convert("RGBA") if im.mode in ("P", "LA", "RGBA") else im.convert("RGB")
                    for dest, (max_w, q) in pending:
                        export(im, dest, max_w, q)
            published += 1

        if prune and out_root.exists():
            for old in out_root.rglob("*.webp"):
                if old not in expected:
                    old.unlink()

        print(f"{src_root.name}: {published} publicadas, {held} em revisão")


if __name__ == "__main__":
    main()
