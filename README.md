# Demo Power BI Embedded con RLS
* RLS = Row Level Security. Más info: https://docs.microsoft.com/en-us/power-bi/service-admin-rls
* **Se requiere una cuenta Power BI PRO**. Consíguela aquí: https://powerbi.microsoft.com/es-es/power-bi-pro/

## Configuración
En el archivo `power-bi/config.json` pon tu configuración, debes añadir los siguentes campos:
* **WorkspaceId**: El Id de tu Workspace
* **AppId**: El Id de la aplicación, si no tienes una la puedes crear, ver: https://docs.microsoft.com/en-us/power-bi/developer/register-app
* **ReportId**: El Id del informe que quieres insertar

```js
{
  "authorityUrl" : "https://login.microsoftonline.com/common/",
  "resourceUrl" : "https://analysis.windows.net/powerbi/api",
  "apiUrl" : "https://api.powerbi.com/",
  "appId" : "AQUI TU APP ID",
  "workspaceId" : "AQUI TU WORKSPACE ID",
  "reportId" : "AQUI TU REPORT ID"
}
```
Ten en cuenta que tu informe tiene que tener configurado RLS para los usuarios de la aplicación. Puedes ver cómo se hace aquí: https://docs.microsoft.com/en-us/power-bi/service-admin-rls#define-roles-and-rules-in-power-bi-desktop

Los usuarios de la aplicación los puedes encontrar en `db/users.json` puedes modificarlos si quieres.

## Iniciar aplicacion web

### 1. Añadir variables de entorno
* En Linux abre un terminal y pon:

```bash
export PBI_USER="usuario de powerbi"
export PBI_PASSWORD="Contraseña de powerbi"
```

* En Windows:

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
cd mbs-pbi-login // Ir a la carpeta dónde se encuentra el proyecto
npm run start
```
Una vez arrancado ir a http://localhost:3000 😁.



