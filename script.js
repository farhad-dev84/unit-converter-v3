// گرفتن تمام المان‌های مهم از HTML
const category = document.getElementById("category");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const inputValue = document.getElementById("inputValue");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");
const resetBtn = document.getElementById("resetBtn");
const themeSwitch = document.getElementById("themeSwitch");

// جدول کامل تبدیل واحدها برای چهار دسته‌بندی
const units = {
  length: {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    millimeter: 1000,
    mile: 0.000621371,
    yard: 1.09361,
    foot: 3.28084,
    inch: 39.3701,
  },
  weight: {
    kilogram: 1,
    gram: 1000,
    milligram: 1000000,
    pound: 2.20462,
    ounce: 35.274,
  },
  temperature: {
    Celsius: "C",
    Fahrenheit: "F",
    Kelvin: "K",
  },
  time: {
    second: 1,
    minute: 1 / 60,
    hour: 1 / 3600,
    day: 1 / 86400,
  },
};

// تابع برای پر کردن لیست واحدها
function populateUnits(selectedCategory) {
  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";

  const currentUnits = units[selectedCategory];

  for (let unit in currentUnits) {
    const option1 = document.createElement("option");
    option1.value = unit;
    option1.textContent = unit;
    fromUnit.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = unit;
    option2.textContent = unit;
    toUnit.appendChild(option2);
  }
}

// تابع اصلی تبدیل واحدها
function convertUnits() {
  const cat = category.value;
  const from = fromUnit.value;
  const to = toUnit.value;
  const value = parseFloat(inputValue.value);

  if (isNaN(value)) {
    result.textContent = "";
    result.classList.add("d-none");
    return;
  }

  let convertedValue;

  // حالت خاص برای دما
  if (cat === "temperature") {
    if (from === to) {
      convertedValue = value;
    } else if (from === "Celsius") {
      convertedValue = to === "Fahrenheit" ? (value * 9) / 5 + 32 : value + 273.15;
    } else if (from === "Fahrenheit") {
      convertedValue =
        to === "Celsius"
          ? ((value - 32) * 5) / 9
          : ((value - 32) * 5) / 9 + 273.15;
    } else if (from === "Kelvin") {
      convertedValue =
        to === "Celsius"
          ? value - 273.15
          : ((value - 273.15) * 9) / 5 + 32;
    }
  } else {
    // سایر دسته‌بندی‌ها
    const baseValue = value / units[cat][from]; // به واحد پایه
    convertedValue = baseValue * units[cat][to]; // به واحد مقصد
  }

  result.textContent = `${value} ${from} = ${convertedValue.toFixed(2)} ${to}`;
  result.classList.remove("d-none");
  result.classList.add("show");
}

// دکمه تبدیل
convertBtn.addEventListener("click", convertUnits);

// دکمه ریست
resetBtn.addEventListener("click", () => {
  inputValue.value = "";
  result.textContent = "";
  result.classList.add("d-none");
});

// تغییر دسته‌بندی
category.addEventListener("change", () => {
  populateUnits(category.value);
  convertUnits();
});

// تم دارک/لایت
themeSwitch.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// مقدار اولیه دسته‌بندی (طول)
populateUnits("length");

