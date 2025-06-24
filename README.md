# 📱 Task Tracker - Frontend

A modern React Native mobile app for task management with beautiful UI and smooth animations.

## Features

- **Task Management** - Create, view, and complete tasks
- **Beautiful UI** - Modern design with icons and animations
- **Real-time Stats** - Dashboard with productivity metrics
- **Responsive Design** - Works on web, iOS, and Android
- **Offline Ready** - Context-based state management
- **TypeScript** - Full type safety

## Quick Start

### Prerequisites
- Node.js 16+
- Yarn or npm
- Expo CLI
- Backend running on `http://localhost:8080`

### Installation
```bash
# Install dependencies
yarn install

# Start development server
yarn start
```

### Available Platforms
- **Web:** `http://localhost:8081`
- **iOS:** Expo Go app
- **Android:** Expo Go app

## Screenshots

### Home Screen
- Task list with completion status
- Stats dashboard (total, completed, pending)
- Progress bar visualization
- Empty state with tips

### Create Task Screen
- Form validation with character limits
- Real-time feedback
- Auto-navigation on success

## Architecture

### State Management
- **Context API** + **useReducer** pattern
- **Repository Pattern** for data abstraction
- **Factory Pattern** for service creation

### Components
```
components/
├── ui/             # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Input.tsx
├── TaskItem.tsx    # Task display component
└── EmptyState.tsx  # Empty state component
```

### Screens
- **HomeScreen** - Task list with dashboard
- **CreateTaskScreen** - Task creation form

## API Integration

Connects to backend API:
- `GET /tasks` - Fetch all tasks
- `POST /tasks` - Create new task
- `PUT /tasks/{id}/complete` - Mark complete

## Tech Stack

- **React Native** - Cross-platform framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **React Navigation** - Screen navigation
- **Axios** - HTTP client
- **Expo Vector Icons** - Icon library

## Development

### Commands
```bash
yarn start      # Start Expo dev server
yarn android    # Run on Android
yarn ios        # Run on iOS
yarn web        # Run on web
```

### Testing

Comprehensive unit tests using Jest and ts-jest:

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Generate coverage report
yarn test:coverage
```

**Test Coverage:**
- ✅ Business logic validation (100%)
- ✅ Interface type validations (100%)
- ✅ Utility functions (100%)
- ✅ Error handling (100%)

For detailed testing documentation, see [TESTING.md](TESTING.md).

### Development Features
- Live reload enabled
- Hot reloading for fast development
- Console debugging support

---

**Production-ready mobile task manager with comprehensive testing** 🚀 