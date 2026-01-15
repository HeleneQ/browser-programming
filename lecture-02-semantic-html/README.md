# Lecture 02 – Semantic HTML & Structure

## 1. What I implemented this lecture
- Personal portfolio page including py academic and personal projects
- Navigation with skip link and semantic `<nav>` for better usability
- Sections for portfolio, interests, and contact information.
- Use of semantic HTML elements such as `<header>`, `<main>`, `<section>`, `<figure>`, `<figcaption>`, `<footer>`.
- Embedded media (images, YouTube video via `<iframe>`).


## 2. Semantic decisions I made (REQUIRED)


### Decision 1
- Element(s) used: `<header>`
- Where in the page: At the top, containing my name, description, and short bio.
- Why this element is semantically correct: The `<header>` element represents introductory content for the page. It is more meaningful than a generic `<div>` and signals the main heading and overview to browsers and assistive technologies.

### Decision 2
- Element(s) used: `<section>` and `<figure>`
- Where in the page: `<section>` is used for "Portfolio" and "Interests"; `<figure>` wraps each image or media in the portfolio.
- Why this element is semantically correct: `<section>` groups related content under a thematic heading, while `<figure>` with `<figcaption>` associates an image or video with a description, improving structure and clarity for both users and screen readers.

### Decision 3
- Element(s) used: `<main>` and skip link `<a href="#main">`
- Where in the page: The main content of the page is wrapped in `<main>` and the skip link is at the very top.
- Why this element is semantically correct: `<main>` identifies the primary content of the page. The skip link improves accessibility by allowing keyboard users to jump straight to the main content without tabbing through navigation links.



---

## 3. Accessibility considerations
- Added a skip link at the top of the page for keyboard users.
- All images include descriptive `alt` attributes.
- Semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<figure>`, `<footer>`) improve screen reader comprehension.
- Headings are hierarchical (`<h1>` → `<h2>` → `<h3>`), which helps navigation for assistive technologies.

**How they improve usability:**  
These features make the page navigable for keyboard-only users, readable for screen readers, and more structured for all visitors.
---

## 4. What I learned
- How to structure a full HTML page semantically.
- How to use `<figure>` and `<figcaption>` for images and videos and how to post videos.
- How to make a page more accessible with skip links and alt text.
- Importance of heading hierarchy and semantic grouping of content.

## 5. What I still need to improve
- Refine semantic structure by exploring additional elements like `<article>` or `<aside>` where relevant.  
- Add more descriptive `alt` text for complex images or diagrams.  
- Include captions and explanations for all embedded media for clarity.  
- Improve the overall accessibility experience, such as better focus indicators and keyboard navigation.  
- Organize sections to make content flow even clearer for users and screen readers.

## 6. Notes about AI usage (if any)
- Tool used: ChatGPT
- What I accepted as-is: General structure, corrections of HTML errors, accessibility recommendations.
- What I modified manually: semantic improvements, Content for my portfolio, images, personal description, GitHub links, and hobby project details.
