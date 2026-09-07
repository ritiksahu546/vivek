# Firebase Setup Instructions for Dr. Vivek Arora Clinic Website

This application is designed to work seamlessly with **Firebase Firestore, Authentication, and Storage**, while also providing a built-in persistent fallback store so that all features and admin tools work immediately during preview.

## Step 1: Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project** and name it (e.g., `dr-vivek-arora-clinic`).
3. (Optional) Disable or enable Google Analytics.

## Step 2: Enable Firebase Services
1. **Firestore Database**:
   - Navigate to **Build > Firestore Database**.
   - Click **Create database**, select a location close to your users (e.g., `asia-south1` for Mumbai/India).
   - Start in Production mode and apply the rules located in `firestore.rules`.
2. **Authentication**:
   - Navigate to **Build > Authentication**.
   - Click **Get started**.
   - Under the **Sign-in method** tab, enable **Email/Password** and **Google**.
3. **Storage** (optional for photo uploads):
   - Navigate to **Build > Storage**.
   - Click **Get started** in production or test mode.

## Step 3: Register Your Web App & Add Credentials
1. In Project Settings > General, scroll to **Your apps** and click the Web icon (`</>`).
2. Copy the Firebase configuration object.
3. Configure your environment variables in your hosting environment:
   ```env
   VITE_FIREBASE_API_KEY="your-api-key"
   VITE_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
   VITE_FIREBASE_PROJECT_ID="your-project-id"
   VITE_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
   VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
   VITE_FIREBASE_APP_ID="your-app-id"
   ```
4. Alternatively, paste your config directly into the Admin Panel under **Website Settings > Firebase Sync** to live-connect your cloud instance.

## Step 4: Admin Access
- Any authorized email added to the Firestore `/admins/{uid}` collection or configured as master administrator (`gig.ritik546@gmail.com`) can log in at `/admin`.
