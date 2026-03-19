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

## 📋 Google Sheets Setup (Google Apps Script)

To receive registration data directly in your Google Sheet without third-party services:

1.  **Create a Google Sheet**: Open a new Google Sheet.
2.  **Open Script Editor**: Go to **Extensions > Apps Script**.
3.  **Paste the Script**: Delete any existing code and paste the following:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  // Define the headers you want to save
  var headers = [
    "Timestamp", "formType", "studentName", "guardianName", 
    "class", "board", "school", "contact", "gender", "programme", "source"
  ];
  
  // If sheet is empty, add headers
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }
  
  // Prepare the row data
  var row = [
    new Date(),
    data.formType || "",
    data.studentName || "",
    data.guardianName || "",
    data.class || "",
    data.board || "",
    data.school || "",
    data.contact || "",
    data.gender || "",
    data.programme || "",
    data.source || ""
  ];
  
  sheet.appendRow(row);
  
  return ContentService.createTextOutput("Success")
    .setMimeType(ContentService.MimeType.TEXT);
}
```

4.  **Deploy as Web App**:
    - Click **Deploy > New Deployment**.
    - Select Type: **Web App**.
    - Description: "Foundation Website API".
    - Execute as: **Me**.
    - Who has access: **Anyone**.
    - Click **Deploy** and authorize the permissions.
5.  **Update the Code**:
    - Copy the **Web App URL**.
    - Open `src/scripts/register.js` and `src/scripts/demo.js`.
    - Replace `YOUR_SCRIPT_ID` in the `GOOGLE_SHEETS_URL` with your actual script ID or the full URL.

## 📂 Project Structure

- `index.html`: Home page with about, features, toppers, and contact.
- `courses.html`: Detailed list of academic programmes.
- `gallery.html`: Visual showcase of the campus.
- `register.html`: Multi-step student registration form.
- `demo.html`: Quick demo class booking form.
- `src/scripts/`: Contains all JavaScript logic.
    - `script.js`: General UI logic and animations.
    - `register.js`: Logic for the multi-step registration form.
    - `demo.js`: Logic for the demo booking form.
- `src/styles/`: Contains global CSS.
    - `style.css`: Custom Brutalist styles and animations.

## 🎨 Design Philosophy

The site uses a "Creative Brutalist" approach. It combines professional educational standards with a playful, hand-drawn feel to resonate with modern students. The use of the **Thalia** and **Inter** fonts ensures readability while maintaining a distinct personality.

---

© 2026 The Foundation Jamshedpur. All Rights Reserved.
