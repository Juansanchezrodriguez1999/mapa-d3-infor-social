# Mapa de España con D3.js y Next.js

Este proyecto es una aplicación interactiva que muestra un mapa de España utilizando D3.js y permite obtener información sobre cada comunidad autónoma a través de la API de Wikipedia.

## Requisitos previos

Para ejecutar este proyecto, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [Docker](https://www.docker.com/get-started) (si deseas ejecutarlo en un contenedor)

## Instalación y ejecución local

Si deseas ejecutar la aplicación sin Docker, sigue estos pasos:

1. Clona este repositorio:
   ```sh
   git clone https://github.com/usuario/repo.git
   cd repo
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Inicia la aplicación:
   ```sh
   npm run dev
   ```
4. Abre tu navegador en `http://localhost:3000`

## Ejecución con Docker

Si prefieres ejecutar la aplicación en un contenedor Docker, sigue estos pasos:

1. Construye la imagen Docker:
   ```sh
   docker build -t app_informatica_social:1.0.0 .
   ```
2. Ejecuta el contenedor:
   ```sh
   docker run -d --restart=always -p 3004:3000 --name mapas_d3 app_informatica_social:1.0.0
   ```
3. Accede a la aplicación en `http://localhost:3004`

## Descripción del Proyecto

Este proyecto incluye:

- Un mapa interactivo de España creado con `D3.js`
- Obtención de información de Wikipedia sobre las comunidades autónomas
- Imágenes de Wikipedia relacionadas con la comunidad seleccionada

## Licencia

Este proyecto está bajo la licencia MIT.
