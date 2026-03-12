# Unblocked Games Hub

This project is built with React and Vite.

## Deployment to GitHub Pages

To deploy this app to GitHub Pages, follow these steps:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Deploy:**
    ```bash
    npm run deploy
    ```

This will build the project and push the `dist` folder to the `gh-pages` branch.

### Manual Deployment
If you prefer to deploy manually:
1. Run `npm run build`.
2. Upload the contents of the `dist` folder to your GitHub repository's `gh-pages` branch or configure GitHub Pages to serve from the `dist` folder (if using Actions).

### Why was the page blank?
GitHub Pages is a static file server. It cannot run `.jsx` files directly. You must **build** the project first, which converts the React code into standard JavaScript that browsers can understand.
