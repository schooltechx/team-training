# Install Android Emulator
ติดตั้ง Android Emulator อย่างเดียวโดยไม่ต้องติดตั้ง Android Studio สามารถทำได้โดยติดตั้งผ่าน Command line tools ในตัวอย่างเป็นของวินโดว์ทำตามขั้นตอนดังนี้
- ติดตั้ง [Oracle JDK8](https://download.oracle.com/java/18/archive/jdk-18.0.2_windows-x64_bin.exe),
หรือ [OpenJDK 17](https://learn.microsoft.com/en-us/java/openjdk/download#openjdk-17) 
- ดาว์โหลด [Command line tools only](https://developer.android.com/studio)
- สร้างโฟลเดอร์ C:\android-sdk\cmdline-tools\tools แล้วแตกไฟล์ Command line tools ที่ดาว์นโหลดไว้ที่นี้(bin, lib ,source.properties ) 
- เรียกใช้คำสั่ง
```cmd
cd C:\android-sdk\cmdline-tools\tools\bin
.\sdkmanager.bat --list
.\sdkmanager.bat --install "system-images;android-36;google_apis_playstore;x86_64"
.\sdkmanager.bat "platform-tools" "platforms;android-36"
.\avdmanager.bat create avd --name android36 --package "system-images;android-36;google_apis;x86_64"
```
# ถึงขั้นตอนนี้จะมี error เกี่ยวกับ Virtualization Technology ให้เปิดใน bios (กรณี CPU AMD เรียก SVM Mode)
Android Emulator รุ่นใหม่วินโดว์จะรันบน Windows Hypervisor Platform (WHP) สำหรับ CPU รุ่นเก่าอาจจะกลับไปใช้ [Intel HAXM](https://github.com/intel/haxm/releases) 
บน Linux จะใช้ KMV ส่วน macOS จะใช้ Apple Hypervisor
```cmd
cd C:\android-sdk\emulator
emulator –avd android36 -qemu -m 3000
```
สร้าง shotcut สำหรับใช้งาน คลิ้กขวาที่ไฟล์ C:\android-sdk\emulator emulator.exe -> Create shortcut แล้วคลิ้กขวาที่ shortcut เลือก Properties ไปที่ target แก้ตามด้านล่าง
```
C:\android-sdk\emulator\emulator.exe –avd android36 -qemu -m 3000
```
แก้คอนฟิก C:\Users\yourUser\.android\avd\android36.avd\config
```
hw.camera.back=virtualscene
hw.keyboard = yes
disk.dataPartition.size=1800M
```


## devcontainer (note test)
เพิ่มโค้ดส่วนนี้ใน devcontainer.json
```
"runArgs": [
    "--network=host",
    "--env", "ADB_SERVER_SOCKET=tcp:127.0.0.1:5037"
  ],
  "containerEnv": {
    "ADB_SERVER_SOCKET": "tcp:127.0.0.1:5037"
  }
```
แล้วใช้ adb devices เพื่อดูอุปกรณ์



## อ่านเพิ่ม
- [How to install Android emulator without Android Studio for test and debug Neptune Apps](https://community.neptune-software.com/topics/tips--tricks/blogs/how-to-install--android-emulator-without--android--st)
