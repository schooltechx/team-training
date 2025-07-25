## LLM (Python)
ตัวอย่างใช้ [Gemini API](https://ai.google.dev/gemini-api/docs/text-generation#python) 
ในภาษา Python 
- .env ให้ใส่ตัวแปรแวดล้อม [GEMINI_API_KEY](https://aistudio.google.com/app/apikey)
- โค้ดตัวอย่างใช้ Jupyter Notebook ให้ตั้งค่าให้เรียบร้อย

## Install
```sh
mkdir project_folder
cd project_folder
uv init
uv venv
source .venv/bin/activate
uv add --dev ipykernel
touch .env
# Gemini API
uv add google-genai
code .
```

## Code Text generation
ตัวอย่างรวมใน Notebook: [gemini.ipynb](./gemini.ipynb)

## ดูเพิ่ม

[พัฒนาแอพพลิเคชั่น LLM ด้วย Python & LangChain | สำหรับผู้เริ่มต้น [FULL COURSE]](https://www.youtube.com/watch?v=T3JQMcGt7-E&list=PLltVQYLz1BMBjXI_D6lUev3DCOxPfh_Cw)