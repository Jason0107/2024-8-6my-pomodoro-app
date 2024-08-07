# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list



# 发布方法项目发布说明

以下是将本项目发布到 GitHub Pages 的步骤。我们将使用 `gh-pages` 包来实现自动化发布。

#### 安装 `gh-pages` 包

首先，确保你已经安装了 `gh-pages` 包。可以通过以下命令来安装：

```
npm install gh-pages --save-dev
```

#### 更新 `package.json`

在 `package.json` 文件中，添加 `predeploy` 和 `deploy` 脚本。这些脚本将用于构建应用并将其发布到 GitHub Pages。

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

#### 构建并发布应用

执行以下命令来构建应用并发布到 GitHub Pages：

```
npm run predeploy
npm run deploy
```

- **`npm run predeploy`**：此命令会运行 `npm run build`，构建你的应用并生成 `dist` 目录。
- **`npm run deploy`**：此命令会将 `dist` 目录中的内容发布到 GitHub Pages。

#### 发布完成

现在，你的应用已经成功发布到 GitHub Pages。可以通过 `https://yourusername.github.io/your-repository-name` 访问你的应用。

#### 备注

- 确保你已经在 GitHub 仓库中启用了 GitHub Pages，并选择了 `gh-pages` 分支作为来源。
- 每次更新代码后，只需再次运行 `npm run deploy` 即可发布最新版本的应用。

通过上述步骤，你可以轻松地将 React 应用发布到 GitHub Pages 并使其对外可见。
