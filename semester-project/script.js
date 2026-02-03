/**
 * StreakFlow - Habit Tracker JavaScript
 * ======================================
 * This script handles all dynamic functionality for the habit tracking app:
 * 1. Data persistence with localStorage
 * 2. Dynamic date display
 * 3. Checkbox interactions and streak management
 * 4. Adding new habits
 * 5. Weekly table generation
 * 6. Statistics calculation
 * 7. Delete habits functionality
 * 8. Toast notifications
 */


/*We'll create a default habits data structure*/

const DEFAULT_HABITS = [
  {
    id: 'habit-1',
    name: 'Morning Exercise',
    description: 'Start the day with physical activity',
    category: 'health',
    color: 'green',
    streak: 12,
    bestStreak: 15,
    history: {}
  },
  {
    id: 'habit-2',
    name: 'Read 30 Minutes',
    description: 'Read books or articles daily',
    category: 'learning',
    color: 'blue',
    streak: 5,
    bestStreak: 14,
    history: {}
  },
  {
    id: 'habit-3',
    name: 'Drink 8 Glasses of Water',
    description: 'Stay hydrated throughout the day',
    category: 'health',
    color: 'blue',
    streak: 30,
    bestStreak: 30,
    history: {}
  },
  {
    id: 'habit-4',
    name: 'Meditate 10 Minutes',
    description: 'Practice mindfulness meditation',
    category: 'personal',
    color: 'purple',
    streak: 0,
    bestStreak: 3,
    history: {}
  },
  {
    id: 'habit-5',
    name: 'Journal Before Bed',
    description: 'Write daily reflections',
    category: 'personal',
    color: 'orange',
    streak: 3,
    bestStreak: 10,
    history: {}
  }
];

let habits = [];

let trackingStartDate = null;

/*Initialize the application*/

function init() {
  loadFromLocalStorage();
  generateSampleHistory(); // Generate past week's history if empty
  
  updateTodayHeading();
  renderHabitsList();
  renderWeeklyTable();
  updateStatistics();
  setupEventListeners();
  
  // Show welcome message on first visit
  if (!localStorage.getItem('streakflow_visited')) {
    showToast('Welcome to StreakFlow! Start tracking your habits today.', 'success');
    localStorage.setItem('streakflow_visited', 'true');
  }
}

// ============================================
// SECTION 3: LOCAL STORAGE PERSISTENCE
// ============================================

/*Save the modifications to local storage*/

function saveToLocalStorage() {
  localStorage.setItem('streakflow_habits', JSON.stringify(habits));
  localStorage.setItem('streakflow_start_date', trackingStartDate);
}

/* Load state from localStorage and falls back to defaults if nothing is saved*/

function loadFromLocalStorage() {
  const savedHabits = localStorage.getItem('streakflow_habits');
  const savedStartDate = localStorage.getItem('streakflow_start_date');
  
  if (savedHabits) {
    habits = JSON.parse(savedHabits);
  } else {
    habits = JSON.parse(JSON.stringify(DEFAULT_HABITS)); // Deep copy defaults
  }
  
  if (savedStartDate) {
    trackingStartDate = savedStartDate;
  } else {
    // Set tracking start date to 45 days ago (as shown in original HTML)
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 45);
    trackingStartDate = formatDate(startDate);
  }
}


// ============================================
// SECTION 3: DATE UTILITIES
// ============================================

/* Format a date as YYYY-MM-DD for storage keys*/

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/*Get today's date as YYYY-MM-DD*/

function getToday() {
  return formatDate(new Date());
}

/*Format date for display (e.g., "February 3, 2026")*/

function formatDateDisplay(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('fi-FI', options);
}

/*Get day name and number for table headers (e.g., "Mon 13")*/

function formatDayShort(date) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return `${days[date.getDay()]} ${date.getDate()}`;
}

/*Get the start and end dates of the current week (Sunday to Saturday)*/

