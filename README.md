# bartest-app

### Descripci�n

App en Ionic/Cordova que utiliza socket.io.js y sails.io.js para conectarse un servidor Sails que publica un live stream de registros geolocalizados y:

- Los muestra en tiempo real en un mapa
- Muestra un gr�fico actualizado en tiempo real de los registros seg�n su localizaci�n (Suram�rica, Norteam�rica, Australia) (v�a Chart.js)
- Permite (a trav�s de una RESTful API en el servidor) crear y editar los registros.

### Instalaci�n

Luego de clonar o descargar el contenido del repo en un directorio de su elecci�n, abra un shell en ese directorio y ejecute (debe tener instalado globalmente el Node Package Manager - npm):

$  npm install -g cordova ionic bower gulp
$  npm install
$  bower install
$  ionic state restore

Y luego puede ejecutar la App en Ionic en su navegador con el comando:

$ ionic serve

o para ejecutarlo en su tel�fono conectado al computador v�a USB (debe tener instalado el Android Studio):

$ ionic run android

###Prop�sito

El prop�sito de esta app fue probar la posibilidad de implementar sails.io.js desde una app en Ionic/Cordova, de manera que pudiesen desarrollarse simult�neamente una App M�vil y un frontend Web.
El servidor ya no se encuentra disponible as� que la aplicaci�n no funcionar�, pero el c�digo muestra c�mo utilizar de una forma b�sica el cliente Sails para conectarse a un servidor que s�lo acepta conexiones por socket.

