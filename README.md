# CF Personal Tracker

A lightweight, frontend-only web application designed to filter out the noise of the main Codeforces site and focus entirely on your personal growth, problem-solving analytics, and upsolving workflow.

## 🎯 Features

### Overview Dashboard
- **Profile Header**: Display your current handle, rank (color-coded), current rating, and max rating
- **Recent Activity**: Summary of your last 10 submissions (Accepted vs. Rejected)
- **Rating Trajectory**: Line chart plotting your historical contest ratings to visualize overall growth

### Upsolve Engine (The "To-Do" List)
- **Smart Filtering**: Automatically parses your entire submission history to find problems where you received "Wrong Answer" or "Time Limit Exceeded" but never followed up with an "Accepted" verdict
- **Direct Links**: Each item in the list is clickable, taking you directly to the Codeforces problem page
- **Personal Notes**: Text input next to each upsolve problem to save local notes (saved via LocalStorage)

### Analytics & Weakness Detection
- **Difficulty Distribution**: Bar chart showing the volume of problems solved at each rating tier
- **Tag Mastery**: Visual breakdown of solved problems by tags (DP, greedy, graphs, math, etc.)

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Data Visualization**: Recharts
- **State Management**: React Context + LocalStorage
- **Data Source**: Codeforces Public API

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🚀 Usage

1. Enter your Codeforces handle on the landing page
2. The app will fetch your profile data and submission history from the Codeforces API
3. Browse your analytics, recent activity, and upsolve problems
4. Add personal notes to upsolve problems to track your progress

## 📊 Data Flow

1. **On Load**: The app checks LocalStorage for your saved Codeforces handle
2. **Fetch**: Makes concurrent fetch requests to Codeforces API endpoints (user.info, user.status, user.rating)
3. **Process**: Browser runs JavaScript to categorize your submissions (Solved vs. Attempted)
4. **Render**: UI updates with fresh data, merging it with personal notes saved in your browser

## 🏗️ Project Structure

```
src/
├── components/          # Reusable React components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── context/            # React Context for global state
├── services/           # API services (Codeforces API)
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## 🔒 Privacy

- **No Backend**: This is a completely client-side application
- **No Database**: All your data is stored locally in your browser using LocalStorage
- **No Tracking**: We don't collect or send any personal information

## 📝 License

MIT License - feel free to use this for personal or commercial projects

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
