# Retrieval-Augmented Generation(RAG)
Retrieval-augmented generation (RAG) เป็นเทคนิกที่ช่วยเพิ่มประสิทธิ์ภาพของคำตอบจาก AI(NLP) โดยผสมผสานความสามารถในการค้นฐานข้อมูล(Retrieval) และ Generative AI ในขั้นตอน Retrieval มีผลต่อความแม่นยำของ RAG เป็นอย่างมาก ถ้าได้ข้อมูลที่ไม่ตรงกับที่ควรจะเป็น  จะทำให้โมเดลสร้างคำตอบที่ไม่ถูกต้องและ hallucination ได้

คิวรี(คำค้นหรือคำถาม) บางประเภทเหมาะสำหรับเทคนิคการดึงข้อมูลแบบอิงคีย์เวิร์ด(BM25) ในขณะที่บางประเภทอาจทำงานได้ดีกว่าเมื่อใช้กับการค้นฐานข้อมูลประเภท Vector 
โดยเฉพาะภาษาไทยที่ค้นหาแบบ Vector ไม่แม่นยำนัก จึงเกิดการผสมผสานสองวิธีการที่ช่วยแก้ไขข้อบกพร่องของสองแบบที่เรียกว่า Hybrid Search

ในปัจจุบันความสำคัญของ RAG อาจจะลดลงเนื่องจาก LLM รองรับ context ขนาดใหญ่ได้ โดยเฉพาะ Gemini เอกสารที่ขนาดไม่ใหญ่นัก เราสามารถใส่ตรงๆให้ LLM ได้เลย ทำให้ใช้งานได้ยืดหยุ่นมากขึ้นโดยไม่ต้องทำ RAG
![alt text](img/context-compare.png)

## Sample Code
- [simple_rag.ipynb](./simple_rag.ipynb) แบบง่ายด้วย Gemini
- [simple_rag_hybrid.ipynb](./simple_rag_hybrid.ipynb) ทำแบบ Hybrid Search ตัดคำ normalize Chunk
- [gemini-embed.ts](./gemini-embed.ts) ทำ embedding ด้วยโมเดล embed ของ Gemini


## Full-text Search
มักใช้อัลกอริทึม BM25 เพื่อจัดอันดับการค้นหา วิธีหนึ่งจะอาศัยความถี่ของ Keyword ที่พบลักษณะเดียวกับ search engines แต่ไม่เข้าใจเนื้อหาของคำตรงๆ

