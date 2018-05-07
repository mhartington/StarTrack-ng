$key = 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\AppModelUnlock'
$isDeveloperMode = (Get-ItemProperty -Path $key -Name AllowDevelopmentWithoutDevLicense).AllowDevelopmentWithoutDevLicense

if($isDeveloperMode)
{
    $guid = 'INSERT-YOUR-PACKAGE-IDENTITY-NAME-HERE'
    $appxmanifest = 'manifest\AppxManifest.xml'

    if(Test-Path $appxmanifest) {
        try {
            $installed = Get-AppxPackage $guid
            Clear-Host

            if($installed) {
                Remove-AppxPackage $installed.PackageFullName
            }

            Add-AppxPackage -Register $appxmanifest

            Write-Host "App installed. You can find the app Installed in your start menu."
        } catch {
            $ErrorMessage = $_.Exception.Message
            Write-Host "Error: " + $ErrorMessage
        }
    } else {
        Write-Host "Missing AppxManifest.xml"
    }
}
else {
    Write-Host "Error: The App was not installed.  It is likely because your computer needs to be in developer mode to install this test app. Please change your system to developer mode and run this script again."
}

Write-Host "Press any key to continue ..."
$host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
