# 个人杂谈站

## 快速导航

- [快速问答手册](QuickRefence.md)
- [EdgeRemover](/EdgeRemover/RemoveEdge.ps1)

??? warning "EdgeRemover 使用方法 & 安全警告"
    在任何人（包括我）给出一个包含 `iex irm` 的组合命令时，**请务必先审查脚本内容再执行**：

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

    如果您没有审查 `powershell` 脚本的能力，可以使用输出的 review 文件求助于 ai，或者避免从任何网页执行类似指令。
    
    常见骗局：

    - 淘宝假入库（以“安装插件”、“激活工具”为由使用命令修改 Steam 达成虚假入库）
    - 假 cloudflare 验证码（以验证网页为由要求你启动管理员终端并黏贴命令）

    管理员权限下，powershell 脚本拥有给 `defender antivirus` 添加豁免名单并关闭 `smartscreen` `Smart App Control` 等功能的能力，如果您没有第三方杀毒软件和管理软件，该操作几乎可以完全绕过系统自带的杀毒保护。


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
