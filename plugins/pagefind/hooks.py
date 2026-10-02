"""MkDocs hooks —— Pagefind 搜索集成

在 mkdocs.yml 中启用：
    hooks:
      - plugins/pagefind/hooks.py

职责：
1. 在 </head> 之前注入 Pagefind Component UI 的样式表与 ES module
2. 给正文 <article> 加上 data-pagefind-body，使索引只包含正文，
   避免导航、页头、页脚在每个页面上重复进入索引
3. 在 </body> 之前注入 <pagefind-modal>，放在页头之外，
   避免页头可能存在的 transform / overflow 影响弹窗定位

索引本身在构建后由 Pagefind CLI 生成：
    npx pagefind --site site --force-language zh
"""

import logging

log = logging.getLogger("mkdocs.hooks.pagefind")

_ARTICLE_TAG = '<article class="md-content__inner md-typeset">'
_ARTICLE_TAG_BODY = '<article class="md-content__inner md-typeset" data-pagefind-body>'

_HEAD_ASSETS = """\
<link rel="stylesheet" href="/pagefind/pagefind-component-ui.css">
<script type="module" src="/pagefind/pagefind-component-ui.js"></script>
"""

_MODAL = """\
<pagefind-modal reset-on-close></pagefind-modal>
"""


def on_post_page(output: str, page, config) -> str:
    """向渲染完成的页面注入 Pagefind 资源、正文标记与弹窗容器"""
    if "</body>" not in output:
        return output

    if _ARTICLE_TAG in output:
        output = output.replace(_ARTICLE_TAG, _ARTICLE_TAG_BODY, 1)
    else:
        log.warning(
            "未找到正文 <article> 标签，Pagefind 将索引整页: %s", page.file.src_path
        )

    if "</head>" in output:
        output = output.replace("</head>", _HEAD_ASSETS + "</head>", 1)
    else:
        log.warning("未找到 </head>，跳过 Pagefind 资源注入: %s", page.file.src_path)

    output = output.replace("</body>", _MODAL + "</body>", 1)
    return output
