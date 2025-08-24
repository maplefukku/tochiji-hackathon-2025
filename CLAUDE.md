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
- **Frontend**: React Native (mobile), Next.js 14 (web)
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

## Future Development Commands

Once development begins, key commands will include:
- Build commands for React Native and Next.js applications
- Docker commands for containerized services
- Kubernetes deployment commands
- Database migration scripts
- Test execution commands

These will be added as the project progresses from requirements to implementation phase.