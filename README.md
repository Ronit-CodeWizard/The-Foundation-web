# The Foundation - Jamshedpur

A high-performance, brutalist-inspired website for **The Foundation**, a premier coaching institute located in Parsudih, Jamshedpur. This application is designed to provide a seamless experience for students and parents across all devices, with a focus on high conversion and modern aesthetics.

## 🚀 Key Features

- **Brutalist Design System**: A unique "sketchy" aesthetic with hand-drawn borders, bold typography, and high-contrast elements.
- **Multi-Step Registration**: A user-friendly 4-step registration process with progress tracking and real-time validation.
- **Google Sheets Integration**: Automated lead collection using **SheetDB**, allowing mobile-friendly management of student data.
- **Interactive Campus Gallery**: A dynamic masonry grid showcasing the campus life, labs, and classrooms.
- **Toppers Wall**: A dedicated section to celebrate student success in JEE, NEET, and Board exams.
- **WhatsApp Direct Connect**: Instant communication buttons for quick inquiries and form submission backups.
- **Google Maps Integration**: Embedded interactive map for easy navigation to the Parsudih campus.
- **Fully Responsive**: Optimized for mobile, tablet, and desktop viewing.

## 🛠️ Tech Stack

- **Frontend**: HTML5, Tailwind CSS v4
- **Icons**: Lucide Icons
- **Animations**: CSS Transitions, Canvas Confetti
- **Backend Integration**: SheetDB API (Google Sheets)
- **Deployment**: Static Web Hosting

## 📋 Google Sheets Setup (SheetDB)

To receive registration data in your Google Sheet:

1.  **Create a Google Sheet**: Add the following headers to the first row (Row 1):
    `formType`, `studentName`, `guardianName`, `class`, `board`, `school`, `contact`, `gender`, `programme`, `source`
2.  **Connect to SheetDB**:
    - Go to [SheetDB.io](https://sheetdb.io).
    - Paste your Google Sheet link to create a new API.
    - Copy your **API URL**.
3.  **Update the Code**:
    - Open `register.js`.
    - Replace the `GOOGLE_SHEET_URL` value with your new API URL.

## 📂 Project Structure

- `index.html`: Home page with about, features, toppers, and contact.
- `courses.html`: Detailed list of academic programmes.
- `gallery.html`: Visual showcase of the campus.
- `register.html`: Multi-step student registration form.
- `demo.html`: Quick demo class booking form.
- `register.js`: Logic for the multi-step form and SheetDB integration.
- `demo.js`: Logic for the demo booking form.

## 🎨 Design Philosophy

The site uses a "Creative Brutalist" approach. It combines professional educational standards with a playful, hand-drawn feel to resonate with modern students. The use of the **Thalia** and **Inter** fonts ensures readability while maintaining a distinct personality.

---

© 2026 The Foundation Jamshedpur. All Rights Reserved.
