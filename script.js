
let count = 0;

// قراءة العدد المحفوظ
function loadCounter() {
    count = Number(localStorage.getItem("salawatCount")) || 0;

    document.getElementById("counter").textContent = count;
}

// زيادة العداد
function increaseCounter() {
    count++;

    document.getElementById("counter").textContent = count;

    localStorage.setItem("salawatCount", count);
}

// تصفير العداد
function resetCounter() {
    count = 0;

    document.getElementById("counter").textContent = count;

    localStorage.setItem("salawatCount", count);
}

// تشغيل العداد بعد تحميل الصفحة
document.addEventListener("DOMContentLoaded", loadCounter);
