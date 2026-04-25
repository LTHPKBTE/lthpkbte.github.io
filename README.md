# LTHC 文档站

这个仓库托管了 `ltmc.top` 的文档站点，使用 **MkDocs + Material for MkDocs** 构建，部署在 GitHub Pages。

## 本地开发

需要 Python 3.x。

```bash
pip install mkdocs-material
mkdocs serve    # 本地预览 http://localhost:8000
mkdocs build    # 构建静态文件到 site/
```

## 目录结构

```
docs/               # MkDocs 文档源目录
├── index.md        # 首页
├── QuickRefence.md # 快速问答手册
├── doc/            # 文档页面
│   ├── talk_about_minecraft.md
│   ├── fix_save.md
│   ├── upload_log_to_group.md
│   ├── change_dns_11.md
│   ├── change_dns_10.md
│   ├── quick_button.md
│   └── assets/     # 文档图片资源
└── misc/           # 杂谈页面
    ├── QoS_archive.md
    └── byte_bit_question.md

# 根目录保留文件（部署时一并发布）
status.html         # 设备在线状态
smartapp.html       # 跳转页面
RefenceSearch.html  # 问答搜索
EdgeRemover/        # Edge 移除工具
treefor/            # 树形工具
assets/reset.webp   # 根级资源
CNAME               # 自定义域名 ltmc.top
mkdocs.yml          # MkDocs 配置
.github/workflows/  # GitHub Actions 部署流水线
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
