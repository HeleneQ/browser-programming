# Lecture 03 – CSS Basics

## What I implemented this lecture
- Created and linked an external CSS file (css/style.css) using CSS variables (--main-text)
- Applied typography rules with readable fonts, line-height, and font size hierarchy
- Implemented spacing throughout the page using both margin and padding
- Global reset with universal selector to remove default margins and padding
- Smooth scroll behavior for better navigation experience
- Flexbox layouts for navigation and skip link positioning
- CSS Grid layout for the image gallery (.dress) with complex row/column spanning
- Hover effects on links for better interactivity
- Responsive spacing and typography hierarchy throughout the page
- Styled header and footer with background colors and padding
- Transformed the navigation from a bulleted list to a horizontal menu
- Made all images responsive with max-width: 100% and height: auto
- Applied a professional layout with max-width constraint and centered content

## CSS selectors I used (at least 5)
- **Universal selector (*)** - Reset box-sizing, margin and padding for all elements
- **:root pseudo-class** - Define CSS custom property for the main text color
- **ID selector (#skipper)** - Style the skip-to-content accessibility link
- **Class selector (.dress)** - Create a grid layout for the image gallery
- **Descendant combinator (header h1, nav a, figure img, etc.)** - Target elements within specific parents
- **Pseudo-element selector (:root, :hoover)** - Define CSS custom properties/variables
- **:nth-child() pseudo-class (.dress figure:nth-child(1), etc.)** - Position specific figures in the grid
- **Attribute selector (a#skipper)** - Combine element and ID for specific targeting

## One thing I struggled with
- Understanding how to make the third figure in the `.dress` grid span two rows (grid-row: 1 / 3) and then using flexbox inside that grid item to make the image fill the full height with object-fit: cover

## One improvement I want to do next
- Add media queries to make the layout responsive on mobile devices, especially to stack the navigation links vertically and adjust the grid to a single column on small screens


