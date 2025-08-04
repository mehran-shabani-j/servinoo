# Servinoo Web Application

A Next.js application for connecting service providers with customers in Iran.

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/shabanimehran-1983s-projects/v0-servinoo-web-application)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/P1J5UdhFyi7)

## Features

- 🔍 Service provider search and filtering
- 🔐 User authentication with Supabase
- 🌐 Persian/Farsi language support
- 📱 Responsive design with Tailwind CSS
- 📈 Dashboard for providers and customers

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation Steps

1. **Clone the repository:**
\`\`\`bash
git clone <repository-url>
cd servinoo-web-application
\`\`\`

2. **Install dependencies:**
\`\`\`bash
npm install
\`\`\`

3. **Set up environment variables:**
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit the `.env.local` file and enter your Supabase credentials.

4. **Run the development server:**
\`\`\`bash
npm run dev
\`\`\`

The application will be available at `http://localhost:3000`.

## Deployment

### Automatic Deployment (Recommended)

1. Push your project to GitHub
2. Go to [Vercel](https://vercel.com) and import your project
3. Add environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Manual Deployment

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
\`\`\`

## Project Structure

\`\`\`
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard for users and providers
│   ├── providers/         # Provider pages
│   ├── search/           # Search page
│   └── data.ts           # Database functions
├── components/           # Reusable components
├── lib/                 # Libraries and configurations
├── scripts/             # SQL scripts
└── styles/              # CSS files
\`\`\`

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Language:** TypeScript
- **Deployment:** Vercel

## Contributing

To contribute to this project:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues, please create an issue on GitHub.

---

**Note:** This project is built with v0.dev and automatically syncs with your deployments.
