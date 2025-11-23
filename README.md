# React Native for NeutralinoJS

Unofficial [`neutralinojs`](https://neutralino.js.org/) integration with the [`react-native-cli`](https://github.com/react-native-community/cli).

This tool allows you to export your `react-native` apps to a lightweight, cross-platform desktop application using `neutralinojs`. It serves as an alternative to heavier solutions like `react-native-windows` and `react-native-macos`.

## Installation

1.  **Add the package to your project:**

    Using npm:
    ```bash
    npm install react-native-neutralinojs
    ```

    Using Yarn:
    ```bash
    yarn add react-native-neutralinojs
    ```

2.  **Install Peer Dependencies:**

    To avoid version conflicts, especially with Yarn, it's important to install the required peer dependencies.

    Using npm:
    ```bash
    npm install @neutralinojs/lib react-native-web
    ```

    Using Yarn:
    ```bash
    yarn add @neutralinojs/lib react-native-web
    ```

3.  **Install `react-dom`:**

    The version of `react-dom` must match the version of `react` used in your React Native project. Check your project's `package.json` for the `react` version. For example, if your project uses `react@18.2.0`, you should install `react-dom@18.2.0`.

    If your project uses a newer version of React, like React 19, you might need a specific version like `react-dom@19.1.1` or `react-dom@19.2.0`. Always ensure the versions match.

    ```bash
    npm install react-dom@<your-react-version>
    ```
    or
    ```bash
    yarn add react-dom@<your-react-version>
    ```

## Usage

This package extends the React Native CLI with commands to control the NeutralinoJS application.

> **Note**: This library uses [Vite](https://vitejs.dev/) internally to bundle your application. This means you do not need to start the Metro server with `npm run start` or `npx react-native start` for the NeutralinoJS app to work.

### Running the app

To initialize your NeutralinoJS project and run it for the first time, simply use the `run-neu` command. This command will set up the necessary NeutralinoJS files if they don't exist and then launch your application.

```bash
npx react-native run-neu
```

### Available Commands

Here are all the available commands for the `neu` platform:

*   **`run-neu`**: Initializes the NeutralinoJS project (if not already done) and starts the application in a development window. This is the most common command you'll use.
*   **`init-neu`**: Initializes the NeutralinoJS project by creating the `neutralino` directory and necessary configuration files. You only need to run this once, and `run-neu` does it for you automatically.
*   **`build-neu`**: Builds your React Native application and packages it into a distributable NeutralinoJS application for all platforms.
*   **`update-neu`**: Updates the NeutralinoJS binaries to the latest version defined in the package.

You can run any of these commands using the React Native CLI:
```bash
npx react-native <command-name>
```
For example:
```bash
npx react-native build-neu
```

### Advanced Configuration

You can further customize the behavior of both Vite and NeutralinoJS.

#### Extending Vite Configuration

To extend the default Vite configuration, you can create a `vite.config.js`, `vite.config.ts`, or similar config file inside the `neutralino/` directory. It's important that this file is located in this specific directory, otherwise it will not be loaded.

For more details on what you can configure, please refer to the [official Vite documentation](https://vite.dev/config/).

#### NeutralinoJS Configuration

The behavior of the NeutralinoJS application window, permissions, and other native-level features can be configured by editing the `neutralino/neutralino.config.json` file.

For a complete list of all available options, check out the [official NeutralinoJS documentation](https://neutralino.js.org/docs/configuration/neutralino.config.json/).

## Adding scripts to `package.json`

For convenience, you can add these commands to the `scripts` section of your `package.json` file, just like the default `android` and `ios` scripts in a standard React Native project.

```json
"scripts": {
  "android": "react-native run-android",
  "ios": "react-native run-ios",
  "start": "react-native start",
  "neu": "react-native run-neu",
  "build:neu": "react-native build-neu"
},
```

With this configuration, you can simply run:

```bash
npm run neu
```

Or to build the application:

```bash
npm run build:neu
```
