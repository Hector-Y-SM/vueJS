# 🏥 Hospital Management System

A Vue 3 + TypeScript application for optimizing hospital resource management and patient care.

## 🎯 Project Overview

This system helps hospitals optimize doctor assignments, prioritize critical cases, and generate workload reports using modern JavaScript array methods.

### Key Features

- 👨‍⚕️ Automatic doctor-patient assignment based on specialty and availability
- 🚨 Patient prioritization system (urgency level + age criteria)
- 📊 Specialty-based workload reporting
- 👑 Experience-based doctor ranking by specialty
- ⏱️ Average waiting time calculations per specialty

### Technical Implementation

The system leverages the following array methods:
- `filter()` - For filtering specific criteria
- `reduce()` - For data aggregation
- `sort()` - For priority and ranking implementations

## 💻 Development Setup

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur)

### Project Setup

```sh
npm install
```

### Development Server

```sh
npm run dev
```

### Production Build

```sh
npm run build
```

## 🔧 Type Support

This project uses TypeScript with Vue 3. For proper `.vue` file support:
- Use [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension
- TypeScript configuration is handled through `vue-tsc`

## 📚 Additional Configuration

For detailed configuration options, see:
- [Vite Configuration Reference](https://vitejs.dev/config/)
- [Vue 3 Documentation](https://v3.vuejs.org/)