# 个人杂谈站

这个仓库托管了 `ltmc.top` 的个人站点，使用 **MkDocs + Material for MkDocs** 构建，部署在 GitHub Pages。

## 本地开发

需要 Python 3.x。

```bash
pip install mkdocs-material
mkdocs serve    # 本地预览 http://localhost:8000
mkdocs build    # 构建静态文件到 site/
```

## 部署

每次推送到 `main` 分支时，GitHub Actions 会自动：

1. 安装 MkDocs Material
2. 运行 `mkdocs build`
3. 将根目录的 HTML/静态文件复制到构建输出
4. 通过 `peaceiris/actions-gh-pages` 部署到 `gh-pages` 分支

## 链接

- 站点: <https://ltmc.top/>
- 源码: <https://github.com/lthpkbte/lthpkbte.github.io>

## 联系方式

- QQ: 2827927233
- Bilibili: [Java8ver64/106366650](https://space.bilibili.com/106366650)
