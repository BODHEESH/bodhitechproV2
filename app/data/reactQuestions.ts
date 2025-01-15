import { QuestionsData } from '../types/questions';

export const reactQuestions: QuestionsData = {
  'fundamentals': {
    title: 'React Fundamentals',
    description: 'Core concepts and basics of React',
    questions: [
      {
        title: 'What is React and how does it differ from other frameworks?',
        category: 'fundamentals',
        difficulty: 'basic',
        language: 'react',
        answer: 'React is a JavaScript library for building user interfaces. Unlike full frameworks like Angular, React focuses primarily on the view layer. Key differences include: JSX for templating, Virtual DOM for performance, and unidirectional data flow.',
        subQuestions: [
          {
            question: 'What are the main features of React?',
            answer: 'JSX, Virtual DOM, Component-based architecture, Unidirectional data flow, and Rich ecosystem.'
          },
          {
            question: 'How does React handle one-way data binding?',
            answer: 'React uses unidirectional data flow where data flows from parent to child components through props. State changes trigger re-renders in a predictable way.'
          }
        ],
        tags: ['basics', 'frameworks', 'comparison']
      },
      {
        title: 'What is the Virtual DOM and how does it improve performance?',
        category: 'fundamentals',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Virtual DOM is a lightweight copy of the actual DOM. React uses it to improve performance by minimizing direct DOM manipulation through a process called reconciliation.',
        subQuestions: [
          {
            question: 'How does reconciliation work?',
            answer: 'React compares the Virtual DOM with the real DOM, calculates the minimum number of changes needed, and batches these changes for better performance.'
          },
          {
            question: 'What is React Fiber?',
            answer: 'React Fiber is a complete rewrite of React\'s core algorithm. It enables features like concurrent rendering and better prioritization of updates.'
          }
        ],
        tags: ['virtual-dom', 'performance', 'reconciliation']
      }
    ]
  },
  'components': {
    title: 'Components & Props',
    description: 'Understanding React components, props, and component lifecycle',
    questions: [
      {
        title: 'What are React components and how are they classified?',
        category: 'components',
        difficulty: 'basic',
        language: 'react',
        answer: 'React components are reusable pieces of UI. They can be classified as Class Components (ES6 classes) or Functional Components (JavaScript functions).',
        subQuestions: [
          {
            question: 'What are the advantages of functional components?',
            answer: 'Simpler syntax, better performance with hooks, easier testing, and no this keyword confusion.'
          },
          {
            question: 'How do you create a simple React component?',
            answer: 'Create a function that returns JSX, or a class that extends React.Component with a render method.'
          }
        ],
        tags: ['components', 'functional', 'class']
      }
    ]
  },
  'lifecycle': {
    title: 'React Lifecycle',
    description: 'Understanding component lifecycle methods and hooks equivalents',
    questions: [
      {
        title: 'What are lifecycle methods in React?',
        category: 'lifecycle',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Lifecycle methods are special methods that get called at different phases of a component\'s life. Key phases include mounting, updating, and unmounting.',
        subQuestions: [
          {
            question: 'What is the difference between componentDidMount and useEffect?',
            answer: 'componentDidMount runs once after mounting in class components. useEffect with empty dependencies is its functional equivalent but offers more flexibility.'
          },
          {
            question: 'How do you handle cleanup in useEffect?',
            answer: 'Return a cleanup function from useEffect to handle unmounting logic, similar to componentWillUnmount.'
          }
        ],
        tags: ['lifecycle', 'hooks', 'effects']
      }
    ]
  },
  'hooks': {
    title: 'React Hooks',
    description: 'Modern React state management and lifecycle methods',
    questions: [
      {
        title: 'What are React Hooks and why were they introduced?',
        category: 'hooks',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Hooks are functions that allow functional components to use state and lifecycle features. They were introduced to solve problems with class components and provide better code reuse.',
        subQuestions: [
          {
            question: 'What are the rules of Hooks?',
            answer: 'Only call Hooks at the top level, only call Hooks from React function components or custom Hooks.'
          },
          {
            question: 'What is the difference between useMemo and useCallback?',
            answer: 'useMemo memoizes values, while useCallback memoizes functions. useCallback is useful for preventing unnecessary re-renders of child components.'
          }
        ],
        tags: ['hooks', 'state', 'effects']
      }
    ]
  },
  'state-management': {
    title: 'State Management',
    description: 'Different approaches to managing state in React applications',
    questions: [
      {
        title: 'How do you handle state management in large React applications?',
        category: 'state-management',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Large applications often use a combination of local state (useState), Context API for shared state, and possibly Redux or other state management libraries for complex state logic.',
        subQuestions: [
          {
            question: 'When should you use Context vs Redux?',
            answer: 'Use Context for simple shared state like themes or user data. Use Redux for complex state logic, frequent updates, or when you need strong dev tools and middleware.'
          },
          {
            question: 'What is state lifting and when should you use it?',
            answer: 'Lifting state up means moving state to a common ancestor component. Use it when multiple components need to share state but Redux/Context would be overkill.'
          }
        ],
        tags: ['state', 'redux', 'context']
      }
    ]
  },
  'forms-events': {
    title: 'Forms and Events',
    description: 'Handling forms and events in React applications',
    questions: [
      {
        title: 'How do you handle forms in React?',
        category: 'forms-events',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'React forms can be controlled (React manages form data) or uncontrolled (DOM manages form data). Controlled components use state to handle form inputs.',
        subQuestions: [
          {
            question: 'What are controlled vs uncontrolled components?',
            answer: 'Controlled components store form data in state and update via onChange. Uncontrolled components use refs to access form values directly from DOM.'
          },
          {
            question: 'How do you handle form validation?',
            answer: 'Use state to track validation errors, validate on change/submit, and display error messages. Can also use libraries like Formik or React Hook Form.'
          }
        ],
        tags: ['forms', 'validation', 'events']
      }
    ]
  },
  'performance': {
    title: 'Performance Optimization',
    description: 'Techniques for optimizing React applications',
    questions: [
      {
        title: 'How do you optimize React application performance?',
        category: 'performance',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Use techniques like code splitting, lazy loading, memoization (React.memo, useMemo, useCallback), and proper key usage in lists.',
        subQuestions: [
          {
            question: 'What is code splitting and how does it help?',
            answer: 'Code splitting breaks your bundle into smaller chunks loaded on demand, improving initial load time. Use React.lazy and Suspense for component-level splitting.'
          },
          {
            question: 'How does React handle large lists?',
            answer: 'Use virtualization (react-window or react-virtualized) for large lists, implement infinite scrolling, and ensure proper key usage.'
          }
        ],
        tags: ['performance', 'optimization', 'code-splitting']
      }
    ]
  },
  'testing': {
    title: 'Testing React Applications',
    description: 'Strategies and tools for testing React components',
    questions: [
      {
        title: 'How do you test React components?',
        category: 'testing',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Use Jest as the test runner and React Testing Library for component testing. Focus on testing behavior rather than implementation details.',
        subQuestions: [
          {
            question: 'What is the difference between unit and integration tests?',
            answer: 'Unit tests focus on individual components in isolation. Integration tests verify how components work together.'
          },
          {
            question: 'How do you test custom hooks?',
            answer: 'Use @testing-library/react-hooks to test custom hooks in isolation, or test them through components that use them.'
          }
        ],
        tags: ['testing', 'jest', 'rtl']
      }
    ]
  },
  'patterns': {
    title: 'React Patterns',
    description: 'Common design patterns and best practices in React',
    questions: [
      {
        title: 'What are Higher Order Components (HOCs)?',
        category: 'patterns',
        difficulty: 'advanced',
        language: 'react',
        answer: 'HOCs are functions that take a component and return a new component with additional props or behavior. They\'re used for cross-cutting concerns like authentication or data fetching.',
        subQuestions: [
          {
            question: 'What are the alternatives to HOCs?',
            answer: 'Render props and custom hooks are modern alternatives that often provide cleaner solutions with better TypeScript support.'
          },
          {
            question: 'When should you use HOCs vs hooks?',
            answer: 'Use hooks for sharing logic between components. Use HOCs when you need to wrap components with additional markup or modify their rendered output.'
          }
        ],
        tags: ['patterns', 'hoc', 'best-practices']
      }
    ]
  },
  'architecture': {
    title: 'Application Architecture',
    description: 'Best practices for structuring React applications',
    questions: [
      {
        title: 'How do you structure a large React application?',
        category: 'architecture',
        difficulty: 'expert',
        language: 'react',
        answer: 'Use a feature-based structure, implement proper code splitting, separate business logic from UI components, and follow consistent naming conventions.',
        subQuestions: [
          {
            question: 'What are micro-frontends?',
            answer: 'Micro-frontends split a large application into smaller, independent applications that can be developed and deployed separately.'
          },
          {
            question: 'How do you handle shared components?',
            answer: 'Create a shared component library, use proper versioning, and implement a good documentation system.'
          }
        ],
        tags: ['architecture', 'structure', 'organization']
      }
    ]
  },
  'ssr': {
    title: 'Server-Side Rendering',
    description: 'Understanding and implementing SSR in React applications',
    questions: [
      {
        title: 'What is server-side rendering and why is it used?',
        category: 'ssr',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Server-side rendering (SSR) is the process of rendering React components on the server instead of the client. It improves initial page load performance and SEO.',
        subQuestions: [
          {
            question: 'How do you implement SSR in React using Next.js?',
            answer: 'Next.js provides built-in SSR support through pages directory, getServerSideProps, and getStaticProps functions.'
          },
          {
            question: 'What are the benefits and drawbacks of SSR?',
            answer: 'Benefits: Better SEO, faster initial page load, improved performance on low-end devices. Drawbacks: Higher server load, more complex deployment, potential for slower time-to-interactive.'
          }
        ],
        tags: ['ssr', 'next.js', 'performance']
      }
    ]
  },
  'styling': {
    title: 'Styling in React',
    description: 'Different approaches to styling React components',
    questions: [
      {
        title: 'What are the different ways to style React components?',
        category: 'styling',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'React components can be styled using CSS modules, styled-components, Tailwind CSS, inline styles, or traditional CSS/SASS files.',
        subQuestions: [
          {
            question: 'How do CSS modules work in React?',
            answer: 'CSS modules scope styles to specific components by creating unique class names, preventing style conflicts across components.'
          },
          {
            question: 'What are the advantages of styled-components?',
            answer: 'Styled-components provide component-level styles, dynamic styling based on props, automatic vendor prefixing, and better organization of component-related styles.'
          }
        ],
        tags: ['styling', 'css-modules', 'styled-components']
      }
    ]
  },
  'api-integration': {
    title: 'React and APIs',
    description: 'Working with APIs and data fetching in React',
    questions: [
      {
        title: 'How do you fetch data in React?',
        category: 'api-integration',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Data can be fetched using fetch API, Axios, or React Query. Best practices include handling loading states, errors, and caching.',
        subQuestions: [
          {
            question: 'How do you handle errors during API calls?',
            answer: 'Use try-catch blocks, implement error boundaries, display user-friendly error messages, and provide retry mechanisms.'
          },
          {
            question: 'How do you implement infinite scrolling?',
            answer: 'Use Intersection Observer API or libraries like react-infinite-scroll-component, implement pagination, and handle loading states.'
          }
        ],
        tags: ['api', 'data-fetching', 'error-handling']
      },
      {
        title: 'How do you implement real-time data updates using WebSockets?',
        category: 'api-integration',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Use WebSocket API or libraries like Socket.io with React to establish real-time bidirectional communication. Handle connection states and reconnection logic.',
        subQuestions: [
          {
            question: 'How do you handle WebSocket state in React?',
            answer: 'Create a custom hook to manage WebSocket connection, implement reconnection logic, and handle cleanup in useEffect.'
          },
          {
            question: 'What are the alternatives to WebSockets?',
            answer: 'Server-Sent Events (SSE), Long Polling, or GraphQL Subscriptions can be used depending on the use case.'
          }
        ],
        tags: ['websockets', 'real-time', 'socket.io']
      }
    ]
  },
  'pwa': {
    title: 'Progressive Web Apps',
    description: 'Building Progressive Web Apps with React',
    questions: [
      {
        title: 'How do you convert a React app into a PWA?',
        category: 'pwa',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Implement a service worker, add a web manifest, enable offline functionality, and handle caching strategies.',
        subQuestions: [
          {
            question: 'What are the key features of a PWA?',
            answer: 'Offline functionality, push notifications, installability, app-like experience, and responsive design.'
          },
          {
            question: 'How do you implement offline support?',
            answer: 'Use service workers to cache assets and API responses, implement fallback UI for offline state, and handle background sync.'
          }
        ],
        tags: ['pwa', 'service-worker', 'offline']
      },
      {
        title: 'How do you handle push notifications in a React PWA?',
        category: 'pwa',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Use the Push API and service workers to receive and display notifications, handle permission requests, and manage notification interactions.',
        subQuestions: [
          {
            question: 'How do you request notification permissions?',
            answer: 'Use the Notifications API to request permissions, handle user preferences, and store permission state.'
          },
          {
            question: 'How do you implement background sync?',
            answer: 'Use the Background Sync API to defer actions until the user has stable connectivity, handle retry logic.'
          }
        ],
        tags: ['notifications', 'background-sync', 'pwa']
      }
    ]
  },
  'micro-frontends': {
    title: 'Micro-Frontends',
    description: 'Implementing and managing micro-frontend architecture',
    questions: [
      {
        title: 'What are micro-frontends and how do you implement them?',
        category: 'micro-frontends',
        difficulty: 'expert',
        language: 'react',
        answer: 'Micro-frontends split a monolithic frontend into smaller, independent applications that can be developed and deployed separately.',
        subQuestions: [
          {
            question: 'What are the different integration approaches?',
            answer: 'Build-time integration, runtime integration via iframes, JavaScript integration using Module Federation.'
          },
          {
            question: 'How do you handle shared dependencies?',
            answer: 'Use Module Federation to share dependencies, implement version control strategies, and manage shared state.'
          }
        ],
        tags: ['micro-frontends', 'architecture', 'module-federation']
      },
      {
        title: 'How do you handle routing in micro-frontends?',
        category: 'micro-frontends',
        difficulty: 'expert',
        language: 'react',
        answer: 'Implement a shell application that manages routing, handle route synchronization between micro-frontends, and manage navigation state.',
        subQuestions: [
          {
            question: 'How do you handle shared state?',
            answer: 'Use event bus patterns, implement shared stores, or use cross-window communication techniques.'
          },
          {
            question: 'How do you ensure consistent styling?',
            answer: 'Implement a shared design system, use CSS-in-JS solutions, or use CSS custom properties for theming.'
          }
        ],
        tags: ['routing', 'state-management', 'styling']
      }
    ]
  },
  'i18n': {
    title: 'Internationalization',
    description: 'Implementing multi-language support in React applications',
    questions: [
      {
        title: 'How do you implement internationalization in React?',
        category: 'i18n',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Use libraries like react-i18next or react-intl, manage translations in JSON files, and handle language switching.',
        subQuestions: [
          {
            question: 'How do you handle dynamic content?',
            answer: 'Use interpolation, plural rules, and formatting functions provided by i18n libraries.'
          },
          {
            question: 'How do you manage translations?',
            answer: 'Store translations in JSON files, implement a translation management system, and handle missing translations.'
          }
        ],
        tags: ['i18n', 'localization', 'translations']
      },
      {
        title: 'How do you handle RTL languages in React?',
        category: 'i18n',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Use CSS logical properties, implement RTL-aware components, and handle bidirectional text properly.',
        subQuestions: [
          {
            question: 'What are the challenges with RTL layouts?',
            answer: 'Handling text alignment, mirroring layouts, adapting animations, and managing bidirectional content.'
          },
          {
            question: 'How do you test RTL layouts?',
            answer: 'Use visual regression testing, implement RTL-specific test cases, and test with real RTL content.'
          }
        ],
        tags: ['rtl', 'bidi', 'layout']
      }
    ]
  },
  'tools': {
    title: 'React Tools and Ecosystem',
    description: 'Essential tools and utilities for React development',
    questions: [
      {
        title: 'What are the essential tools in the React ecosystem?',
        category: 'tools',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Key tools include Create React App, React DevTools, ESLint, Prettier, and testing utilities.',
        subQuestions: [
          {
            question: 'How do you use React DevTools effectively?',
            answer: 'Use component inspector, analyze performance, debug props/state, and profile renders.'
          },
          {
            question: 'What are the best practices for code quality?',
            answer: 'Use ESLint with appropriate rules, implement Prettier for formatting, and follow consistent coding standards.'
          }
        ],
        tags: ['devtools', 'tooling', 'development']
      },
      {
        title: 'What is the role of bundlers in React development?',
        category: 'tools',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Bundlers like Webpack and Vite optimize code for production, handle code splitting, and manage dependencies.',
        subQuestions: [
          {
            question: 'How do you configure Webpack for React?',
            answer: 'Set up loaders for different file types, configure plugins for optimization, and manage development/production builds.'
          },
          {
            question: 'What are the advantages of Vite?',
            answer: 'Faster development server, better HMR, native ES modules support, and optimized production builds.'
          }
        ],
        tags: ['webpack', 'vite', 'bundling']
      }
    ]
  },
  'error-handling': {
    title: 'Error Handling',
    description: 'Strategies for handling errors in React applications',
    questions: [
      {
        title: 'What are error boundaries in React?',
        category: 'error-handling',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Error boundaries are React components that catch JavaScript errors in their child component tree and display fallback UI instead of crashing.',
        subQuestions: [
          {
            question: 'How do you implement error boundaries?',
            answer: 'Create a class component that implements getDerivedStateFromError and/or componentDidCatch lifecycle methods.'
          },
          {
            question: 'What are the best practices for debugging React applications?',
            answer: 'Use React Developer Tools, implement proper error logging, use Error Boundaries, and add meaningful error messages.'
          }
        ],
        tags: ['error-boundaries', 'debugging', 'best-practices']
      }
    ]
  },
  'security': {
    title: 'Security in React',
    description: 'Best practices for securing React applications',
    questions: [
      {
        title: 'How do you implement secure authentication in React?',
        category: 'security',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Implement JWT-based authentication, use HTTP-only cookies, protect routes, and handle token refresh securely.',
        subQuestions: [
          {
            question: 'How do you prevent XSS attacks in React?',
            answer: 'React automatically escapes content by default. Additionally, avoid dangerouslySetInnerHTML, sanitize user input, and use Content Security Policy.'
          },
          {
            question: 'How do you handle sensitive data in React?',
            answer: 'Never store sensitive data in localStorage, use environment variables for API keys, and implement proper authorization checks.'
          }
        ],
        tags: ['security', 'authentication', 'xss']
      }
    ]
  },
  'accessibility': {
    title: 'Accessibility in React',
    description: 'Making React applications accessible to all users',
    questions: [
      {
        title: 'What are the best practices for building accessible React apps?',
        category: 'accessibility',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Use semantic HTML, implement ARIA attributes, ensure keyboard navigation, and test with screen readers.',
        subQuestions: [
          {
            question: 'How do you handle keyboard navigation?',
            answer: 'Implement proper focus management, use tabIndex appropriately, and ensure all interactive elements are keyboard accessible.'
          },
          {
            question: 'What tools can help with accessibility testing?',
            answer: 'Use tools like React-Axe, WAVE, and Lighthouse for automated accessibility testing, and test manually with screen readers.'
          }
        ],
        tags: ['accessibility', 'a11y', 'aria']
      }
    ]
  },
  'animations': {
    title: 'React Animations',
    description: 'Implementing animations in React applications',
    questions: [
      {
        title: 'How do you add animations to a React app?',
        category: 'animations',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Use CSS transitions/animations, React Transition Group, Framer Motion, or other animation libraries.',
        subQuestions: [
          {
            question: 'What is React Transition Group?',
            answer: 'A library that helps manage component states during animations, including enter, exit, and move transitions.'
          },
          {
            question: 'How do you create custom animations using CSS?',
            answer: 'Use CSS transitions/animations with React state to trigger animation classes, or use styled-components with keyframes.'
          }
        ],
        tags: ['animations', 'transitions', 'framer-motion']
      }
    ]
  },
  'advanced-hooks': {
    title: 'Advanced Hooks Usage',
    description: 'Deep dive into React Hooks implementation and best practices',
    questions: [
      {
        title: 'What is the difference between useLayoutEffect and useEffect?',
        category: 'advanced-hooks',
        difficulty: 'advanced',
        language: 'react',
        answer: 'useLayoutEffect runs synchronously after DOM mutations but before browser paint, while useEffect runs asynchronously after paint. useLayoutEffect is useful for DOM measurements and mutations that must be synchronous.',
        subQuestions: [
          {
            question: 'When should you use useLayoutEffect?',
            answer: 'Use useLayoutEffect when you need to make DOM measurements or mutations that must happen before browser paint to prevent visual flicker.'
          },
          {
            question: 'What are the performance implications?',
            answer: 'useLayoutEffect blocks visual updates and can slow down the initial render. Use useEffect unless you specifically need synchronous execution.'
          }
        ],
        tags: ['hooks', 'performance', 'dom']
      },
      {
        title: 'How do custom hooks improve code reusability?',
        category: 'advanced-hooks',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Custom hooks allow you to extract component logic into reusable functions, share stateful logic between components, and keep components clean and focused.',
        subQuestions: [
          {
            question: 'What are the best practices for custom hooks?',
            answer: 'Start hook names with "use", handle cleanup properly, keep hooks focused on a single concern, and document dependencies clearly.'
          },
          {
            question: 'How do you test custom hooks?',
            answer: 'Use @testing-library/react-hooks to test hooks in isolation, test the components that use them, and verify state updates and side effects.'
          }
        ],
        tags: ['hooks', 'reusability', 'testing']
      }
    ]
  },
  'concurrent': {
    title: 'Concurrent React',
    description: 'Understanding Concurrent Mode and React 18 features',
    questions: [
      {
        title: 'What is Concurrent Mode in React?',
        category: 'concurrent',
        difficulty: 'expert',
        language: 'react',
        answer: 'Concurrent Mode is a set of features that help React apps stay responsive by rendering component trees without blocking the main thread. It enables new features like Suspense and concurrent rendering.',
        subQuestions: [
          {
            question: 'How does concurrent rendering work?',
            answer: 'React can pause, resume, and abandon renders based on user interaction and system resources, prioritizing more important updates.'
          },
          {
            question: 'What are the benefits of Concurrent Mode?',
            answer: 'Better user experience, smoother transitions, reduced loading states, and improved performance for complex updates.'
          }
        ],
        tags: ['concurrent', 'performance', 'react18']
      },
      {
        title: 'How does Suspense work with data fetching?',
        category: 'concurrent',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Suspense lets you declaratively specify loading states for parts of the component tree while data is being fetched. It works with special data sources that can suspend rendering.',
        subQuestions: [
          {
            question: 'What are suspense boundaries?',
            answer: 'Components that specify fallback UI to show while their children are loading. Multiple boundaries can be nested for granular loading states.'
          },
          {
            question: 'How do you implement suspense-enabled data fetching?',
            answer: 'Use suspense-compatible data sources like Relay, SWR, or implement your own using throw promise pattern.'
          }
        ],
        tags: ['suspense', 'data-fetching', 'loading']
      }
    ]
  },
  'state-management': {
    title: 'State Management',
    description: 'Different approaches to managing state in React applications',
    questions: [
      {
        title: 'How do you implement state management using Zustand?',
        category: 'state-management',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Zustand is a small, fast state management solution that uses hooks. Create stores with simple actions and access state with the useStore hook.',
        subQuestions: [
          {
            question: 'What are the advantages of Zustand over Redux?',
            answer: 'Simpler API, smaller bundle size, no boilerplate, built-in devtools support, and TypeScript-friendly.'
          },
          {
            question: 'How do you handle async actions in Zustand?',
            answer: 'Create async actions within the store, use setState for updates, and handle loading/error states.'
          }
        ],
        tags: ['zustand', 'state-management', 'hooks']
      }
    ]
  },
  'storage': {
    title: 'Browser Storage',
    description: 'Managing data persistence in React applications',
    questions: [
      {
        title: 'How do you implement local storage in React?',
        category: 'storage',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Use localStorage API with custom hooks to persist and sync state across components. Handle serialization and storage events for cross-tab communication.',
        subQuestions: [
          {
            question: 'What are the best practices for using localStorage?',
            answer: 'Handle storage limits, implement error handling, use proper serialization, and avoid storing sensitive data.'
          },
          {
            question: 'How do you sync localStorage across tabs?',
            answer: 'Listen to storage events, implement a pub/sub system, or use BroadcastChannel API for cross-tab communication.'
          }
        ],
        tags: ['storage', 'persistence', 'hooks']
      },
      {
        title: 'How do you implement session storage in React?',
        category: 'storage',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Use sessionStorage for temporary data that should persist only for the current session. Implement custom hooks for easier access and state synchronization.',
        subQuestions: [
          {
            question: 'When should you use sessionStorage vs localStorage?',
            answer: 'Use sessionStorage for sensitive session data, temporary user preferences, or form data that should not persist across sessions.'
          },
          {
            question: 'How do you handle storage events?',
            answer: 'Implement event listeners for storage changes, update component state accordingly, and handle edge cases.'
          }
        ],
        tags: ['storage', 'session', 'security']
      }
    ]
  },
  'optimization': {
    title: 'React Performance Optimization',
    description: 'Techniques and patterns for optimizing React applications',
    questions: [
      {
        title: 'How do you optimize React app performance?',
        category: 'optimization',
        difficulty: 'advanced',
        language: 'react',
        answer: 'React performance can be optimized through code splitting, lazy loading, memoization, proper key usage in lists, and avoiding unnecessary re-renders.',
        subQuestions: [
          {
            question: 'What is code splitting and how does it help?',
            answer: 'Code splitting breaks down large bundles into smaller chunks that can be loaded on demand, improving initial load time.'
          },
          {
            question: 'How do you prevent unnecessary re-renders?',
            answer: 'Use React.memo for functional components, implement shouldComponentUpdate in class components, and use useMemo/useCallback for expensive computations.'
          }
        ],
        tags: ['performance', 'optimization', 'rendering']
      },
      {
        title: 'What is React.memo and how does it prevent unnecessary re-renders?',
        category: 'optimization',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'React.memo is a higher-order component that memoizes functional components, preventing re-renders if props have not changed.',
        subQuestions: [
          {
            question: 'When should you use React.memo?',
            answer: 'Use React.memo for components that receive the same props frequently but dont need to re-render, or for expensive render computations.'
          },
          {
            question: 'What are the limitations of React.memo?',
            answer: 'React.memo only does shallow comparison of props by default. For complex objects, you need to provide a custom comparison function.'
          }
        ],
        tags: ['memo', 'performance', 'optimization']
      }
    ]
  },
  'testing': {
    title: 'Testing React Applications',
    description: 'Best practices and approaches for testing React components',
    questions: [
      {
        title: 'How do you test React components with React Testing Library?',
        category: 'testing',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'React Testing Library focuses on testing components from a user perspective, emphasizing user interactions and accessibility.',
        subQuestions: [
          {
            question: 'Why is React Testing Library preferred over Enzyme?',
            answer: 'It promotes better testing practices by focusing on user behavior rather than implementation details, and encourages accessibility-first development.'
          },
          {
            question: 'How do you test asynchronous operations?',
            answer: 'Use waitFor, findBy queries, and act for handling async operations, state updates, and effects in tests.'
          }
        ],
        tags: ['testing', 'rtl', 'jest']
      },
      {
        title: 'What is snapshot testing and when should you use it?',
        category: 'testing',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Snapshot testing captures a serialized version of component output and compares it against future changes to detect unintended modifications.',
        subQuestions: [
          {
            question: 'What are the benefits of snapshot testing?',
            answer: 'Quick regression testing, easy to update when changes are intentional, and helps catch unintended UI changes.'
          },
          {
            question: 'What are the limitations of snapshot testing?',
            answer: 'Can be brittle with frequently changing UI, may give false confidence, and requires careful review of snapshot diffs.'
          }
        ],
        tags: ['testing', 'snapshot', 'jest']
      }
    ]
  },
  'security': {
    title: 'React Security',
    description: 'Security best practices and common vulnerabilities in React applications',
    questions: [
      {
        title: 'How do you handle authentication and authorization in React?',
        category: 'security',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Implement JWT or session-based auth, protect routes with guards, handle token storage securely, and validate user permissions.',
        subQuestions: [
          {
            question: 'What are the best practices for storing tokens?',
            answer: 'Use httpOnly cookies for sensitive tokens, avoid localStorage for JWT, implement proper token refresh mechanisms.'
          },
          {
            question: 'How do you implement route protection?',
            answer: 'Create HOCs or route guards that check authentication state, redirect unauthorized users, and handle permission-based access.'
          }
        ],
        tags: ['security', 'authentication', 'authorization']
      },
      {
        title: 'How do you prevent XSS attacks in React?',
        category: 'security',
        difficulty: 'advanced',
        language: 'react',
        answer: 'React automatically escapes content by default, but you need to be careful with dangerouslySetInnerHTML, user input, and third-party scripts.',
        subQuestions: [
          {
            question: 'What are the common XSS vulnerabilities?',
            answer: 'Unsafe use of dangerouslySetInnerHTML, direct DOM manipulation, and injection through URL parameters or form inputs.'
          },
          {
            question: 'How do you sanitize user input?',
            answer: 'Use DOMPurify or similar libraries for HTML content, validate and escape user input, and avoid executing dynamic code.'
          }
        ],
        tags: ['security', 'xss', 'sanitization']
      }
    ]
  },
  'architecture': {
    title: 'React Architecture Patterns',
    description: 'Design patterns and architectural approaches in React applications',
    questions: [
      {
        title: 'What is the difference between state lifting and prop drilling?',
        category: 'architecture',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'State lifting moves state up to a common ancestor component, while prop drilling passes props through intermediate components that don\'t need them.',
        subQuestions: [
          {
            question: 'When should you lift state up?',
            answer: 'Lift state when multiple components need to share or modify the same data, or when child components need to communicate with each other.'
          },
          {
            question: 'How do you avoid prop drilling?',
            answer: 'Use Context API for global state, composition patterns, or state management libraries like Redux or Zustand.'
          }
        ],
        tags: ['architecture', 'state-management', 'patterns']
      },
      {
        title: 'What are the different component composition patterns in React?',
        category: 'architecture',
        difficulty: 'advanced',
        language: 'react',
        answer: 'React supports various composition patterns like Container/Presentational, Higher-Order Components (HOCs), Render Props, and Custom Hooks.',
        subQuestions: [
          {
            question: 'When should you use HOCs vs Render Props?',
            answer: 'Use HOCs for reusable component logic that doesn\'t need frequent updates. Use Render Props for more flexible sharing of dynamic data and behavior.'
          },
          {
            question: 'What are the advantages of Container/Presentational pattern?',
            answer: 'Separates data fetching from presentation, improves reusability, and makes testing easier by isolating concerns.'
          }
        ],
        tags: ['patterns', 'composition', 'architecture']
      }
    ]
  },
  'debugging': {
    title: 'Debugging React Applications',
    description: 'Tools and techniques for debugging React applications',
    questions: [
      {
        title: 'What are the best practices for debugging React applications?',
        category: 'debugging',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Use React DevTools, browser debugger, proper error boundaries, and logging. Implement comprehensive error handling and monitoring.',
        subQuestions: [
          {
            question: 'How do you use React DevTools effectively?',
            answer: 'Inspect component hierarchy, analyze props/state, profile performance, and debug hooks using the Components and Profiler tabs.'
          },
          {
            question: 'What debugging tools are available in development mode?',
            answer: 'React Developer Tools, console warnings, strict mode checks, and hot reloading for faster debugging.'
          }
        ],
        tags: ['debugging', 'devtools', 'development']
      },
      {
        title: 'How do you debug performance issues in React?',
        category: 'debugging',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Use React Profiler, Chrome DevTools Performance tab, and React DevTools Profiler to identify unnecessary renders and optimize performance.',
        subQuestions: [
          {
            question: 'What metrics should you look for when profiling?',
            answer: 'Render times, number of renders, component update reasons, and time spent in different lifecycle phases.'
          },
          {
            question: 'How do you identify unnecessary re-renders?',
            answer: 'Use React DevTools Profiler to highlight components that re-render, analyze why updates occur, and implement optimizations.'
          }
        ],
        tags: ['performance', 'profiling', 'optimization']
      }
    ]
  },
  'frameworks': {
    title: 'React Frameworks and Tools',
    description: 'Popular frameworks and tools in the React ecosystem',
    questions: [
      {
        title: 'What are the differences between React and Angular?',
        category: 'frameworks',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'React is a library focused on UI components with one-way data flow, while Angular is a full framework with two-way binding and more built-in features.',
        subQuestions: [
          {
            question: 'What are the advantages of React over Angular?',
            answer: 'Simpler learning curve, more flexible architecture, better performance with Virtual DOM, and larger ecosystem.'
          },
          {
            question: 'When would you choose Angular over React?',
            answer: 'When you need a full-featured framework, prefer TypeScript by default, or want built-in solutions for common features.'
          }
        ],
        tags: ['frameworks', 'comparison', 'architecture']
      },
      {
        title: 'How does Next.js enhance React development?',
        category: 'frameworks',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Next.js adds server-side rendering, static site generation, file-based routing, and API routes to React applications.',
        subQuestions: [
          {
            question: 'What are the benefits of server-side rendering?',
            answer: 'Better SEO, faster initial page load, improved performance on slower devices, and better social media sharing.'
          },
          {
            question: 'When should you use static site generation vs server-side rendering?',
            answer: 'Use SSG for content that rarely changes and doesn\'t need real-time data. Use SSR for dynamic content that needs fresh data on each request.'
          }
        ],
        tags: ['nextjs', 'ssr', 'frameworks']
      }
    ]
  },
  'patterns': {
    title: 'React Design Patterns',
    description: 'Common design patterns and best practices in React',
    questions: [
      {
        title: 'What is the Compound Components pattern?',
        category: 'patterns',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Compound Components allow components to work together while encapsulating logic and sharing state implicitly.',
        subQuestions: [
          {
            question: 'When should you use Compound Components?',
            answer: 'Use when building flexible, reusable component systems that need to share state while maintaining a clean API.'
          },
          {
            question: 'How do you implement Compound Components?',
            answer: 'Use React.Children.map for child manipulation, Context for state sharing, and clear component interfaces.'
          }
        ],
        tags: ['patterns', 'components', 'design']
      },
      {
        title: 'What is the Controlled vs Uncontrolled Components pattern?',
        category: 'patterns',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Controlled components have their state managed by React, while uncontrolled components maintain their own internal state.',
        subQuestions: [
          {
            question: 'When should you use controlled components?',
            answer: 'Use controlled components when you need to validate input, enforce input formats, or sync with other UI elements.'
          },
          {
            question: 'What are the advantages of uncontrolled components?',
            answer: 'Simpler implementation, better performance for simple forms, and useful when you don\'t need to track every change.'
          }
        ],
        tags: ['patterns', 'forms', 'state']
      }
    ]
  },
  'core-concepts': {
    title: 'Core React Concepts',
    description: 'Fundamental concepts and principles of React',
    questions: [
      {
        title: 'What is React and how does it differ from other frameworks?',
        category: 'core-concepts',
        difficulty: 'beginner',
        language: 'react',
        answer: 'React is a JavaScript library for building user interfaces. It uses a Virtual DOM, component-based architecture, and one-way data flow.',
        subQuestions: [
          {
            question: 'What are the main features of React?',
            answer: 'JSX, Virtual DOM, Component-based architecture, Unidirectional data flow, and Declarative UI.'
          },
          {
            question: 'How does React handle one-way data binding?',
            answer: 'Data flows down through props from parent to child components. State changes trigger re-renders in a predictable way.'
          }
        ],
        tags: ['basics', 'concepts', 'architecture']
      }
    ]
  },
  'virtual-dom': {
    title: 'Virtual DOM and Reconciliation',
    description: 'Understanding React\'s Virtual DOM and reconciliation process',
    questions: [
      {
        title: 'What is the Virtual DOM and how does it improve performance?',
        category: 'virtual-dom',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Virtual DOM is a lightweight copy of the actual DOM. React uses it to minimize direct DOM manipulation by batching updates and performing efficient diffing.',
        subQuestions: [
          {
            question: 'How does React\'s reconciliation algorithm work?',
            answer: 'React compares Virtual DOM with actual DOM, identifies differences, and updates only changed elements using a diffing algorithm.'
          },
          {
            question: 'What is React Fiber?',
            answer: 'React Fiber is a reimplementation of React\'s core algorithm that enables incremental rendering and better scheduling.'
          }
        ],
        tags: ['performance', 'virtual-dom', 'reconciliation']
      }
    ]
  },
  'component-lifecycle': {
    title: 'Component Lifecycle',
    description: 'Understanding React component lifecycle methods and hooks',
    questions: [
      {
        title: 'What are lifecycle methods in React?',
        category: 'component-lifecycle',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Lifecycle methods are special methods that React calls during different phases of a component\'s life: mounting, updating, and unmounting.',
        subQuestions: [
          {
            question: 'What is the difference between componentDidMount and useEffect?',
            answer: 'componentDidMount runs once after initial render in class components, while useEffect can run after every render in function components.'
          },
          {
            question: 'How does getDerivedStateFromProps work?',
            answer: 'Static method called before render, allows component to update state based on props changes. Returns new state or null.'
          }
        ],
        tags: ['lifecycle', 'methods', 'hooks']
      }
    ]
  },
  'advanced-patterns': {
    title: 'Advanced React Patterns',
    description: 'Complex patterns and advanced usage in React',
    questions: [
      {
        title: 'What is the Container/Presentational pattern?',
        category: 'advanced-patterns',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Separates data fetching and business logic (Container) from presentation and styling (Presentational) components.',
        subQuestions: [
          {
            question: 'When should you use this pattern?',
            answer: 'Use when you need to separate concerns, improve reusability, or make components more testable.'
          },
          {
            question: 'What are the alternatives?',
            answer: 'Custom hooks, render props, or context can often replace container components while maintaining separation of concerns.'
          }
        ],
        tags: ['patterns', 'architecture', 'best-practices']
      }
    ]
  },
  'server-components': {
    title: 'React Server Components',
    description: 'Understanding and implementing React Server Components',
    questions: [
      {
        title: 'What are React Server Components?',
        category: 'server-components',
        difficulty: 'expert',
        language: 'react',
        answer: 'Server Components are a new feature allowing components to be rendered on the server, reducing bundle size and improving performance.',
        subQuestions: [
          {
            question: 'What are the benefits of Server Components?',
            answer: 'Zero bundle size impact, access to backend resources, automatic code splitting, and improved initial page load.'
          },
          {
            question: 'What are the limitations?',
            answer: 'Cannot use state or browser APIs, must be async-safe, and require compatible frameworks like Next.js.'
          }
        ],
        tags: ['server-components', 'performance', 'architecture']
      }
    ]
  },
  'performance-optimization': {
    title: 'Performance Optimization',
    description: 'Advanced techniques for optimizing React applications',
    questions: [
      {
        title: 'How do you optimize React application performance?',
        category: 'performance-optimization',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Use techniques like code splitting, lazy loading, memoization, virtualization for long lists, and proper key usage.',
        subQuestions: [
          {
            question: 'What is code splitting and how does it help?',
            answer: 'Code splitting breaks down large bundles into smaller chunks that can be loaded on demand, improving initial load time.'
          },
          {
            question: 'How do you implement virtualization?',
            answer: 'Use libraries like react-window or react-virtualized to render only visible items in long lists.'
          }
        ],
        tags: ['performance', 'optimization', 'code-splitting']
      },
      {
        title: 'How does React handle batching of state updates?',
        category: 'performance-optimization',
        difficulty: 'advanced',
        language: 'react',
        answer: 'React automatically batches multiple state updates in event handlers and lifecycle methods to minimize re-renders.',
        subQuestions: [
          {
            question: 'What is automatic batching in React 18?',
            answer: 'React 18 extends batching to all updates, including promises, timeouts, and native event handlers.'
          },
          {
            question: 'How do you opt out of batching?',
            answer: 'Use flushSync when you need immediate updates, but use it sparingly as it forces synchronous re-renders.'
          }
        ],
        tags: ['batching', 'state-updates', 'react18']
      }
    ]
  },
  'data-fetching': {
    title: 'Data Fetching Patterns',
    description: 'Patterns and best practices for fetching data in React',
    questions: [
      {
        title: 'What are the different approaches to data fetching in React?',
        category: 'data-fetching',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Use hooks like useEffect, data fetching libraries like React Query, or server components for efficient data fetching.',
        subQuestions: [
          {
            question: 'What are the advantages of React Query?',
            answer: 'Automatic caching, background updates, optimistic updates, and built-in error handling.'
          },
          {
            question: 'How do you handle loading and error states?',
            answer: 'Implement loading spinners, skeleton screens, error boundaries, and retry mechanisms.'
          }
        ],
        tags: ['data-fetching', 'react-query', 'loading']
      },
      {
        title: 'How do you implement infinite scrolling in React?',
        category: 'data-fetching',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Use Intersection Observer API or libraries like react-infinite-scroll-component with pagination.',
        subQuestions: [
          {
            question: 'How do you optimize infinite scroll performance?',
            answer: 'Implement virtualization, debounce scroll events, and use proper loading indicators.'
          },
          {
            question: 'How do you handle errors during loading?',
            answer: 'Show error messages, implement retry functionality, and maintain scroll position.'
          }
        ],
        tags: ['infinite-scroll', 'pagination', 'performance']
      }
    ]
  },
  'hydration': {
    title: 'React Hydration',
    description: 'Understanding React hydration in server-side rendering',
    questions: [
      {
        title: 'What is hydration in React?',
        category: 'hydration',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Hydration is the process where React attaches event listeners and state to server-rendered HTML, making it interactive.',
        subQuestions: [
          {
            question: 'What are common hydration issues?',
            answer: 'Content mismatch between server and client, hydration errors with dynamic content, and performance impact.'
          },
          {
            question: 'How do you optimize hydration?',
            answer: 'Use selective hydration, progressive hydration, and proper error handling for hydration mismatches.'
          }
        ],
        tags: ['hydration', 'ssr', 'performance']
      }
    ]
  },
  'fiber': {
    title: 'React Fiber Architecture',
    description: 'Understanding React Fiber and its implications',
    questions: [
      {
        title: 'What is React Fiber and why was it introduced?',
        category: 'fiber',
        difficulty: 'expert',
        language: 'react',
        answer: 'React Fiber is a complete rewrite of React\'s core algorithm to enable incremental rendering and better scheduling.',
        subQuestions: [
          {
            question: 'How does Fiber improve performance?',
            answer: 'Enables work to be split into chunks, prioritized, paused, reused, or aborted based on priorities.'
          },
          {
            question: 'What is the relationship between Fiber and Concurrent Mode?',
            answer: 'Fiber enables Concurrent Mode by making rendering interruptible and allowing React to work on multiple tasks.'
          }
        ],
        tags: ['fiber', 'architecture', 'performance']
      }
    ]
  },
  'class-vs-functional': {
    title: 'Class vs Functional Components',
    description: 'Understanding the differences and use cases of class and functional components',
    questions: [
      {
        title: 'What is the difference between class and functional components?',
        category: 'class-vs-functional',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Class components use ES6 classes and lifecycle methods, while functional components use hooks and are generally more concise.',
        subQuestions: [
          {
            question: 'Why are functional components preferred?',
            answer: 'Better performance, simpler testing, reduced bundle size, and better code organization through hooks.'
          },
          {
            question: 'When might you still use class components?',
            answer: 'Legacy code maintenance, when using error boundaries (prior to React 18), or when specific lifecycle methods are needed.'
          }
        ],
        tags: ['components', 'classes', 'functions']
      }
    ]
  },
  'context-api': {
    title: 'Context API',
    description: 'Understanding and implementing React Context API',
    questions: [
      {
        title: 'How does Context API compare to Redux?',
        category: 'context-api',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Context API is built into React and good for simple state sharing, while Redux offers more features for complex state management.',
        subQuestions: [
          {
            question: 'When should you use Context vs Redux?',
            answer: 'Use Context for simple shared state like themes or user data. Use Redux for complex state logic, frequent updates, or when you need strong dev tools and middleware.'
          },
          {
            question: 'How do you optimize Context to prevent unnecessary re-renders?',
            answer: 'Split contexts by functionality, use memo and useMemo, and implement proper value memoization.'
          }
        ],
        tags: ['context', 'state-management', 'performance']
      }
    ]
  },
  'error-handling': {
    title: 'Error Handling',
    description: 'Techniques for handling errors in React applications',
    questions: [
      {
        title: 'What are Error Boundaries and how do they work?',
        category: 'error-handling',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Error Boundaries are components that catch JavaScript errors in child components, log errors, and display fallback UI.',
        subQuestions: [
          {
            question: 'What lifecycle methods are used in Error Boundaries?',
            answer: 'getDerivedStateFromError for rendering fallback UI and componentDidCatch for error logging.'
          },
          {
            question: 'What errors can\'t Error Boundaries catch?',
            answer: 'Event handlers, asynchronous code, server-side rendering, and errors in the error boundary itself.'
          }
        ],
        tags: ['error-boundaries', 'error-handling', 'lifecycle']
      }
    ]
  },
  'hooks-advanced': {
    title: 'Advanced Hooks',
    description: 'Advanced usage and patterns with React Hooks',
    questions: [
      {
        title: 'What is the difference between useMemo and useCallback?',
        category: 'hooks-advanced',
        difficulty: 'advanced',
        language: 'react',
        answer: 'useMemo memoizes computed values, while useCallback memoizes functions. Both help prevent unnecessary re-renders.',
        subQuestions: [
          {
            question: 'When should you use useMemo?',
            answer: 'Use for expensive computations, creating objects that should remain stable, or when child components rely on reference equality.'
          },
          {
            question: 'When should you use useCallback?',
            answer: 'Use when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders.'
          }
        ],
        tags: ['hooks', 'optimization', 'memoization']
      },
      {
        title: 'How do custom hooks improve code reusability?',
        category: 'hooks-advanced',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Custom hooks extract and share stateful logic between components, promoting code reuse and separation of concerns.',
        subQuestions: [
          {
            question: 'What are the rules for creating custom hooks?',
            answer: 'Must start with "use", can call other hooks, should have a single responsibility, and follow hooks rules.'
          },
          {
            question: 'How do you test custom hooks?',
            answer: 'Use @testing-library/react-hooks, test the components that use them, and verify state updates and side effects.'
          }
        ],
        tags: ['hooks', 'reusability', 'testing']
      }
    ]
  },
  'forms': {
    title: 'Forms and Form Management',
    description: 'Handling forms, validation, and form state in React',
    questions: [
      {
        title: 'How do you handle forms in React?',
        category: 'forms',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Forms can be handled using controlled components with state management or uncontrolled components with refs.',
        subQuestions: [
          {
            question: 'What is the difference between controlled and uncontrolled components?',
            answer: 'Controlled components have their form data controlled by React state, while uncontrolled components maintain their own internal state.'
          },
          {
            question: 'How do you handle form validation?',
            answer: 'Use libraries like Formik or React Hook Form, or implement custom validation using state and validation functions.'
          }
        ],
        tags: ['forms', 'validation', 'state']
      },
      {
        title: 'How do you manage form state using React Hook Form?',
        category: 'forms',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'React Hook Form provides hooks and utilities for form state management with better performance and less code.',
        subQuestions: [
          {
            question: 'What are the advantages of React Hook Form?',
            answer: 'Better performance by minimizing re-renders, built-in validation, easy integration with UI libraries.'
          },
          {
            question: 'How do you handle complex form validation?',
            answer: 'Use yup or zod schemas, custom validation rules, and field-level or form-level validation.'
          }
        ],
        tags: ['react-hook-form', 'validation', 'performance']
      }
    ]
  },
  'routing': {
    title: 'React Router and Navigation',
    description: 'Implementing routing and navigation in React applications',
    questions: [
      {
        title: 'What is the difference between React Router v5 and v6?',
        category: 'routing',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'React Router v6 introduces new features like hooks-based API, automatic route ranking, and relative routing.',
        subQuestions: [
          {
            question: 'What are the key changes in v6?',
            answer: 'New hooks like useNavigate, removal of Switch in favor of Routes, and changes to route path matching.'
          },
          {
            question: 'How do you handle nested routes in v6?',
            answer: 'Use parent routes with Outlet component and relative paths for nested route definitions.'
          }
        ],
        tags: ['routing', 'react-router', 'navigation']
      },
      {
        title: 'How do you implement protected routes?',
        category: 'routing',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Create a wrapper component that checks authentication state and redirects unauthorized users.',
        subQuestions: [
          {
            question: 'What is the best way to handle authentication with routing?',
            answer: 'Use context or state management for auth state, implement route guards, and handle redirects.'
          },
          {
            question: 'How do you preserve route history?',
            answer: 'Use location state to store previous paths, implement breadcrumbs, or use history stack.'
          }
        ],
        tags: ['routing', 'authentication', 'security']
      }
    ]
  },
  'state-patterns': {
    title: 'State Management Patterns',
    description: 'Different approaches to managing state in React',
    questions: [
      {
        title: 'How would you implement state management with Redux Toolkit?',
        category: 'state-patterns',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Redux Toolkit simplifies Redux setup with createSlice for reducers, built-in Immer for immutable updates.',
        subQuestions: [
          {
            question: 'What are the benefits of Redux Toolkit?',
            answer: 'Less boilerplate, built-in immutability with Immer, simpler async logic with createAsyncThunk.'
          },
          {
            question: 'How do you handle side effects?',
            answer: 'Use createAsyncThunk for async operations, middleware for side effects, and extraReducers for handling async states.'
          }
        ],
        tags: ['redux', 'state-management', 'toolkit']
      },
      {
        title: 'How do you implement state persistence?',
        category: 'state-patterns',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Use localStorage/sessionStorage with custom hooks, or libraries like redux-persist for Redux state.',
        subQuestions: [
          {
            question: 'What are the considerations for state persistence?',
            answer: 'Handle storage limits, implement proper serialization, secure sensitive data, and manage storage events.'
          },
          {
            question: 'How do you handle offline state?',
            answer: 'Implement optimistic updates, queue offline actions, and sync when back online.'
          }
        ],
        tags: ['persistence', 'storage', 'offline']
      }
    ]
  },
  'testing': {
    title: 'Testing React Applications',
    description: 'Best practices and strategies for testing React components',
    questions: [
      {
        title: 'How do you test React components with React Testing Library?',
        category: 'testing',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'React Testing Library focuses on testing components from a user perspective, emphasizing accessibility and user interactions.',
        subQuestions: [
          {
            question: 'What are the key principles of React Testing Library?',
            answer: 'Test behavior not implementation, find elements by accessibility roles and text, and write tests that resemble user interactions.'
          },
          {
            question: 'How do you test asynchronous operations?',
            answer: 'Use waitFor, findBy queries, and act for handling async updates and state changes.'
          }
        ],
        tags: ['testing', 'rtl', 'accessibility']
      },
      {
        title: 'How do you test custom hooks?',
        category: 'testing',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Use @testing-library/react-hooks for testing hooks in isolation, or test them through component integration.',
        subQuestions: [
          {
            question: 'What are the different approaches to testing hooks?',
            answer: 'Test in isolation with renderHook, test through components, or use wrapper components for context.'
          },
          {
            question: 'How do you test hooks with side effects?',
            answer: 'Mock external dependencies, use act for updates, and test cleanup functions.'
          }
        ],
        tags: ['testing', 'hooks', 'integration']
      }
    ]
  },
  'react18': {
    title: 'React 18 Features',
    description: 'New features and improvements in React 18',
    questions: [
      {
        title: 'What are the key features of React 18?',
        category: 'react18',
        difficulty: 'advanced',
        language: 'react',
        answer: 'React 18 introduces automatic batching, concurrent rendering, suspense improvements, and new hooks.',
        subQuestions: [
          {
            question: 'How does automatic batching work in React 18?',
            answer: 'React 18 automatically batches all state updates, including those in promises, timeouts, and native event handlers.'
          },
          {
            question: 'What is concurrent rendering?',
            answer: 'Allows React to prepare multiple versions of the UI at the same time, enabling features like startTransition.'
          }
        ],
        tags: ['react18', 'concurrency', 'batching']
      },
      {
        title: 'How do you use the new Suspense features in React 18?',
        category: 'react18',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Suspense in React 18 supports data fetching, streaming server rendering, and selective hydration.',
        subQuestions: [
          {
            question: 'What is streaming server rendering?',
            answer: 'Allows sending HTML in chunks for better TTFB and progressive hydration of components.'
          },
          {
            question: 'How does selective hydration work?',
            answer: 'React can hydrate parts of the page independently, prioritizing user interactions.'
          }
        ],
        tags: ['suspense', 'ssr', 'hydration']
      }
    ]
  },
  'performance-patterns': {
    title: 'Performance Patterns',
    description: 'Advanced patterns for optimizing React application performance',
    questions: [
      {
        title: 'How do you implement virtualization for large lists?',
        category: 'performance-patterns',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Use libraries like react-window or react-virtualized to render only visible items in long lists.',
        subQuestions: [
          {
            question: 'What are the benefits of virtualization?',
            answer: 'Reduced memory usage, improved rendering performance, and better scrolling experience.'
          },
          {
            question: 'How do you handle dynamic heights in virtualized lists?',
            answer: 'Use dynamic measurement caching, estimated heights, or pre-calculated dimensions.'
          }
        ],
        tags: ['virtualization', 'performance', 'lists']
      },
      {
        title: 'How do you implement code splitting effectively?',
        category: 'performance-patterns',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Use React.lazy and Suspense for component-level code splitting, along with route-based splitting.',
        subQuestions: [
          {
            question: 'What are good candidates for code splitting?',
            answer: 'Route components, large libraries, modal content, and features not needed for initial render.'
          },
          {
            question: 'How do you analyze bundle size?',
            answer: 'Use tools like webpack-bundle-analyzer, source-map-explorer, and performance profiling.'
          }
        ],
        tags: ['code-splitting', 'lazy-loading', 'bundling']
      }
    ]
  },
  'security': {
    title: 'Security Best Practices',
    description: 'Security considerations and best practices in React applications',
    questions: [
      {
        title: 'What are common security vulnerabilities in React applications?',
        category: 'security',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Common vulnerabilities include XSS attacks, CSRF, insecure dependencies, and improper data exposure.',
        subQuestions: [
          {
            question: 'How do you prevent XSS in React?',
            answer: 'React automatically escapes content by default. Use dangerouslySetInnerHTML carefully, sanitize user input, and implement CSP.'
          },
          {
            question: 'How do you handle sensitive data?',
            answer: 'Never store sensitive data in localStorage, use secure cookies, implement proper authentication, and use HTTPS.'
          }
        ],
        tags: ['security', 'xss', 'authentication']
      },
      {
        title: 'How do you implement secure authentication in React?',
        category: 'security',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Use JWT tokens, implement proper session management, and follow OAuth/OIDC best practices.',
        subQuestions: [
          {
            question: 'What are best practices for token storage?',
            answer: 'Store tokens in httpOnly cookies, implement proper token rotation, and handle token expiration.'
          },
          {
            question: 'How do you implement route protection?',
            answer: 'Create HOCs or route guards that check authentication state, redirect unauthorized users, and handle permission-based access.'
          }
        ],
        tags: ['authentication', 'jwt', 'csrf']
      }
    ]
  },
  'accessibility': {
    title: 'Accessibility (a11y)',
    description: 'Making React applications accessible to all users',
    questions: [
      {
        title: 'How do you ensure accessibility in React applications?',
        category: 'accessibility',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Use semantic HTML, ARIA attributes, keyboard navigation, and follow WCAG guidelines.',
        subQuestions: [
          {
            question: 'What are important ARIA roles?',
            answer: 'Use roles like button, navigation, main, dialog for proper semantic meaning and screen reader support.'
          },
          {
            question: 'How do you handle focus management?',
            answer: 'Implement proper focus trapping in modals, maintain focus order, and provide skip links.'
          }
        ],
        tags: ['accessibility', 'aria', 'wcag']
      },
      {
        title: 'How do you test accessibility in React?',
        category: 'accessibility',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Use tools like axe-core, jest-axe, and manual testing with screen readers.',
        subQuestions: [
          {
            question: 'What are common accessibility issues?',
            answer: 'Missing alt text, improper heading hierarchy, lack of keyboard navigation, and poor color contrast.'
          },
          {
            question: 'How do you automate accessibility testing?',
            answer: 'Integrate axe-core with testing library, use ESLint a11y plugins, and implement CI/CD checks.'
          }
        ],
        tags: ['testing', 'automation', 'screen-readers']
      }
    ]
  },
  'real-time': {
    title: 'Real-time Features',
    description: 'Implementing real-time functionality in React',
    questions: [
      {
        title: 'How do you implement real-time features in React?',
        category: 'real-time',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Use WebSockets, Server-Sent Events, or real-time services like Firebase for live updates.',
        subQuestions: [
          {
            question: 'What are the different approaches to real-time updates?',
            answer: 'WebSocket for bi-directional, SSE for server-to-client, or polling for simple cases.'
          },
          {
            question: 'How do you handle connection issues?',
            answer: 'Implement reconnection logic, offline state handling, and optimistic updates.'
          }
        ],
        tags: ['websockets', 'sse', 'real-time']
      },
      {
        title: 'How do you implement collaborative features?',
        category: 'real-time',
        difficulty: 'expert',
        language: 'react',
        answer: 'Use Operational Transform or CRDT for conflict resolution, implement presence indicators.',
        subQuestions: [
          {
            question: 'How do you handle concurrent edits?',
            answer: 'Use versioning, implement conflict resolution strategies, and maintain consistency.'
          },
          {
            question: 'What are considerations for scaling real-time features?',
            answer: 'Use proper connection pooling, implement message queues, and handle reconnection gracefully.'
          }
        ],
        tags: ['collaboration', 'concurrency', 'scaling']
      }
    ]
  },
  'build-deploy': {
    title: 'Build and Deployment',
    description: 'Building and deploying React applications',
    questions: [
      {
        title: 'What are the best practices for building React applications?',
        category: 'build-deploy',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Optimize bundle size, implement code splitting, and use proper environment configuration.',
        subQuestions: [
          {
            question: 'How do you optimize build size?',
            answer: 'Use tree shaking, dynamic imports, and proper dependency management.'
          },
          {
            question: 'What are important build configurations?',
            answer: 'Set up proper environment variables, optimize for production, and implement source maps.'
          }
        ],
        tags: ['build', 'optimization', 'configuration']
      },
      {
        title: 'How do you implement CI/CD for React applications?',
        category: 'build-deploy',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Set up automated testing, build pipelines, and deployment strategies.',
        subQuestions: [
          {
            question: 'What are key CI/CD considerations?',
            answer: 'Automate testing, implement staging environments, and use proper deployment strategies like blue-green.'
          },
          {
            question: 'How do you handle environment-specific configuration?',
            answer: 'Use environment variables, configuration files, and runtime configuration injection.'
          }
        ],
        tags: ['ci-cd', 'automation', 'deployment']
      }
    ]
  },
  'react-native': {
    title: 'React Native',
    description: 'Cross-platform mobile development with React Native',
    questions: [
      {
        title: 'What is React Native and how does it differ from React?',
        category: 'react-native',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'React Native uses native components instead of web components, has platform-specific implementations, and different optimization techniques.',
        subQuestions: [
          {
            question: 'What are the key differences in components?',
            answer: 'React Native uses View instead of div, Text instead of p, and has platform-specific components like TouchableOpacity.'
          },
          {
            question: 'How does styling work in React Native?',
            answer: 'Uses StyleSheet API with subset of CSS properties, flexbox for layout, and no CSS inheritance.'
          }
        ],
        tags: ['react-native', 'mobile', 'cross-platform']
      },
      {
        title: 'How do you optimize React Native performance?',
        category: 'react-native',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Use FlatList for long lists, implement proper memory management, and optimize images and animations.',
        subQuestions: [
          {
            question: 'What are common performance issues?',
            answer: 'JS thread blocking, excessive re-renders, memory leaks, and large bundle sizes.'
          },
          {
            question: 'How do you handle platform-specific code?',
            answer: 'Use Platform.select, .ios.js/.android.js file extensions, and platform-specific implementations.'
          }
        ],
        tags: ['performance', 'optimization', 'platform']
      }
    ]
  },
  'backend-integration': {
    title: 'Backend Integration',
    description: 'Integrating React with backend services',
    questions: [
      {
        title: 'What are different approaches to API integration in React?',
        category: 'backend-integration',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Use fetch API, Axios, or libraries like React Query/SWR for data fetching and caching.',
        subQuestions: [
          {
            question: 'What are the benefits of React Query?',
            answer: 'Automatic caching, background updates, retry logic, and optimistic updates.'
          },
          {
            question: 'How do you handle API errors?',
            answer: 'Implement error boundaries, use try-catch blocks, and display user-friendly error messages.'
          }
        ],
        tags: ['api', 'data-fetching', 'integration']
      },
      {
        title: 'How do you implement authentication with a backend?',
        category: 'backend-integration',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Use JWT tokens, implement OAuth flows, and handle session management.',
        subQuestions: [
          {
            question: 'What are authentication best practices?',
            answer: 'Use secure token storage, implement refresh tokens, and handle token expiration.'
          },
          {
            question: 'How do you handle protected routes?',
            answer: 'Implement route guards, handle unauthorized access, and manage user permissions.'
          }
        ],
        tags: ['authentication', 'security', 'jwt']
      }
    ]
  },
  'component-patterns': {
    title: 'Component Design Patterns',
    description: 'Advanced component patterns and best practices',
    questions: [
      {
        title: 'What are common React component patterns?',
        category: 'component-patterns',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Container/Presentational, Compound Components, Render Props, and Higher-Order Components.',
        subQuestions: [
          {
            question: 'When should you use Render Props?',
            answer: 'For sharing complex behavior, when component composition is needed, or for cross-cutting concerns.'
          },
          {
            question: 'What are Compound Components?',
            answer: 'Components that work together to form a complete UI pattern, sharing implicit state.'
          }
        ],
        tags: ['patterns', 'composition', 'design']
      },
      {
        title: 'How do you implement reusable component libraries?',
        category: 'component-patterns',
        difficulty: 'advanced',
        language: 'react',
        answer: 'Use proper component composition, implement flexible APIs, and follow design system principles.',
        subQuestions: [
          {
            question: 'What makes a good component API?',
            answer: 'Consistent prop naming, proper TypeScript types, and comprehensive documentation.'
          },
          {
            question: 'How do you handle component variants?',
            answer: 'Use prop-based variants, composition patterns, and theme-based styling.'
          }
        ],
        tags: ['libraries', 'reusability', 'api-design']
      }
    ]
  },
  'styling': {
    title: 'Styling and UI',
    description: 'Different approaches to styling React applications',
    questions: [
      {
        title: 'What are different styling approaches in React?',
        category: 'styling',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'React components can be styled using CSS modules, styled-components, Tailwind CSS, inline styles, or traditional CSS/SASS files.',
        subQuestions: [
          {
            question: 'What are the benefits of CSS-in-JS?',
            answer: 'Scoped styles, dynamic styling, theming support, and better component encapsulation.'
          },
          {
            question: 'How do you implement theming?',
            answer: 'Use ThemeProvider, CSS variables, or theme context for consistent styling.'
          }
        ],
        tags: ['styling', 'css', 'theming']
      },
      {
        title: 'How do you handle responsive design in React?',
        category: 'styling',
        difficulty: 'intermediate',
        language: 'react',
        answer: 'Use media queries, CSS Grid/Flexbox, and responsive design patterns.',
        subQuestions: [
          {
            question: 'What are mobile-first best practices?',
            answer: 'Start with mobile layouts, use breakpoints effectively, and optimize for different devices.'
          },
          {
            question: 'How do you handle dynamic layouts?',
            answer: 'Use CSS Grid for complex layouts, implement responsive containers, and handle viewport changes.'
          }
        ],
        tags: ['responsive', 'mobile', 'layout']
      }
    ]
  }
};
