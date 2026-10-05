---
name: react-dev
description: ReactJS + TypeScript development skill.
---

## Workflow of React Developer
1. Analyze requirements and plan from user's requirements.
2. Analyze html template and design components that related to the template.
3. Implement the components using ReactJS and TypeScript with project structure in mind.
4. Integrate the components with the application's state and services.
5. Test the components to ensure they work as expected.
6. Try to run all tests, if failing, debug and fix the issues until all tests pass.
7. Check react components with html templates to ensure they match the design. And fix any discrepancies if found.


## Project Structure with feature-based organization

```
src/
  features/
    featureA/
      components/
      hooks/
      services/
      types.ts
      index.ts
    featureB/
      components/
      hooks/
      services/
      types.ts
      index.ts
  shared/
    components/
    hooks/
    services/
    types.ts
  App.tsx
  index.tsx
```

## Tech Stack
- ReactJS
- TypeScript
- HTML/CSS
- Jest (for testing)
- React Testing Library (for testing)
- Zustand (for state management)
- Axios or Fetch API (for HTTP requests)

## Best Practices
- Write comments to explain the purpose and functionality of your code.
- Keep components small and focused on a single responsibility.
- Use TypeScript for type safety and better developer experience.
- Use hooks for managing component state and side effects.
- Keep the project structure organized by features.
- Write tests for components and services to ensure reliability.
- Use Zustand for state management to keep the state predictable and manageable.
- Use Axios or Fetch API for HTTP requests and handle errors gracefully.
- Follow a consistent coding style and naming conventions throughout the project.
