📺 Netflix Clone – Angular + Bootstrap

Un clon de Netflix desarrollado con Angular, utilizando Bootstrap 5 y consumo de datos de la TMDB API para mostrar películas y series con una interfaz moderna y responsive.

⭐ Características principales

✔️ Navbar responsive con buscador integrado.
✔️ Sección principal con imagen destacada y botones de acción (“Play” y “More Info”).
✔️ Carruseles de películas con desplazamiento horizontal al estilo Netflix.
✔️ Estilos personalizados con SCSS.
✔️ Integración con TMDB API para mostrar títulos, imágenes y descripciones en tiempo real.

🛠 Tecnologías usadas

Angular (v17+)

Bootstrap 5

SCSS

TypeScript

TMDB API

🚀 Instalación y uso

Sigue estos pasos para ejecutar el proyecto localmente:

Clona el repositorio

git clone https://github.com/sebastianmuriel16/Angular-netflix.git

Entra al proyecto

cd Angular-netflix

Instala las dependencias

npm install

Configura tu API Key de TMDB

Crea cuenta en: https://www.themoviedb.org/

Obtén tu API Key.

Agrégala en tu archivo de entorno environment.ts:

export const environment = {
  apiKey: 'TU_API_KEY'
}

Ejecuta la aplicación

ng serve

Abre la app en el navegador
👉 http://localhost:4200