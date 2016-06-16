# bartest-app

### Descripción

App en Ionic/Cordova que utiliza socket.io.js y sails.io.js para conectarse un servidor Sails que publica un live stream de registros geolocalizados y:

- Los muestra en tiempo real en un mapa
- Muestra un gráfico actualizado en tiempo real de los registros según su localización (Suramérica, Norteamérica, Australia) (vía Chart.js)
- Permite (a través de una RESTful API en el servidor) crear y editar los registros.

### Instalación

Luego de clonar o descargar el contenido del repo en un directorio de su elección, abra un shell en ese directorio y ejecute (debe tener instalado globalmente el Node Package Manager - npm):

$  npm install -g cordova ionic bower gulp
$  npm install
$  bower install
$  ionic state restore

Y luego puede ejecutar la App en Ionic en su navegador con el comando:

$ ionic serve

o para ejecutarlo en su teléfono conectado al computador vía USB (debe tener instalado el Android Studio):

$ ionic run android

###Propósito

El propósito de esta app fue probar la posibilidad de implementar sails.io.js desde una app en Ionic/Cordova, de manera que pudiesen desarrollarse simultáneamente una App Móvil y un frontend Web.
El servidor ya no se encuentra disponible así que la aplicación no funcionará, pero el código muestra cómo utilizar de una forma básica el cliente Sails para conectarse a un servidor que sólo acepta conexiones por socket.

