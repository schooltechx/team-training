# ใช้งาน Flutter บน DevContainer
การติดตั้งและอัปเกรด Flutter ค่อนข้างซับซ้อนและกินเวลานาน มักจะเจอปัญหา เวอร์ชั่นของคอมโปเน้นไม่ตรงและขัดแย้งกัน เราสามารถใช้ 
[DevContainer](https://code.visualstudio.com/docs/devcontainers/containers) เพื่อแก้ปัญหานี้ได้

สร้างโฟลเดอร์เช่น my_flutter ที่มีโฟลเดอร์และไฟล์นี้ 

.devcontainer/devcontainer.json 

แล้วใช้ VSCode เปิดโฟลเดอร์ my_flutter แล้ว กด CTL+Shift+p เลือก 
"Remote-Container: Open Folder in Container..." ไฟล์และโฟเดอร์ที่อยู่ในโฟลเดอร์ my_flutter จะแก้ไขได้ในคอนเทนเนอร์

## ตัวอย่างการใช้งาน
เราสามารถสร้างอิมเมจด้วยตัวเอง หรือใช้ที่มีคนให้แล้ว
- แบบง่าย ใช้อิมเมจที่มีทำไว้อยู่แล้ว 
[cirruslabs/flutter](https://github.com/cirruslabs/docker-images-flutter/pkgs/container/flutter) 

```json
{
    "name": "Flutter",
    "image": "ghcr.io/cirruslabs/flutter:stable",
    "customizations": {
        "vscode": {
            "extensions": [
                "dart-code.dart-code",
                "dart-code.flutter"
            ]
        }
    }
}
```
- สร้างอิมเมจเองจาก Dockerfile จะใช้อิมเมจก่อนหน้าเป็นพื้นฐาน สามารถแก้ไขไฟล์นี้เพิ่มได้
```
FROM ghcr.io/cirruslabs/flutter:3.35.6
```
devcontainer.json จะเซ็ตให้ใช้ build image และรันคำสั่ง Docker และมีการ mount USB (ยังไม่ได้ทดสอบ)
```json
{
    "name": "Flutter Development Container",
    "build": {
        "dockerfile": "Dockerfile"
    },
    "runArgs": [
        "--privileged",
        "-v",
        "/dev/bus/usb:/dev/bus/usb"
    ],
    "forwardPorts": [8081, 5037],
    "remoteUser": "root"
}
```
- สร้างอิมเมจเองและติดตั้งโปรแกรมใหม่หมด เรียกใช้ผ่าน compose.yaml
ตัวอย่างนี้ไม่ได้ mount usb ต้องรันผ่าน Wifi
  - [./devcontainer/devcontainer.json](./.devcontainer/devcontainer.json)
  - [./devcontainer/compose.yaml](./.devcontainer/compose.yaml)
  - [./devcontainer/Dockerfile](./.devcontainer/Dockerfile)
  - [./devcontainer/.env](./.devcontainer/.env.example)

## Debug Target Device
เนื่องจากอยู่ในคอนเทนเนอร์ ถ้าจะ debug สำหรับ Android  
- ผ่าน Wifi บนมือเปิดใช้งาน debug ผ่าน Wifi แล้วทำการ pair ด้วย adb วิธีการดู[ที่นี้](./wifi-debug.md)
- Mount usb debice: น่าจะใช้ได้กับโฮส Linux
- ติดตั้ง Andrid emulator แล้ว debug ผ่าน wifi วิธีการดู[ที่นี้](./install-android-emulator-only.md) 

อ่านเพิ่ม
- [How I Built a Portable Flutter Dev Environment (No Android Studio Required)](https://medium.com/@bastlaca/how-i-built-a-portable-flutter-dev-environment-no-android-studio-required-f4908477180b)