function getCurrentWeekDates() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  
  // Get Sunday of current week
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);
  
  // Generate array of 7 dates
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(sunday);
    date.setDate(sunday.getDate() + i);
    dates.push(date);
  }
  
  return dates;
}

/*Calculate days between two dates*/

function daysBetween(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((new Date(date1) - new Date(date2)) / oneDay));
}

// ============================================
// SECTION 4: DYNAMIC DATE DISPLAY
// ============================================

/*Update the "Today" heading with current date*/

function updateTodayHeading() {
  const heading = document.getElementById('today-heading');
  if (heading) {
    const today = new Date();
    heading.textContent = `Today - ${formatDateDisplay(today)}`;
  }
}

// ============================================
// SECTION 5: HABITS LIST RENDERING
// ============================================

/*Render the daily habits checklist in the dashboard*/

function renderHabitsList() {
  const form = document.querySelector('#dashboard form');
  if (!form) return;
  
  const fieldset = form.querySelector('fieldset');
  const legend = fieldset.querySelector('legend');
  const ul = fieldset.querySelector('ul');
  
  // Clear existing list items
  ul.innerHTML = '';
  
  const today = getToday();
  
  // Create list item for each habit
  habits.forEach(habit => {
    const li = document.createElement('li');
    const isChecked = habit.history[today] === true;
    
    li.innerHTML = `
      <input type="checkbox" id="${habit.id}" name="${habit.id}" ${isChecked ? 'checked' : ''}>
      <label for="${habit.id}">${habit.name}</label>
      <span class="streak-badge">${habit.streak} day streak</span>
      <button type="button" class="delete-habit-btn" data-habit-id="${habit.id}" title="Delete habit">
        Delete
      </button>
    `;
    
    ul.appendChild(li);
  });
  
  // Update completion counter
  updateCompletionCounter();
  
  // Add event listeners to new checkboxes
  setupCheckboxListeners();
  
  // Add event listeners to delete buttons
  setupDeleteButtons();
}

/*Update the "X of Y habits completed" counter*/

function updateCompletionCounter() {
  const counterElement = document.querySelector('#dashboard > p');
  if (!counterElement) return;
  
  const today = getToday();
  const completed = habits.filter(h => h.history[today] === true).length;
  const total = habits.length;
  
  counterElement.textContent = `${completed} of ${total} habits completed`;
  
  // Check if all habits completed
  if (completed === total && total > 0) {
    showToast('Amazing! You completed all habits today!', 'success');
  }
}


// ============================================
// SECTION 6: CHECKBOX INTERACTIONS & STREAKS
// ============================================

/*Set up event listeners for habit checkboxes*/

function setupCheckboxListeners() {
  const checkboxes = document.querySelectorAll('#dashboard input[type="checkbox"]');
  
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', handleCheckboxChange);
  });
}

/*Handle checkbox state change and updates history, recalculates streak, saves to localStorage*/

function handleCheckboxChange(event) {
  const checkbox = event.target;
  const habitId = checkbox.id;
  const isChecked = checkbox.checked;
  const today = getToday();
  
  // Find the habit
  const habit = habits.find(h => h.id === habitId);
  if (!habit) return;
  
  // Update history
  habit.history[today] = isChecked;
  
  // Recalculate streak
  recalculateStreak(habit);
  
  // Update the streak badge display
  const li = checkbox.closest('li');
  const streakBadge = li.querySelector('.streak-badge');
  if (streakBadge) {
    streakBadge.textContent = `${habit.streak} day streak`;
  }
  
  // Save changes
  saveToLocalStorage();
  
  // Update UI
  updateCompletionCounter();
  renderWeeklyTable();
  updateStatistics();
  
  // Show feedback
  if (isChecked) {
    if (habit.streak > 1) {
      showToast(`${habit.name} - ${habit.streak} day streak!`, 'success');
    } else {
      showToast(`${habit.name} completed!`, 'success');
    }
  }
}

/*Recalculate streak based on consecutive days of completion and streak counts backward from today*/

