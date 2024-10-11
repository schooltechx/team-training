# SvelteKit
```sh
npm create svelte@latest svelte-kit-ts
# Skeleton project,TypeScript syntax
cd svelte-kit-ts
npm install
npm i @sveltejs/adapter-node
npm run dev
```
## File
ให้ศึกษาไฟล์ในโฟลเดอร์เหล่านี้
- [package.json](./package.json) ดู script ที่เรียกใช้
- [svelte.config.js](./svelte.config.js) มี Adapter Node เพื่อ deploy เป็น node.js
- [src/routes/](./src/routes/) 
- [Dockerfile](./Dockerfile)
- [compose.yaml](./compose.yaml)

# Deploy
โปรเจ็กนี้ใช้ @sveltejs/adapter-node เพื่อแปลเป็นโค้ดสำหรับ node.js จะอยู่ในโฟลเดอร์ build การสร้างอิมเมจของ docker ก็จะใช้ Adapter ตัวนี้

```
npm run build
npm run build:docker
```



