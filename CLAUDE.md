# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

河北思政微电影云平台 (Hebei Ideological Microfilm Cloud Platform) is a comprehensive educational platform built with Next.js 14, designed for ideological and political education in Hebei Province. The platform supports multiple user roles (admin, teacher, student, manager) with role-based access control and focuses on video content management, course delivery, and educational administration.

## Development Commands

```bash
# Development
npm run dev              # Start development server with webpack (port 3000, may use 3002 if 3000 is occupied)

# Build and Production
npm run build           # Build for production with webpack
npm start              # Start production server

# Code Quality
npm run lint           # Run ESLint
```

**Important**: This project uses webpack bundler (not Turbopack) due to Tailwind CSS v4 configuration requirements.

## Architecture Overview

### Core Technology Stack
- **Framework**: Next.js 14 with App Router and TypeScript
- **UI Components**: Shadcn/UI with Tailwind CSS (v4)
- **State Management**: Zustand with persistence middleware
- **Charts**: Recharts for data visualization
- **Video**: react-player for video playback
- **Icons**: Lucide React
- **Build**: Webpack (required for Tailwind CSS v4)

### Project Structure
```
src/
├── app/                 # Next.js App Router pages
│   ├── login/           # Authentication pages
│   ├── home/            # Dashboard pages (role-based rendering)
│   ├── library/         # Video library management system
│   ├── courses/         # Course management (teacher role)
│   ├── lesson-planning/ # Teacher备课 tools
│   └── layout.tsx       # Root layout with global providers
├── components/          # React components
│   ├── ui/              # Shadcn/UI base components (auto-generated)
│   ├── layout/          # Layout components (MainLayout, AuthLayout)
│   └── common/          # Shared components (AuthGuard, VideoPlayer)
├── lib/                 # Utilities and state management
│   ├── store.ts         # Zustand stores (auth, app, video, course)
│   └── utils.ts         # Utility functions (cn, formatters)
├── types/               # TypeScript type definitions
│   └── index.ts         # Core type definitions for all entities
├── data/                # Mock data for demo purposes
│   └── mockData.ts      # Sample data for all entities
└── hooks/               # Custom React hooks
```

### Key Architecture Patterns

#### State Management (Zustand with Persistence)
- **Auth Store**: User authentication, role management, session persistence
- **App Store**: UI state (sidebar, theme, notifications, loading states)
- **Video Store**: Video playback state, playlist management, viewing history
- **Course Store**: Learning progress, favorites, course data management

#### Role-Based Access Control (RBAC)
- Four distinct user roles: `admin`, `teacher`, `student`, `manager`
- Dynamic navigation menus based on user role in MainLayout
- Route protection with AuthGuard component wrapping pages
- Role-specific dashboard implementations in `app/home/page.tsx`
- Demo authentication system with hardcoded credentials (password: `demo123`)

#### Component Architecture
- **Layout Components**:
  - `MainLayout`:Authenticated pages with sidebar navigation
  - `AuthLayout`: Login/authentication pages
- **UI Components**: Extended Shadcn/UI components with custom theming
- **Page Components**: Role-specific implementations in app/ directory
- **Common Components**: Reusable components like VideoPlayer, AuthGuard

#### Data Layer
- **TypeScript interfaces**: Comprehensive type definitions in `types/index.ts`
- **Mock data**: Centralized in `data/mockData.ts` for demo purposes
- **State persistence**: Zustand stores with localStorage middleware
- **Type safety**: Strict TypeScript configuration throughout

### Theming System
- **Primary Color**: #B4282E (思政红 - Ideological Red)
- **Secondary Color**: #1E3A8A (教育蓝 - Education Blue)
- **CSS Variables**: Custom properties defined in `globals.css`
- **Shadcn/UI Configuration**: Custom theme in `components.json`
- **Design System**: Consistent spacing, typography, and component variants

### Page Routing Strategy
- **Public Routes**: `/login` (authentication)
- **Protected Routes**: All other pages require AuthGuard wrapper
- **Role-Specific Routes**: Different dashboard experiences per role
- **Dynamic Routes**: `/library/[id]` for video detail pages
- **Route Protection**: AuthGuard component checks authentication state

## Development Notes

### Component Development Guidelines
- **Shadcn/UI Integration**: Use existing components as base, configured in `components.json`
- **Component Patterns**: Follow existing patterns in `src/components/`
- **TypeScript**: Use interfaces from `types/index.ts` for props and state
- **Design Consistency**: Maintain consistency with established design system
- **Responsive Design**: Follow mobile-first approach with Tailwind breakpoints

### State Management Patterns
- **Zustand Usage**: Use stores for cross-component state management
- **Persistence**: Leverage localStorage persistence for user data
- **Store Patterns**: Follow existing patterns in `lib/store.ts`
- **State Updates**: Use immutable update patterns for performance

### Styling Guidelines
- **Tailwind CSS**: Use utility classes for styling
- **Color Scheme**: Follow primary (red) and secondary (blue) color scheme
- **Responsive Design**: Mobile-first approach with breakpoint considerations
- **Component Variants**: Use Shadcn/UI component variants where applicable
- **Custom CSS**: Use CSS variables for theming, avoid inline styles

### Mock Data System
- **Centralized Data**: All demo data in `src/data/mockData.ts`
- **Type Safety**: TypeScript interfaces ensure data consistency
- **Data Updates**: When adding new features, update mock data accordingly
- **Realistic Data**: Use realistic educational content for better demo experience

### Authentication Flow
- **AuthGuard Component**: Wraps protected routes to check authentication
- **Demo Login**: Available for all four roles with hardcoded credentials
- **State Persistence**: User state persisted in localStorage
- **Role-Based UI**: Menu rendering and page access based on user role
- **Login Process**: Email/password validation with mock data

### Video Content Management
- **Video Content Interface**: Comprehensive fields for educational videos
- **Audit System**: Pending/approved/rejected status with audit logs
- **Metadata**: Duration, file size, upload time, view count
- **Educational Context**: Grade, subject, category classification
- **Player Integration**: react-player for video playback functionality

## Common Development Tasks

### Adding New User Roles
1. Update `UserRole` type in `types/index.ts`
2. Add role logic to `hasRole` functions in `lib/store.ts`
3. Update menu items in `MainLayout.tsx`
4. Add role-specific dashboard content in `app/home/page.tsx`

### Adding New Pages
1. Create page component in appropriate `app/` directory
2. Wrap with `AuthGuard` for protected routes
3. Add route to navigation menu based on user role
4. Update mock data if needed

### Creating New Components
1. Use Shadcn/UI CLI: `npx shadcn@latest add [component]`
2. Follow existing component patterns in `src/components/`
3. Use TypeScript interfaces from `types/index.ts`
4. Apply consistent styling with Tailwind utilities

### Working with State
1. Use existing Zustand stores for cross-component state
2. Follow the established patterns in `lib/store.ts`
3. Leverage TypeScript for type safety
4. Consider localStorage persistence for user preferences