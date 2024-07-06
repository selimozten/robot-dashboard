# Robot Dashboard

## Overview

Robot Dashboard is a comprehensive web application designed to manage and monitor robotic systems. Built with React and TypeScript, this project integrates with Supabase for backend services, providing a robust platform for real-time data visualization and control.

## Features

- **Real-time Monitoring**: View live data streams from your robotic systems.
- **Data Visualization**: Graphical representation of various metrics and performance indicators.
- **User Management**: Secure authentication and authorization using Supabase.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Extensible Architecture**: Easily add new features and integrations.

## Tech Stack

- **Frontend**: React, TypeScript
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Styling**: Tailwind CSS
- **State Management**: Redux
- **Build Tool**: Vite
- **Testing**: Jest, React Testing Library

## Getting Started

### Prerequisites

- Node.js (>=14.x)
- npm (>=6.x) or yarn (>=1.x)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/selimozten/robot-dashboard.git
   cd robot-dashboard
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   REACT_APP_SUPABASE_URL=your-supabase-url
   REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

### Running the Application

1. Start the development server:
   ```sh
   npm start
   # or
   yarn start
   ```

2. Open your browser and navigate to `http://localhost:3000` to view the application.

### Building for Production

To create a production build, run:
```sh
npm run build
# or
yarn build
```

The production-ready files will be in the `build` directory.

## Project Structure

```
robot-dashboard/
├── src/
│   ├── components/
│   │   ├── Login.js
│   │   ├── RobotDashboard.js
│   │   ├── DataCard.js
│   │   └── StatusIndicator.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── services/
│   │   ├── supabase.js
│   │   └── robotApi.js
│   ├── hooks/
│   │   └── useRobotData.js
│   ├── App.js
│   └── index.js
├── public/
│   └── index.html
├── package.json
└── README.md
```

## Contributing

We welcome contributions to improve Robot Dashboard. To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Create a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any inquiries or feedback, please reach out to Selim Ozten at [ozten@inpocket.ai](mailto:ozten@inpocket.ai).