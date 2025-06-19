# Computer Vision
Computer Vision หรือแปลเป็นไทยว่า “การมองเห็นด้วยคอมพิวเตอร์”
คอมพิวเตอร์จะเห็นเป็นข้อมูลพิกเซลเป็นตัวเลข วิธีการในปัจจุบันอาศัยกระบวนการที่เรียกว่า Machine Learning หรือ Deep Learning
เพื่อสร้างโมเดลทางคณิตศาสตร์ที่จำแนกวัตถุได้
ลักษณะที่นำมาใช้งานในปัจจุบันมีดังนี้
- การแยกส่วนของภาพ (Image segmentation)​
- จัดกลุ่มภาพออกเป็นหมวด (Image classification)​
- ทำงานด้วยการจัดกลุ่ม (Feature matching)​
- การตรวจหาวัตถุ (Object detection) ​
- การจดจำใบหน้า (Facial recognition)​
- ระบุหาขอบเขตหรือวัตถุ (Edge detection)​
- ระบุวัตถุจากรูปทรง สี (Pattern detection)​

## Code
ให้ดาว์นโหลดโมเดล Yolo จากหน้า [Release](https://github.com/ultralytics/assets/releases) เพื่อนำไปใช้งาน โค้ดเป็น Jupyter Notebook 
```
mkdir project_folder
cd project_folder
uv init
uv venv
source .venv/bin/activate
uv add --dev ipykernel
code .
```
- ตัวอย่างโค้ดการใช้งาน OpenCV และ Yolo เพื่อ segmentation, classification,Object detection [ดูที่นี้](./cv.md)
- ตัวอย่างการเทรนด้วย Yolo เพื่อแยกอารมณ์ของใบหน้า โดยใช้ Dataset จาก Roboflow [ดูที่นี้](./rb.md)

