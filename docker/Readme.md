# Docker
docker เป็นสิ่งจำเป็นสำหรับการพัฒนา

## Linux Virtualization และ Containerization
- ความแตกต่างระหว่าง VM กับ Container ?
- ข้อจำกัดของ Container ?
- Container บน Windows ?

## docker command

```
docker ps
docker images
docker network crate network_name
docker build -t tag_name .
```
คำสั่งเพิ่มเติมในการสร้าง docker image ให้ดูใน [Dockerfile](../express-ts/Dockerfile)

## docker compose command

เนื่องจากเป็นการเรียนลัด จะให้ใช้ docker compose เป็นหลักใช้คำสั่ง docker เท่าที่จำเป็น
สร้างไฟล์ [docker-compose.yaml](https://github.com/schooltechx/youtube/blob/main/Docker%20VM%20K8s/docker-compose/wordpress/docker-compose.yaml), [compose.yaml](../express-ts/compose.yaml)
```
docker compose ps
docker compose up -d
docker compose up [service_name]
docker compose stop
docker compose down
docker compose logs -f [service_name]
docker compose 

```
## Docker registry
เป็นที่เก็บ docker image มีเวอร์ชั่น(tag) ต่างๆให้เลือกใช้ ที่นิยมใช้กันคือ [Docker Hub](https://hub.docker.com/) 
เราสามารถติดตั้งเองได้ 
[แก้ไฟล์ /etc/docker/daemon.json](./registry/daemon.json)
แล้วใช้ [docker-compose.yaml](./registry/docker-compose.yaml) วิธีการฉบับเต็มดูในวีดีโอ [Deploy Docker Registry บน K8s](https://www.youtube.com/watch?v=NJ5zcvvdL9o)



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

