# 单位换算问题

拿MB举例，可以有[\^1]  
MB MiB Mb Mib  
第四个单位很少用，其他三个之间是这样的情况：  
1 MB(megabyte) = 1000000 byte = 1000² byte = (10^3)²  
1 MiB(mebibyte) = 1048576 byte = 1024² byte = (2^10)²  
1 Mb(megabit) = 125000 byte = 1000000 bit = 1000² bit  
1 byte = 8 bit  

Windows 在资源管理器[\^2] 显示的所有 MB GB 其实都是 MiB GiB......
导致现在很多人拿 MB 既指 mebibyte 又指 megabyte，但这俩单位其实并不相同。二进制单位和十进制单位的差距会随着单位级数变大而增大。

[\^1]: [Wikipedia : Byte : Multiple-byte units](https://en.wikipedia.org/wiki/Byte#Multiple-byte_units)

[\^2]: Windows 资源管理器（英语：File Explorer，旧称 Windows Explorer），是 Microsoft Windows 及 React OS 操作系统中浏览电脑中文件与文件夹结构的基本工具。
