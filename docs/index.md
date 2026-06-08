# 个人杂谈站

## 快速导航

- [快速问答手册](QuickRefence.md)
- [EdgeRemover](/EdgeRemover/RemoveEdge.ps1)

EdgeRemover 使用方法：

!!! warning "安全警告"
    在任何人（包括我）让你执行 `iex irm` 组合命令时，**请务必先审查脚本内容再执行**：

    ``` powershell
    irm https://ltmc.top/EdgeRemover/RemoveEdge.ps1 | more
    ```

    也可以保存到文件后用编辑器打开阅读：

    ``` powershell
    irm https://ltmc.top/EdgeRemover/RemoveEdge.ps1 > $env:TEMP\review.ps1
    notepad $env:TEMP\review.ps1
    ```

    检查脚本内容后再执行：

    ``` powershell
    irm https://ltmc.top/EdgeRemover/RemoveEdge.ps1 | iex
    ```

### Minecraft 文档

- [关于 UUID 修复](doc/talk_about_minecraft.md)
- [存档丢失补救](doc/fix_save.md)

### 其他文档

- [上传日志到群](doc/upload_log_to_group.md)
- [更改 DNS (Win11)](doc/change_dns_11.md)
- [更改 DNS (Win10)](doc/change_dns_10.md)
- [快速按钮](doc/quick_button.md)

### 杂谈

- [跨网 QoS 存档](misc/QoS_archive.md) — 相关帖子存档
- [单位换算](misc/byte_bit_question.md) — Byte/bit 单位换算说明

---

## 关于本站

| 项目 | 详情 |
|------|------|
| 托管 | GitHub Pages |
| 框架 | MkDocs + Material for MkDocs |
| 源码 | [lthpkbte/lthpkbte.github.io](https://github.com/lthpkbte/lthpkbte.github.io) |
| 辅助 | GPT/Deepseek/Gemini |

### 联系方式

- QQ: 2827927233
- Bilibili: [Java8ver64/106366650](https://space.bilibili.com/106366650)
