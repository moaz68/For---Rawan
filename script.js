/* script.js */

// 1. Initialize AOS (Animate On Scroll)
AOS.init({
    once: true, // الأنيميشن يشتغل مرة واحدة فقط عند التمرير
    offset: 80,
    duration: 800,
});

// 2. الأحداث التي تعمل بمجرد تحميل الصفحة
window.addEventListener('load', () => {
    // إطلاق Confetti ترحيبي بعد ثانية ونصف
    setTimeout(() => {
        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#c29b62', '#ffb6c1', '#ffffff'],
            zIndex: 9999
        });
    }, 1500);
    
    // تشغيل القلوب المتطايرة
    createFloatingHearts();
});

// 3. دالة توليد القلوب المتطايرة في الخلفية
function createFloatingHearts() {
    const container = document.getElementById('hearts-container');
    const colors = ['#c29b62', '#ffb6c1', '#ffc0cb', '#ffffff'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤';
        
        // عشوائية في الحجم، اللون، المكان، والسرعة (تم التعديل لزيادة القلوب وحجمها)
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's'; // سرعة أكبر شوية
        heart.style.fontSize = (Math.random() * 2.5 + 1.5) + 'rem'; // أحجام أكبر وواضحة
        
        container.appendChild(heart);
        
        // حذف العنصر بعد انتهاء حركته لتخفيف الحمل على المتصفح
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 100); // قلب جديد كل 100 جزء من الثانية عشان تبقى الشاشة مليانة قلوب!
}

// 4. منطق اللعبة: الزر الذي يهرب "لأ 😜"
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');

function runAway() {
    // حساب أقصى مسافة يمكن للزر التحرك فيها داخل الشاشة
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    
    // توليد إحداثيات عشوائية
    const randomX = Math.max(20, Math.floor(Math.random() * maxX));
    const randomY = Math.max(20, Math.floor(Math.random() * maxY));
    
    // تغيير خصائص الزر ليتمكن من الهروب
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.zIndex = '9999';
    noBtn.style.transition = 'left 0.25s ease, top 0.25s ease';
}

// تشغيل الهروب عند مرور الماوس (للكمبيوتر) أو عند اللمس (للهواتف)
noBtn.addEventListener('mouseover', runAway);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // لمنع النقر
    runAway();
});

// 5. زر "بموت فيك! ❤️"
yesBtn.addEventListener('click', () => {
    // احتفال متواصل لمدة 3 ثواني
    const end = Date.now() + 3000;
    const colors = ['#c29b62', '#ffffff', '#ffb6c1'];

    (function frame() {
        // إطلاق الاحتفال من الجهتين
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
            zIndex: 9999
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
            zIndex: 9999
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        } else {
            // إظهار الرسالة الجميلة بعد انتهاء الاحتفال
            setTimeout(() => {
                Swal.fire({
                    title: 'وأنا كمان بحبك جداً! ❤️',
                    confirmButtonText: '✨',
                    confirmButtonColor: '#c29b62',
                    background: '#faf9f6',
                    color: '#4a4a4a',
                    backdrop: `rgba(194, 155, 98, 0.4)`
                });
            }, 500);
        }
    }());
});

// 6. زر بداية الرحلة (لإظهار باقي الصفحة)
const startBtn = document.getElementById('start-btn');
if(startBtn) {
    startBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const timeline = document.getElementById('timeline');
        const gameSection = document.getElementById('game-section');
        
        // إظهار الأقسام المخفية
        timeline.style.display = 'block';
        gameSection.style.display = 'flex';
        
        // تحديث الأنيميشن عشان يشتغل صح بعد الظهور والنزول للقسم
        setTimeout(() => {
            AOS.refresh();
            timeline.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    });
}
