# Cloud-Native E-Commerce DevOps Project

## Overview
A cloud-native microservices e-commerce platform with Docker, Kubernetes, Jenkins CI/CD, and Vercel deployment.

## Live URLs
- **Production:** https://cloud-native-ecommerce.vercel.app
- **Staging:** https://cloud-native-ecommerce-git-staging-YOUR_USERNAME.vercel.app
- **Development:** https://cloud-native-ecommerce-git-develop-YOUR_USERNAME.vercel.app

## Services
| Service | Port | Description |
|---------|------|-------------|
| Frontend | 80 | HTML/CSS Dashboard |
| User Service | 3001 | Auth and user management |
| Product Service | 3002 | Product catalog |
| Order Service | 3003 | Order processing |
| Notification Service | 3004 | Notifications |

## Run Locally

### Run a service
```bash
cd src/user-service
npm install
npm start
```

### Run frontend with Docker
```bash
docker build -t frontend:v1 .
docker run -p 8080:80 frontend:v1
```

### Deploy to Kubernetes
```bash
minikube start
kubectl apply -f k8s/
kubectl get pods
minikube service frontend
```

## CI/CD
- Push to `develop` → tests run → Vercel preview deploy
- Push to `staging` → tests run → Vercel staging deploy
- Push to `main` → full pipeline → Vercel production deploy