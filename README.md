# 📡 Calculadora de Zona de Fresnel - React

Una herramienta simple y fácil de usar para calcular el radio de la primera zona de Fresnel en enlaces de radiocomunicaciones.

## 🚀 Instalación Rápida

### Opción 1: Instalación Simple (Recomendada)
1. Descarga o clona este proyecto
2. Abre una terminal en la carpeta del proyecto
3. Ejecuta estos comandos:

\`\`\`bash

npm install

npm start
\`\`\`

4. Abre tu navegador en \`http://localhost:3000\`

### Opción 2: Si tienes problemas con npm
Si tienes conflictos de dependencias, usa:

\`\`\`bash
npm install --legacy-peer-deps
npm start
\`\`\`

### Opción 3: Usar Yarn (alternativa)
\`\`\`bash
yarn install
yarn start
\`\`\`

## ✨ Características

- **Sin dependencias complejas**: Solo React básico
- **Fácil instalación**: Sin conflictos de versiones
- **Interfaz amigable**: Diseñada para cualquier usuario
- **Cálculo automático**: Resultados en tiempo real
- **Visualización gráfica**: Diagrama interactivo SVG
- **Diseño responsivo**: Funciona en móviles y escritorio

## 📖 Cómo usar

1. **Distancia**: Ingresa la distancia entre antenas en kilómetros
2. **Frecuencia**: Ingresa la frecuencia en GHz
3. **Resultado**: Se calcula automáticamente en metros

## 🔧 Tecnologías

- **React 18**: Framework principal
- **Tailwind CSS**: Estilos (vía CDN)
- **SVG**: Gráficos vectoriales
- **Create React App**: Base del proyecto

## 📐 Fórmula

**F₁ = 8.656 × √(D/f)**

- F₁ = Radio en metros
- D = Distancia en km  
- f = Frecuencia en GHz

## 🛠️ Estructura del proyecto

\`\`\`
fresnel-calculator/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Componente principal
│   ├── index.js        # Punto de entrada
│   └── index.css       # Estilos base
├── package.json        # Dependencias
└── README.md          # Este archivo
\`\`\`

## 🐛 Solución de problemas

### Error de dependencias
\`\`\`bash
npm install --legacy-peer-deps
\`\`\`

### Puerto ocupado
\`\`\`bash
npm start -- --port 3001
\`\`\`

### Limpiar caché
\`\`\`bash
npm start -- --reset-cache
\`\`\`

## 👨‍💻 Autor

**Gonzalo Spernanzoni**
- Calculadora de Zona de Fresnel v1.0
- Versión React simplificada

## 📄 Licencia

Uso libre para fines educativos y profesionales.

---

*¡Ahora sin problemas de dependencias!* 🎉
