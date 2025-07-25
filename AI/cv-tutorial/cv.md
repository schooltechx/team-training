
## Install Library
คำสั่งด้านล่างสำหรับ uv
```sh
!uv add opencv-python ultralytics pytubefix
```

## Sample Code

### Youtube Downloader
ดาว์นโหลดไฟล์จาก Youtube
```python
from pytubefix import YouTube
# video_url = "https://www.youtube.com/watch?v=MHlXDeRYADA"
video_url = "https://www.youtube.com/shorts/RSEk0LsPiGIx"
yt = YouTube(video_url)
video_stream = yt.streams.filter(file_extension='mp4', progressive=True).first()
if not video_stream:
    print("No compatible video stream found.")
    raise RuntimeError("Failed to fetch video stream.")
# Download the video to a temporary file
video_path = video_stream.download(filename='temp_video.mp4')
print(f'Download path:{video_path}')
```

### Open CV for Picture
ใช้ OpenCV เปิดไฟล์ภาพ
```python
import cv2
image = cv2.imread('./monkey.png')
cv2.imshow('Image', image)
cv2.waitKey(0)
cv2.destroyAllWindows()

```
### Basic OpenCV for video
ใช้ OpenCV เปิดวีดีโอ วาดเส้น ตัวหนังสือ สี่เหลี่ยม ลดขนาดเฟรม และแสดงวีดีโอ
```python
import cv2
import time
set_width = 400
cap = cv2.VideoCapture('./temp_video.mp4') # 0 for default webcam or video path
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
ratio = set_width / width
while True:
    time.sleep(0.01)
    ret, frame = cap.read() # Capture frame-by-frame
    if not ret:
        print("End of video or failed to grab frame.")
        break
    cv2.line(frame, (0, 100), (width, 100), (255, 0, 0), 2)
    cv2.putText(frame, f'Hello : {set_width}', (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0, 0, 255), 2)
    cv2.rectangle(frame, (120, 120), (200, 200), (0, 255, 0), 2)
    # Display the resulting frame
    frame = cv2.resize(frame, (set_width, int(height * ratio)))
    cv2.imshow('frame',frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
cap.release()
cv2.destroyAllWindows()
```
## Object Detect and Classification 
ทำด้วย Yolo ซึ่งเป็นโมเดลที่เทรนมาแล้ว

```python
from ultralytics import YOLO
from IPython.display import display, Image, clear_output
model = YOLO("yolo11m-seg.pt")
cap = cv2.VideoCapture('./temp_video.mp4') # 0 for default webcam or video path
while True:
    # time.sleep(0.005)
    ret, frame = cap.read() # Capture frame-by-frame
    if not ret:
        print("End of video or failed to grab frame.")
        break
    results = model(frame, verbose=False)[0]
    box_color = (0, 255, 0)
    for box in results.boxes:
        cls_id = int(box.cls[0])
        class_name = model.names[cls_id]
        x1, y1, x2, y2 = map(int, box.xyxy[0])
        cx = (x1 + x2) // 2
        cy = (y1 + y2) // 2
        cv2.rectangle(frame, (x1, y1), (x2, y2), box_color, 2)
        cv2.putText(frame, f'{class_name}', (cx-10, cy), cv2.FONT_HERSHEY_SIMPLEX, 0.4, box_color, 2)   
    # Display in Jupyter Notebook
    _, buffer = cv2.imencode('.jpg', frame)
    img_bytes = buffer.tobytes()
    clear_output(wait=True)
    display(Image(data=img_bytes))
cap.release()
cv2.destroyAllWindows()
```
## Segment and Classification
ใช้ Yolo ทำ segment และ Classification ด้วยโมเดลที่เทรนมาแล้ว
```python
import cv2
import time
from ultralytics import YOLO
import random
import numpy as np
conf = 0.9 # Confidence threshold  
model = YOLO("yolo11m-seg.pt")
cap = cv2.VideoCapture('./temp_video.mp4') # 0 for default webcam or video path
yolo_classes = list(model.names.values())
classes_ids = [yolo_classes.index(clas) for clas in yolo_classes]      
colors = [random.choices(range(256), k=3) for _ in classes_ids]
while True:
    # time.sleep(0.05)
    ret, frame = cap.read() # Capture frame-by-frame
    if not ret:
        print("End of video or failed to grab frame.")
        break
    results = model(frame,conf=conf,verbose=False)[0]

    # print(results)
    for result in results:
        for mask, box in zip(result.masks.xy, result.boxes):
            cls_id = int(box.cls[0])
            class_name = model.names[cls_id]
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            cx = (x1 + x2) // 2
            cy = (y1 + y2) // 2
            points = np.int32([mask])
            # cv2.polylines(img, points, True, (255, 0, 0), 1)
            color_number = classes_ids.index(int(box.cls[0]))
            cv2.fillPoly(frame, points, colors[color_number])
            cv2.putText(frame, f'{class_name}', (cx-3, cy), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0, 0, 0), 2)
    cv2.imshow("Segment", frame)   
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
cap.release()
cv2.destroyAllWindows()
```
## อ่านเพิ่ม
- [How to segment Objects with YOLOv8](https://medium.com/@Mert.A/how-to-segment-with-yolov8-f33b1c63b6c6)