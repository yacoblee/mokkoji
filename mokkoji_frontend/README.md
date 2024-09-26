### setup 
+ npm init -y
+ npm install
+ npm i 'create-react-app'
+ npm i 'react-router-dom'
+ npm i moment react-moment
+ npm i redux react-redux
+ npm i react-calendar
+ npm install react-daum-postcode
+ npm install react-modal
+ npm install axios web-vitals

+ npm i --save @fortawesome/fontawesome-svg-core
+ npm i --save @fortawesome/react-fontawesome@latest
+ npm i --save @fortawesome/free-solid-svg-icons
+ npm i --save @fortawesome/free-regular-svg-icons
+ npm i --save @fortawesome/free-brands-svg-icons

+++ react-scripts 없다면 npm install react-scripts 설치 +++

### CORS 위한 Proxy 설정

+ "scripts": {
     "start": "react-scripts start",
     "build": "react-scripts build",
     "test": "react-scripts test",
     "eject": "react-scripts eject"
   },
 "proxy":"http://localhost:8080",