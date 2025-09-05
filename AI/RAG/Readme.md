# Retrieval-Augmented Generation(RAG)
เป็นเทคนิคใน AI ที่ช่วยเพิ่มความแม่นยำและน่าเชื่อถือของโมเดลภาษาขนาดใหญ่ (LLM) โดยการดึงข้อมูลที่เกี่ยวข้องจากฐานความรู้ภายนอกมาเป็นบริบทเพิ่มเติม ก่อนที่โมเดลจะสร้างคำตอบ ทำให้ AI สามารถให้คำตอบที่อิงจากข้อมูลจริง ล่าสุด และเฉพาะเจาะจงได้ดีขึ้น แทนที่จะต้องพึ่งพาข้อมูลที่ถูกฝึกไว้ในโมเดลเพียงอย่างเดียว. 
ข้อมูลจะเก็บในฐานข้อมูลประเถท Vector หรือ Graph ที่จะใช้การค้นหาโดยดูจากความคล้ายของข้อมูล ข้อมูลจะต้องไปทำ Embedding ก่อนเก็บ


## Vectorization / Embeddings
เป็นขั้นตอนแปลงข้อมูลเป็นเวกเตอร์ตัวเลขที่มีมิติสูง เพื่อให้สามารถนำไปใช้ในงานต่างๆ เช่น การค้นหาความคล้ายคลึงกัน (similarity search) หรือการจัดกลุ่มข้อมูล (clustering) ได้ง่ายขึ้น 
การเลือกโมเดล ต้องขึ้นกับงานและต้องรองรับภาษาไทย ดูได้ที [Thai-Sentence-Vector-Benchmark](https://github.com/mrpeerat/Thai-Sentence-Vector-Benchmark) ที่นิยมใช้เช่น
- [BGE-M3](https://huggingface.co/BAAI/bge-m3) รองรับ 8192 โทเคน
- [intfloat/multilingual-e5]
- [sentence-transformers/LaBSE]
- [wangchanberta]

## การตัดข้อความ (Chunking)
ภาษาไทยเป็นภาษาที่ ไม่มีเครื่องหมายวรรคตอนชัดเจน วิธีที่แนะนำ:
- ตัดตาม จำนวนตัวอักษร/โทเคน (เช่น 300–500 tokens)
- หรือใช้การตัดตาม ประโยค/ย่อหน้า (sentence splitter ภาษาไทย)

## Retrieval
ถ้าเลือกใช้ PostgreSQL หรือ Elasticsearch น่าจะปรับใช้กับงานได้ง่ายเพราะมีอยู่แล้วไม่ต้องติดตั้งตัวใหม่
- Vector Search: มีให้เลือกใช้หลายตัวเช่น 
[Weaviate](https://weaviate.io/), 
[Qdrant](https://qdrant.tech/), 
[PostgreSQL + pgvector](https://github.com/pgvector/pgvector)
- GraphRAG : ให้ผลที่ดีกว่า Vector แต่มีความซับซ้อนสูงกว่า เช่น [neo4j](https://neo4j.com/blog/developer/rag-tutorial/)
- Hybrid Search: ผสม BM25 (lexical) กับ embedding search → ภาษาไทย benefit มาก เพราะบางคำ embedding ไม่ชัด แต่ keyword ยังช่วยได้ เช่น 
[FAISS](https://github.com/facebookresearch/faiss), 
[Elasticsearch hybrid search](https://www.elastic.co/what-is/hybrid-search)

## Generation
ในเบื้องต้น Gemini ในการทดสอบรองรับภาษาไทยได้ดี ส่วนนี้ถ้าปรับไปใช้ Node.js แทน Python ได้น่าจะง่ายในการ integrate กับระบบเดิม

## ปัญหากับภาษาไทย
- Word Segmentation: ภาษาไทยไม่มี space คั่นคำ ต้องใช้ตัวตัดคำ เช่น PyThaiNLP, Deepcut, หรือ HuggingFace tokenizer ที่รองรับไทย
- Normalization: ลดความหลากหลาย เช่น แปลงสระ/วรรณยุกต์ซ้ำ ("เก่งงงง" → "เก่ง"), การสะกดหลายแบบ (เช่น “กรุงเทพฯ” vs “กรุงเทพ”) → อาจพลาด retrieval, ภาษาพูด vs ภาษาเขียน → เช่น “ครับ/ค่ะ” อาจไม่จำเป็นต่อความหมาย แต่มีผลกับ similarity, การใช้ emoji หรือภาษาปนอังกฤษ → ต้อง normalize เพิ่ม
- Stopwords: ภาษาไทยมีคำฟุ่มเฟือย (เช่น "แล้ว", "และ", "คือ") ซึ่งอาจต้องกำจัดก่อน indexing



## อ่านเพิ่ม
- [Embedding Projector](http://projector.tensorflow.org/)
- [breadchris/hybrid.py](https://gist.github.com/breadchris/b73aae81953eb8f865ebb4842a1c15b5)