function recalculateStreak(habit) {
  let streak = 0;
  const today = new Date();
  
  // Start from today and count backward
  for (let i = 0; i < 365; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - i);
    const dateKey = formatDate(checkDate);
    
    if (habit.history[dateKey] === true) {
      streak++;
    } else if (i > 0) {
      // Break the streak (allow today to be incomplete)
      break;
    } else if (habit.history[dateKey] === false) {
      // Today explicitly marked as not done
      break;
    }
  }
  
  habit.streak = streak;
  
  // Update best streak if current is higher
  if (streak > habit.bestStreak) {
    habit.bestStreak = streak;
  }
}

// ============================================
// SECTION 7: ADD NEW HABITS
// ============================================

/*Set up event listener for the "Create Habit" form*/

function setupCreateHabitForm() {
  // Find the create habit form (second form on the page)
  const forms = document.querySelectorAll('form');
  const createForm = forms[1]; // The second form is for creating habits
  
  if (!createForm) return;
  
  createForm.addEventListener('submit', handleCreateHabit);
}

/*Handle new habit form submission*/

function handleCreateHabit(event) {
  event.preventDefault();
  
  const form = event.target;
  const nameInput = form.querySelector('#habit-name');
  const descriptionInput = form.querySelector('#habit-description');
  const categorySelect = form.querySelector('#habit-category');
  const colorRadio = form.querySelector('input[name="habit-color"]:checked');
  
  const name = nameInput.value.trim();
  const description = descriptionInput.value.trim();
  const category = categorySelect.value;
  const color = colorRadio ? colorRadio.value : 'green';
  
  // Validation
  if (!name) {
    showToast('Please enter a habit name', 'error');
    nameInput.focus();
    return;
  }
  
  // Check for duplicate names
  if (habits.some(h => h.name.toLowerCase() === name.toLowerCase())) {
    showToast('A habit with this name already exists', 'error');
    nameInput.focus();
    return;
  }
  
  // Create new habit object
  const newHabit = {
    id: `habit-${Date.now()}`, // Unique ID based on timestamp
    name: name,
    description: description,
    category: category,
    color: color,
    streak: 0,
    bestStreak: 0,
    history: {}
  };
  
  // Add to habits array
  habits.push(newHabit);
  
  // Save to localStorage
  saveToLocalStorage();
  
  // Update UI
  renderHabitsList();
  renderWeeklyTable();
  updateStatistics();
  
  // Reset form
  form.reset();
  
  // Show success message
  showToast(`"${name}" habit created successfully!`, 'success');
}

// ============================================
// SECTION 8: WEEKLY TABLE GENERATION
// ============================================

/*Render the weekly habits table dynamically*/

function renderWeeklyTable() {
  const figure = document.querySelector('#habits figure');
  if (!figure) return;
  
  const weekDates = getCurrentWeekDates();
  const startDate = weekDates[0];
  const endDate = weekDates[6];
  
  // Update section heading
  const weekHeading = document.getElementById('week-heading');
  if (weekHeading) {
    weekHeading.textContent = 'This Week\'s Habits';
  }
  
  // Build table HTML
  let tableHTML = `
    <table>
      <caption>Habit completion for ${formatDateDisplay(startDate)} - ${formatDateDisplay(endDate)}</caption>
      <thead>
        <tr>
          <th scope="col">Habit</th>
          ${weekDates.map(date => `<th scope="col">${formatDayShort(date)}</th>`).join('')}
        </tr>
      </thead>
      <tbody>`;
  
  const today = getToday();
  
  // Add row for each habit
  habits.forEach(habit => {
    tableHTML += `<tr><th scope="row">${habit.name}</th>`;
    
    weekDates.forEach(date => {
      const dateKey = formatDate(date);
      const status = getHabitStatus(habit, dateKey, today);
      const statusClass = status.toLowerCase();
      
      tableHTML += `<td class="status-${statusClass}" data-habit-id="${habit.id}" data-date="${dateKey}">${status}</td>`;
    });
    
    tableHTML += '</tr>';
  });
  
  tableHTML += `
      </tbody>
    </table>
    <figcaption>Weekly overview showing completion status for each habit. Click on cells to toggle status.</figcaption>
  `;
  
  figure.innerHTML = tableHTML;
  
  // Add click listeners to table cells
  setupTableCellListeners();
}

