
const surahSelect = document.getElementById("surahSelect");
const quranText = document.getElementById("quranText");
const surahInfo = document.getElementById("surahInfo");

// تحميل أسماء سور القرآن الكريم
async function loadSurahs() {
    try {
        const response = await fetch(
            "https://api.alquran.cloud/v1/surah"
        );

        if (!response.ok) {
            throw new Error("فشل تحميل السور");
        }

        const data = await response.json();

        surahSelect.innerHTML =
            '<option value="">اختر سورة</option>';

        data.data.forEach(surah => {
            const option = document.createElement("option");

            option.value = surah.number;
            option.textContent =
                `${surah.number} - ${surah.name}`;

            surahSelect.appendChild(option);
        });

    } catch (error) {
        surahSelect.innerHTML =
            '<option value="">حدث خطأ في تحميل السور</option>';

        console.error(error);
    }
}

// تحميل آيات السورة
async function loadSurah(number) {
    quranText.textContent = "جاري تحميل الآيات...";

    try {
        const response = await fetch(
            `https://api.alquran.cloud/v1/surah/${number}/quran-uthmani`
        );

        if (!response.ok) {
            throw new Error("فشل تحميل السورة");
        }

        const result = await response.json();
        const surah = result.data;

        surahInfo.textContent =
            `${surah.name} - ${surah.numberOfAyahs} آية`;

        quranText.innerHTML = "";

        surah.ayahs.forEach(ayah => {
            const span = document.createElement("span");

            span.textContent =
                ayah.text + " ۞ ";

            quranText.appendChild(span);
        });

    } catch (error) {
        quranText.textContent =
            "تعذر تحميل السورة. تحقق من اتصال الإنترنت.";

        console.error(error);
    }
}

// عند اختيار سورة
surahSelect.addEventListener("change", function () {
    if (this.value) {
        loadSurah(this.value);
    }
});

// بدء تحميل السور
loadSurahs();
