# Despliegue en Netlify

Este proyecto está configurado para desplegarse fácilmente en Netlify.

## Configuración Automática

El proyecto incluye:
- `netlify.toml`: Configuración principal de Netlify
- `public/_redirects`: Archivo de respaldo para redirecciones SPA

## Pasos para Desplegar

### Opción 1: Despliegue desde Git (Recomendado)

1. **Sube tu código a un repositorio Git** (GitHub, GitLab, Bitbucket)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <tu-repositorio-url>
   git push -u origin main
   ```

2. **Conecta con Netlify**
   - Ve a [netlify.com](https://netlify.com)
   - Haz clic en "New site from Git"
   - Conecta tu repositorio
   - Netlify detectará automáticamente la configuración

3. **Configuración automática detectada:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

### Opción 2: Despliegue Manual

1. **Construye el proyecto localmente:**
   ```bash
   npm run build
   ```

2. **Sube la carpeta `dist`** directamente a Netlify:
   - Ve a [netlify.com](https://netlify.com)
   - Arrastra la carpeta `dist` al área de despliegue

## Características Incluidas

✅ **Redirecciones SPA**: Todas las rutas redirigen a `index.html`
✅ **Headers de Seguridad**: X-Frame-Options, XSS Protection, etc.
✅ **Cache Optimizado**: Assets estáticos cacheados por 1 año
✅ **Compresión**: Automática para todos los archivos
✅ **HTTPS**: Certificado SSL automático

## Variables de Entorno (si las necesitas)

Si tu proyecto requiere variables de entorno:
1. Ve a Site settings > Environment variables en Netlify
2. Agrega las variables necesarias

## Dominio Personalizado

Para usar un dominio personalizado:
1. Ve a Site settings > Domain management
2. Agrega tu dominio personalizado
3. Configura los DNS según las instrucciones de Netlify

## Monitoreo

- **Deploy logs**: Revisa los logs de construcción en el dashboard
- **Analytics**: Netlify Analytics disponible en planes pagos
- **Forms**: Si usas formularios, Netlify los maneja automáticamente

¡Tu invitación de boda estará en línea en minutos! 🎉💒