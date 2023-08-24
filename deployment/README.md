# Running Application in Local Kubernetes Cluster

### Software Installation

- [Docker](https://www.docker.com/) - Docker helps developers bring their ideas to life by conquering the complexity of app development.
- [Kubernetes](https://kubernetes.io/) - also known as K8s, is an
  open-source system for automating deployment, scaling, and management of containerized applications.
- [Helm](https://helm.sh/) - The package manager for Kubernetes. Helm helps you manage
  Kubernetes applications — Helm Charts help you define, install, and upgrade even the most complex Kubernetes application.

### Build Image

You can build a container locally using the following command:

```bash
docker build -t guide -f Dockerfile
```

### Helm

To work with Helm and deploy to Kubernetes, see [helm/README.md](helm/README.md).
