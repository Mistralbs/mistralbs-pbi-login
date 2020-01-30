# Demo Power BI Embedded con RLS
* RLS = Row Level Security. Mas info: https://docs.microsoft.com/en-us/power-bi/service-admin-rls
* Se requiere una cuenta Power BI PRO. Consiguela: https://powerbi.microsoft.com/es-es/power-bi-pro/
## Iniciar aplicacion web

### 1. Añadir variables de entorno
En Linux abre un terminal y pon:

```bash
export PBI_USER="usuario de powerbi"
export PBI_PASSWORD="Contraseña de powerbi"
```

En Windows:

```bash
set PBI_USER="usuario de powerbi"
set PBI_PASSWORD="Contraseña de powerbi"
```

### 2. Instalar dependencias

Para arrancar el servidor web es necesario tener Node.js instalado. Si no lo tienes ves a https://nodejs.org/en/download/ e instalalo.

Luego instala los paquetes necesarios con el siguiente comando:
```bash
cd mbs-pbi-login // Ir a la carpeta donde se encuentra el proyecto
npm install
```
### 3. Arrancar servidor

Inicia la app con el siguiente comando:
```bash
cd mbs-pbi-login // Ir a la carpeta donde se encuentra el proyecto
npm run start
```
Una vez arrancado ir a http://localhost:3000 😁.



