
# Roboflow
[Roboflow](https://roboflow.com/) 
เป็นเวปลักษณะเหมือน colab แต่สำหรับด้าน Computer Vision โดยเฉพาะ มีเครื่องมือสำหรับทำ label ใช้ฟรีแต่มีการใช้จำกัด ใช้มากต้องเสียงเงิน ใช้เพื่อทำ Label แล้วดาว์นโหลดมาเทรนที่เครื่อง PC หรือ colab จะประหยัดกว่า ให้สมัครใช้งานแล้วสร้าง API Key จะใช้ในขั้นตอนถัดไป

## Step 01 # Install/Import/Check Package
```python
!uv add ultralytics roboflow
import ultralytics
ultralytics.checks()
```
## Step # 02 Download Dataset from Roboflow
โค้ดด้านล่างให้ใช้ API Key ที่ได้มา เมื่อรันโค้ดจะเกิดโฟลเดอร์ Facial-Emotion-Dataset--3 เป็น data set ที่ดาว์นโหลดจาก Roboflow


```python
from roboflow import Roboflow
rf = Roboflow(api_key="ROBOFLOW_API_KEY")
project = rf.workspace("workenv-dayet").project("facial-emotion-dataset-7g1jd-hipbk")
version = project.version(3)
dataset = version.download("yolov11")
```
```python
dataset.location
```
## Step # 03 Train the YOLOv11 Model

ขั้นตอนต่อไปนี้จะเป็นการเทรนโมเดลจะใช้เวลานาน ถ้าไม่มี GPU ให้ใช้ colab ถ้า VRAM น้อยให้ลดค่า batch ลง ผลของการเทรนจะอยู่ในโฟลเดอร์ run อย่าลืมดาว์นโหลด yolo11n.pt มาใช้งาน


```python
from ultralytics import YOLO
from IPython.display import Image
import datetime;
print("start time:", datetime.datetime.now())
# Load the YOLO model
model = YOLO("yolo11n.pt")  # Load your model architecture or pre-trained weights

# Train the model with the specified configuration
results = model.train(
    data=f"{dataset.location}/data.yaml",  # Path to dataset YAML file
    epochs=50,         # Number of training epochs
    imgsz=640,          # Image size (resolution)
    batch=40,           # Batch size ใช้ประมาณ 5.5 GB VRAM
    device=0,           # Specify GPU (0) or CPU ('cpu')
    lr0=0.001,           # Initial learning rate
    optimizer="Adam",   # Optimizer (e.g., 'SGD', 'Adam')
    workers=30,          # Number of dataloader workers
    seed=42,            # Random seed for reproducibility
    patience=10,        # Early stopping patience (number of epochs)
    weight_decay=0.0005,  # Weight decay for regularization
    momentum=0.937,     # Momentum for SGD
    name="exp_name",    # Name of the experiment folder
    verbose=True        # Print detailed training logs
)
print("end time:", datetime.datetime.now())
```

## Step # 04 Examine Training Results
ดูผลการทดสอบความแม่ยำ ของโมเดล


```python
Image("./runs/detect/exp_name/confusion_matrix.png", width=800)
```
```python
Image("./runs/detect/exp_name/labels.jpg", width=800)
```
```python
Image("./runs/detect/exp_name/results.png", width=600)
```
```python
Image("./runs/detect/exp_name/train_batch0.jpg", width=600)
```
```python
Image("./runs/detect/exp_name/val_batch0_pred.jpg", width=600)
```

## Step # 05  Validate Fine-Tuned Model
Perform validation
```python
results = model.val(
    data=f"{dataset.location}/data.yaml",  # Path to the dataset YAML file
    batch=8,                  # Batch size for validation
    imgsz=640,                 # Image size for validation
    conf=0.001,                # Confidence threshold for predictions
    iou=0.6,                   # IoU threshold for NMS
    device=0,                  # Specify GPU (0) or CPU ('cpu')
    split="val"                # Split to validate on (default: 'val')
)
```
## Step # 06 Inference with Custom Model on Images
สุ่มภาพในโฟลเดอร์มาทดสอบ ในโค้ดนี้ใช้จาก test dataset 

```python
from ultralytics import YOLO
import random
import cv2
import os
from IPython.display import Image, display

def find_images_in_subfolders(root_dir, image_extensions=None):
    if image_extensions is None:
        image_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp']    
    image_files = []
    for subdir, _, files in os.walk(root_dir):
        for file in files:
            if any(file.lower().endswith(ext) for ext in image_extensions):
                image_files.append(os.path.join(subdir, file))
    return image_files
# Example usage
image_list = find_images_in_subfolders(f'{dataset.location}/test/images')
# Randomly select 8 unique images
random_images = random.sample(image_list, 8)
# Process each randomly selected image
for image_path in random_images:
    results = model(image_path, imgsz=640)
    results[0].show()
```


## Home Work
ให้เขียนโค้ดเปิด webcam แล้วทำการตรวจจับอารมณ์ โดยใช้โมเดลที่เทรนในข้้นตอนก่อนหน้า 
- สร้าง environment ใหม่เพราะว่า openCV รุ่นที่มากับ roboflow เป็นแบบ headless อาจจะใช้ cv2.imshow() ไม่ได้



