# Control de Gastos - Frontend

Sistema de control de gastos personales desarrollado con React, TypeScript y Tailwind CSS.

## 🚀 Tecnologías

- React 18+
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios
- React Hook Form + Zod
- Recharts
- Lucide React

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Backend API corriendo en http://localhost:8080

## 🔧 Instalación

1. Clona el repositorio
2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:3000`

## 🏗️ Build para Producción
```bash
npm run build
```

Los archivos optimizados estarán en la carpeta `dist/`.

## 📁 Estructura del Proyecto
```
src/
├── components/       # Componentes reutilizables
│   ├── ui/          # Componentes base
│   ├── layout/      # Componentes de layout
│   └── features/    # Componentes específicos
├── pages/           # Páginas de la aplicación
├── hooks/           # Custom React hooks
├── services/        # Servicios API
├── types/           # Definiciones TypeScript
├── contexts/        # Contexts de React
└── utils/           # Utilidades
```

## 🎯 Funcionalidades

- ✅ Autenticación (Login/Register)
- ✅ Dashboard con resumen financiero
- ✅ Gestión de transacciones (CRUD)
- ✅ Gestión de categorías (CRUD)
- ✅ Reportes y gráficos
- ✅ Diseño responsive
- ✅ Protección de rutas

## 🔐 Variables de Entorno

La URL del backend está configurada en `src/services/api.ts`.
Para cambiarla, modifica la constante `API_BASE_URL`.

## 📝 Licencia

MIT