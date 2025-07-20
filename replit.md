# Quantum Chain AI - Decentralized AI Trading Platform

## Overview

Quantum Chain AI is a revolutionary decentralized AI-powered trading platform that creates a marketplace for AI trading models, enabling investors to fund AI models and developers to monetize their algorithms. The platform combines blockchain transparency, multi-agent AI systems, and modern web technologies to create a new asset class in the trading industry.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Full-Stack TypeScript Application
The application uses a monorepo structure with shared types and schemas between client and server, built entirely in TypeScript for type safety and maintainability.

**Rationale**: TypeScript provides compile-time error checking and better developer experience, while the monorepo structure ensures consistency between frontend and backend.

**Alternatives Considered**: Separate repositories for client/server, JavaScript instead of TypeScript.

**Pros**: Type safety, shared code, unified development experience.
**Cons**: Slightly more complex build process, requires TypeScript knowledge.

### Frontend Architecture
- **React 18** with functional components and hooks
- **Tailwind CSS** with custom quantum-themed design system
- **Vite** as the build tool and dev server
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management and caching

**Rationale**: React provides a mature ecosystem with excellent TypeScript support. Vite offers fast development builds. TanStack Query handles complex server state scenarios common in financial applications.

### Backend Architecture
- **Express.js** server with TypeScript
- **RESTful API** design with JSON responses
- **Multi-agent AI system** for specialized trading tasks
- **WebSocket** connections for real-time updates
- **Session-based authentication** using Replit Auth

**Rationale**: Express is simple and well-understood. The multi-agent system allows for specialized AI functionality (market analysis, risk assessment, model evaluation, portfolio optimization).

## Key Components

### Multi-Agent AI System
Four specialized AI agents work together:
1. **Market Agent**: Processes market data and trends
2. **Risk Agent**: Evaluates model and investment risks
3. **Evaluation Agent**: Tests and validates AI model submissions
4. **Portfolio Agent**: Optimizes investment portfolios

**Rationale**: Specialized agents can focus on specific tasks, improving overall system performance and allowing for easier maintenance and scaling.

### Database Schema (Drizzle ORM)
- **Users**: Handles authentication and user profiles
- **AI Models**: Stores submitted trading models and metadata
- **Investments**: Tracks user investments in models
- **Model Performance**: Historical performance data
- **Collaborations**: Enables collaborative model development
- **Sessions**: Required for Replit Auth integration

**Rationale**: Drizzle provides type-safe database operations and excellent TypeScript integration. The schema supports both individual and collaborative model development.

### UI Component System
Built on **shadcn/ui** components with Radix UI primitives, providing:
- Consistent design language
- Accessibility features
- Dark theme support
- Quantum-themed color scheme

**Rationale**: Radix UI provides accessible, unstyled components that can be customized with Tailwind CSS, ensuring both functionality and design flexibility.

## Data Flow

### Real-time Updates
1. WebSocket connections provide live agent status updates
2. TanStack Query handles data synchronization and caching
3. Optimistic updates for better user experience
4. Background data refresh every 30 seconds for critical data

### Model Evaluation Pipeline
1. Developer uploads AI model through REST API
2. Evaluation agent processes model with synthetic market data
3. Risk agent assesses model safety and performance
4. Results stored in database and reflected in UI
5. Approved models become available in marketplace

### Investment Flow
1. User browses marketplace with real-time model data
2. Investment request sent via REST API
3. Blockchain simulator records transaction
4. Portfolio values updated in real-time
5. Performance tracking begins

## External Dependencies

### Authentication
- **Replit Auth**: Integrated OIDC authentication system
- **Express Sessions**: Server-side session management
- **PostgreSQL Sessions**: Persistent session storage

**Rationale**: Replit Auth provides seamless integration with the Replit environment while maintaining security standards.

### Database
- **Neon PostgreSQL**: Serverless PostgreSQL database
- **Drizzle ORM**: Type-safe database operations
- **Connection pooling**: Efficient database connection management

**Rationale**: Neon provides scalable PostgreSQL hosting with excellent performance. Drizzle offers better TypeScript integration than traditional ORMs.

### UI Libraries
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling
- **Recharts**: Data visualization components
- **Lucide React**: Icon library

**Rationale**: These libraries provide a solid foundation for building accessible, performant user interfaces with consistent design patterns.

## Deployment Strategy

### Development Environment
- **Vite dev server** for frontend with HMR
- **tsx** for running TypeScript server directly
- **Concurrent development** setup with middleware integration

### Production Build
- **Vite build** creates optimized frontend bundle
- **esbuild** bundles server code for Node.js
- **Static file serving** from Express server
- **Environment-based configuration**

**Rationale**: This setup provides fast development cycles while producing optimized production builds. The single-server deployment simplifies hosting on Replit.

### Database Migration
- **Drizzle Kit** for schema migrations
- **Environment variable** configuration
- **Automatic migration** on deployment

**Rationale**: Drizzle Kit provides type-safe migrations that keep the database schema in sync with the TypeScript types.

## Security Considerations

### Authentication & Authorization
- **Session-based auth** with secure cookies
- **CSRF protection** through SameSite cookies
- **Input validation** using Zod schemas
- **API rate limiting** (implementation ready)

### Data Protection
- **Environment variables** for sensitive configuration
- **Database connection encryption**
- **Secure session storage**
- **Client-side input sanitization**

**Rationale**: Multiple layers of security protect user data and prevent common web application vulnerabilities.
