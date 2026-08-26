# Social Boost Pro

A powerful full-stack web application + CLI for boosting videos on Instagram, Facebook, and TikTok.

## Features

- **Multi-Platform Support** - Boost content across Instagram, Facebook, and TikTok
- **Real-Time Analytics** - Track views, likes, comments, and shares with beautiful charts
- **Intelligent Automation** - Set rules and let AI handle your campaigns
- **Smart Scheduling** - Post at optimal times with AI-powered scheduling
- **Boost Simulator** - Preview estimated results before launching campaigns
- **Interactive Dashboard** - Professional dark-themed UI with glassmorphism effects
- **CLI Tool** - Manage campaigns from the terminal

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Auth**: NextAuth.js
- **Charts**: Recharts
- **Icons**: Lucide React
- **CLI**: Node.js, Commander.js

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd social-boost-pro

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL and API keys

# Run database migrations
npx prisma db push

# Start the development server
npm run dev
```

### CLI Setup

```bash
# Navigate to CLI directory
cd cli

# Install CLI dependencies
npm install

# Link CLI globally
npm link

# Configure the CLI
boost config set apiUrl http://localhost:3000
boost config set apiKey your-api-key
```

## Project Structure

```
social-boost-pro/
├── src/                    # Source code
│   ├── app/               # Next.js app router
│   ├── components/        # React components
│   ├── lib/               # Utilities and integrations
│   ├── hooks/             # React hooks
│   └── types/             # TypeScript types
├── prisma/                # Database schema
├── cli/                   # CLI tool
└── public/                # Static assets
```

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| GET/POST | `/api/auth/[...nextauth]` | NextAuth endpoints |
| GET | `/api/campaigns` | List campaigns |
| POST | `/api/campaigns` | Create campaign |
| GET | `/api/platforms` | List connected platforms |
| POST | `/api/platforms` | Connect platform |
| GET | `/api/analytics` | Fetch analytics data |
| GET/POST | `/api/boost` | Boost operations |

## CLI Commands

```bash
# Start boosting a campaign
boost start <campaignId>

# Stop boosting
boost stop <campaignId>

# Show campaign status
boost status

# List all campaigns
boost campaigns list

# Create a new campaign
boost campaigns create

# Show analytics
boost analytics

# Configure settings
boost config set apiUrl http://localhost:3000
boost config get apiUrl
```

## Dashboard Pages

- **Dashboard** - Overview with stats, charts, and recent activity
- **Campaigns** - Create, manage, and monitor campaigns
- **Platforms** - Connect and manage social media accounts
- **Analytics** - Detailed performance metrics and charts
- **Automation** - Set up automated rules and triggers
- **Settings** - Profile, notifications, API keys, and billing

## Design

- Dark theme with gradient accents (purple → blue → cyan)
- Glassmorphism effects with backdrop blur
- Smooth animations and transitions
- Fully responsive layout
- Modern typography with Inter font

## Environment Variables

See `.env.example` for all required environment variables including:

- Database connection
- NextAuth configuration
- Instagram/Facebook/TikTok API credentials
- Boost engine settings

## License

MIT License
