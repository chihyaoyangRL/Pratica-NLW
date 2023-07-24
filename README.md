* Instalação
npm init -y  →  inicial
npm install express → instalar biblioteca
npm install nunjucks → instalar template
**********************
* Para rodar server node: 'nome_da_pasta/arquivo.js' ↓
node src/server.js  
**********************
* Configurar auto reload server
npm install nodemon -D 
* Arquivo package.json substituir "test" : "echo ..." para ↓
"scripts": {
    "dev": "nodemon src/server.js"
},
* E para rodar
npm run dev
**********************
* Para rodar no Terminal e fechar VSCode
* Abre git bash navegar até a pasta do seu projeto EX:C:\WebDocs\nlw e colocar ↓
node src/server.js
**********************
* Instalar sqlite-async
npm install sqlite-async
* Para abrir
node src/database/db.js
node src/database/teste.js 
**********************
* Extensão VSCode
- SQLite
