# Exam Hub — Frontend Client

A modern Single Page Application (SPA) built with **React**, **Vite**, and **React Router DOM**. This client interface powers the Exam Hub platform, providing tailored portals for administrators to manage courses and exams, and for students to take online multiple-choice tests with real-time server correction.

---

## Features

- **Role-Based Authentication:** Protected routing ensuring strict separation between `ADMIN` and `STUDENT` roles. Direct URL navigation or unauthorized access automatically redirects users to their designated space or the `/login` page.
- **Admin Portal:**
  - **Dashboard:** Real-time statistics and summary counters.
  - **Student Management:** Create accounts, edit profiles, reset passwords, and toggle active/deactivated statuses (soft delete).
  - **Course & Exam Builder:** Manage courses, exams, and question/choice editors with dynamic locked-state indicators once attempts exist.
  - **Exam Results:** Monitor student scores, average performance, and attempt counts.
- **Student Portal:**
  - **Available Exams:** Real-time filtered list of open, un-taken exams within valid time windows.
  - **Interactive Exam Player:** Single-page submission interface enforcing single-choice selection per question with partial submission support.
  - **Instant Feedback & Correction:** Immediate post-submission feedback displaying scores alongside color-coded correct vs. selected answers.
  - **Exam History:** Comprehensive log of past test scores and performance breakdowns.
- **Error Handling:** Standardized error popups/banners displaying server-driven error messages.

---

## Tech Stack

- **Framework / Build Tool:** React 18, Vite
- **Routing:** `react-router-dom`
- **Styling:** CSS3 / Tailwind CSS *(adjust based on your setup)*
- **API Client:** Native `fetch` API wrapped with custom request handlers for JWT bearer authentication
- **Icons / UI Components:** Lucide React / React Icons *(optional/adjust as needed)*

---

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- Running instance of the **Exam Hub Backend API**

---

## Getting Started

 1. Clone the Repository

```bash
git clone https://github.com/hari-soa/exam-hub-frontend.git
cd exam-hub-frontend
```

2. Configure Environment Variables
Create a .env file in the root folder based on the provided .env.example:

```bash
cp .env.example .env
```

3. Install Dependencies

```bash
npm install
```

4. Run the Application in Development Mode

```bash
npm run dev
```

The application will start locally at `http://localhost:5173` (or the port indicated in your console).
