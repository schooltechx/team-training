# Docker

เทคโนโลยี container เป็นสิ่งจำเป็นสำหรับการพัฒนาในปัจจุบัน ส่วนใหญ่เริ่มใช้งาน docker เอกสารนี้เป็นการสรุปการใช้จะมีรายละเอียดในการสอนอีกทีหนึ่ง

## Linux Virtualization และ Containerization
- ความแตกต่างระหว่าง VM กับ Container ?
- Container มีแบบไหนบ้าง ? Windows
- ข้อจำกัดของ Container ?
- ทำไมต้องใช้ ?

## docker command
คำสั่งพื้นฐาน
```
docker ps
docker images
docker run [image]
docker volume ls
docker volume rm volume_name
docker network ls
docker network crate [network_name]
docker build -t tag_name .
```

## docker compose command

ใช้ไฟล์ compose(compose.yaml, docker-compose.yaml) ที่เป็นคอนฟิกสำหรับการเรียกใช้ doker ทำให้ไม่ต้องจำคำสั่งที่ซับซ้อนเพื่อติดตั้งและเรียกใช้งานไฟล์ทั้งระบบ และไฟล์นี้สามารถเก็บใน git ได้

ตัวอย่างไฟล์ [docker-compose.yaml](https://github.com/schooltechx/youtube/blob/main/Docker%20VM%20K8s/docker-compose/wordpress/docker-compose.yaml), [compose.yaml](../express-ts/compose.yaml)
```
docker compose ps
docker compose up -d
docker compose up [service_name]
docker compose stop
docker compose down
docker compose logs -f [service_name]
docker compose 

```


## แบบฝึกหัด
- ติดตั้งเวปเซิร์ฟเวอร์ Nginx สร้างโฟลเดอร์ [simple-web](./simple-web/) โดยมีไฟล์ [docker-compose.yaml](./simple-web/docker-compose.yaml) และ [html/index.html](./simple-web/html/index.html) อยู่ข้างใน เรียกคำสั่ง docker compose up ในโฟลเดอร์นั้น
- ติดตั้ง Wordpress สร้างโฟลเดอร์ [wordpress](./wordpress/) โดยมีไฟล์ [compose.yaml](./wordpress/compose.yaml) อยู่ข้างใน เรียกคำสั่ง docker compose up ในโฟลเดอร์นั้น

## Docker Volume
เมื่อมีการแก้ไขค่าบางอย่างคอนเทนเนอร์จะถูกสร้างใหม่จากอิมเมจในเครื่องทำให้ข้อมูลที่สร้างในคอนเทนเนอร์หายไป แบบฝึกหัด simple-web และ wordpress แสดงการใช้ volume เพื่อให้ container ใช้ไฟล์หรือโฟลเดอร์จากเครื่องโฮส เมื่อคอนเทนเนอร์ถูกสร้างใหม่ข้อมูลจะไม่หายไป (persistent volume)

simple-web เป็นแบบ read only(ro)คอนเทนเนอร์จะอ่านอย่างเดียวแก้ไขค่าไม่ได้เราจะแก้ไฟล์ได้จากเครื่องโฮสเท่านั้น 

wordpress จำเป็นต้องแก้ไขไฟล์จาก container ซึ่งการสร้างไฟล์จะใช้สิทธิ์ใน container ทำให้เราไม่สามารถลบหรือแก้ไขได้ จำเป็นต้องมีสิทธิ์ sudo ในการจัดการ 

กรณีพวกฐานข้อมูลอาจจะใช้ docker volume จะได้มีสิทธิ์ ตัวอย่างเป็นดังนี้
```
services:
  db:
    image: mariadb
    volumes:
      - db-data:/var/lib/mysql
volumes:
  db-data:
```
แสดงและลบ volume ทำดังนี้
```sh
docker volume ls 
docker volume rm [volume_name]

```
## Docker network
Docker จะสร้างเน็ตเวิร์กส่วนตัวต่อหนึ่งไฟล์คอมโพส 
```sh
oom@debian12ct:~/docker/simple-web$ docker compose up -d
[+] Running 2/2
 ✔ Network simple-web_default  Created  0.2s 
 ✔ Container simple-web-web-1  Started  0.4s 
```
เมื่ออยู่เน็ตเวิร์กเดียวกันจะอ้างถึงกันผ่านชื่อเซอร์วิส (เหมือนมี dns ภายใน) โดยไม่ต้องใช้ IP เนื่องจากเราไม่รู้ IP ที่แน่นอนจึงใช้วิธีนี้เป็นหลัก  ดูตัวอย่างใน [compose.yaml](./wordpress/compose.yaml) ของ wordpress สามารถอ้าง db:3306


## Docker registry
เป็นที่เก็บ docker image มีเวอร์ชั่น(tag) ต่างๆให้เลือกใช้ ที่นิยมใช้กันคือ [Docker Hub](https://hub.docker.com/) 
เราสามารถติดตั้งเองได้ 
[แก้ไฟล์ /etc/docker/daemon.json](./registry/daemon.json)
แล้วใช้ [docker-compose.yaml](./registry/docker-compose.yaml) วิธีการฉบับเต็มดูในวีดีโอ [Deploy Docker Registry บน K8s](https://www.youtube.com/watch?v=NJ5zcvvdL9o)

## Create Docker image
จะมีการนำ Base Image มาใส่โปรแกรมเพิ่มเข้าไป วิธีการทำดูตัวอย่าใน [Dockerfile](../express-ts/Dockerfile)


## อ่านเพิ่มเติม
เข้าใจการทำงานของ Docker และ Reverse Proxy 

- [Docker in WSL2: เริ่มต้นใช้งาน Docker บน WSL2](https://youtu.be/ntLLCJk9LyY?si=j0JfcYfC9OCaK_4r)
- [Nginx Proxy Manager ตอนติดตั้งและใช้งานเบื้องต้น](https://www.youtube.com/watch?v=iWrbL-xDwlk)
- [ติดตั้ง Wordpress, reverse proxy, เซ็ต DNS ปฎิบัติบน cloud จริง](https://youtu.be/ALNn-X_2PEs?si=McPM02elR72IfBJ8)

- [Nginx Proxy Manager สร้าง Self-signed certificate ใช้เอง](https://youtu.be/pyJF2DnPv7Y?si=K2t6lrWEJLObULre)
- [Traefik ใชับน Docker และ Self-signed Certificate](https://www.youtube.com/watch?v=z3TqJImsXPQ)

## ดูเพิ่มเติมเกี่ยวกับ API Gateway
เข้าใจการทำงานของ API Gateway
- [Traefik เบื้องต้น เพื่อทำ API Gateway, Microservice](https://www.youtube.com/watch?v=DgxRcFlccsU)
- [พัฒนา Microservice แบบเป็นทีม](https://www.youtube.com/watch?v=-zfABqdhmPg)

