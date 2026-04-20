# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Added features in this branch

- Animations: `framer-motion` was added and used in `src/components/Hero.jsx` and `src/components/Contact.jsx` to animate entrance and interactions.
- Email form: `src/components/Contact.jsx` was upgraded to an in-page contact form that requires the visitor's full name before sending.

You can configure sending behavior in two ways:

1. EmailJS (recommended for sending directly from the frontend):
	- Create an account at https://www.emailjs.com/ and create a service + email template.
	- Add the following environment variables in a `.env` file at the project root (Vite reads `VITE_` prefixed vars):

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

	- The contact form will automatically use EmailJS when those vars are present.

2. Fallback (no config required):
	- If EmailJS env vars are not set, the form falls back to opening a `mailto:` link pre-filled with the visitor's name, email, and message.

Install dependencies after pulling these changes:

```powershell
npm install
npm run dev
```

Notes:
- EmailJS requires creating a template that accepts `from_name`, `from_email`, and `message` template parameters (these names are used by the code).
- If you prefer Formspree or a backend endpoint, you can modify `Contact.jsx` to POST to your endpoint instead.

Formspree quick setup (optional)
1. Create a form at https://formspree.io/ and copy the form endpoint (it looks like `https://formspree.io/f/xxxxx`).
2. Add the following to your `.env`:

```
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxx
```

The contact form will use this endpoint if provided.

Vercel serverless function (optional)
- A serverless function was added at `api/send-email.js` for Vercel-style deployments. It uses `nodemailer` and expects these environment variables in your Vercel project settings:

- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL

- To enable client usage of the serverless endpoint, set in `.env`:

```
VITE_USE_SERVERLESS=true
VITE_SERVERLESS_ENDPOINT=/api/send-email
```

Then deploy the project to Vercel and configure the SMTP vars in the Vercel dashboard.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
