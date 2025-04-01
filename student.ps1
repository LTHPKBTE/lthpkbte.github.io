Add-Type -TypeDefinition @"
using System;
using System.Diagnostics;
using System.Runtime.InteropServices;

public class ThreadTerminator {
    // 导入必要的 Win32 API 函数
    [DllImport("kernel32.dll")]
    public static extern IntPtr OpenThread(uint dwDesiredAccess, bool bInheritHandle, uint dwThreadId);
    
    [DllImport("kernel32.dll")]
    public static extern bool TerminateThread(IntPtr hThread, uint dwExitCode);
    
    [DllImport("kernel32.dll")]
    public static extern bool CloseHandle(IntPtr hObject);
    
    // 线程访问权限常量
    public const uint THREAD_TERMINATE = 0x0001;
    public const uint THREAD_QUERY_INFORMATION = 0x0040;
    
    // 获取指定进程的所有线程
    public static void TerminateAllThreads(int processId) {
        Process process = Process.GetProcessById(processId);
        Console.WriteLine($"找到进程: {process.ProcessName} (PID: {process.Id})");
        
        foreach(ProcessThread thread in process.Threads) {
            Console.WriteLine($"尝试终止线程 ID: {thread.Id}");
            
            IntPtr threadHandle = OpenThread(THREAD_TERMINATE | THREAD_QUERY_INFORMATION, false, (uint)thread.Id);
            if(threadHandle != IntPtr.Zero) {
                if(TerminateThread(threadHandle, 0)) {
                    Console.WriteLine($"成功终止线程 ID: {thread.Id}");
                } else {
                    Console.WriteLine($"无法终止线程 ID: {thread.Id}");
                }
                CloseHandle(threadHandle);
            } else {
                Console.WriteLine($"无法打开线程 ID: {thread.Id}");
            }
        }
    }
}
"@ -Language CSharp

# 主脚本逻辑
try {
    # 获取所有 studentmain.exe 进程
    $processes = Get-Process -Name "studentmain" -ErrorAction SilentlyContinue
    
    if($processes.Count -eq 0) {
        Write-Host "没有找到 studentmain.exe 进程"
        exit
    }
    
    foreach($process in $processes) {
        Write-Host "正在处理进程: $($process.Id)"
        [ThreadTerminator]::TerminateAllThreads($process.Id)
    }
    
    Write-Host "操作完成"
} catch {
    Write-Host "发生错误: $_"
}
