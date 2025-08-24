# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Shibuya Live Canvas** - A next-generation location-based social platform that transforms Shibuya into a dynamic "living canvas" where people of all languages, nationalities, and generations can share real-time experiences and co-create the future of the city.

## Project Documentation

The project currently consists of comprehensive requirements and business specifications:

- **Business Requirements**: `docs/01_business_requirements_specification.yaml` - Contains business objectives, stakeholder analysis, revenue models, and ROI analysis
- **Technical Requirements**: `docs/requirements-definition-ultra-detailed.yaml` - Detailed functional/non-functional requirements, system architecture, API specifications, and data models
- **HTML Documentation**: `docs/requirements-final.html` - Formatted requirements document for viewing

## Key Technical Details

### Planned Architecture
- **Frontend**: React Native (mobile),expo,  Next.js
- **Backend**: Microservices (Node.js/NestJS, Go/Gin, Python/FastAPI)
- **Database**: PostgreSQL (primary), MongoDB (NoSQL), Redis (cache), Elasticsearch (search)
- **Infrastructure**: AWS (EKS, RDS, S3, CloudFront), Kubernetes
- **Maps**: Mapbox GL JS
- **Translation**: DeepL API Pro
- **Real-time**: WebSocket for live updates

### Core Features
1. **Real-time Map SNS**: Location-based posts with 24-hour expiration
2. **Multi-language Support**: Japanese, English, Chinese, Korean
3. **Quest System**: Gamification with location-based challenges
4. **Government Dashboard**: Analytics for city administration
5. **Sentiment Analysis**: AI-powered emotion mapping

## Development Status

Currently in **Requirements Definition Phase**. No code implementation has begun yet. The project is planning:
- Phase 0 (POC): 1 month
- Phase 1 (MVP): 3 months  
- Phase 2 (Beta): 3 months
- Phase 3 (Launch): 6 months

## Working with Requirements

When implementing features, always refer to:
1. The detailed requirements in `docs/requirements-definition-ultra-detailed.yaml` for technical specifications
2. The business requirements in `docs/01_business_requirements_specification.yaml` for business context

## Project Directory Structure

```
shibuya-live-canvas/
├── packages/                   # Monorepo packages (npm workspaces)
│   ├── web/                   # Next.js web application
│   ├── mobile/                # Expo (React Native) mobile application
│   │   ├── src/              # Source code
│   │   │   ├── screens/      # Screen components
│   │   │   ├── components/   # Reusable UI components
│   │   │   ├── navigation/   # Navigation configuration
│   │   │   ├── services/     # API and external services
│   │   │   ├── hooks/        # Custom React hooks
│   │   │   ├── utils/        # Utility functions
│   │   │   ├── store/        # Redux store and slices
│   │   │   ├── types/        # TypeScript types
│   │   │   ├── constants/    # App constants
│   │   │   └── config/       # App configuration
│   │   ├── assets/           # Static assets
│   │   │   ├── images/       # Image files
│   │   │   ├── fonts/        # Custom fonts
│   │   │   └── animations/   # Lottie animations
│   │   ├── app.json          # Expo configuration
│   │   ├── App.tsx           # App entry point
│   │   └── index.ts          # Expo entry point
│   ├── api-gateway/           # API Gateway service
│   ├── services/              # Microservices
│   │   ├── user/             # User management service
│   │   ├── post/             # Post management service
│   │   ├── quest/            # Quest system service
│   │   └── analytics/        # Analytics service
│   └── shared/               # Shared packages
│       ├── types/            # TypeScript type definitions
│       ├── utils/            # Utility functions
│       └── config/           # Shared configurations
├── infrastructure/            # Infrastructure as Code
│   ├── kubernetes/           # K8s manifests and Helm charts
│   ├── terraform/            # Terraform configurations
│   └── docker/               # Dockerfiles and compose files
├── scripts/                   # Build and deployment scripts
├── tools/                     # Development tools and utilities
├── tests/                     # End-to-end and integration tests
│   ├── e2e/                  # End-to-end tests
│   └── integration/          # Integration tests
└── docs/                      # Documentation
    ├── api/                   # API documentation
    ├── architecture/          # Architecture diagrams and decisions
    └── guides/                # Development and deployment guides

## Development Commands

Key commands for development:
- `npm run dev` - Start all services in development mode
- `npm run build` - Build all packages
- `npm run test` - Run tests across all packages
- `npm run lint` - Run linting across all packages
- `npm run typecheck` - Type check all TypeScript code
- `npm run clean` - Clean all build artifacts and node_modules

## Future Development Commands

Once development progresses, additional commands will include:
- Docker commands for containerized services
- Kubernetes deployment commands
- Database migration scripts
- CI/CD pipeline commands

These will be added as the project progresses from requirements to implementation phase.