# Running Application in Local Kubernetes Cluster

### Software Installation

- [x] [Docker](https://www.docker.com/) - Docker helps developers bring their ideas to life by conquering the complexity of app development.


- [x] [Kubernetes](https://kubernetes.io/) - also known as K8s, is an 
 open-source system for automating deployment, scaling, and management of containerized applications.


- [x] [Helm](https://helm.sh/) - The package manager for Kubernetes. Helm helps you manage 
Kubernetes applications — Helm Charts help you define, install, and upgrade even the most complex Kubernetes application.

### Build Image
- `docker build -t guide -f Dockerfile`

### Apply K8s Manifests

#### Create Namespace 
- `kubectl create ns jetbrains-guide`

#### Apply Service (exposed through NodePort)
- `kubectl apply -f service/service.yaml`

#### Apply ConfigMap (mounts nginx.conf)
- `kubectl apply -f cm/nginx-conf.yaml`

#### Apply Deployment running 2 replicas
- `kubectl apply -f deployment/deployment.yaml`

### Note: 
- If you want to test out using local docker image, make sure in the `deployment.yaml` file `imagePullPolicy` is set to `Never`

The service is exposed through `NodePort` on port `30004`
