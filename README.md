# Calmana App

A mental health platform connecting patients with mental health professionals through a comprehensive mobile application.

## Features

### Patient Dashboard
- **Mood Tracking**: Track your daily mood with visual charts
- **Personal Diary**: Write and manage your daily entries
- **AI Assistant**: Chat with AI for mental wellness support
- **Community**: Connect with other users anonymously
- **Notifications**: Stay updated with session reminders
- **Emergency SOS**: Quick access to crisis support
- **Premium Features**: Access to unlimited sessions

### Authentication
- Simple login system (accepts any email/password for demo)
- User type selection (Patient/Doctor)
- Secure navigation between screens

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI
- React Native development environment

### Installation
1. Clone the repository
2. Navigate to the project directory: `cd Calmana-APP`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`

### Usage

#### For Patients:
1. Open the app and tap "👤 Patient Portal"
2. Enter any email and password
3. Select "Patient" as user type
4. Tap "Login" to access the Patient Dashboard
5. Use the dashboard to track mood, write diary entries, and access AI assistance
6. Tap the back arrow or power button to logout

#### For Developers:
- The app uses React Native with Expo
- Navigation is handled by React Navigation
- Icons are provided by FontAwesome via @expo/vector-icons
- Styling uses React Native StyleSheet

## Project Structure

```
Calmana-APP/
├── app/
│   ├── screens/
│   │   ├── Landing.tsx          # Landing page with portal selection
│   │   ├── LoginPage.tsx        # Login form and authentication
│   │   ├── PatientDashboard.tsx # Main patient interface
│   │   └── SignupPage.tsx       # User registration
│   └── (tabs)/                  # Tab-based navigation
├── components/                   # Reusable UI components
├── constants/                    # App constants and colors
└── AppNavigator.tsx             # Main navigation setup
```

## Demo Login

For demonstration purposes, the app accepts any email and password combination. Simply:
1. Enter any email (e.g., "test@example.com")
2. Enter any password (e.g., "password123")
3. Select "Patient" as user type
4. Tap "Login"

## Development

### Adding New Features
- New screens should be added to `app/screens/`
- Update `AppNavigator.tsx` to include new routes
- Follow the existing component patterns for consistency

### Styling
- Use the existing color scheme defined in `constants/Colors.ts`
- Follow the StyleSheet patterns used in existing components
- Maintain responsive design for different screen sizes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