/*Determine the status of a habit for a given date*/

function getHabitStatus(habit, dateKey, today) {
  if (habit.history[dateKey] === true) {
    return 'Done';
  } else if (habit.history[dateKey] === false) {
    return 'Missed';
  } else if (dateKey <= today) {
    // Past date with no data = missed
    return 'Missed';
  } else {
    // Future date
    return 'Pending';
  }
}

/*Set up click listeners on table cells to toggle status*/

function setupTableCellListeners() {
  const cells = document.querySelectorAll('#habits tbody td');
  
  cells.forEach(cell => {
    cell.addEventListener('click', handleTableCellClick);
    cell.style.cursor = 'pointer';
  });
}

/*Handle clicking on a table cell to toggle habit status*/

function handleTableCellClick(event) {
  const cell = event.target;
  const habitId = cell.dataset.habitId;
  const dateKey = cell.dataset.date;
  const today = getToday();
  
  // Don't allow editing future dates
  if (dateKey > today) {
    showToast('Cannot modify future dates', 'error');
    return;
  }
  
  const habit = habits.find(h => h.id === habitId);
  if (!habit) return;
  
  // Toggle status: Done -> Missed -> Done
  const currentStatus = habit.history[dateKey];
  habit.history[dateKey] = currentStatus !== true;
  
  // Recalculate streak
  recalculateStreak(habit);
  
  // Save changes
  saveToLocalStorage();
  
  // Update UI
  renderWeeklyTable();
  renderHabitsList(); // Update streak badges
  updateStatistics();
}


// ============================================
// SECTION 9: STATISTICS CALCULATION
// ============================================

/* Update all statistics sections*/

function updateStatistics() {
  updateOverallStats();
  updateTopPerformer();
  updateNeedsAttention();
}

/* Calculate and update overall progress statistics*/

function updateOverallStats() {
  const section = document.querySelector('#statistics section:first-of-type');
  if (!section) return;
  
  const dl = section.querySelector('dl');
  if (!dl) return;
  
  // Calculate statistics
  const totalHabits = habits.length;
  const weeklyCompletionRate = calculateWeeklyCompletionRate();
  const bestStreak = findBestCurrentStreak();
  const totalDaysTracked = daysBetween(trackingStartDate, getToday());
  
  dl.innerHTML = `
    <dt>Total Habits</dt>
    <dd>${totalHabits}</dd>
    
    <dt>Weekly Completion Rate</dt>
    <dd>${weeklyCompletionRate}%</dd>
    
    <dt>Best Current Streak</dt>
    <dd>${bestStreak.streak} days (${bestStreak.name})</dd>
    
    <dt>Total Days Tracked</dt>
    <dd>${totalDaysTracked} days</dd>
  `;
}

/* Calculate the weekly completion rate*/

function calculateWeeklyCompletionRate() {
  if (habits.length === 0) return 0;
  
  const weekDates = getCurrentWeekDates();
  const today = getToday();
  let completed = 0;
  let total = 0;
  
  habits.forEach(habit => {
    weekDates.forEach(date => {
      const dateKey = formatDate(date);
      if (dateKey <= today) {
        total++;
        if (habit.history[dateKey] === true) {
          completed++;
        }
      }
    });
  });
  
  return total > 0 ? Math.round((completed / total) * 100) : 0;
}

/* Find the habit with the best current streak*/

function findBestCurrentStreak() {
  if (habits.length === 0) return { name: 'N/A', streak: 0 };
  
  let best = habits[0];
  habits.forEach(habit => {
    if (habit.streak > best.streak) {
      best = habit;
    }
  });
  
  return { name: best.name, streak: best.streak };
}

/* Update the "Top Performer" section*/

