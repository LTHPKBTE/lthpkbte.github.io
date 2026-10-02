# 个人杂谈站

这个仓库托管了 `ltmc.top` 的个人站点，使用 **MkDocs + Material for MkDocs** 构建，部署在 GitHub Pages。

## 本地开发

需要 Python 3.x 与 Node.js（生成搜索索引用）。

```bash
pip install mkdocs-material thumbhash Pillow beautifulsoup4
mkdocs serve    # 本地预览 http://localhost:8000（不含搜索索引）
mkdocs build    # 构建静态文件到 site/
```

搜索由 [Pagefind](https://pagefind.app/) 提供，索引在 `mkdocs build` 之后生成。
想本地完整体验搜索，可执行：

```bash
mkdocs build
npx --yes pagefind@^1.5.0 --site site --force-language zh --serve
```

## 部署

每次推送到 `main` 分支时，GitHub Actions 会自动：

1. 安装 MkDocs Material
2. 运行 `mkdocs build`
3. 运行 `pagefind` 生成中文搜索索引到 `site/pagefind/`
4. 将根目录的 HTML/静态文件复制到构建输出
5. 通过 `peaceiris/actions-gh-pages` 部署到 `gh-pages` 分支

## 搜索实现

- Material 内置的 `search` 插件已移除，改由 **Pagefind** 索引。
- `plugins/pagefind/hooks.py` 在页面中注入 Component UI 资源、`data-pagefind-body`
  正文标记与 `<pagefind-modal>` 弹窗。
- `overrides/partials/header.html` 用 `<pagefind-modal-trigger>` 替换页头搜索入口
  （默认快捷键 `Ctrl/⌘ + K`，同时保留 `/`）。
- `docs/assets/css/pagefind-theme.css` 负责与 Material 亮/暗色主题对齐。

## 链接

- 站点: <https://ltmc.top/>
- 源码: <https://github.com/lthpkbte/lthpkbte.github.io>

## 联系方式

- QQ: 2827927233
- Bilibili: [Java8ver64/106366650](https://space.bilibili.com/106366650)
