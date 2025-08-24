# Shibuya Live Canvas

A next-generation location-based social platform that transforms Shibuya into a dynamic "living canvas" where people of all languages, nationalities, and generations can share real-time experiences and co-create the future of the city.

## 🎯 Project Vision

Shibuya Live Canvas aims to create a revolutionary social platform that bridges physical and digital spaces, enabling real-time community interaction and urban co-creation through location-based features and multilingual support.

## 🏗️ Project Structure

This project uses a monorepo structure to manage multiple applications and services:

```
/
├── apps/               # Frontend applications
│   ├── web/           # Next.js web application
│   ├── mobile/        # React Native mobile app
│   └── admin/         # Admin dashboard
├── packages/          # Shared packages
│   ├── shared/        # Shared utilities and types
│   └── ui/            # Shared UI components
├── services/          # Backend microservices
│   ├── api/           # Main API service
│   ├── auth/          # Authentication service
│   └── notification/  # Notification service
├── docs/              # Documentation
├── scripts/           # Build and deployment scripts
└── tests/            # Test suites
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/shibuya-live-canvas.git

# Install dependencies
npm install

# Run tests
npm test
```

## 🛠️ Technology Stack

### Frontend
- **Mobile**: React Native
- **Web**: Next.js 14
- **Admin**: React with TypeScript

### Backend
- **API Services**: Node.js/NestJS, Go/Gin, Python/FastAPI
- **Database**: PostgreSQL, MongoDB, Redis
- **Search**: Elasticsearch
- **Message Queue**: RabbitMQ/Kafka

### Infrastructure
- **Cloud**: AWS (EKS, RDS, S3, CloudFront)
- **Container**: Docker, Kubernetes
- **CI/CD**: GitHub Actions

### External Services
- **Maps**: Mapbox GL JS
- **Translation**: DeepL API Pro
- **Analytics**: Google Analytics, Mixpanel

## 📚 Documentation

Detailed documentation is available in the `/docs` directory:

- [Business Requirements](docs/01_business_requirements_specification.yaml)
- [Technical Requirements](docs/requirements-definition-ultra-detailed.yaml)
- [API Documentation](docs/api/)
- [Architecture Decisions](docs/architecture/)

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, development process, and how to submit pull requests.

## 📝 License

This project is proprietary software. All rights reserved.

## 👥 Team

- Product Owner: TBD
- Tech Lead: TBD
- Development Team: TBD

## 📧 Contact

For questions or support, please contact: [team@shibuya-live-canvas.jp](mailto:team@shibuya-live-canvas.jp)
