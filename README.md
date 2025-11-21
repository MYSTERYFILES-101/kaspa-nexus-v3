# KASPA-NEXUS 3.0

Next Generation Blockchain Analytics Platform

## Version 1.0.1

### Tech Stack
- **Framework:** Next.js 15.0.3
- **Language:** TypeScript 5.7.2
- **Styling:** Tailwind CSS 3.4.15
- **Runtime:** Node.js 20.19.5

### Quick Start

```bash
# Development
npm run dev

# Production Build
npm run build

# Start Production Server
npm start

# Lint
npm run lint
```

### Production Deployment

The application is managed by PM2:

```bash
# Start
pm2 start ecosystem.config.js

# Restart
pm2 restart kaspa-nexus-v3

# View Logs
pm2 logs kaspa-nexus-v3

# Monitor
pm2 monit
```

### Project Structure

```
/var/www/kaspa-nexus-v3/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── public/                # Static assets
├── ecosystem.config.js    # PM2 configuration
└── ARBEITSUEBERGABE-v1.0.1.md  # Full deployment documentation
```

### Documentation

For complete server setup and deployment documentation, see:
- [ARBEITSUEBERGABE-v1.0.1.md](./ARBEITSUEBERGABE-v1.0.1.md)

### Server Information

- **Server:** Ubuntu 24.04 LTS
- **Process Manager:** PM2
- **Reverse Proxy:** Nginx
- **Database:** MariaDB 10.11.13
- **Cache:** Redis 7.0.15

---

**Status:** ✓ Production Ready

Last Updated: 21. November 2025
