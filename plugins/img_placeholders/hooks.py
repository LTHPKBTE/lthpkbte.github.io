"""
MkDocs hooks — 图片占位空间 + ThumbHash 模糊预载

在 mkdocs.yml 中启用：
    hooks:
      - plugins/img_placeholders/hooks.py

为页面中的 <img> 自动:
1. 注入 width/height + aspect-ratio CSS → 防止 CLS（布局偏移）
2. 生成 ThumbHash 模糊缩略图 data URL → 作为 src 占位图
3. 添加 loading="lazy" + data-src + data-thumbhash → unlazy 懒加载
"""

import base64
import io
import logging
import os as _os
import shutil
from contextlib import redirect_stdout
from pathlib import Path

from bs4 import BeautifulSoup
from PIL import Image

import thumbhash

log = logging.getLogger("mkdocs.hooks.img_placeholders")

# 支持的图片扩展名
_SUPPORTED_EXTS = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif", ".bmp"}


def on_page_content(html: str, page, config, files) -> str:
    """在 Markdown 渲染为 HTML 后处理所有 <img> 标签"""
    soup = BeautifulSoup(html, "html.parser")
    images = soup.find_all("img")
    if not images:
        return html

    modified = 0
    for img in images:
        src = img.get("src", "")
        if not src:
            continue

        # 跳过外部 URL
        if src.startswith(("http://", "https://", "//")):
            continue
        # 跳过 data URI
        if src.startswith("data:"):
            continue
        # 跳过 SVG（Pillow 不支持）
        if src.lower().endswith(".svg"):
            continue

        # 解析本地文件路径
        img_path = _resolve_path(src, page, config)
        if img_path is None or not img_path.exists():
            log.debug("图片文件不存在，跳过: %s", src)
            continue
        if img_path.suffix.lower() not in _SUPPORTED_EXTS:
            continue

        try:
            data_url, thumbhash_b64, orig_w, orig_h = _generate_thumbhash(img_path)

            # 注入属性
            img["width"] = str(orig_w)
            img["height"] = str(orig_h)
            img["loading"] = "lazy"
            img["data-thumbhash"] = thumbhash_b64

            # 将原始 src 移到 data-src，占位图设为 src
            img["data-src"] = src
            img["src"] = data_url

            # style 防 CLS
            existing_style = (img.get("style") or "") or ""
            if "aspect-ratio" not in existing_style:
                cls_style = f"aspect-ratio: {orig_w}/{orig_h}; max-width: 100%; height: auto;"
                combined = f"{existing_style}; {cls_style}".strip("; ").strip()
                img["style"] = combined

            modified += 1
        except Exception as exc:
            log.warning("处理图片失败 %s: %s", src, exc)
            continue

    if modified > 0:
        log.info("已处理 %d/%d 张图片: %s", modified, len(images), page.file.src_path)
        return str(soup)

    return html


def on_post_build(config):
    """构建完成后复制 unlazy.min.js 到 site/ 目录"""
    src_js = Path(__file__).resolve().parent.parent.parent / "assets" / "js" / "unlazy.min.js"
    if not src_js.exists():
        log.warning("unlazy.min.js 不存在，跳过复制: %s", src_js)
        return

    site_js = Path(config["site_dir"]) / "assets" / "js"
    site_js.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src_js, site_js / "unlazy.min.js")
    log.info("已复制 unlazy.min.js 到 site/assets/js/")


# ---------------------------------------------------------------------------
# 内部工具
# ---------------------------------------------------------------------------


def _resolve_path(src: str, page, config):
    """将 HTML 中的图片 src 解析为源文件的绝对路径

    MkDocs 重写 Markdown 中的相对路径用于输出结构：
      Markdown: assets/xxx.png (relative to docs/doc/change_dns_10.md)
      HTML:     ../assets/xxx.png (relative to site/doc/change_dns_10/index.html)
    此函数逆向该转换找到源文件。
    """
    import os as _os

    docs_dir = Path(config["docs_dir"]).resolve()
    site_dir = Path(config["site_dir"]).resolve()

    # 通过输出路径反推
    dest_path = Path(page.file.dest_path)  # e.g. doc/change_dns_10/index.html
    dest_dir = str(dest_path.parent)  # doc/change_dns_10
    output_rel = _os.path.normpath(_os.path.join(dest_dir, src))  # doc/assets/xxx.png
    candidate = (docs_dir / output_rel).resolve()
    if candidate.exists():
        return candidate

    # 也尝试从项目根目录查找（针对 /assets/ 等绝对路径）
    root_dir = Path(config["config_file_path"]).resolve().parent
    if src.startswith("/"):
        candidate2 = root_dir / src.lstrip("/")
        if candidate2.exists():
            return candidate2

    # 后备：直接相对于源文件目录解析
    src_dir = Path(page.file.abs_src_path).resolve().parent
    candidate3 = (src_dir / src).resolve()
    if candidate3.exists():
        return candidate3

    return None


def _generate_thumbhash(img_path: Path):
    """
    为图片生成 ThumbHash 占位图

    返回: (data_url, base64_hash, original_width, original_height)
    """
    with Image.open(img_path) as img:
        orig_w, orig_h = img.size

        # 缩放到 max 100px 用于 ThumbHash 编码
        thumb = img.convert("RGBA")
        thumb.thumbnail((100, 100), Image.LANCZOS)
        tw, th = thumb.size

        # 编码为 ThumbHash
        rgba = list(thumb.tobytes())
        hash_list = thumbhash.rgba_to_thumb_hash(tw, th, rgba)
        hash_bytes = bytes(hash_list)
        thumbhash_b64 = base64.b64encode(hash_bytes).decode("ascii")

        # 解码回 RGBA → PNG 内存 → data URL
        # thumbhash 库的 thumb_hash_to_rgba 有 debug print，静默它
        with redirect_stdout(io.StringIO()):
            dec_w, dec_h, rgba_decoded = thumbhash.thumb_hash_to_rgba(hash_list)
        decoded_img = Image.frombytes("RGBA", (dec_w, dec_h), bytes(rgba_decoded))
        buf = io.BytesIO()
        decoded_img.save(buf, format="PNG")
        data_url = "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode("ascii")

    return data_url, thumbhash_b64, orig_w, orig_h
