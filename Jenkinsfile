pipeline {
    agent any
    tools {
        nodejs 'node_14.15.4'
    }
    environment {
        //once you sign up for Docker hub, use that user_id here
        registry = "qubedprince/dealerform-image"
        //- update your credentials ID after creating credentials for connecting to Docker Hub
        registryCredential = '	dockerHub'
    }
    stages {
        stage ('Version'){
            steps {
                sh 'npm --version'
            }
        }
        stage ('Dependency'){
            steps {
                sh 'npm install'
            }
        }

        // stage ('Code Analysis'){
        //     steps {
        //          sh 'npm run sonar'
        //     }
        // }
		    // Building Docker images
	    stage('Building image') {
	      steps{
          script {
            dockerImage = docker.build registry
          }
	      }
	    }

	     // Uploading Docker images into Docker Hub
	    stage('Upload Image') {
	     steps{
		 script {
		    docker.withRegistry( '', registryCredential ) {
		    dockerImage.push()
		    }
		}
	      }
	    }


        stage ('Deploy on Server'){
            steps{
                sh 'ansible-playbook deploy.yml'
            }
        }

    }
    post {
        always {
          emailext body: '''Good Day Engineer,
          Loki issued a report as follows:

          $PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS.

          Check console output at $BUILD_URL to view the results.''', subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!', to: 'blessing@qubedlab.com'
        }
        failure {
            telegramSend"<b>Branch</b>: master \n<b>Build </b> : OK \n<b>Test suite</b> = Failed"

        }
         success {
            telegramSend"<b>Branch</b>: master \n<b>Build </b> : OK \n<b>Test suite</b> = Success\n"
        }
    }
}

