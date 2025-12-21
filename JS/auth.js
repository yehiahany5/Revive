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

async function updateCapacity() {
    // Select range 0-0 to get count without downloading all data
    const { count, error } = await _supabase
        .from('users')
        .select('*', { count: 'exact' })
        .range(0, 0); 

    if (error) {
        console.error("DB_ERROR:", error);
        return;
    }

    document.getElementById('user-count').innerText = count || 0;
    const percentage = ((count || 0) / 15) * 100;
    document.getElementById('progress-bar').style.width = percentage + '%';
}
updateCapacity();
// ... (باقي الكود بتاعك زي ما هو)

// 1. دي دالة جديدة هنشغلها أول ما الصفحة تفتح
function checkRegistrationStatus() {
    // بنسأل المتصفح: هل المستخدم ده سجل قبل كدة؟
    if (localStorage.getItem('mission_status') === 'completed') {
        // لو أيوة، نخفي الفورم ونظهر الرسالة علطول
        form.style.display = 'none'; // نخفي الفورم
        document.querySelector('.hero-header').style.display = 'none'; // نخفي العنوان لو حابب
        
        // نغير محتوى المودال ونظهره
        const modalContent = document.querySelector('.modal-content');
        modalContent.innerHTML = `
            <h2 class="glitch-title">MISSION ACTIVE</h2>
            <p class="status-text">AGENT ALREADY REGISTERED. AWAITING INSTRUCTIONS.</p>
            <p style="color: var(--slate-text); font-size: 12px; margin-top: 10px;">(IDENTITY CONFIRMED)</p>
        `;
        modal.style.display = 'flex'; // نظهر المودال
    }
}

// نشغل الدالة دي علطول
checkRegistrationStatus();

form.addEventListener('submit', async (e) => {
    // ... (نفس الكود القديم بتاعك لحد ما نوصل للنجاح)

        if (error) throw error;

        // SUCCESS_SEQUENCE
        // 2. هنا بنحفظ العلامة في المتصفح
        localStorage.setItem('mission_status', 'completed'); 
        
        modal.style.display = 'flex';
        form.reset();
        // ...
});

// ...