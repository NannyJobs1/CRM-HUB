# CRM HUB

A modern Customer Relationship Management (CRM) application built with React and Vite, deployed on Hostinger.

## Features

- ⚡ Fast development with Vite
- ⚛️ React 18 for modern UI
- 🚀 Automated CI/CD deployment to Hostinger
- 📦 Production-optimized builds

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Git

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/NannyJobs1/CRM-HUB.git
cd CRM-HUB
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Deployment to Hostinger

### Initial Setup

1. **Add GitHub Secrets** for Hostinger FTP credentials:
   - Go to your repository → Settings → Secrets and variables → Actions
   - Click "New repository secret" and add:
     - `HOSTINGER_FTP_HOST`: Your Hostinger FTP hostname
     - `HOSTINGER_FTP_USER`: Your FTP username
     - `HOSTINGER_FTP_PASSWORD`: Your FTP password

2. **How to find your Hostinger FTP credentials:**
   - Log in to Hostinger control panel
   - Navigate to Files → FTP Accounts
   - View/create an FTP account to get the hostname, username, and password

### Automatic Deployment

The GitHub Actions workflow will automatically:
1. Build your React app when you push to the `main` branch
2. Deploy the built files to your Hostinger server via FTP
3. Make your site live at your domain

Simply push your changes:
```bash
git add .
git commit -m "Your message"
git push origin main
```

### Manual Deployment

To manually trigger a deployment:
1. Go to your repository → Actions tab
2. Select "Deploy to Hostinger" workflow
3. Click "Run workflow" → "Run workflow"

## Project Structure

```
CRM-HUB/
├── src/
│   ├── App.jsx           # Main React component
│   ├── App.css           # App styles
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── package.json          # Dependencies and scripts
└── .github/
    └── workflows/
        └── deploy-hostinger.yml  # CI/CD workflow
```

## Environment Variables

Create a `.env` file in the root directory for environment-specific variables:

```
VITE_API_URL=https://your-api.com
VITE_APP_NAME=CRM HUB
```

Access them in your components using:
```javascript
import.meta.env.VITE_API_URL
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint (when configured)

## Troubleshooting

### Build fails with "command not found"
- Clear cache: `rm -rf node_modules && npm install`

### Deployment fails
- Check GitHub Actions logs: Repository → Actions tab
- Verify Hostinger FTP credentials in GitHub Secrets
- Ensure `public_html/` directory exists on Hostinger

### Site shows 404 after deployment
- Check that files are in the correct directory on Hostinger
- Verify your domain is pointing to the correct public folder

## Learn More

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Hostinger Help Center](https://support.hostinger.com)

## License

MIT
