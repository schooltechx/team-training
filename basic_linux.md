# Linux basic
เซิร์ฟเวอร์บน Test หรือ Production จะใช้ Linux เป็นส่วนใหญ่ จะมีโอกาสที่จะได้ เข้าถึงไฟล์ในระบบ ตั้งค่า อัปเดตหรือรันโปรแกรมค่อนข้างบ่อย ดังนั้นมีความจำเป็นต้องเข้าใจวิธีใช้ในระดับหนึ่ง 
Command line และการกำหนด permission บน Linux จะให้ใช้งานร่วมกับ Visual Studio Code เพื่อให้ง่ายต่อการทำงาน

## เตรียมตัว
- ติดตั้ง Visual Studio Code และ Extension Remote SSH
- Window 10 ต้องติดตั้ง Windows Terminal
- Windows 10/11 ติดตั้ง WSL
- ให้ทำตามเอกสาร ["การตั้งค่า Github"](https://github.com/schooltechx/youtube/blob/main/fullstack-dev/github/Setup.md)

## การจัดการไฟล์โฟลเดอร์

### Home folder
- Linux: /home/user_name/
- Windows: C:\Users\user_name
- macOS: /Users/user_name/
### ไฟล์ซ่อน
Linux มีจุดนำหน้าเช่น .ssh ใช้ -a เพื่อแสดงเช่น 
``` bash
ls -a
ls -la 
```

### ฐานข้อมูลผู้ใช้และกลุ่ม
 /etc/password , /etc/group

## คำสั่งในการจัดการ
ls,cd, mkdir, touch , pwd, which 
```bash
oom@Sorawit-Dell:~/train$ ls -la
total 24
drwxr-xr-x  4 oom oom 4096 Nov  1 16:42 .
drwxr-x--- 27 oom oom 4096 Nov  1 16:42 ..
-rw-r--r--  1 oom oom  186 Nov  1 15:14 Readme.md
drwxr-xr-x  2 oom oom 4096 Nov  1 16:43 basic-linux
-rwxrw-rw-  1 oom oom   27 Nov  1 14:54 test.txt
```
## permission
แบ่งเป็น 3 ระดับ user, group, other
มี Read Write Execute(รันโปรแกรมหรือเข้าโฟลเดอร์)
```
id
chmod uog+x ./filename
```

## SSH
```bash
ssh oom@<ip> -p 108
```
แก้ไฟล์
.ssh/config
```
Host train
  User oom
  HostName 000.000.000.000
  ForwardAgent yes
  Port 108
```
หลังแก้ config จะเข้าแบบนี้ได้
```
ssh train
```
## ผู้ดูแลระบบ
บน Linux จะมี root เป็นคนจัดการ ใน Ubuntu ใช้ ยูสเซอร์ที่มีสิทธิ์ sudo แทน

```bash
sudo usermod -aG sudo oom
sudo apt update
sudo apt upgrade
```
## ตัวแปรแวดล้อม 
ไว้เก็บค่าใช้ร่วมกับโปรแกรมต่างๆ สามารถเปลี่ยนได้ง่าย
```
which bash
a="Hello"
echo $a
echo $PATH
```

## IO Redirection
เราสามารถเปลี่ยน Output ของโปรแกรมไปยังอีกโปรแกรมหรือใส่ในไฟล์ได้
```
cat /etc/passwd | grep bin
ls /etc > etc.txt
ls . >> etc.txt 
```
## Shell Script 
shell หลักของ Linux ใช้ bash ตัวอย่างของ Script (อย่าลืมเปลี่ยนโหมดให้ execute ได้)

```bash
#! /usr/bin/bash
echo "How old are you ?"
read age
if [ $age -gt 17 ]
then
  echo "You are 18+"
else
  echo "You are kid"
fi
```

## Git 
ให้ตั้งค่าตามเอกสาร ["การตั้งค่า Github"](https://github.com/schooltechx/youtube/blob/main/fullstack-dev/github/Setup.md) ให้ ลองทำแบบเดียวกันใน Linux และ เอาไฟล์เอกสารนี้ไปเป็นตัวตั้งต้นจดโน้ตสำหรับเรียน เก็บไว้ใน Resitory ของตัวเอง เพิ่มเนื้อหาตามความเหมาะสม จะได้หัดเขียน Markdown ด้วย

## ศึกษาเพิ่ม
- [การใช้ bash shell (command line) เบื้องต้น ตอนที่ 1](https://www.youtube.com/watch?v=USyQFCkRN8c)
- [Bash in 100 Seconds](https://www.youtube.com/watch?v=I4EWvMFj37g)
- [Bash Scripting Tutorial for Beginners](https://www.youtube.com/watch?v=tK9Oc6AEnR4)
- [วิธีการใช้ Markdown ง่ายๆ ไม่มีความรู้เรื่อง Programming ก็ทำได้](https://dev.classmethod.jp/articles/how-to-use-markdown-simply/)
- [ How to Write Bash Scripts in Linux](https://www.freecodecamp.org/news/shell-scripting-crash-course-how-to-write-bash-scripts-in-linux/)