## Vectorization / Embeddings
เป็นการค้นหาที่ดูจากความหมายของคำ ข้อมูลถูกแปลงเป็นเวกเตอร์ตัวเลขที่มีมิติสูง เพื่อให้สามารถนำไปใช้ในงานต่างๆ เช่น การค้นหาความคล้ายคลึงกัน (similarity search) หรือการจัดกลุ่มข้อมูล (clustering) ได้ง่ายขึ้น 
การเลือกโมเดล ต้องขึ้นกับงานและต้องรองรับภาษาไทย ดูได้ที [Thai-Sentence-Vector-Benchmark](https://github.com/mrpeerat/Thai-Sentence-Vector-Benchmark) ที่นิยมใช้เช่น
- [BGE-M3](https://huggingface.co/BAAI/bge-m3) รองรับได้ถึง 8192 โทเคน
- [intfloat/multilingual-e5](https://huggingface.co/intfloat/multilingual-e5-large)
- [sentence-transformers/LaBSE](https://huggingface.co/sentence-transformers/LaBSE)
- [wangchanberta?](https://airesearch.in.th/releases/wangchanberta-pre-trained-thai-language-model/)


## Hybrid Search
RAG เพิ่มความแม่นยำของโดยอาศัย Full-text และ Vector Search ร่วมกัน เพื่อเพิ่มโอกาสในการค้นพบข้อมูลที่ต้องการ เรียกว่า Hybrid Search จะรวมข้อมูลทั้งสองแหล่งที่มีการจัดอันดับด้วยคะแนนต่างกัน มาจัดอันดับใหม่ 
[fusion algorithms](https://amenra.github.io/ranx/fusion/#supported-fusion-algorithms) 
ในการรวมรายการค้นหาสองรายการเข้าด้วยกัน อัลกอริทึมหนึ่งที่นิยมกันคือ Reciprocal Rank Fusion

การค้นหาข้อมูลจากสองแหล่งจะเปรียบเทียบหรือจัดอันดับกันได้ยาก จะมีอัลกอริทึมตัวหนึ่งชื่อ Reciprocal Rank Fusion จะรวมการจัดอันดับ(rankings) จากหลายแหล่งเข้าด้วยกัน


## การตัดข้อความ (Chunking)
เอกสารยิ่งใหญ่ยิ่งต้องใช้มิติขนาดใหญ่สำหรับเก็บ Vector จะกระทบกับประสิทธิ์ภาพของฐานข้อมูล 
และ Embeddings โมเดลจำมีข้อจำกัดเรื่องขนาดด้วย ดังนั้นจำเป็นต้องตัดข้อมูลเป็นส่วนเล็กๆ โดยที่ยังคงความหมายเดิมไว้ ถ้าไปตัดกึ่งกลางของบริบทก็จะเกิดปัญหาได้ ก็ต้องมีการทำ overlapping จุดที่ตัดสำหรับภาษาไทยจะยุ่งยากกว่าภาษาอังกฤษ เนื่องจากเป็นภาษาที่ไม่มีเครื่องหมายวรรคตอนชัดเจน วิธีที่การตัด:
- ตัดตาม จำนวนตัวอักษร/โทเคน (เช่น 300–500 tokens) ต้องมี overlapping
- หรือใช้การตัดตาม ประโยค/ย่อหน้า (sentence splitter ภาษาไทย)

น่าจะต้องศึกษาหัวข้อนี้ให้เข้าใจ อาจจะต้องศึกษาลักษณะของเอกสาร เพื่อกำหนดขนาดมิติ Chunking และ overlapping ที่เหมาะสม

## Database
ถ้าเลือกใช้ PostgreSQL หรือ Elasticsearch น่าจะปรับใช้กับงานได้ง่ายเพราะใช้กับระบบอื่นร่วมกันไม่ต้องติดตั้งตัวใหม่
- Vector Search: มีให้เลือกใช้หลายตัวเช่น [FAISS](https://github.com/facebookresearch/faiss),
[Weaviate](https://weaviate.io/), 
[Qdrant](https://qdrant.tech/), 
[PostgreSQL + pgvector](https://github.com/pgvector/pgvector)
- GraphRAG : ให้ผลที่ดีกว่า Vector แต่มีความซับซ้อนสูงกว่า เช่น [neo4j](https://neo4j.com/blog/developer/rag-tutorial/)
- Hybrid Search: ผสม BM25 (lexical) กับ embedding search → ภาษาไทย benefit มาก เพราะบางคำ embedding ไม่ชัด แต่ keyword ยังช่วยได้ เช่น  
[Elasticsearch hybrid search](https://www.elastic.co/what-is/hybrid-search)

## Generation
ในเบื้องต้น Gemini ในการทดสอบรองรับภาษาไทยได้ดี ส่วนนี้ถ้าปรับไปใช้ Node.js แทน Python ได้น่าจะง่ายในการ integrate กับระบบเดิม

## ปัญหา
- Word Segmentation: ภาษาไทยไม่มี space คั่นคำ ต้องใช้ตัวตัดคำ เช่น PyThaiNLP, Deepcut, หรือ HuggingFace tokenizer ที่รองรับไทย
- Normalization: ลดความหลากหลาย เช่น แปลงสระ/วรรณยุกต์ซ้ำ ("เก่งงงง" → "เก่ง"), การสะกดหลายแบบ (เช่น “กรุงเทพฯ” vs “กรุงเทพ”) → อาจพลาด retrieval, ภาษาพูด vs ภาษาเขียน → เช่น “ครับ/ค่ะ” อาจไม่จำเป็นต่อความหมาย แต่มีผลกับ similarity, การใช้ emoji หรือภาษาปนอังกฤษ → ต้อง normalize เพิ่ม
- Stopwords: ภาษาไทยมีคำฟุ่มเฟือย (เช่น "แล้ว", "และ", "คือ") ซึ่งอาจต้องกำจัดก่อน indexing
- Chunking การแบ่งตามหน้าหรือ ตามย่อหน้าน่าจะได้ใจความที่สมบูรณ์แล้ว แต่ก็อาจจะมีข้อความบางอย่าง อ้างถึงอีกย่อหน้าก่อนหน้า ถ้าไม่อ่านก่อนก็จะไม่มีข้อมูลที่สมบูรณ์ เช่น "จากสองหัวข้อที่แล้วเราก็เลยเลือวิธีการแบบนั้นไป ..." อาจจำเป็นต้องใช้ AI ช่วยเติม สรุปข้อมูลในการสร้าง Chunks ร่วมด้วย

## อ่านเพิ่ม
- [Embedding Projector](http://projector.tensorflow.org/)
- [breadchris/hybrid.py](https://gist.github.com/breadchris/b73aae81953eb8f865ebb4842a1c15b5)
- [Reciprocal Rank Fusion (RRF) explained in 4 mins — How to score results form multiple retrieval methods in RAG](https://medium.com/@devalshah1619/mathematical-intuition-behind-reciprocal-rank-fusion-rrf-explained-in-2-mins-002df0cc5e2a)
- [RAG - by Sam Witteveen](https://www.youtube.com/playlist?list=PL8motc6AQftn-X1HkaGG9KjmKtWImCKJS)