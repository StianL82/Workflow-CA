# Workflow CA

This repository is a fork of the [Noroff Social Media Client repo](https://github.com/noroffFEU/social-media-client)

## Goal

The Goal of the assignment was to take an already existing project and improve the quality of the social app through workflows, testing with Jest and Cypress, and automated deployments.

## Features

- **ESLint & Prettier**: Ensuring code quality and consistency.
- **Husky & Lint-staged**: Guarding against code errors before they make it to commit.
- **Jest**: Facilitating unit testing to catch bugs early.
- **Cypress**: Conducting comprehensive end-to-end tests.
- **GitHub Actions**: Automating unit testing, end-to-end testing, and deployment to GitHub Pages.

### Installing

1. Clone the repo

2. Install dependencies

```
npm install
```

3. Build SASS

```
npm run build
```

### Running tests

Runs only Jest tests

```
npm run test-unit
```

Runs only Cypress tests

```
npm run test-e2e
```