function updateTopPerformer() {
  const sections = document.querySelectorAll('#statistics section');
  const section = sections[1]; // Second section
  if (!section) return;
  
  const dl = section.querySelector('dl');
  if (!dl) return;
  
  // Find habit with best completion rate
  const topHabit = findTopPerformer();
  
  dl.innerHTML = `
    <dt>Habit</dt>
    <dd>${topHabit.name}</dd>
    
    <dt>Current Streak</dt>
    <dd>${topHabit.streak} days</dd>
    
    <dt>Best Streak</dt>
    <dd>${topHabit.bestStreak} days</dd>
    
    <dt>Completion Rate</dt>
    <dd>${topHabit.completionRate}%</dd>
  `;
}

/* Find the top performing habit based on completion rate*/

function findTopPerformer() {
  if (habits.length === 0) {
    return { name: 'N/A', streak: 0, bestStreak: 0, completionRate: 0 };
  }
  
  let topHabit = null;
  let topRate = -1;
  
  habits.forEach(habit => {
    const rate = calculateHabitCompletionRate(habit);
    if (rate > topRate) {
      topRate = rate;
      topHabit = { ...habit, completionRate: rate };
    }
  });
  
  return topHabit || { name: 'N/A', streak: 0, bestStreak: 0, completionRate: 0 };
}

/* Calculate completion rate for a single habit*/

function calculateHabitCompletionRate(habit) {
  const historyDates = Object.keys(habit.history);
  if (historyDates.length === 0) return 0;
  
  const completed = historyDates.filter(date => habit.history[date] === true).length;
  const total = historyDates.length;
  
  return Math.round((completed / total) * 100);
}

/* Update the "Needs Attention" section*/

function updateNeedsAttention() {
  const sections = document.querySelectorAll('#statistics section');
  const section = sections[2]; // Third section
  if (!section) return;
  
  const dl = section.querySelector('dl');
  if (!dl) return;
  
  // Find habit with worst completion rate
  const worstHabit = findNeedsAttention();
  
  dl.innerHTML = `
    <dt>Habit</dt>
    <dd>${worstHabit.name}</dd>
    
    <dt>Current Streak</dt>
    <dd>${worstHabit.streak} days</dd>
    
    <dt>Best Streak</dt>
    <dd>${worstHabit.bestStreak} days</dd>
    
    <dt>Completion Rate</dt>
    <dd>${worstHabit.completionRate}%</dd>
  `;
}

/* Find the habit that needs the most attention (lowest completion rate)*/

function findNeedsAttention() {
  if (habits.length === 0) {
    return { name: 'N/A', streak: 0, bestStreak: 0, completionRate: 0 };
  }
  
  let worstHabit = null;
  let worstRate = 101;
  
  habits.forEach(habit => {
    const rate = calculateHabitCompletionRate(habit);
    if (rate < worstRate) {
      worstRate = rate;
      worstHabit = { ...habit, completionRate: rate };
    }
  });
  
  return worstHabit || { name: 'N/A', streak: 0, bestStreak: 0, completionRate: 0 };
}

// ============================================
// SECTION 10: DELETE HABITS
// ============================================

/* Set up delete button event listeners*/

function setupDeleteButtons() {
  const deleteButtons = document.querySelectorAll('.delete-habit-btn');
  
  deleteButtons.forEach(button => {
    button.addEventListener('click', handleDeleteHabit);
  });
}

/* Handle habit deletion with confirmation*/

function handleDeleteHabit(event) {
  event.preventDefault();
  event.stopPropagation();
  
  const habitId = event.target.dataset.habitId;
  const habit = habits.find(h => h.id === habitId);
  
  if (!habit) return;
  
  // Confirm deletion
  if (!confirm(`Are you sure you want to delete "${habit.name}"? This action cannot be undone.`)) {
    return;
  }
  
  // Remove habit from array
  habits = habits.filter(h => h.id !== habitId);
  
  // Save to localStorage
  saveToLocalStorage();
  
  // Update UI
  renderHabitsList();
  renderWeeklyTable();
  updateStatistics();
  
  // Show feedback
  showToast(`"${habit.name}" has been deleted`, 'success');
}

