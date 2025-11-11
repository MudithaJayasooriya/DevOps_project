pipeline {
    agent any

    environment {
        PROJECT_DIR = "/mnt/e/projects/DevOps_project/RealEstate website"
        DOCKER_HUB_USER = "muditha2002"
        FRONTEND_IMAGE = "devops_frontend_image"
        BACKEND_IMAGE = "devops_backend_image"
        IMAGE_TAG = "latest"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "📦 Pulling code from GitHub..."
                checkout scm
            }
        }

        stage('Build and Tag Images') {
            steps {
                dir("${PROJECT_DIR}") {
                    echo "⚙ Building Docker images from source..."
                    sh 'docker compose build'

                    echo "🏷 Tagging images for Docker Hub..."
                    sh '''
                        docker tag devops_frontend_image:latest ${DOCKER_HUB_USER}/devops_frontend_image:${IMAGE_TAG}
                        docker tag devops_backend_image:latest ${DOCKER_HUB_USER}/devops_backend_image:${IMAGE_TAG}
                    '''
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh '''
                        echo "🔐 Logging into Docker Hub..."
                        echo "$PASSWORD" | docker login -u "$USERNAME" --password-stdin

                        echo "📤 Pushing frontend image..."
                        docker push ${DOCKER_HUB_USER}/devops_frontend_image:${IMAGE_TAG}

                        echo "📤 Pushing backend image..."
                        docker push ${DOCKER_HUB_USER}/devops_backend_image:${IMAGE_TAG}

                        docker logout
                    '''
                }
            }
        }

        stage('Run Containers') {
            steps {
                dir("${PROJECT_DIR}") {
                    echo "🚀 Starting containers using new images..."
                    sh 'docker compose up -d'
                }
            }
        }

        stage('Check Running Containers') {
            steps {
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed!'
        }
    }
}
