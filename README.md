# Color Contrast Accessibility Testing with Jest

This project demonstrates how to test color contrast accessibility in React applications using Jest without relying on the canvas dependency. It uses Material UI for the UI components and implements WCAG 2.0 AA standards for color contrast.

## Project Overview

This project includes:

1. A simple React application with Material UI components
2. A login form that can toggle between accessible and inaccessible color schemes
3. Utility functions for calculating color contrast ratios
4. Jest tests that verify color contrast compliance with WCAG standards

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Running the Application

To start the development server:

```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Running Tests

To run the tests:

```bash
npm test
```

## Testing Approach

This project demonstrates how to test color contrast accessibility without relying on canvas dependencies, which are often problematic in Jest environments.

### Key Components

1. **Color Contrast Utilities** (`src/utils/colorContrast.ts`):
   - Functions for calculating color contrast ratios
   - Utilities for checking WCAG compliance levels (AA, AAA)
   - Helper functions for color format conversion

2. **Jest Tests** (`src/utils/colorContrast.test.ts` and `src/components/LoginForm.test.ts`):
   - Unit tests for color contrast calculation functions
   - Component tests that verify color contrast of rendered elements
   - Tests for both accessible and inaccessible versions

3. **Jest-Axe Integration** (`src/setupTests.ts`):
   - Integration with jest-axe for general accessibility testing
   - Note: jest-axe doesn't check color contrast in JSDOM environments

### Testing Strategy

The testing approach uses two complementary methods:

1. **Custom Color Contrast Calculation**:
   - Extract computed styles from rendered components
   - Calculate contrast ratios using the WCAG formula
   - Verify against WCAG AA and AAA standards

2. **Jest-Axe for General Accessibility**:
   - Use jest-axe for other accessibility checks
   - Demonstrate how jest-axe would normally catch issues

## WCAG Color Contrast Standards

The Web Content Accessibility Guidelines (WCAG) 2.0 define the following contrast requirements:

| Level | Normal Text | Large Text |
|-------|------------|------------|
| AA    | 4.5:1      | 3:1        |
| AAA   | 7:1        | 4.5:1      |

- **Normal text**: Less than 18 point (or 14 point bold)
- **Large text**: At least 18 point (or 14 point bold)

## Resources

- [WCAG 2.0 Contrast Guidelines](https://www.w3.org/TR/WCAG20/#visual-audio-contrast)
- [Understanding WCAG 2.0 Contrast Ratio](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)
- [Jest-Axe Documentation](https://github.com/nickcolley/jest-axe)
- [Material UI Documentation](https://mui.com/)
