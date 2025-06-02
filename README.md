# Modern E-commerce Platform

A full-featured e-commerce platform built with React, TypeScript, and Supabase. Features a modern UI design with Tailwind CSS and comprehensive inventory management system.

## 🌟 Features

- **Modern UI/UX**
  - Responsive design using Tailwind CSS
  - Custom color schemes with primary blue and secondary purple
  - Smooth transitions and hover effects
  - Mobile-friendly interface

- **Product Management**
  - Product listing with filtering and sorting
  - Detailed product pages
  - Image management system
  - Customer reviews and ratings

- **Shopping Experience**
  - Shopping cart functionality
  - Real-time inventory tracking
  - Smooth checkout process
  - Order confirmation

- **Inventory Management**
  - Admin dashboard for inventory control
  - Real-time stock updates
  - Low stock alerts
  - Transaction history
  - Stock level indicators

## 🚀 Technologies

- **Frontend**
  - React 18
  - TypeScript
  - Redux Toolkit (State Management)
  - React Router v6
  - Tailwind CSS
  - Heroicons

- **Backend**
  - Supabase (Backend as a Service)
  - PostgreSQL Database
  - Row Level Security
  - Real-time Subscriptions

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/e-commerce_platform.git
   cd e-commerce_platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## 🗄️ Database Schema

The application uses the following main tables in Supabase:

- **products**
  - id (uuid)
  - name (text)
  - description (text)
  - price (numeric)
  - image (text)
  - category (text)
  - created_at (timestamp)
  - updated_at (timestamp)

- **inventory**
  - id (uuid)
  - product_id (uuid, foreign key)
  - quantity (integer)
  - low_stock_threshold (integer)
  - created_at (timestamp)
  - updated_at (timestamp)

- **inventory_transactions**
  - id (uuid)
  - product_id (uuid, foreign key)
  - quantity_change (integer)
  - transaction_type (text)
  - notes (text)
  - created_at (timestamp)

## 🔐 Security

- Row Level Security (RLS) policies implemented in Supabase
- Protected API endpoints
- Environment variables for sensitive data
- Type-safe operations with TypeScript

## 🎨 UI Components

- Layout with responsive navigation
- Product cards with hover effects
- Shopping cart with quantity controls
- Inventory management dashboard
- Rating and review system

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🛠️ Development

### Prerequisites
- Node.js 16+
- npm or yarn
- Supabase account

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Create React App](https://create-react-app.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [Heroicons](https://heroicons.com/)

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/e-commerce_platform](https://github.com/yourusername/e-commerce_platform)
