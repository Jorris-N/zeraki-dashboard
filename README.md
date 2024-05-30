
```markdown
# Zeraki Dashboard Task

## Project Overview

The Sale Agent Dashboard project is a web application designed to streamline administrative tasks related to managing schools, including invoicing, collections, and school details management. It provides comprehensive features for school administrators to efficiently handle invoices, monitor collections, and view detailed information about each school.

## Setup Instructions

### Prerequisites

- Node.js installed on your machine
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:Jorris-N/zeraki-dashboard.git
   ```

2. Navigate to the project directory:
   ```bash
   cd school-management-system
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your web browser and go to `http://localhost:3000` to view the application.

6. Mock REST API (JSON Server)
    The project uses JSON Server to create a full mock REST API using simple JSON files. The mock server provides endpoints for managing schools, invoices, collections, and other related data.

To run the JSON Server:
```bash
json-server --watch db.json --port 3001
```
The mock API will be available at http://localhost:3001.

## Key Design Decisions

### Component Structure

The project follows a modular component structure, with separate components for the sidebar, dashboard, schools, invoices, and collections management. Each component handles specific functionalities, allowing for easy maintenance and scalability.

### State Management

State management is handled primarily using React's built-in useState hook for local component state. For more complex state management needs, Redux can be integrated seamlessly into the project.

### Styling

Styling is achieved using a combination of custom CSS, TailwindCSS and the Material-UI library for UI components. This approach ensures consistency in design and allows for quick customization of styles.

### Routing

Routing is managed using React Router, enabling navigation between different pages and components within the application. Each route corresponds to a specific feature or section of the School Management System.

### API Integration

The project integrates with backend APIs to fetch and update data related to schools, invoices, and collections. Axios is used as the HTTP client for making API requests, allowing for efficient communication with the backend server.
