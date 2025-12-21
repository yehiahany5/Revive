// MAINFRAME_INITIALIZATION
const _supabase = supabase.createClient(
    'https://whcklexzbxyylbiuwtcp.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoY2tsZXh6Ynh5eWxiaXV3dGNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYyODgwMTgsImV4cCI6MjA4MTg2NDAxOH0.HnnpiGOPgPZHN6WzGYnwkD6BErHj1BsMFjGaruvwXf4'
);

const form = document.getElementById('registration-form');
const btn = document.getElementById('submit-btn');
const modal = document.getElementById('glitch-modal');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // UI_LOCKOUT
    btn.innerText = "UPLOADING_TO_MAINFRAME...";
    btn.disabled = true;

    const formData = new FormData(form);
    const userData = Object.fromEntries(formData);

    try {
        const { error } = await _supabase
            .from('users')
            .insert([userData]);

        if (error) throw error;

        // SUCCESS_SEQUENCE
        modal.style.display = 'flex';
        form.reset();
        btn.innerText = "INITIALIZE_REGISTRATION";

    } catch (error) {
        console.error("CRITICAL_FAILURE:", error.message);
        btn.innerText = "SYSTEM_FAILURE";
        btn.style.backgroundColor = "#ff0055";
        alert("DB_SYNC_ERROR: Ensure RLS is disabled or configured.");
    } finally {
        btn.disabled = false;
    }
});

function closeModal() {
    modal.style.display = 'none';
    window.location.href = "index.html";
}