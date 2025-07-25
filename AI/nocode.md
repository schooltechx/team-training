# No Code
Flowise เหมาะกับเอามาทำงาน AI ทำได้ง่ายไม่ซับซ้อน 
ส่วน n8n อาจจะไม่เก่งเท่าแต่ก็ทำได้ง่ายและรองรับการเชื่อมต่อระบบอื่นๆได้มากกว่า
สามารถใช้งานร่วมกันเพื่อให้ได้ข้อดีทั้งคู่ได้

## Install
สร้างไฟล์ compose.yaml โฟลเดอร์ data_n8n และ data_flowise

```yaml
# compose.yaml
services:
  n8n:
    image: n8nio/n8n:1.92.2
    restart: unless-stopped
    ports:
      - 5678:5678
    environment:
      - GENERIC_TIMEZONE=Asia/Bangkok
      - TZ=Asia/Bangkok
      # - N8N_SECURE_COOKIE=false
    volumes:
      - ./data_n8n:/home/node/.n8n
  flowise:
    image: flowiseai/flowise:3.0.1
    restart: unless-stopped
    ports:
      - 5679:5679
    volumes:
      - ./data_flowise:/root/.flowise
    environment:
      - DEBUG=false
      - PORT=5679
      - FLOWISE_USERNAME=admin
      - FLOWISE_PASSWORD=admin1234
      - APIKEY_PATH=/root/.flowise
      - SECRETKEY_PATH=/root/.flowise
      - LOG_LEVEL=info
      - LOG_PATH=/root/.flowise/logs
      - TZ=Asia/Bangkok     
```

เรียกคำสั่ง

```
docker compose up -d
```
เข้าใช้งานตามลิงค์นี้ จะให้สร้างยูสเซอร์สำหรับใช้งาน n8n สามารถเลือกรับ license ฟรีผ่านเมลล์ได้
- n8n : http://localhost:5678
- flowise : http://localhost:5679


## อ่านเพิ่ม
- [Build ANY AI Agent with Flowise and n8n, Here's How](https://www.youtube.com/watch?v=-zlbm58WRAA)
- [Flowise + n8n - The BEST No Code + Local AI Agent Combo](https://www.youtube.com/watch?v=23s2N3ug8B8)


## N8N Template

- [WhatsApp chabot เป็นเซลล์ มีข้อมูลสินค้าจาก vector store](https://n8n.io/workflows/2465-building-your-first-whatsapp-chatbot/?_gl=1*1tvgonz*_gcl_au*NzE1MTM2NTYwLjE3NDk5MDk3NjQ.*_ga*NTEwMTQ2NTY1LjE3NTA3MzUyNTE.*_ga_0SC4FF2FH9*czE3NTA4NjEwNzYkbzQkZzEkdDE3NTA4NjEyNTkkajM1JGwwJGgw)
- [AI agent that can scrape webpages](https://n8n.io/workflows/2006-ai-agent-that-can-scrape-webpages/?_gl=1*qbdsyr*_gcl_au*NzE1MTM2NTYwLjE3NDk5MDk3NjQ.*_ga*NTEwMTQ2NTY1LjE3NTA3MzUyNTE.*_ga_0SC4FF2FH9*czE3NTA4NjEwNzYkbzQkZzEkdDE3NTA4NjEyMzQkajYwJGwwJGgw)
- [N8N Agent Connector, Open WebUI](https://www.youtube.com/watch?app=desktop&v=6zn8vVTeFE0)
- [Build Your OWN AI Agent That Can SEE And SPEAK With Ease](https://www.youtube.com/watch?v=cTvaMD4Tt9Y)

