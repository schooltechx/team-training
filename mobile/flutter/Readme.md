# การพัฒนาโปรแกรมด้วย Flutter 
สำหรับการพัฒนาจะประกอบไปด้วยสามส่วนหลัก
- Flutter SDK เป็นเครื่องมือต่างๆเช่น คอมไพล์โค้ด, build apk ฯลฯ
- อุปกรณ์สำหรับทดสองหรือใช้ Emulator 
- Editor สำหรับแก้ไขโค้ดใช้ VS Code หรือ Android Studio ก็ได้

## การติดตั้ง
สำหรับ windows และ Linux แนะนำให้ลองติดตั้งผ่าน DevContainer ทำได้รวดเร็ว และไม่ต้องติดตั้งโปรแกรมบนเครื่องเพิ่มเติม
- [ติดตั้งผ่าน VS Code](https://docs.flutter.dev/install/with-vs-code#install-flutter) รุ่นใหม่ทำได้ง่ายและรวดเร็ว
- [ติดตั้งด้วยตัวเอง](https://docs.flutter.dev/install/manual) ทำได้ยากแต่เลือกเวอร์ชั่นหรือติดตั้งบางส่วนได้
- [ติดตั้งผ่าน DevContainer](./devcontainer.md) ง่ายและรวดเร็วที่สุด ตัว SDK รับอยู่บน Container แล้วใช้ VS Code เข้าไปแก้โค้ดในคอนเทนเนอร์ เหมาะกับสภาพแวดล้อมที่มีการควบคุม เวอร์ชั่นของเครื่องมือให้ตรงกัน อัปเกรดง่าย เหมาะกับทีมขนาดใหญ่ ทำ CI/CD ได้ง่าย สภาพแวดล้อมในการพัฒนาจะเป็น Linux บนคอนเทนเนอร์จะมีข้อจำกัดในการแสดงผลกราฟฟิก และเชื่อมต่อจากภายนอก จำเป็นต้อง mount USB ,debug ผ่าน Wifi, รัน Emulator นอกคอนเทนเนอร์ หรือ Forward XWindows ออกมานอกคอนเทนเนอร์ แต่ยังไม่เคยลองบน macOS ว่ามีปัญหาอะไรหรือไม่ 
- [ติดตั้ง Android Emulator อย่างเดียว](./install-android-emulator-only.md) สำหรับการรัน SDK แยกจาก Emulator เช่นใช้กับ DevContainer หรือทีม Test เพื่อการทดสอบ mulator หลายๆตัว

## การตั้งค่าสำหรับมือถือ Android ให้อยู่โหมด Debug
การตั้งโหมดนักพัฒนาภาพตัวอย่างเป็น Interface ไทยของ Xiaomi แต่คำอธิบายจะเป็นภาษาอังกฤษเพื่อให้เข้าใจวิธีการทั้งสองภาษา
-  Settings > About phone (หรือ About device) หาเลข Build กด 7 ก็จะเข้าสู่โหมดนักพัฒนา

![About](img/android_about_dev.jpeg)
- Settings > System > Developer options (หรือ Additional Settings > Developer options สำหรับ MIUI บางรุ่น) จากในภาพ Debug คือคำว่า "แก้ไขข้อบกพร่อง" ในภาษาไทย
- เปิดใช้ "Enable USB Debugging", "Enable Install via USB"

![Dev Mode](img/android_dev_mode.jpeg)
- เปิดใช้ "Enable Wireless Debugging" แล้วเข้าไป เลือก "Pair device with pairing code" และดู IP:Port สำหรับการ pair และโค้ด
```
adb pair 192.168.2.34:41263 678503
```

![Wifi Pair](img/wifi_debug_pair.jpeg)

- รันคำสั่งต่อไปนี้เพื่อเชื่อมต่อกับมือถือ ติดตั้งไลบารี แล้วรันโปรแกรม ให้กด r เพื่อ Reload โปรแกรม
```
adb connect 192.168.2.34:38471
flutter pub get
flutter run
```
![Wifi Debug connect](img/wifi_debug_connect.jpeg)

## Flutter Command
คำสั่งสำหรับ Flutter
```
flutter create --platform=android,ios,web my_app
cd my_app
flutter doctor
flutter pub outdated
flutter pub upgrade --major-versions

flutter run
flutter clean
flutter build apk
# mirror screen
scrcpy -m 1024

```


อ่านเพิ่ม
- [How I Built a Portable Flutter Dev Environment (No Android Studio Required)](https://medium.com/@bastlaca/how-i-built-a-portable-flutter-dev-environment-no-android-studio-required-f4908477180b)
