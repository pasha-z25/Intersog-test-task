# Тестове завдання з JavaScript та автоматизованого тестування

Опис Завдань

## Part 1: DOM & Array Manipulation

**Мета:** Показати навички роботи з DOM, масивами та обробкою даних у JS.
**Завдання:**
Написати функцію getSortedStudentNames(), яка:

Збирає `<li data-role="student">` з HTML-списку.
Перетворює в масив об'єктів `{ name: string, age: number | null }` (null для невалідного/відсутнього data-age).
Сортує за віком (ascending), null-вік — в кінець.
Повертає масив імен.

**Додатково:** getYoungestStudent() — повертає ім'я наймолодшого студента з валідним віком.

**Приклад:**

Імена: ['Alice', 'Dana', 'Charlie', 'Eve'] (Alice: 25, Dana: 28, Charlie/Eve: null).

Наймолодший: Alice.

## Part 2: Playwright Automation Exercise – LinkedIn Login Page

**Мета:** Автоматизоване тестування UI з Playwright, POM та обходом CAPTCHA.

**Завдання:**
Тестовий свит для форми логіну:

**Взаємодія:** поля email/password, submit, "Forgot password?".

**Валідація:** заповнення, помилки (клієнт-сайд + мок серверу), навігація.

Обхід CAPTCHA: Мокінг /uas/login-submit для симуляції помилок.

### Структура:

**POM:** `pages/LoginPage.js` — методи дій/асершени (e.g., fillEmail, assertErrorVisible).

**Тести:** `tests/login.spec.js` — 6 тестів (базові + edge-кейси: порожня форма, невалідний email).

**Конфіг:** ``playwright.config.js — стелс-режим (user-agent, viewport).

### Як Запустити

#### Part 1 (у браузері)

Відкрийте index.html в папці part_1 та перегляньте результат у консолі браузера:

```
{
  sortedNames: ['Alice', 'Dana', 'Charlie', 'Eve'],
  youngestStudentName: "Alice"
}
```

#### Part 2 (Playwright)

У директорії part_2:

`npm init -y && npm install -D @playwright/test && npx playwright install`.

Команди:

`npx playwright test` — запуск (паралельно, HTML-звіт).

Звіт: http://localhost:9323.
