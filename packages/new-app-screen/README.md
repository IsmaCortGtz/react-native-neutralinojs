# @react-native-neutralinojs/new-app-screen

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Native](https://img.shields.io/badge/React%20Native-0.70+-61DAFB.svg)](https://reactnative.dev/)
[![Neutralinojs](https://img.shields.io/badge/Neutralinojs-v11+-ff8c00.svg)](https://neutralino.js.org/)
[![Documentation](https://img.shields.io/badge/docs-website-brightgreen.svg)](https://ismacortgtz.is-a.dev/react-native-neutralinojs/)

Pantalla de bienvenida y plantilla de inicio (`NewAppScreen`) adaptada para aplicaciones de escritorio desarrolladas con **React Native** y **Neutralinojs**.

> 📚 **Official Documentation**: [https://ismacortgtz.is-a.dev/react-native-neutralinojs/](https://ismacortgtz.is-a.dev/react-native-neutralinojs/)

---

## 📖 ¿Qué es este paquete?

En proyectos estándar de React Native, la pantalla de inicio por defecto proviene de `@react-native/new-app-screen`. Sin embargo, dicha pantalla está diseñada exclusivamente para dispositivos móviles y enlaces basados en `Linking.openURL`.

`@react-native-neutralinojs/new-app-screen` proporciona un reemplazo optimizado para entornos de escritorio:

- **Diseño Responsivo:** Ajustado para ventanas de escritorio amplias y redimensionables.
- **Integración Nativa con Neutralinojs:** Los enlaces externos y documentación se abren directamente en el navegador del sistema operativo a través de `@neutralinojs/lib` (`os.open`).
- **Soporte de Tema Claro y Oscuro:** Detección automática del esquema de color del sistema (`useColorScheme`).
- **Información del Entorno:** Muestra la versión de React Native y el motor de JavaScript en ejecución.
- **Exportaciones Modulares y Compatibles:** Incluye tanto la pantalla completa (`NewAppScreen`) como componentes individuales (`Header`, `LearnMoreLinks`, `ReloadInstructions`, `DebugInstructions`, `ThemedText`, `Colors`, etc.).

---

## 📦 Instalación

Instala el paquete en tu proyecto de React Native con tu gestor de dependencias preferido:

```bash
# Con pnpm
pnpm add @react-native-neutralinojs/new-app-screen

# Con npm
npm install @react-native-neutralinojs/new-app-screen

# Con Yarn
yarn add @react-native-neutralinojs/new-app-screen
```

### Dependencias requeridas

Asegúrate de contar con las siguientes dependencias instaladas en tu proyecto:

- `react-native-neutralinojs` (requerido para la integración con la plataforma de escritorio; **no** uses `react-native-web` directamente ya que `react-native-neutralinojs` actúa como el shim y entorno principal)
- `@neutralinojs/lib`
- `react` y `react-dom`

---

## ⚙️ Configuración del Alias

Si tienes una plantilla existente de React Native (como el `App.tsx` generado por el CLI) que importa directamente desde `@react-native/new-app-screen`:

```tsx
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from '@react-native/new-app-screen';
```

No necesitas modificar tu código fuente de React Native. Puedes redirigir la importación hacia este paquete configurando un **alias** en Vite y en TypeScript:

### 1. Configuración en Vite (`neutralino/vite.config.ts` o `neutralino/vite.config.js`)

Crea o edita tu archivo de configuración de Vite dentro de la carpeta `neutralino/` y añade el alias en la propiedad `resolve.alias`:

```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@react-native\/new-app-screen$/,
        replacement: '@react-native-neutralinojs/new-app-screen',
      },
    ],
  },
});
```

> **Nota:** La librería `react-native-neutralinojs` cargará automáticamente esta configuración al ejecutar `npx react-native run-neu` o `npx react-native build-neu`.

### 2. Configuración en TypeScript (`tsconfig.json`)

Para que el compilador de TypeScript y tu editor de código (VSCode, Cursor, etc.) reconozcan el alias y proporcionen autocompletado y tipado correcto, añade la propiedad `paths` dentro de `compilerOptions` en tu `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@react-native/new-app-screen": ["./node_modules/@react-native-neutralinojs/new-app-screen"]
    }
  }
}
```

---

## 🚀 Uso en tu Aplicación

Una vez configurado el alias en Vite y TypeScript, puedes mantener o usar las importaciones estándar de la librería original (`@react-native/new-app-screen`). Ambas herramientas resolverán automáticamente el código hacia este paquete adaptado para Neutralinojs:

### Pantalla Completa

```tsx
import React from 'react';
import NewAppScreen from '@react-native/new-app-screen';

export default function App() {
  return (
    <NewAppScreen
      templateFileName="App.tsx"
      safeAreaInsets={{ top: 0, bottom: 0, left: 0, right: 0 }}
    />
  );
}
```

### Componentes Modulares

```tsx
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Header, LearnMoreLinks, ThemedText, useTheme, Colors } from '@react-native/new-app-screen';

export default function CustomScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <Header templateFileName="App.tsx" />
      <View style={styles.content}>
        <ThemedText style={styles.title}>¡Bienvenido a mi aplicación!</ThemedText>
        <LearnMoreLinks />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
```

> **Tip:** El alias permite que plantillas generadas automáticamente por React Native CLI (o librerías de terceros que consuman `@react-native/new-app-screen`) funcionen de inmediato sin tener que modificar sus importaciones en el código fuente.

---

## 🛠️ API Reference

### `<NewAppScreen />`

Componente principal de bienvenida.

| Prop               | Tipo                                                               | Por defecto                                | Descripción                                                      |
| :----------------- | :----------------------------------------------------------------- | :----------------------------------------- | :--------------------------------------------------------------- |
| `templateFileName` | `string`                                                           | `'App.tsx'`                                | Nombre del archivo de plantilla mencionado en las instrucciones. |
| `safeAreaInsets`   | `{ top?: number, bottom?: number, left?: number, right?: number }` | `{ top: 0, bottom: 0, left: 0, right: 0 }` | Márgenes seguros opcionales.                                     |

### Componentes y Utilidades Disponibles

- **`Header`**: Encabezado con el logotipo de React, título y badges de versión.
- **`LearnMoreLinks`**: Cuadrícula responsiva con enlaces a la documentación oficial de React Native.
- **`ReloadInstructions`**: Instrucciones de atajo para recargar la app en escritorio (`Ctrl+R` / `Cmd+R`).
- **`DebugInstructions`**: Instrucciones para abrir las DevTools de Neutralinojs (`F12`).
- **`ThemedText`**: Componente de texto con soporte automático para temas y colores (`color="primary" | "secondary"`).
- **`useTheme()`**: Hook que retorna la paleta de colores activa (`colors`) según el esquema del sistema operativo.
- **`Colors` / `COLORS`**: Paleta completa de colores para modo claro y oscuro.

---

## Testing

Run tests with Vitest:

```bash
# Run all tests in package
pnpm test

# Run unit tests only (<= 5s timeout)
pnpm run test:unit

# Run E2E tests only (<= 5m / 300,000ms timeout)
pnpm run test:e2e
```

---

## 📄 Licencia

[MIT License](https://opensource.org/licenses/MIT) © Ismael Cortés Gutiérrez
