const API_URL = 'https://note-app-9a31.onrender.com';

const noteInput = document.getElementById('noteInput');
const addBtn = document.getElementById('addBtn');
const notesList = document.getElementById('list_note');
const errorDiv = document.getElementById('error');

// Fetch and display all notes
async function fetchNotes() {
    try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch notes');
    
    const notes = await response.json();
    renderNotes(notes);
    hideError();
    } catch (error) {
    showError('Failed to load notes. Please try again.');
    notesList.innerHTML = '<div class="empty-state">Could not load notes</div>';
    }
}

// Render notes to the DOM
function renderNotes(notes) {
    if (notes.length === 0) {
        notesList.innerHTML = '<div class="empty-state">No notes yet. Add your first note!</div>';
        return;
    }

    notesList.innerHTML = `
    <ul>
        ${notes.map(note => `
        <li class="note-item" data-id="${note.id}">
            <span class="note-content">${escapeHtml(note.content)}</span>
            <button class="btn btn-danger" onclick="deleteNote('${note.id}')">Delete</button>
        </li>
        `).join('')}
    </ul>
    `;
}

// Add a new note
async function addNote() {
    const content = noteInput.value.trim();
    if (!content) return;

    addBtn.disabled = true;
    addBtn.textContent = 'Adding...';

    try {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
    });

    if (!response.ok) throw new Error('Failed to add note');

    noteInput.value = '';
    await fetchNotes();
    hideError();
    } catch (error) {
    showError('Failed to add note. Please try again.');
    } finally {
    addBtn.disabled = false;
    addBtn.textContent = 'Add Note';
    }
}

// Delete a note
async function deleteNote(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete note');

        await fetchNotes();
        hideError();
    } catch (error) {
        showError('Failed to delete note. Please try again.');
    }
}

// Helper: Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Helper: Show error message
function showError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

// Helper: Hide error message
function hideError() {
    errorDiv.style.display = 'none';
}

// Event listeners
addBtn.addEventListener('click', addNote);

noteInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
    addNote();
    }
});

// Initial load
fetchNotes();