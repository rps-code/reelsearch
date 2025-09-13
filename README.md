# ReelSearch

Created as a small project to demonstrate Vue 3 with Vite, TypeScript, and ESLint using the OMDb API to search for movies.

## About This Project

This project was built in a fairly short amount of time for the scale of the idea, so while I have made an effort to ensure the code is clean and well-structured, there may be areas that could be improved with more time, such as additional error handling, more comprehensive testing, or further optimization. However, I believe it effectively showcases my ability to work with Vue 3 and related technologies.

If I were to refactor or expand this project in the future, I would consider the following improvements:

- **Component Decomposition**: Breaking down larger components into smaller, more manageable pieces to enhance readability and maintainability.
- **File Organization**: Organizing files and directories more systematically, especially as the project grows, to ensure a clear structure.
- **PWA Features**: Implementing Progressive Web App features to enhance user experience, such as offline capabilities.
- **UI/UX Enhancements**: Improving the user interface and experience with more advanced styling, animations, and responsiveness.

## Project Setup

### Install Dependencies

```sh
npm i
```

### Create a Free OMDb API Key

Generate your API key at [OMDb API](http://www.omdbapi.com/apikey.aspx) and add it to a `.env` file in the root of the project:

```env
VITE_OMDB_API_KEY=your_api_key_here
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Type-Check with [Vue TSC](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/vue-tsc)

```sh
npm run type-check
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Format with [Prettier](https://prettier.io/)

```sh
npm run format
```
