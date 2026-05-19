pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'muhammadtaimoor1407'
        IMAGE_TAG = "v${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo 'Code checked out successfully'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'cd src/user-service && npm install'
                sh 'cd src/product-service && npm install'
                sh 'cd src/order-service && npm install'
                sh 'cd src/notification-service && npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'cd src/user-service && npm test'
                sh 'cd src/product-service && npm test'
                sh 'cd src/order-service && npm test'
                sh 'cd src/notification-service && npm test'
            }
        }

        stage('Docker Build') {
            steps {
                sh "docker build -t ${DOCKER_HUB_USER}/user-service:${IMAGE_TAG} ./src/user-service"
                sh "docker build -t ${DOCKER_HUB_USER}/product-service:${IMAGE_TAG} ./src/product-service"
                sh "docker build -t ${DOCKER_HUB_USER}/order-service:${IMAGE_TAG} ./src/order-service"
                sh "docker build -t ${DOCKER_HUB_USER}/notification-service:${IMAGE_TAG} ./src/notification-service"
                sh "docker build -t ${DOCKER_HUB_USER}/frontend:${IMAGE_TAG} ."
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    sh "docker push ${DOCKER_HUB_USER}/user-service:${IMAGE_TAG}"
                    sh "docker push ${DOCKER_HUB_USER}/product-service:${IMAGE_TAG}"
                    sh "docker push ${DOCKER_HUB_USER}/order-service:${IMAGE_TAG}"
                    sh "docker push ${DOCKER_HUB_USER}/notification-service:${IMAGE_TAG}"
                    sh "docker push ${DOCKER_HUB_USER}/frontend:${IMAGE_TAG}"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/configmap.yaml'
                sh 'kubectl apply -f k8s/secret.yaml'
                sh 'kubectl apply -f k8s/user-deployment.yaml'
                sh 'kubectl apply -f k8s/product-deployment.yaml'
                sh 'kubectl apply -f k8s/order-deployment.yaml'
                sh 'kubectl apply -f k8s/notification-deployment.yaml'
                sh 'kubectl apply -f k8s/frontend-deployment.yaml'
            }
        }

        stage('Notify') {
            steps {
                echo "✅ Deployment ${IMAGE_TAG} completed successfully!"
            }
        }
    }

    post {
        failure {
            echo "❌ Pipeline failed! Initiating rollback..."
            sh 'kubectl rollout undo deployment/user-service || true'
            sh 'kubectl rollout undo deployment/frontend || true'
        }
    }
}