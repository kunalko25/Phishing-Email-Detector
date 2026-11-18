# 🛡️ Phishing Email Detector

<p align="center">
  <img src="https://img.shields.io/badge/Cybersecurity-Email%20Protection-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" />
</p>

<p align="center">
  A modern cybersecurity project designed to analyze suspicious emails, identify potential phishing indicators, and help users understand email security risks.
</p>

<p align="center">
  <a href="https://github.com/kunalko25/Phishing-Email-Detector">View Repository</a>
</p>

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Screenshots](#-screenshots)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [How to Use](#-how-to-use)
- [Risk Classification](#-risk-classification)
- [Project Structure](#-project-structure)
- [Security Disclaimer](#-security-disclaimer)
- [Author](#-author)

## 🚀 About the Project

Phishing is one of the most common cybersecurity threats. Attackers use deceptive emails, suspicious links, and social engineering techniques to steal sensitive information.

**Phishing Email Detector** is a web-based security awareness application that analyzes email content and highlights potential phishing indicators.

The application provides risk scoring, analysis results, and security recommendations through an interactive interface.

## ✨ Key Features

| Feature | Description |
|---|---|
| 📧 Email Detection | Analyze email content for suspicious patterns |
| 🎯 Risk Scoring | Generate a risk score from 0–100 |
| 🔗 URL Detection | Identify suspicious URL patterns |
| 🕵️ IOC Extractor | Extract indicators from pasted text |
| 📩 Header Parser | Inspect email header information |
| 📎 Attachment Inspector | Identify potentially risky filename extensions |
| 📊 Analytics Dashboard | Explore analysis statistics |
| 📄 Report Export | Export analysis reports |
| 🧠 AI Assistant | In-app assistance interface |
| 🎓 Phishing Quiz | Practise phishing awareness |
| 🌙 Theme Support | Switch between dark and light themes |

## 🖥️ Screenshots

Add your actual application screenshots here.

| Main Dashboard | Email Analysis |
|---|---|
| `![Dashboard](screenshots/dashboard.png)` | `![Analysis](screenshots/analysis.png)` |

| Analytics Dashboard | Security Tools |
|---|---|
| `![Analytics](screenshots/analytics.png)` | `![Tools](screenshots/security-tools.png)` |

> Create a `screenshots` folder in your repository and add your actual screenshots using these filenames.

## ⚙️ Technology Stack

**Frontend**
- React 18
- TypeScript
- Vite

**UI & Styling**
- Tailwind CSS
- shadcn/ui
- Radix UI
- Lucide React

**Libraries**
- Framer Motion
- Recharts
- React Router
- Sonner
- jsPDF

**Integration**
- Supabase client integration

## 📥 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/kunalko25/Phishing-Email-Detector.git
```

### Step 2: Navigate to the Project

```bash
cd Phishing-Email-Detector
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Configure Environment Variables

If required, copy the example environment file:

```bash
cp .env.example .env
```

Add your own configuration values. Never upload private credentials.

### Step 5: Start the Application

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### Step 6: Build for Production

```bash
npm run build
```

## 🔍 How to Use

1. Launch the application.
2. Paste email content into the detector.
3. Start the email analysis.
4. Review the risk score and detected indicators.
5. Check the security recommendations.
6. Use additional investigation tools when needed.
7. Export the analysis report.

## 🎯 Risk Classification

| Risk Score | Classification |
|---|---|
| 0–29 | 🟢 Low Risk |
| 30–69 | 🟡 Suspicious |
| 70–100 | 🔴 High Risk |

These scores are advisory and do not guarantee whether an email is legitimate or malicious.

## 📂 Project Structure

```text
Phishing-Email-Detector/
│
├── public/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── data/
│   ├── hooks/
│   ├── integrations/
│   ├── pages/
│   ├── providers/
│   ├── types/
│   └── utils/
│
├── .env.example
├── package.json
├── index.html
└── README.md
```

## 🔐 Security Disclaimer

This project is intended for educational purposes and cybersecurity awareness.

- Detection is based on patterns and configured checks.
- False positives and false negatives are possible.
- URL patterns are not equivalent to live reputation verification.
- Attachment inspection checks filenames, not file contents.
- Do not submit confidential or sensitive information.

Always independently verify suspicious emails and links.

## 👨‍💻 Author

**Kunal Kore**

Cybersecurity Enthusiast | Ethical Hacking Learner | Developer

- GitHub: [@kunalko25](https://github.com/kunalko25)

---

<p align="center">
  ⭐ If you find this project useful, consider starring the repository!
</p>

<p align="center">
  Built with a passion for Cybersecurity 🛡️
</p>
