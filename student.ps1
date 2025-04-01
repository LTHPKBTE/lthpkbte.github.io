Add-Type -TypeDefinition @"
using System;
using System.Diagnostics;
using System.Runtime.InteropServices;

public class ThreadTerminator {
    [DllImport("kernel32.dll")]
    public static extern IntPtr OpenThread(uint dwDesiredAccess, bool bInheritHandle, uint dwThreadId);
    
    [DllImport("kernel32.dll")]
    public static extern bool TerminateThread(IntPtr hThread, uint dwExitCode);
    
    [DllImport("kernel32.dll")]
    public static extern bool CloseHandle(IntPtr hObject);
    
    public const uint THREAD_TERMINATE = 0x0001;
    public const uint THREAD_QUERY_INFORMATION = 0x0040;
    
    public static void TerminateAllThreads(int processId) {
        Process process = Process.GetProcessById(processId);
        Console.WriteLine($"find: {process.ProcessName} (PID: {process.Id})");
        
        foreach(ProcessThread thread in process.Threads) {
            Console.WriteLine($"try stop ID: {thread.Id}");
            
            IntPtr threadHandle = OpenThread(THREAD_TERMINATE | THREAD_QUERY_INFORMATION, false, (uint)thread.Id);
            if(threadHandle != IntPtr.Zero) {
                if(TerminateThread(threadHandle, 0)) {
                    Console.WriteLine($"stopped ID: {thread.Id}");
                } else {
                    Console.WriteLine($"unable to stop ID: {thread.Id}");
                }
                CloseHandle(threadHandle);
            } else {
                Console.WriteLine($"unable to open ID: {thread.Id}");
            }
        }
    }
}
"@ -Language CSharp

try {
    $processes = Get-Process -Name "StudentMain" -ErrorAction SilentlyContinue
    
    if($processes.Count -eq 0) {
        Write-Host "StudentMain.exe not found"
        exit
    }
    
    foreach($process in $processes) {
        Write-Host "procressing: $($process.Id)"
        [ThreadTerminator]::TerminateAllThreads($process.Id)
    }
    
    Write-Host "complete."
} catch {
    Write-Host "error: $_"
}
