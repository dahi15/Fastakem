
const morningAzkar = [
    {
        text: "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد، وهو على كل شيء قدير. رب أسألك خير ما في هذا اليوم وخير ما بعده، وأعوذ بك من شر ما في هذا اليوم وشر ما بعده.",
        repeat: 1,
        source: "صحيح مسلم"
    },
    {
        text: "اللهم بك أصبحنا، وبك أمسينا، وبك نحيا، وبك نموت، وإليك النشور.",
        repeat: 1,
        source: "سنن أبي داود والترمذي"
    },
    {
        text: "رضيت بالله ربًا، وبالإسلام دينًا، وبمحمد ﷺ نبيًا.",
        repeat: 3,
        source: "سنن أبي داود والترمذي"
    },
    {
        text: "بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم.",
        repeat: 3,
        source: "سنن أبي داود والترمذي"
    }
];

const eveningAzkar = [
    {
        text: "أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد، وهو على كل شيء قدير. رب أسألك خير ما في هذه الليلة وخير ما بعدها، وأعوذ بك من شر ما في هذه الليلة وشر ما بعدها.",
        repeat: 1,
        source: "صحيح مسلم"
    },
    {
        text: "اللهم بك أمسينا، وبك أصبحنا، وبك نحيا، وبك نموت، وإليك المصير.",
        repeat: 1,
        source: "سنن أبي داود والترمذي"
    },
    {
        text: "رضيت بالله ربًا، وبالإسلام دينًا، وبمحمد ﷺ نبيًا.",
        repeat: 3,
        source: "سنن أبي داود والترمذي"
    },
    {
        text: "بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم.",
        repeat: 3,
        source: "سنن أبي داود والترمذي"
    }
];

// تحديد الصفحة الحالية
const pageType = location.pathname.endsWith("evening.html")
    ? "evening"
    : "morning";

const azkar = pageType === "morning"
    ? morningAzkar
    : eveningAzkar;

// حفظ الإنجاز حسب اليوم والصفحة
const today = new Date().toLocaleDateString("en-CA");

const storageKey = "fastakem-" + pageType + "-" + today;

let completed = JSON.parse(
    localStorage.getItem(storageKey) || "[]"
);

const list = document.getElementById("adhkar-list");

// عرض الأذكار
function renderAzkar() {
    list.innerHTML = "";

    azkar.forEach((dhikr, index) => {
        const card = document.createElement("div");

        card.className = "dhikr-card";

        if (completed.includes(index)) {
            card.classList.add("completed");
        }

        const text = document.createElement("p");
        text.textContent = dhikr.text;

        const source = document.createElement("small");
        source.textContent = "المصدر: " + dhikr.source;

        const repeat = document.createElement("small");
        repeat.textContent = "عدد مرات التكرار: " + dhikr.repeat;

        const actions = document.createElement("div");
        actions.className = "actions";

        const doneButton = document.createElement("button");

        doneButton.textContent = completed.includes(index)
            ? "✓ تمت القراءة"
            : "تحديد كمكتمل";

        doneButton.onclick = () => completeDhikr(index);

        const copyButton = document.createElement("button");
        copyButton.textContent = "نسخ الذكر";

        copyButton.onclick = () => copyDhikr(dhikr.text);

        actions.append(doneButton, copyButton);

        card.append(text, source, repeat, actions);

        list.appendChild(card);
    });

    updateProgress();
}

// تحديث نسبة الإنجاز
function updateProgress() {
    const percent = Math.round(
        (completed.length / azkar.length) * 100
    );

    document.getElementById("progress-bar").style.width =
        percent + "%";

    document.getElementById("progress-text").textContent =
        percent + "% مكتمل";
}

// تحديد الذكر كمكتمل
function completeDhikr(index) {
    if (completed.includes(index)) {
        completed = completed.filter(item => item !== index);
    } else {
        completed.push(index);
    }

    localStorage.setItem(
        storageKey,
        JSON.stringify(completed)
    );

    renderAzkar();
}

// نسخ الذكر
function copyDhikr(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text)
            .then(() => alert("تم نسخ الذكر بنجاح"))
            .catch(() => alert("تعذر النسخ، حاول مرة أخرى"));
    } else {
        const field = document.createElement("textarea");
        field.value = text;
        document.body.appendChild(field);
        field.select();

        const copied = document.execCommand("copy");
        field.remove();

        alert(copied ? "تم نسخ الذكر بنجاح" : "تعذر النسخ");
    }
}

// إعادة الأذكار
function resetAdhkar() {
    if (!confirm("هل تريد إعادة الأذكار من البداية؟")) {
        return;
    }

    completed = [];

    localStorage.removeItem(storageKey);

    renderAzkar();
}

// تشغيل الصفحة
renderAzkar();
