# PERSONAL-PORTFOLIO-HUB


A comprehensive **Frontend Portfolio Hub** showcasing modern web applications built with **HTML, CSS, and JavaScript**, designed to demonstrate real-world problem solving, UI/UX design, and client-side logic using **localStorage** for persistence.



## Live Demo

**Deployed on Vercel** (via GitHub integration)

This project is fully hosted and accessible online, reflecting a production-ready static web deployment workflow.



## Project Overview

The **Portfolio Hub** serves as a central gateway to multiple independent frontend projects, including utility applications, recreational apps, games, and industry-inspired web systems. Each project is self-contained while remaining part of a unified portfolio ecosystem.

The hub emphasizes:

* Clean UI/UX design
* Responsive layouts
* Modular architecture
* JavaScript logic and state management
* Persistent data storage using `localStorage`



## Project Architecture

The project follows a **hub-and-spoke architecture**:


Portfolio-hub/
│
├── index.html
├── style.css
├── script.js
├── README.md
├── assets/
├── landingpage-assets/
└── Projects/
    ├── calculator-hub/
    ├── todo-webapp/
    ├── photo-gallery/
    ├── game-app/
    ├── finance-webapp/
    ├── manuf-webapp/
    ├── e-commerce-webapp/
    └── health-webapp/
```

### Key Architectural Decisions

* **Centralized landing page** for navigation and branding
* **Independent project folders** to avoid coupling and ease maintenance
* **Vanilla JavaScript** to demonstrate strong fundamentals
* **No frameworks** to emphasize core frontend skills



## Featured Projects

### Calculator Hub

Includes multiple calculators:

* Scientific Calculator
* Unit Converter
* Age Calculator

Demonstrates mathematical logic, DOM manipulation, and input validation.

### To-Do List App

* Task creation, editing, and deletion
* Persistent task storage using `localStorage`
* Focus-oriented UI

### Photo Gallery

* Image upload and rendering
* Persistent gallery state
* Dynamic DOM rendering

### Memory Card Game

* Card matching logic
* Game state management
* Win/lose conditions

### Finance Web App (PalmPay-inspired)

* Financial dashboard UI
* Transaction-based layout design

### Manufacturing Web App (Innoson-inspired)

* Industry-focused UI
* Production-oriented layout and content structure

### E-Commerce Web App

* Product listing UI
* Shopping flow simulation

### Health Web App

* Healthcare-themed interface
* Clean, accessible design



## Technologies Used

* **HTML5** – Semantic structure
* **CSS3** – Flexbox, Grid, responsive design
* **JavaScript (ES6+)** – Application logic and interactivity
* **localStorage** – Client-side data persistence
* **Font Awesome** – Icons
* **Google Fonts** – Typography
* **Vercel** – Deployment and hosting
* **Git & GitHub** – Version control



## UI/UX & Responsiveness

* Mobile-first responsive design
* Flexbox and CSS Grid layouts
* Consistent color scheme and typography
* Interactive hover and transition effects
* Accessible semantic HTML structure



## Challenges & Solutions

### JavaScript Logic

Some application logic (especially in games and calculators) initially failed due to improper event handling and state updates. These issues were resolved by:

* Refactoring functions
* Improving state management
* Reordering execution flow

### localStorage

Challenges included:

* Overwriting stored data
* Incorrect parsing/stringifying

**Solutions:**

* Proper use of `JSON.stringify()` and `JSON.parse()`
* Ensuring data loads before DOM rendering

These challenges significantly improved debugging and problem-solving skills.



## Testing & Debugging

* Manual testing across different screen sizes
* Console debugging and error tracing
* Functional testing of user flows
* UI consistency checks



## Deployment

The project was deployed using **Vercel**, directly connected to the GitHub repository for seamless CI/CD.

Deployment benefits:

* Automatic rebuilds on push
* Free hosting for static projects
* Fast global delivery



## Future Enhancements

* Add backend integration (Node.js / Firebase)
* Improve accessibility (ARIA roles)



## Author

**Jideofor Malachi Agoziwom**
Frontend Web Developer



## License

This project is open for learning and portfolio demonstration purposes.
