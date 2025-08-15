## Hackathon Management System App ##

A simple React & Node.js/MongoDB application for managing hackathon events and teams. Users can create, view, edit and delete events and teams.

---

## Tech Stack ##
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT
- **HTTP Client:** Axios

---

##**Project Local Setup Instructions**##

**1. Clone the repo**
From a terminal:
git clone https://github.com/ConnorTruscott/IFN636_A1
cd IFN636_A1

**2 Install Backend Dependencies**
cd backend
npm install

**3 Configure Environment Variables**
nano .env **May require sudo**

MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret>
PORT=5001

**4. Start Backend Server**
npm run dev

**5. Install Frontend Dependencies**
From a new terminal in frontend folder:

npm install

**6. Start Frontend**
npm start

**7. Access the App**
Visit http://localhost:3000 in browser

**Current Live Version**
For access to the current live version of this project, please visit http://52.63.145.55

Any issues or queries, please contact me at n9296212@qut.edu.au

**Folder Structure**

```
└── .github
    └── workflows
        └── ci.yml
└── backend
    └── config
        ├── db.js
    └── controllers
        ├── authController.js
        ├── eventController.js
        ├── teamController.js
    └── middleware
        ├── authMiddleware.js
    └── models
        ├── Event.js
        ├── Team.js
        ├── User.js
    └── routes
        ├── authRoutes.js
        ├── eventRoutes.js
        ├── teamRoutes.js
    └── test
        ├── test.js
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    └── server.js
└── frontend
    └── public
        ├── favicon.ico
        ├── index.html
        ├── logo192.png
        ├── logo512.png
        ├── manifest.json
        ├── robots.txt
    └── src
        └── components
            ├── EventForm.jsx
            ├── EventList.jsx
            ├── Navbar.jsx
            ├── TeamForm.jsx
            ├── TeamList.jsx
        └── context
            ├── AuthContext.js
        └── pages
            ├── Events.jsx
            ├── Login.jsx
            ├── Profile.jsx
            ├── Register.jsx
            ├── Teams.jsx
        ├── App.css
        ├── App.js
        ├── App.test.js
        ├── axiosConfig.jsx
        ├── index.css
        ├── index.js
        ├── logo.svg
        ├── reportWebVitals.js
        ├── setupTests.js
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── tailwind.config.js
```