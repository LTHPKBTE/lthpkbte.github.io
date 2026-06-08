---
description: "Use when creating or editing MkDocs documentation pages for the 个人杂谈站. Covers Material theme features, enabled Markdown extensions, writing conventions, and navigation structure."
applyTo: "docs/**/*.md"
---

# 个人杂谈站 — MkDocs Material 编写指南

本项目使用 **MkDocs Material** 构建，所有文档位于 `docs/` 目录下。编辑 `.md` 文件时请遵循以下规则。

## 主题配置

- 主题: **Material**，语言: `zh`
- 配色: primary `indigo`, accent `indigo`
- 支持亮色/暗色模式切换

## 导航结构

导航定义在 `mkdocs.yml` 的 `nav` 字段中。当前结构：

```
- 首页: index.md
- 快速问答手册: QuickRefence.md
- 文档:
  - 关于 UUID 修复: doc/talk_about_minecraft.md
  - 存档丢失补救: doc/fix_save.md
  - 上传日志到群: doc/upload_log_to_group.md
  - 更改 DNS (Win11): doc/change_dns_11.md
  - 更改 DNS (Win10): doc/change_dns_10.md
  - 快速按钮: doc/quick_button.md
- 杂谈:
  - 跨网 QoS 存档: misc/QoS_archive.md
  - 单位换算: misc/byte_bit_question.md
```

- 新增页面后需同步更新 `mkdocs.yml` 中的 `nav`。
- 页面标题使用中文，与 frontmatter 或一级标题保持一致。

## 可用 Markdown 扩展

### 通用扩展
| 扩展 | 用途 |
|------|------|
| `attr_list` | 给元素添加 CSS 类或属性 `{.class}` |
| `md_in_html` | 在 HTML 块内使用 Markdown 语法 |
| `tables` | 标准 Markdown 表格 |
| `footnotes` | 脚注 `[^1]` / `[^1]: 内容` |

### Admonition（警告/提示块）
```markdown
!!! warning "标题"
    内容段落
```

已启用 `admonition` + `pymdownx.details`（可折叠块）：
```markdown
??? note "可折叠标题"
    折叠内容
```

### 代码高亮（pymdownx.highlight）
支持语言标注和行号锚点：
```markdown
```python
print("hello")
```
```

启用功能：
- `anchor_linenums`: 行号可锚点跳转
- `pygments_lang_class`: 语言 CSS 类
- `line_spans`: __span

### 其他 pymdownx 扩展
| 扩展 | 用法 |
|------|------|
| `pymdownx.superfences` | 嵌套代码块（代码块内嵌套其他元素） |
| `pymdownx.inlinehilite` | 行内代码高亮 `` `#!python code` `` |
| `pymdownx.snippets` | 插入外部文件内容 |
| `pymdownx.magiclink` | 自动链接 URL 和邮箱 |
| `pymdownx.tasklist` | 任务列表 `- [x] 已完成`（自定义复选框） |
| `pymdownx.tabbed` | 标签页内容切换（`alternate_style: true`） |

## 写作惯例

- 文档正文使用**中文**，技术术语可保留英文（如 UUID、DNS）。
- 代码块需标注语言（`powershell`、`bash`、`yaml`、`python` 等）。
- 引用外部来源使用脚注 `[^1]`，并在文末定义 `[^1]: 来源链接`。
- 图片统一放入文档同级的 `assets/` 文件夹，使用相对路径引用：`![alt](assets/图片文件名)`。
- 命令行的输出或操作步骤使用有序列表。
- 重要的安全提醒使用 `!!! warning` 警告块。
- 涉及路径时使用 `反引号` 包裹。

## 编辑/提交

- 编辑链接指向 `blob/main/docs/`（已在 `mkdocs.yml` 中配置 `edit_uri`）。
- 依赖管理: `pyproject.toml` 中 `mkdocs-material>=9.5`。
