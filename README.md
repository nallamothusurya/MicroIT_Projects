🌐 Web Projects 11 & 12: Integrated Tools
e s t . 2 0 2 5
This repository hosts a combined web application featuring two distinct, practical tools: a Secure Password Generator and a versatile Stopwatch/Clock. Designed to enhance both security and time management, this project demonstrates full-stack web development with a focus on client-side interactivity and a serverless API.
✨ Live Demo
Visit the deployed Combined Web Tools on Vercel
(Remember to replace YOUR_VERCEL_COMBINED_APP_URL_HERE with your actual Vercel deployment URL after successful deployment!)
🚀 Project Overview & Features
Project 11: Secure Password Generator (🔐)
A robust tool for creating strong, random passwords. It features:
Customizable Length: Define password length between 4 and 64 characters.
Character Set Options: Include or exclude uppercase letters, lowercase letters, numbers, and special characters.
Guaranteed Inclusion: Ensures at least one character from each selected category is present (if length allows).
Enhanced Security: Passwords are generated server-side using Python's robust random module, making them cryptographically strong.
User-Friendly Interface: Clean HTML/CSS frontend with immediate feedback.
Project 12: Stopwatch & Clock (⏰⏱️)
A dual-functionality application offering precise time measurement and a real-time display of the current time. It boasts:
Stopwatch:
Start/Pause/Reset: Standard controls for time tracking.
Lap Functionality: Record multiple intermediate lap times.
Millisecond Precision: Measures time accurately up to milliseconds using browser's performance.now().
Clear Display: Elapsed time shown in HH:MM:SS.mmm format.
Current Clock:
Real-time Update: Continuously displays the current system time in HH:MM:SS.
Intuitive UI: Easily switch between Stopwatch and Clock views.
Purely Client-Side: All timing and display logic is handled by JavaScript in the browser, requiring no dedicated backend component.
💻 Technologies Used
Frontend (index.html):
HTML5: Structural foundation of both tools' user interfaces.
CSS3: Styling for a modern, clean, and responsive design.
JavaScript: Powers the interactive elements, handles user input, performs client-side validation, manages the stopwatch and clock logic, and makes API calls for password generation.
Backend (api/generate-password.py):
Python: Implements the core algorithm for generating secure random passwords.
Flask: A lightweight micro-framework for building the serverless API endpoint for the password generator.
Flask-CORS: Enables Cross-Origin Resource Sharing, allowing the frontend to securely communicate with the backend API across different domains.
Deployment:
Vercel: Utilized for seamless deployment of the static HTML/CSS/JS frontend and the Python Flask API as a serverless function.
📁 Project Structure for Vercel Deployment
my-combined-web-projects/
├── index.html                  # Main HTML file for both tools (with embedded CSS and JS)
├── api/                        # Directory for Vercel serverless functions
│   └── generate-password.py    # Flask application serving the /api/generate-password endpoint
└── requirements.txt            # Python dependencies for the Flask app (used by Vercel during build)
Use code with caution.
⬇️ Getting Started Locally
To set up and run this project on your local machine, follow these steps:
Clone the repository:
git clone https://github.com/your-username/my-combined-web-projects.git
cd my-combined-web-projects
Use code with caution.
Bash
(Replace your-username/my-combined-web-projects.git with your actual GitHub repository URL)
Create a Python Virtual Environment (Recommended):
python -m venv venv
Use code with caution.
Bash
Activate the Virtual Environment:
Windows:
.\venv\Scripts\activate
Use code with caution.
Bash
macOS/Linux:
source venv/bin/activate
Use code with caution.
Bash
Install Python Dependencies:
Make sure your requirements.txt file exists at the root of the project with the necessary packages:
# requirements.txt
Flask==2.3.2 # Or a more recent compatible version
Flask-Cors==4.0.0
Use code with caution.
Then install them:
pip install -r requirements.txt
Use code with caution.
Bash
Install Vercel CLI (Globally):
This allows you to simulate the Vercel production environment locally.
npm install -g vercel # Requires Node.js and npm
vercel login          # Follow prompts to log in via your browser
Use code with caution.
Bash
Run the local development server:
From the root of your my-combined-web-projects directory:
vercel dev
Use code with caution.
Bash
The application will typically be accessible at http://localhost:3000. This command serves your index.html and correctly routes API calls to api/generate-password to your Flask serverless function, just as it would on Vercel.
🚀 Deployment to Vercel
Deploying this project to Vercel is highly streamlined due to Vercel's native support for static assets and Python serverless functions.
Prepare for Git: Ensure your project folder is clean and contains all necessary files (index.html, api/ directory with generate-password.py, and requirements.txt).
Commit and Push to Git: Commit all your changes and push them to a new or existing Git repository (e.g., GitHub, GitLab, Bitbucket).
Import Project on Vercel:
Go to your Vercel Dashboard.
Click on "Add New..." -> "Project".
Select "Import Git Repository" and choose the repository where you pushed this project.
Configure Project Settings:
Vercel will typically auto-detect your project structure (static site with a Python API in the api/ directory).
No custom Build Command or Output Directory usually needs to be set if the structure adheres to Vercel's conventions, as it will handle Python dependency installation (requirements.txt) and routing automatically.
Deploy: Click the "Deploy" button. Vercel will build your project, deploy your frontend files statically, and create serverless functions for your Python API.
Access: Once deployed, Vercel will provide you with a unique public URL to access your combined web application.
📜 License
This project is open source and available under the MIT License.
