# LTHC 文档站

这里是 LTHC 的文档和杂谈汇集地，使用 MkDocs + Material 构建。

---

## 快速导航

- [快速问答手册](QuickRefence.md) — 提问的智慧与常见问答
- [在线状态](/status.html) — 查看设备是否在线
- [EdgeRemover](/EdgeRemover/RemoveEdge.ps1) — 移除 Microsoft Edge 脚本

EdgeRemover 使用方法：

!!! warning "安全警告"
    在任何人（包括我）让你执行 `iex irm` 组合命令时，**请务必先审查脚本内容再执行**：

    ``` powershell
    # 获取脚本并逐页查看，确认内容安全
    irm https://ltmc.top/EdgeRemover/RemoveEdge.ps1 | more
    ```

    也可以保存到文件后用编辑器打开阅读：

    ``` powershell
    # 保存为临时文件，用记事本查看
    irm https://ltmc.top/EdgeRemover/RemoveEdge.ps1 > $env:TEMP\review.ps1
    notepad $env:TEMP\review.ps1
    ```

    **确认无误后**再执行：

``` powershell
irm https://ltmc.top/EdgeRemover/RemoveEdge.ps1 | iex
```

### 文档

- [关于 UUID 修复](doc/talk_about_minecraft.md) — 联机模组的 UUID 修复说明
- [存档丢失补救](doc/fix_save.md) — UUID 变更导致的存档恢复
- [上传日志到群](doc/upload_log_to_group.md) — 在禁止上传文件的群内分享日志
- [更改 DNS (Win11)](doc/change_dns_11.md) — Windows 11 DNS 设置
- [更改 DNS (Win10)](doc/change_dns_10.md) — Windows 10 DNS 设置
- [快速按钮](doc/quick_button.md) — 快速打开系统页面

### 杂谈

- [跨网 QoS 存档](misc/QoS_archive.md) — 相关帖子存档
- [单位换算](misc/byte_bit_question.md) — Byte/bit 单位换算说明

---

## 关于本站

| 项目 | 说明 |
|------|------|
| 域名 | [ltmc.top](https://ltmc.top/) |
| 托管 | GitHub Pages |
| 框架 | MkDocs + Material for MkDocs |
| 源码 | [lthpkbte/lthpkbte.github.io](https://github.com/lthpkbte/lthpkbte.github.io) |

### 联系方式

- QQ: 2827927233
- Bilibili: [Java8ver64/106366650](https://space.bilibili.com/106366650)