// ============================================
// SECTION 11: TOAST NOTIFICATIONS
// ============================================

/**
 * Show a toast notification
 * @param {string} message - The message to display
 * @param {string} type - 'success', 'error', or 'info'
 */

function showToast(message, type = 'info') {
  // Remove any existing toasts
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');
  
  // Add styles inline (since we can't modify the CSS file)
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 1000;
    animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
    max-width: 300px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;
  
  // Set background color based on type
  if (type === 'success') {
    toast.style.backgroundColor = '#4CAF50';
  } else if (type === 'error') {
    toast.style.backgroundColor = '#f44336';
  } else {
    toast.style.backgroundColor = '#2196F3';
  }
  
  // Add animation keyframes
  if (!document.querySelector('#toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
      .delete-habit-btn {
        background: #f44336;
        color: white;
        border: none;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.75rem;
        cursor: pointer;
        margin-left: auto;
      }
      .delete-habit-btn:hover {
        background: #d32f2f;
      }
      #dashboard fieldset li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      #dashboard fieldset li label {
        flex: 1;
        margin-bottom: 0;
      }
      .streak-badge {
        background: #e8f5e9;
        color: #2e7d32;
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        font-size: 0.8rem;
        white-space: nowrap;
      }
      .status-done {
        background-color: #e8f5e9;
        color: #2e7d32;
        font-weight: 500;
      }
      .status-missed {
        background-color: #ffebee;
        color: #c62828;
        font-weight: 500;
      }
      .status-pending {
        background-color: #fff3e0;
        color: #ef6c00;
        font-weight: 500;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Add to DOM
  document.body.appendChild(toast);
  
  // Remove after animation
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ============================================
// SECTION 12: SAMPLE HISTORY GENERATION
// ============================================

/* Generate sample history for past week if no history exists, this gives the app realistic data to display*/

function generateSampleHistory() {
  const today = new Date();
  const weekDates = getCurrentWeekDates();
  
  // Sample completion patterns for each default habit
  const samplePatterns = {
    'habit-1': [true, true, true, false, true, true, true], // Morning Exercise
    'habit-2': [true, false, true, true, true, true, true], // Read 30 Minutes
    'habit-3': [true, true, true, true, true, true, true],  // Drink Water
    'habit-4': [false, false, true, false, false, false, null], // Meditate
    'habit-5': [true, true, true, false, true, true, null]  // Journal
  };
  
  habits.forEach(habit => {
    // Only add history if this is a default habit and has no history
    if (samplePatterns[habit.id] && Object.keys(habit.history).length === 0) {
      weekDates.forEach((date, index) => {
        const dateKey = formatDate(date);
        const todayKey = getToday();
        
        // Don't set today's data for habits with null in pattern
        if (dateKey === todayKey && samplePatterns[habit.id][index] === null) {
          return;
        }
        
        // Don't set future dates
        if (dateKey > todayKey) {
          return;
        }
        
        if (samplePatterns[habit.id][index] !== null) {
          habit.history[dateKey] = samplePatterns[habit.id][index];
        }
      });
      
      // Recalculate streak based on history
      recalculateStreak(habit);
    }
  });
  
  saveToLocalStorage();
}

// ============================================
// SECTION 13: EVENT LISTENERS SETUP
// ============================================

/*Set up all event listeners*/

function setupEventListeners() {
  setupCheckboxListeners();
  setupCreateHabitForm();
  setupDeleteButtons();
  
  // Update date at midnight
  setInterval(() => {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
      updateTodayHeading();
      renderWeeklyTable();
    }
  }, 60000); // Check every minute
}

// ============================================
// SECTION 14: INITIALIZE APPLICATION
// ============================================

// Wait for DOM to be ready, then initialize
document.addEventListener('DOMContentLoaded', init);