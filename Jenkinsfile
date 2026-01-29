pipeline {
  agent any

  environment {
    DOCKER_HUB_USER = "muditha2002"
    IMAGE_TAG = "latest"
    FRONTEND_REPO = "${DOCKER_HUB_USER}/devops_frontend_image"
    BACKEND_REPO  = "${DOCKER_HUB_USER}/devops_backend_image"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
        sh 'pwd && ls -la'
      }
    }

    stage('Build Images (docker-compose)') {
      steps {
        sh 'docker-compose build'
      }
    }

    stage('Tag Images') {
      steps {
        sh """
          docker tag devops_frontend_image:latest ${FRONTEND_REPO}:${IMAGE_TAG}
          docker tag devops_backend_image:latest  ${BACKEND_REPO}:${IMAGE_TAG}
        """
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
          sh """
            echo "\$PASSWORD" | docker login -u "\$USERNAME" --password-stdin
            docker push ${FRONTEND_REPO}:${IMAGE_TAG}
            docker push ${BACKEND_REPO}:${IMAGE_TAG}
            docker logout
          """
        }
      }
    }

    stage('Deploy on EC2') {
      steps {
        sh '''
          docker-compose down || true
          docker-compose pull || true
          docker-compose up -d
          docker ps
        '''
      }
    }
  }
}
