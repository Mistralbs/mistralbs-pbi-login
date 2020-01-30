# Demo Power BI Embedded con RLS
RLS: Row Level Security
## Iniciar aplicacion web

### 1. Añadir variables de entorno
```bash
export  PBI_USER="usuario de powerbi"
export  PBI_PASSWORD="Contraseña de powerbi"
```

### 2. Instalar dependencias

Para arrancar el servidor web es necesario tener Node.js instalado. Si no lo tienes ves a https://nodejs.org/en/download/ e instalalo.

```bash
cd mbs-pbi-login
npm install
```
### 3. Arrancar servidor

```bash
cd mbs-pbi-login
npm run start
```
Una vez arrancado ir a http://localhost:3000 😁.



