# Reverse Proxy
ในปัจจุบัน IPv4 มีจำนวนจำกัด ดังนั้นหนึ่ง Public IP จะให้บริการหลายโดเมน เช่น a.com b.com และ c.com 
เวปเซิร์ฟเวอร์(Apache, Nginx ฯลฯ) รองรับความสามารถนี้ ซึ่งจะคล้ายๆกับการทำ Virtual Host

การเชื่อมโยงโดเมนเข้ากับ IP Address จะอาศัย DNS(Domain Name Service) หรือไฟล์ hosts ซึ่งในแต่ละระบบปฎิบัติการจะเป็นดังนี้
- Linux : /etc/hosts
- Windows : C:\Windows\System32\drivers\etc\hosts
- [macOS](https://kb.hostatom.com/content/3464/) : /private/etc/hosts

เมื่อหลายโดเมนชี้มาที่ IP Address เดียวกัน Reverse Proxy ทำหน้าที่ส่งต่อไปยังเซิร์ฟเวอร์ที่อยู่เบื้องหลัง


![Reverse Proxy](./reverse_proxy_flow.png)
[(ภาพจาก cloudflare)](https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/)

จากภาพด้านซ้ายเป็นเครื่องผู้ใช้งาน Reverse Proxy(มี Public IP) จะเป็นช่องทางเดียวที่ยูสเซอร์บนอินเตอร์เน็ตมองเห็น และด้านขวาเซิร์ฟเวอร์จะอยู่ในเน็ตเวิร์กภายในไม่สามารถติดต่อได้โดยตรง ต้องผ่าน Reverse proxy เท่านั้น Reverse Proxy จะอาศัยชื่อโดเมนที่ทางซ้าย request มา เทียบกันค่าที่ตั้งไว้เพื่อส่งต่อให้เซิร์ฟเวอร์ภายในได้ถูกต้อง ให้ดูวีดีโอติดตั้ง Nginx Proxy Manager เพื่อทำ Reverse Proxy

[![Nginx Proxy Manager ตอนติดตั้งและใช้งานเบื้องต้น](https://img.youtube.com/vi/iWrbL-xDwlk/0.jpg)](https://youtu.be/iWrbL-xDwlk "Nginx Proxy Manager ตอนติดตั้งและใช้งานเบื้องต้น")

```yaml
services:
  npm:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
```
เวลา NPM ทำการ proxy ไปเวปเซิร์ฟเวอร์ที่อยู่ในแต่ละคอนเทนเนอร์ ห้ามใช้ localhost เพราะ ตัว NPM เองก็เป็นคอนเทนเนอร์เหมือนกันซึ่งจะหมายถึงตัว NPM เอง กรณีเวปเซิร์ฟเวอร์เปิดพอร์ตบนเครื่องโอสให้ใช้ IP address ของโฮสแทน หรืออ้างโดเมน host.docker.internal


## HTTPS
เนื่องจาก Reverse Proxy เป็นจุดรวมในการเชื่อมต่อจากอินเตอร์เน็ต จึงเหมาะกับ ทำ HTTPS เพื่อให้มีการเข้ารหัส ซึ่งจะต้องมี Certificate อาจจะซื้อมาใช้ ขอฟรีจาก Let's Encrypt หรือ ทำขึ้นมาเองซึ่งเรียกว่า Selfsigned Certificate ตัวอย่างคำสั่งด้านล่างจะทำ wildcard Certificate ทำให้ Certificate ตัวเดียวใช้ได้หลาย Sub Domain เวลาใช้งาน ให้ไปติดตั้งใน reverse proxy

```
# create oomhome.crt oom.home.key
openssl req -x509 -newkey rsa:4096 -sha256 -days 3650 \
  -nodes -keyout oom.home.key -out oom.home.crt -subj "/CN=oom.home" \
  -addext "subjectAltName=DNS:oom.home,DNS:*.oom.home"
```

Selfsigned Certificate  จะยังไม่ได้ถูกยอมรับโดยระบบปฎิบัติการหรือบราวเซอร์ เวลาใช้งานจะขึ้นว่าไม่ปลอดภัยอยู่ดี แต่การสื่อสารถือว่ามีการเข้ารหัสเรียบร้อยแล้ว ถ้าจะให้ Chrome ไม่ขึ้นเตือนต้อง import certificate [ตามวิธีในเวปนี้](https://github.com/BenMorel/dev-certificates)

ในวีดีโอจะใช้อีกวิธีคือสร้าง root CA ขึ้นมาก่อนแล้วทำการ sign certificate อีกที ถ้า chrome ติดตั้ง root CA แล้ว certificate ที่ sign ด้วย root CA นี้ก็จะถูกเชื่อถือไปด้วย

[![Nginx Proxy Manager สร้าง Self-signed certificate ใช้เอง](https://img.youtube.com/vi/pyJF2DnPv7Y/0.jpg)](https://www.youtube.com/watch?v=pyJF2DnPv7Y "Nginx Proxy Manager สร้าง Self-signed certificate ใช้เอง")


## แบบฝึกหัด
- สร้าง Wildcard Certificate สำหรับทำ HTTPS
- ใช้ Docker เปิดใช้งานเวปเซิร์ฟเวอร์หรือเวปแอปขึ้นมา 2-3 เวป
- สร้างโดเมนต่างๆกัน สำหรับเวปแอปโดยระบุในไฟล์ hosts
- ใช้ Nginx Proxy Manager เพื่อเชื่อมโยงโดเมนกับเวปที่ทำไว้ ติดตั้ง certificate เพื่อให้ใช้งาน https
- นำเข้า Certificate ให้ในแต่ละเครื่อง เพื่อให้แสดงว่าปลอดภัยบน browser