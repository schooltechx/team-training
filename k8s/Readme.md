# Kubernetes (K8S)
หลังจากเข้าใจการทำงานของ Docker เป็นอย่างดีแล้วจะมาเริ่มใช้ K8S
ติดตั้ง k8s บน Container ค่อนช้างมีปัญหา จำเป็นต้องทำบนเครื่องจริงหรือใน VM แนะนำให้ใช้ Cloud Init Image ในการติดตั้ง VM 

# Cloud Init
อ่านเพิ่มเอกสารนี้ [1](https://pve.proxmox.com/wiki/Cloud-Init_Support), [2](https://pycvala.de/blog/proxmox/create-your-own-debian-12-cloud-init-template/) ทำการสร้าง template ไว้ใช้

```bash
wget https://cloud.debian.org/images/cloud/bookworm/latest/debian-12-generic-amd64.qcow2
# create a new VM with VirtIO SCSI controller
qm create 9000 --memory 2048 --net0 virtio,bridge=vmbr0 --scsihw virtio-scsi-pci
# import the downloaded disk to the local-lvm storage, attaching it as a SCSI drive
qm set 9000 --scsi0 local-lvm:0,import-from=/path/to/debian-12-generic-amd64.qcow2
qm set 9000 --ide2 local-lvm:cloudinit
qm set 9000 --boot order=scsi0
qm set 9000 --serial0 socket --vga serial0
qm template 9000
## set template as need and clone
qm clone 9000 123 --name debian-test
## set disk, ssh-key, user, password 
qm set 123 --sshkey ~/.ssh/id_rsa.pub
qm set 123 --ipconfig0 ip=10.0.10.123/24,gw=10.0.10.1
```
# Basic setup
```bash
sudo dpkg-reconfigure timezone
sudo timedatectl set-timezone Asia/Bangkok
# install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

# Kind

kind ทำให้ใช้ kubernetes ใน Docker เหมือน (k3d) ติดตั้ง docker และ ดาว์นโหลด kind จากหน้า 
[release binaries](https://github.com/kubernetes-sigs/kind/releases)  สร้าง cluster แบบเลือกเวอร์ชั่นของ k8s โดยดูจาก tag [kindest/node](https://hub.docker.com/r/kindest/node/tags) 
```bash
# install docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
# install kind
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.27.0/kind-linux-amd64
chmod +x kind
sudo cp kind /usr/local/bin/kind
sudo install -o root -g root -m 0755 kind /usr/local/bin/kind

kind create cluster --name test-cluster --image kindest/node:v1.32.3
cat > muli-nodes.yaml <<EOF
# three node (two workers) cluster config
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
- role: worker
EOF
kind create cluster --name muli-nodes --config muli-nodes.yaml
kind get clusters
kubectl config view
kubectl config current-context
kubectl config use-context kind-test-cluster
kubectl cluster-info
kind export logs --name oom-cluster
kind delete cluster --name oom-cluster
kind load docker-image image:tag --name cluster-name



# เปลี่ยนไปใช้คอนฟิกอื่นแทน default
export KUBECONFIG=~/.kube/newconfig
```

ตัวอย่างการใช้งานดูวีดีโอ [Kubernetes Lightning Course : KUBECTL basics & intro!](hhttps://www.youtube.com/playlist?list=PLHq1uqvAteVuOCnB0QUrf2BJ_jbMeYZ4l)


## kubectl

```bash
# kubectl get <resource>
# resource: namespace,ns, node, pod, service,svc, deployment,configmap, secret, ingress,rs
kubectl get ns
kubectl get pods --all-namespaces
kubectl get pods --namespace=kube-system
kubectl get pods -n kube-system -o wide
kubectl get all --all-namespaces

# kubectl create <resource>
kubectl create ns my-ns
kubectl create -n my-ns deployment webserver --image=nginx --port=80 
kubectl create -n my-ns svc clusterip webserver --tcp 80:80
kubectl port-forward -n my-ns svc/webserver 8000:80 --address 0.0.0.0
kubectl delete ns my-ns # delete all resource in this namespace
## deploy with yaml file
mkdir webserver
kubectl create ns my-ns --dry-run=client -o yaml > webserver/my-ns.yaml
kubectl create -n my-ns deployment webserver --image=nginx --port=80 --dry-run=client -o yaml > webserver/webserver.yaml
kubectl create -n my-ns svc clusterip webserver --tcp 80:80 --dry-run=client -o yaml > webserver/svc.yaml
kubectl apply -f webserver
```

# Helm
เป็นตัวจัดการ package ของ K8S การติดตั้งโปรแกรมต่างๆใน k8s จะใช้ yamal file เรียกได้ว่า helm ใช้จัดการไฟล์ yaml
[ติดตั้ง](https://helm.sh/docs/intro/install)โดยดาว์นโหลดจากหน้า
[release](https://github.com/helm/helm/releases) แล้วไปไว้ที่ /usr/local/bin/helm

```
curl -Lo ./helm.tgz https://get.helm.sh/helm-v3.17.3-linux-amd64.tar.gz
tar -zxvf helm.tgz
sudo install -o root -g root -m 0755 linux-amd64/helm /usr/local/bin/helm
```
การใช้งานจะทำตามนี้
```
helm install my-chart --value dev-value.yaml
```
จะเห็นได้ว่าคล้ายกับ "kubctl apply -f yaml_folder" โฟลเดอร์ที่เก็บ yaml ในรูปแบบพิเศษที่นี้เรียก chart ไฟล์ yaml จะเขียนในลักษณะ template {{value.name}} และใช้ไฟล์ dev-value.yaml ในการกำหนดค่า

```
helm create app
helm list
helm install 
helm upgrade

```