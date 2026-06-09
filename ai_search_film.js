// Lampa.Plugin 

(function () {
  'use strict';
  function _0xe13f28() {
    if (!Lampa || !Lampa.Storage) {
      return '';
    }
    try {
      var _0x5a9f21 = Lampa.Storage.get("ai_search_api_key");
      if (_0x5a9f21 && typeof _0x5a9f21 === "string" && _0x5a9f21.trim()) {
        return _0x5a9f21.trim();
      }
    } catch (_0x3c56ab) {
      _0x29248a.warn("Ошибка при получении API ключа:", _0x3c56ab);
    }
    return '';
  }
  function _0x278e62() {
    if (!Lampa || !Lampa.Storage) {
      return '';
    }
    try {
      var _0x106dc5 = Lampa.Storage.get("ai_search_model");
      if (_0x106dc5 && typeof _0x106dc5 === "string" && _0x106dc5.trim()) {
        return _0x106dc5.trim();
      }
    } catch (_0x37b443) {
      _0x29248a.warn("Ошибка при получении модели:", _0x37b443);
    }
    return '';
  }
  function _0x28b1c8() {
    if (!Lampa || !Lampa.Storage) {
      return "https://openrouter.ai/api/v1";
    }
    try {
      var _0x1c0ca1 = Lampa.Storage.get("ai_search_base_url");
      if (_0x1c0ca1 && typeof _0x1c0ca1 === "string" && _0x1c0ca1.trim()) {
        return _0x1c0ca1.trim();
      }
    } catch (_0x591486) {
      _0x29248a.warn("Ошибка при получении Base URL:", _0x591486);
    }
    return "https://openrouter.ai/api/v1";
  }
  function _0x2fcac6() {
    if (!Lampa || !Lampa.Storage) {
      return 'ru';
    }
    try {
      var _0x3ea2a4 = Lampa.Storage.get('language');
      if (_0x3ea2a4 && typeof _0x3ea2a4 === "string" && _0x3ea2a4.trim()) {
        return _0x3ea2a4.trim();
      }
    } catch (_0x25f6b1) {
      _0x29248a.warn("Ошибка при получении языка:", _0x25f6b1);
    }
    return 'ru';
  }
  var _0x29248a = {
    'log': function () {
      console.log.apply(console, ["[ИИ поиск]"].concat(Array.prototype.slice.call(arguments)));
    },
    'warn': function () {
      console.warn.apply(console, ["[ИИ поиск]"].concat(Array.prototype.slice.call(arguments)));
    },
    'error': function () {
      console.error.apply(console, ["[ИИ поиск]"].concat(Array.prototype.slice.call(arguments)));
    }
  };
  function _0x2bfdfd() {
    var _0x3efc0f = {
      ru: "Поиск фильмов",
      uk: "Пошук фільмів",
      en: "Movie Search"
    };
    var _0x410314 = {
      ru: "API и Модель",
      uk: "API та модель",
      en: "API and Model"
    };
    var _0x1266c8 = {
      ru: "API ключ OpenRouter",
      uk: "API ключ OpenRouter",
      en: "OpenRouter API Key"
    };
    var _0x414817 = {
      ru: "Введите API ключ OpenRouter",
      uk: "Введіть API ключ OpenRouter",
      en: "Enter OpenRouter API key"
    };
    var _0x56ebcc = {
      ru: "Введите ваш API ключ от OpenRouter.ai. Получить ключ можно на https://openrouter.ai/keys",
      uk: "Введіть ваш API ключ від OpenRouter.ai. Отримати ключ можна на https://openrouter.ai/keys",
      en: "Enter your OpenRouter.ai API key. Get it at https://openrouter.ai/keys"
    };
    var _0x1e0b05 = {
      ru: "API ключ сохранен",
      uk: "API ключ збережено",
      en: "API key saved"
    };
    var _0x28ab0d = {
      ru: "Модель ИИ",
      uk: "Модель штучного інтелекту",
      en: "AI Model"
    };
    var _0x571ade = {
      ru: "Введите название модели",
      uk: "Введіть назву моделі",
      en: "Enter model name"
    };
    var _0x27d68a = {
      ru: "Введите название модели ИИ (например: qwen/qwen-2.5-72b-instruct:free). Рекомендуемые бесплатные модели: qwen/qwen-2.5-72b-instruct:free, qwen/qwen-2.5-32b-instruct:free, deepseek/deepseek-chat-v3.1:free",
      uk: "Введіть назву моделі штучного інтелекту (наприклад: qwen/qwen-2.5-72b-instruct:free). Рекомендовані вільні моделі: qwen/qwen-2.5-72b-instruct:free, qwen/qwen-2.5-32b-instruct:free, deepseek/deepseek-chat-v3.1:free",
      en: "Enter AI model name (e.g., qwen/qwen-2.5-72b-instruct:free). Recommended free models: qwen/qwen-2.5-72b-instruct:free, qwen/qwen-2.5-32b-instruct:free, deepseek/deepseek-chat-v3.1:free"
    };
    var _0x6e252c = {
      ru: "Модель изменена на: ",
      uk: "Модель змінена на: ",
      en: "Model changed to: "
    };
    var _0x2a9d44 = {
      ru: "Модель очищена",
      uk: "Модель очищена",
      en: "Model cleared"
    };
    var _0xb4f815 = {
      ru: "OpenAI Base URL",
      uk: "OpenAI Base URL",
      en: "OpenAI Base URL"
    };
    var _0x18a0b8 = {
      ru: "Введите Base URL API",
      uk: "Введіть Base URL API",
      en: "Enter API Base URL"
    };
    var _0x5ec95d = {
      ru: "Введите Base URL для API (по умолчанию: https://openrouter.ai/api/v1). Можно использовать OpenAI API или другие совместимые сервисы.",
      uk: "Введіть Base URL для API (за замовчуванням: https://openrouter.ai/api/v1). Можна використовувати OpenAI API або інші сумісні сервіси.",
      en: "Enter API Base URL (default: https://openrouter.ai/api/v1). Can use OpenAI API or other compatible services."
    };
    var _0x223195 = {
      ru: "Base URL изменен на: ",
      uk: "Base URL змінено на: ",
      en: "Base URL changed to: "
    };
    var _0x1bd1b1 = {
      ru: "Base URL сброшен на значение по умолчанию",
      uk: "Base URL скинуто на значення за замовчуванням",
      en: "Base URL reset to default"
    };
    var _0x1162da = {
      ru: "Настройки поиска",
      uk: "Параметри пошуку",
      en: "Search Settings"
    };
    var _0xabc17f = {
      ru: "Количество результатов поиска",
      uk: "Кількість результатів пошуку",
      en: "Number of search results"
    };
    var _0x450a06 = {
      ru: "Выберите, сколько фильмов и сериалов показывать в результатах поиска (от 5 до 30)",
      uk: "Виберіть, скільки фільмів та серіалів показувати в результатах пошуку (від 5 до 30)",
      en: "Select how many movies and TV shows to display in search results (5-30)"
    };
    var _0x2ce4b9 = {
      ru: "Количество результатов поиска изменено на ",
      uk: "Кількість результатів пошуку змінена на ",
      en: "Number of search results changed to "
    };
    var _0x582f3e = {
      ru: "Количество записей в истории поиска",
      uk: "Кількість записів в історії пошуку",
      en: "Search history entries"
    };
    var _0x1fb024 = {
      ru: "Выберите, сколько последних запросов сохранять в истории поиска (от 5 до 20)",
      uk: "Виберіть, скільки останніх запитів зберігати в історії пошуку (від 5 до 20)",
      en: "Select how many recent queries to keep in search history (5-20)"
    };
    var _0x30bbd9 = {
      ru: "Количество записей в истории изменено на ",
      uk: "Кількість записів в історії змінена на ",
      en: "Number of history entries changed to "
    };
    var _0x60cfea = {
      ru: 'Кэш',
      uk: "Кеш",
      en: 'Cache'
    };
    var _0x16c369 = {
      ru: "Автоочистка кэша",
      uk: "Автоочищення кешу",
      en: "Auto-clear cache"
    };
    var _0x2ca65a = {
      ru: "Автоматически очищать устаревшие записи кэша через заданный интервал",
      uk: "Автоматично очищувати застарілі записи кешу через установлений інтервал",
      en: "Automatically clear expired cache entries at specified intervals"
    };
    var _0x26755a = {
      ru: "Автоочистка кэша включена",
      uk: "Автоочищення кешу ввімкнено",
      en: "Auto-clear cache enabled"
    };
    var _0x3b80dc = {
      ru: "Автоочистка кэша выключена",
      uk: "Автоочищення кешу вимкнено",
      en: "Auto-clear cache disabled"
    };
    var _0x35b347 = {
      ru: "Интервал автоочистки кэша",
      uk: "Інтервал автоочищення кешу",
      en: "Cache auto-clear interval"
    };
    var _0x105895 = {
      ru: "Выберите, как часто автоматически очищать устаревшие записи кэша (от 1 часа до 7 дней)",
      uk: "Виберіть, як часто автоматично очищувати застарілі записи кешу (від 1 години до 7 днів)",
      en: "Select how often to automatically clear expired cache entries (1 hour to 7 days)"
    };
    var _0x59b6a2 = {
      ru: "Очистка кэша",
      uk: "Очищення кешу",
      en: "Clear cache"
    };
    var _0x261b90 = {
      ru: "Очистить все закэшированные данные поиска (ответы ИИ и результаты TMDB)",
      uk: "Очистити всі закеші дані пошуку (відповіді ШІ та результати TMDB)",
      en: "Clear all cached search data (AI responses and TMDB results)"
    };
    var _0x88b2d4 = {
      ru: "Кэш успешно очищен",
      uk: "Кеш успішно очищено",
      en: "Cache cleared successfully"
    };
    var _0x2bdee3 = {
      ru: "История поиска",
      uk: "Історія пошуку",
      en: "Search History"
    };
    var _0x4fe50d = {
      ru: "Очистка истории поиска",
      uk: "Очищення історії пошуку",
      en: "Clear search history"
    };
    var _0x13f06a = {
      ru: "Удалить все сохраненные поисковые запросы",
      uk: "Видалити всі збережені пошукові запити",
      en: "Delete all saved search queries"
    };
    var _0x3293f4 = {
      ru: "История поиска очищена",
      uk: "Історія пошуку очищена",
      en: "Search history cleared"
    };
    var _0x4c3768 = {
      ru: "Поиск фильмов",
      uk: "Пошук фільмів",
      en: "Movie Search"
    };
    var _0x29f0e4 = {
      ru: "Опишите, что вы хотите посмотреть:",
      uk: "Опишіть, що ви хочете подивитися:",
      en: "Describe what you want to watch:"
    };
    var _0x518c38 = {
      ru: "Например: кино про любовь, фантастика про космос, комедии 90-х...",
      uk: "Наприклад: кіно про любов, фантастика про космос, комедії 90-х...",
      en: "E.g.: romance movies, sci-fi about space, 90s comedies..."
    };
    var _0x31067d = {
      ru: "ИИ анализирует ваш запрос...",
      uk: "ШІ аналізує ваш запит...",
      en: "AI is analyzing your request..."
    };
    var _0x4a2ed8 = {
      ru: "История поиска",
      uk: "Історія пошуку",
      en: "Search History"
    };
    var _0x55abd3 = {
      ru: "История поиска пуста",
      uk: "Історія пошуку порожня",
      en: "Search history is empty"
    };
    var _0x413aeb = {
      ru: "Отмена",
      uk: "Скасувати",
      en: "Cancel"
    };
    var _0x4e21c0 = {
      ru: 'Найти',
      uk: "Знайти",
      en: "Search"
    };
    var _0xf644a4 = {
      ru: "Плагин не настроен",
      uk: "Плагін не налаштований",
      en: "Plugin not configured"
    };
    var _0x42584e = {
      ru: "Для использования ИИ поиска необходимо указать:",
      uk: "Для використання пошуку ШІ необхідно вказати:",
      en: "To use AI search, you need to configure:"
    };
    var _0x4074eb = {
      ru: "API ключ OpenRouter",
      uk: "API ключ OpenRouter",
      en: "OpenRouter API key"
    };
    var _0x979091 = {
      ru: "модель ИИ",
      uk: "модель ШІ",
      en: "AI model"
    };
    var _0x717965 = {
      ru: "Как настроить:",
      uk: "Як налаштувати:",
      en: "How to configure:"
    };
    var _0x31dbf6 = {
      ru: "Откройте настройки Lampa",
      uk: "Відкрийте налаштування Lampa",
      en: "Open Lampa settings"
    };
    var _0x721366 = {
      ru: "Перейдите в раздел \"ИИ поиск\"",
      uk: "Перейдіть у розділ \"Пошук ШІ\"",
      en: "Go to \"AI Search\" section"
    };
    var _0x1d108e = {
      ru: "Укажите API ключ OpenRouter",
      uk: "Вкажіть API ключ OpenRouter",
      en: "Enter OpenRouter API key"
    };
    var _0x61f0ec = {
      ru: "Выберите модель ИИ",
      uk: "Виберіть модель ШІ",
      en: "Select AI model"
    };
    var _0x279498 = {
      ru: "После настройки плагин будет готов к использованию",
      uk: "Після налаштування плагін буде готовий до використання",
      en: "After configuration, the plugin will be ready to use"
    };
    var _0x213cf7 = {
      ru: "API ключ не настроен. Пожалуйста, укажите API ключ в настройках плагина.",
      uk: "API ключ не налаштований. Будь ласка, вкажіть API ключ у налаштуваннях плагіна.",
      en: "API key not configured. Please set the API key in plugin settings."
    };
    var _0x38d84e = {
      ru: "Модель ИИ не настроена. Пожалуйста, укажите модель в настройках плагина.",
      uk: "Модель ШІ не налаштована. Будь ласка, вкажіть модель у налаштуваннях плагіна.",
      en: "AI model not configured. Please set the model in plugin settings."
    };
    var _0x42aa59 = {
      ru: "Превышено время ожидания ответа от API. Попробуйте позже или используйте более быструю модель.",
      uk: "Перевищено час очікування відповіді від API. Спробуйте пізніше або використовуйте швидшу модель.",
      en: "API response timeout. Try again later or use a faster model."
    };
    var _0x20c3ea = {
      ru: "Превышен лимит запросов (429). Попробуйте позже. Если ошибка повторяется, возможно, вы используете бесплатную модель с ограничениями.",
      uk: "Перевищено ліміт запитів (429). Спробуйте пізніше. Якщо помилка повторюється, можливо, ви використовуєте вільну модель з обмеженнями.",
      en: "Rate limit exceeded (429). Try again later. If the error persists, you may be using a free model with limitations."
    };
    var _0x473f67 = {
      ru: "Не удалось извлечь JSON из ответа",
      uk: "Не вдалося вилучити JSON з відповіді",
      en: "Failed to extract JSON from response"
    };
    var _0x57ec97 = {
      ru: "Не найдено валидных рекомендаций в ответе ИИ",
      uk: "Не знайдено дійсних рекомендацій у відповіді ШІ",
      en: "No valid recommendations found in AI response"
    };
    var _0x1dd22f = {
      ru: "История поиска",
      uk: "Історія пошуку",
      en: "Search History"
    };
    var _0x54eff8 = {
      ru: "Очистка истории поиска",
      uk: "Очищення історії пошуку",
      en: "Clear search history"
    };
    var _0x5385fd = {
      ru: "Очистить всю историю поисковых запросов",
      uk: "Очистити всю історію пошукових запитів",
      en: "Clear entire search history"
    };
    var _0x1c65b8 = {
      ru: 'Информация',
      uk: "Інформація",
      en: "Information"
    };
    var _0x342598 = {
      ru: "О плагине",
      uk: "Про плагін",
      en: "About plugin"
    };
    var _0x28687c = {
      ru: "Плагин для интеллектуального поиска фильмов и сериалов с использованием искусственного интеллекта через OpenRouter API.",
      uk: "Плагін для інтелектуального пошуку фільмів та серіалів з використанням штучного інтелекту через OpenRouter API.",
      en: "Plugin for intelligent search of movies and TV shows using artificial intelligence via OpenRouter API."
    };
    var _0x113a83 = {
      ru: "Контактная информация",
      uk: "Контактна інформація",
      en: "Contact information"
    };
    var _0xd93466 = {
      ru: "Url: https://github.com/neoandersen/lampa-plugins<br>Telegram: @neoandersen",
      uk: "Url: https://github.com/neoandersen/lampa-plugins<br>Telegram: @neoandersen",
      en: "Url: https://github.com/neoandersen/lampa-plugins<br>Telegram: @neoandersen"
    };
    var _0x43cb24 = {
      ru: "Поиск фильмов",
      uk: "Пошук фільмів",
      en: "Movie Search"
    };
    var _0x3073c3 = {
      ru: "1 час",
      uk: "1 година",
      en: "1 hour"
    };
    var _0xb5838c = {
      ru: " часа",
      uk: " години",
      en: " hours"
    };
    var _0x49be0f = {
      ru: " часов",
      uk: " годин",
      en: " hours"
    };
    var _0x12e1f5 = {
      ru: " дня",
      uk: " днів",
      en: " days"
    };
    var _0x1eb495 = {
      ru: " дней",
      uk: " днів",
      en: " days"
    };
    var _0x5d6279 = {
      ru: "2 дня",
      uk: "2 дні",
      en: "2 days"
    };
    var _0x266c42 = {
      ru: "3 дня",
      uk: "3 дні",
      en: "3 days"
    };
    var _0x19b299 = {
      ru: "5 дней",
      uk: "5 днів",
      en: "5 days"
    };
    var _0x4758f2 = {
      ru: "7 дней",
      uk: "7 днів",
      en: "7 days"
    };
    var _0x443eaf = {
      ru: "Интервал автоочистки кэша изменен на ",
      uk: "Інтервал автоочищення кешу змінено на ",
      en: "Cache auto-clear interval changed to "
    };
    var _0x3183c0 = {
      ru: "Не удалось получить ответ от ИИ после нескольких попыток. Попробуйте:\n1. Проверить подключение к интернету\n2. Изменить формулировку запроса\n3. Попробовать позже",
      uk: "Не вдалося отримати відповідь від ШІ після кількох спроб. Спробуйте:\n1. Перевірити підключення до Інтернету\n2. Змінити формулювання запиту\n3. Спробувати пізніше",
      en: "Failed to get AI response after several attempts. Try:\n1. Check internet connection\n2. Change request wording\n3. Try again later"
    };
    var _0x4bcd7e = {
      ru: "Кеш успешно очищен",
      uk: "Кеш успішно очищено",
      en: "Cache cleared successfully"
    };
    var _0x36f458 = {
      ru: "Кеш очищен (некоторые данные могут остаться)",
      uk: "Кеш очищено (деякі дані можуть залишитися)",
      en: "Cache cleared (some data may remain)"
    };
    var _0x129697 = {
      ru: "Возможные решения:\n1. Подождите 1-2 минуты и попробуйте снова\n2. Используйте более медленную модель (некоторые бесплатные модели имеют строгие лимиты)\n3. Проверьте, не превышен ли лимит на вашем аккаунте OpenRouter",
      uk: "Можливі рішення:\n1. Зачекайте 1-2 хвилини і спробуйте знову\n2. Використовуйте повільнішу модель (деякі безплатні моделі мають строгі обмеження)\n3. Перевірте, чи не перевищено ліміт на вашому обліку OpenRouter",
      en: "Possible solutions:\n1. Wait 1-2 minutes and try again\n2. Use a slower model (some free models have strict limits)\n3. Check if your OpenRouter account limit is exceeded"
    };
    var _0x27f65e = {
      ru: "Новый поиск",
      uk: "Новий пошук",
      en: "New Search"
    };
    var _0x543845 = {
      ru: "Найдено фильмов: ",
      uk: "Знайдено фільмів: ",
      en: "Movies found: "
    };
    var _0x3a959c = {
      ru: "Найдено ",
      uk: "Знайдено ",
      en: "Found "
    };
    var _0x592182 = {
      ru: " из ",
      uk: " з ",
      en: " of "
    };
    var _0x4c7bf8 = {
      ru: "Фильмы не найдены. Попробуйте другой запрос.",
      uk: "Фільми не знайдені. Спробуйте інший запит.",
      en: "No movies found. Try a different query."
    };
    var _0x4d44f7 = {
      ru: "Фильм",
      uk: 'Фільм',
      en: "Movie"
    };
    var _0x221d29 = {
      ru: 'Сериал',
      uk: "Серіал",
      en: "TV Show"
    };
    var _0xbc089a = {
      ru: "Пожалуйста, введите описание фильма",
      uk: "Будь ласка, введіть опис фільму",
      en: "Please enter a movie description"
    };
    var _0x356d6e = {
      ru: "Ошибка: невозможно открыть фильм",
      uk: "Помилка: неможливо відкрити фільм",
      en: "Error: cannot open movie"
    };
    var _0x615ab5 = {
      ru: "Ошибка при открытии фильма",
      uk: "Помилка при відкритті фільму",
      en: "Error opening movie"
    };
    var _0x4affdf = {
      ru: "Ошибка при очистке кеша",
      uk: "Помилка при очищенні кешу",
      en: "Error clearing cache"
    };
    var _0x3e6317 = {
      ru: "ИИ анализирует ваш запрос...",
      uk: "ШІ аналізує ваш запит...",
      en: "AI is analyzing your request..."
    };
    var _0x3af27c = {
      ru: "Начинаю поиск...",
      uk: "Починаю пошук...",
      en: "Starting search..."
    };
    var _0x3ce14e = {
      ru: "Ищу: ",
      uk: "Шукаю: ",
      en: "Searching for: "
    };
    var _0x11fd01 = {
      ru: "Получено ",
      uk: "Отримано ",
      en: "Received "
    };
    var _0x5e555e = {
      ru: " рекомендаций от ИИ",
      uk: " рекомендацій від ШІ",
      en: " recommendations from AI"
    };
    var _0x38f8f7 = {
      ru: "Описание недоступно",
      uk: "Опис недоступний",
      en: "Description unavailable"
    };
    var _0xcea7f0 = {
      ru: "Ошибка: ",
      uk: "Помилка: ",
      en: "Error: "
    };
    var _0x496f44 = {
      ru: "Ошибка сервера: ",
      uk: "Помилка сервера: ",
      en: "Server error: "
    };
    var _0x4867ea = {
      ru: "Превышен лимит запросов к API.",
      uk: "Перевищено ліміт запитів до API.",
      en: "API rate limit exceeded."
    };
    var _0xbbce = {
      ru: "ИИ не смог найти подходящие фильмы. Попробуйте другой запрос.",
      uk: "ШІ не зміг знайти підходящі фільми. Спробуйте інший запит.",
      en: "AI couldn't find suitable movies. Try a different query."
    };
    var _0x3e3ec5 = {
      ru: 'Найти',
      uk: 'Знайти',
      en: "Search"
    };
    var _0x33bcd4 = {
      ai_search_title: _0x3efc0f,
      ai_search_section_api: _0x410314,
      ai_search_api_key_label: _0x1266c8,
      ai_search_api_key_placeholder: _0x414817,
      ai_search_api_key_description: _0x56ebcc,
      ai_search_api_key_saved: _0x1e0b05,
      ai_search_model_label: _0x28ab0d,
      ai_search_model_placeholder: _0x571ade,
      ai_search_model_description: _0x27d68a,
      ai_search_model_changed: _0x6e252c,
      ai_search_model_cleared: _0x2a9d44,
      ai_search_base_url_label: _0xb4f815,
      ai_search_base_url_placeholder: _0x18a0b8,
      ai_search_base_url_description: _0x5ec95d,
      ai_search_base_url_changed: _0x223195,
      ai_search_base_url_reset: _0x1bd1b1,
      ai_search_section_search: _0x1162da,
      ai_search_max_results_label: _0xabc17f,
      ai_search_max_results_description: _0x450a06,
      ai_search_max_results_changed: _0x2ce4b9,
      ai_search_history_max_label: _0x582f3e,
      ai_search_history_max_description: _0x1fb024,
      ai_search_history_max_changed: _0x30bbd9,
      ai_search_section_cache: _0x60cfea,
      ai_search_auto_clear_label: _0x16c369,
      ai_search_auto_clear_description: _0x2ca65a,
      ai_search_auto_clear_enabled: _0x26755a,
      ai_search_auto_clear_disabled: _0x3b80dc,
      ai_search_auto_clear_interval_label: _0x35b347,
      ai_search_auto_clear_interval_description: _0x105895,
      ai_search_clear_cache_label: _0x59b6a2,
      ai_search_clear_cache_description: _0x261b90,
      ai_search_cache_cleared: _0x88b2d4,
      ai_search_section_history: _0x2bdee3,
      ai_search_clear_history_label: _0x4fe50d,
      ai_search_clear_history_description: _0x13f06a,
      ai_search_history_cleared: _0x3293f4,
      ai_search_modal_title: _0x4c3768,
      ai_search_modal_label: _0x29f0e4,
      ai_search_modal_placeholder: _0x518c38,
      ai_search_modal_loading: _0x31067d,
      ai_search_modal_history_title: _0x4a2ed8,
      ai_search_modal_history_empty: _0x55abd3,
      ai_search_modal_cancel: _0x413aeb,
      ai_search_modal_search: _0x4e21c0,
      ai_search_modal_not_configured: _0xf644a4,
      ai_search_modal_config_required: _0x42584e,
      ai_search_modal_config_api_key: _0x4074eb,
      ai_search_modal_config_model: _0x979091,
      ai_search_modal_setup_steps: _0x717965,
      ai_search_modal_setup_step1: _0x31dbf6,
      ai_search_modal_setup_step2: _0x721366,
      ai_search_modal_setup_step3: _0x1d108e,
      ai_search_modal_setup_step4: _0x61f0ec,
      ai_search_modal_setup_info: _0x279498,
      ai_search_error_api_not_configured: _0x213cf7,
      ai_search_error_model_not_configured: _0x38d84e,
      ai_search_error_timeout: _0x42aa59,
      ai_search_error_rate_limit: _0x20c3ea,
      ai_search_error_invalid_response: _0x473f67,
      ai_search_error_no_results: _0x57ec97,
      ai_search_section_history: _0x1dd22f,
      ai_search_clear_history_btn_label: _0x54eff8,
      ai_search_clear_history_btn_description: _0x5385fd,
      ai_search_section_info: _0x1c65b8,
      ai_search_info_about_label: _0x342598,
      ai_search_info_about_description: _0x28687c,
      ai_search_info_contact_label: _0x113a83,
      ai_search_info_contact_description: _0xd93466,
      ai_search_header_button_title: _0x43cb24,
      ai_search_interval_1_hour: _0x3073c3,
      ai_search_interval_hours: _0xb5838c,
      ai_search_interval_many_hours: _0x49be0f,
      ai_search_interval_days: _0x12e1f5,
      ai_search_interval_many_days: _0x1eb495,
      ai_search_interval_2_days: _0x5d6279,
      ai_search_interval_3_days: _0x266c42,
      ai_search_interval_5_days: _0x19b299,
      ai_search_interval_7_days: _0x4758f2,
      ai_search_interval_changed: _0x443eaf,
      ai_search_error_retry_instructions: _0x3183c0,
      ai_search_cache_cleared: _0x4bcd7e,
      ai_search_cache_partially_cleared: _0x36f458,
      ai_search_error_rate_limit_solutions: _0x129697,
      ai_search_new_search: _0x27f65e,
      ai_search_results_found: _0x543845,
      ai_search_progress_found: _0x3a959c,
      ai_search_progress_of: _0x592182,
      ai_search_no_results: _0x4c7bf8,
      ai_search_type_movie: _0x4d44f7,
      ai_search_type_tv: _0x221d29,
      ai_search_input_required: _0xbc089a,
      ai_search_error_open_movie: _0x356d6e,
      ai_search_error_opening_movie: _0x615ab5,
      ai_search_error_clearing_cache: _0x4affdf,
      ai_search_analyzing: _0x3e6317,
      ai_search_starting: _0x3af27c,
      ai_search_searching_for: _0x3ce14e,
      ai_search_received_recommendations: _0x11fd01,
      ai_search_recommendations_count: _0x5e555e,
      ai_search_no_description: _0x38f8f7,
      ai_search_error_prefix: _0xcea7f0,
      ai_search_error_server: _0x496f44,
      ai_search_rate_limit_error: _0x4867ea,
      ai_search_ai_no_results: _0xbbce,
      ai_search_button_find: _0x3e3ec5
    };
    Lampa.Lang.add(_0x33bcd4);
  }
  function _0xf99ee4(_0x5050d3, _0x5bbf3f, _0x1891d3) {
    if (!_0x5050d3 || typeof $ === 'undefined') {
      return;
    }
    var _0x5a513f = _0x1891d3 || "hover:enter";
    $(_0x5050d3).on(_0x5a513f, _0x5bbf3f);
  }
  function _0x1b918d(_0x2bb883, _0x298ffc, _0x40d4c1, _0x34faee) {
    if (!_0x2bb883) {
      return;
    }
    _0x2bb883.addEventListener(_0x40d4c1 || 'click', _0x298ffc);
    _0xf99ee4(_0x2bb883, _0x298ffc, _0x34faee);
  }
  function _0xefcf70() {
    if (!Lampa || !Lampa.Storage) {
      return 0xf;
    }
    var _0x3651fb = Lampa.Storage.get("ai_search_max_results");
    if (_0x3651fb != null) {
      return parseInt(_0x3651fb) || 0xf;
    }
    return 0xf;
  }
  function _0x5d3df4() {
    if (!Lampa || !Lampa.Storage) {
      return 0x14;
    }
    var _0x3ba8f6 = Lampa.Storage.get("ai_search_history_max");
    if (_0x3ba8f6 != null) {
      return parseInt(_0x3ba8f6) || 0x14;
    }
    return 0x14;
  }
  function _0x1b0367() {
    if (!Lampa || !Lampa.Storage) {
      return [];
    }
    try {
      var _0x248a69 = Lampa.Storage.get("ai_search_history");
      return Array.isArray(_0x248a69) ? _0x248a69 : [];
    } catch (_0x52e3f6) {
      _0x29248a.error("Ошибка при получении истории поиска:", _0x52e3f6);
      return [];
    }
  }
  function _0x5af6ea(_0xcdc31d) {
    if (!Lampa || !Lampa.Storage || !_0xcdc31d || !_0xcdc31d.trim()) {
      return;
    }
    try {
      var _0x437cee = _0x1b0367();
      var _0x1fab9c = _0xcdc31d.trim();
      _0x437cee = _0x437cee.filter(function (_0x3eaca2) {
        return _0x3eaca2 !== _0x1fab9c;
      });
      _0x437cee.unshift(_0x1fab9c);
      var _0x3a7d9a = _0x5d3df4();
      if (_0x437cee.length > _0x3a7d9a) {
        _0x437cee = _0x437cee.slice(0x0, _0x3a7d9a);
      }
      Lampa.Storage.set("ai_search_history", _0x437cee);
    } catch (_0x30ccfc) {
      _0x29248a.error("Ошибка при сохранении в историю:", _0x30ccfc);
    }
  }
  function _0x5cf0ec() {
    if (!Lampa || !Lampa.Storage) {
      return;
    }
    try {
      Lampa.Storage.set("ai_search_history", []);
      _0x29248a.log("История поиска очищена");
    } catch (_0x1d15cf) {
      _0x29248a.error("Ошибка при очистке истории:", _0x1d15cf);
    }
  }
  function _0x4f2afb() {
    if (!Lampa || !Lampa.Storage) {
      return true;
    }
    var _0x50bb8c = Lampa.Storage.get("ai_search_auto_clear_cache_enabled");
    if (_0x50bb8c != null) {
      return _0x50bb8c === true || _0x50bb8c === "true";
    }
    return true;
  }
  function _0x35a99c() {
    if (!Lampa || !Lampa.Storage) {
      return 86400000;
    }
    var _0x18e1c9 = Lampa.Storage.get("ai_search_auto_clear_cache_interval");
    if (_0x18e1c9 != null) {
      var _0x531f8e = parseInt(_0x18e1c9);
      if (!isNaN(_0x531f8e) && _0x531f8e > 0x0) {
        return _0x531f8e * 0x3c * 0x3c * 0x3e8;
      }
    }
    return 86400000;
  }
  function _0x1184af() {
    if (!Lampa || !Lampa.Storage) {
      return;
    }
    try {
      var _0x1c61be = Date.now();
      var _0x459e01 = false;
      var _0x1c19e2 = Lampa.Storage.get("ai_search_cache") || {};
      var _0x3142cd = Object.keys(_0x1c19e2).length;
      var _0x53da46 = {};
      for (var _0x131f38 in _0x1c19e2) {
        if (_0x1c19e2.hasOwnProperty(_0x131f38)) {
          var _0x8cb892 = _0x1c19e2[_0x131f38];
          if (_0x8cb892 && _0x8cb892.timestamp && _0x1c61be - _0x8cb892.timestamp < 86400000) {
            _0x53da46[_0x131f38] = _0x8cb892;
          }
        }
      }
      var _0xb4d782 = _0x3142cd - Object.keys(_0x53da46).length;
      if (_0xb4d782 > 0x0) {
        Lampa.Storage.set("ai_search_cache", _0x53da46);
        _0x459e01 = true;
      }
      var _0x6211a9 = Lampa.Storage.get("ai_search_tmdb_cache") || {};
      var _0x2f5b11 = Object.keys(_0x6211a9).length;
      var _0x3c4b85 = {};
      for (var _0x131f38 in _0x6211a9) {
        if (_0x6211a9.hasOwnProperty(_0x131f38)) {
          var _0x8cb892 = _0x6211a9[_0x131f38];
          if (_0x8cb892 && _0x8cb892.timestamp && _0x1c61be - _0x8cb892.timestamp < 86400000) {
            _0x3c4b85[_0x131f38] = _0x8cb892;
          }
        }
      }
      var _0x11462c = _0x2f5b11 - Object.keys(_0x3c4b85).length;
      if (_0x11462c > 0x0) {
        Lampa.Storage.set("ai_search_tmdb_cache", _0x3c4b85);
        _0x459e01 = true;
      }
      Lampa.Storage.set("ai_search_auto_clear_cache_last", _0x1c61be);
      if (_0x459e01) {
        var _0x153497 = _0xb4d782 + _0x11462c;
        _0x29248a.log("Автоочистка кэша: удалено " + _0x153497 + " устаревших записей (AI: " + _0xb4d782 + ", TMDB: " + _0x11462c + ')');
      }
    } catch (_0x40c3a1) {
      _0x29248a.error("Ошибка при автоочистке кэша:", _0x40c3a1);
    }
  }
  function _0x1db10c() {
    if (!Lampa || !Lampa.Storage) {
      return;
    }
    if (!_0x4f2afb()) {
      return;
    }
    try {
      var _0x219ee6 = Lampa.Storage.get("ai_search_auto_clear_cache_last");
      var _0x42b8fe = _0x35a99c();
      var _0x50e6f5 = Date.now();
      if (!_0x219ee6 || _0x50e6f5 - _0x219ee6 >= _0x42b8fe) {
        _0x29248a.log("Автоочистка кэша: запуск очистки устаревших записей...");
        _0x1184af();
      }
    } catch (_0x238845) {
      _0x29248a.error("Ошибка при проверке автоочистки кэша:", _0x238845);
    }
  }
  var _0x3e3358 = 0xf;
  function _0x2bf850(_0x5accdb, _0xff2fdb) {
    try {
      var _0x2b2001 = Lampa.Storage.get(_0x5accdb) || {};
      var _0x18c36a = _0x2b2001[_0xff2fdb];
      if (_0x18c36a && Date.now() - _0x18c36a.timestamp < 86400000) {
        return _0x18c36a.data;
      }
    } catch (_0x2d0a09) {
      _0x29248a.error("Cache read error:", _0x2d0a09);
    }
    return null;
  }
  function _0x281fa1(_0x560531, _0x143dae, _0x29e6e6) {
    try {
      var _0x2286a9 = Lampa.Storage.get(_0x560531) || {};
      _0x2286a9[_0x143dae] = {
        'data': _0x29e6e6,
        'timestamp': Date.now()
      };
      Lampa.Storage.set(_0x560531, _0x2286a9);
    } catch (_0x61e7bd) {
      _0x29248a.error("Cache write error:", _0x61e7bd);
    }
  }
  function _0x3c18e8(_0xac6d3d) {
    var _0x1b6d0e = 0x0;
    if (_0xac6d3d.length === 0x0) {
      return _0x1b6d0e.toString();
    }
    for (var _0x27a2ad = 0x0; _0x27a2ad < _0xac6d3d.length; _0x27a2ad++) {
      var _0x67f2e9 = _0xac6d3d.charCodeAt(_0x27a2ad);
      _0x1b6d0e = (_0x1b6d0e << 0x5) - _0x1b6d0e + _0x67f2e9;
      _0x1b6d0e = _0x1b6d0e & _0x1b6d0e;
    }
    return Math.abs(_0x1b6d0e).toString(0x24);
  }
  function _0x4bb816(_0xeebd58) {
    if (!_0xeebd58 || typeof _0xeebd58 !== "string") {
      return null;
    }
    _0xeebd58 = _0xeebd58.trim();
    var _0x70259c = _0xeebd58.indexOf('```');
    if (_0x70259c !== -0x1) {
      var _0x30979d = _0x70259c + 0x3;
      if (_0xeebd58.substring(_0x30979d, _0x30979d + 0x4).toLowerCase() === "json") {
        _0x30979d += 0x4;
      }
      while (_0x30979d < _0xeebd58.length && (_0xeebd58[_0x30979d] === " " || _0xeebd58[_0x30979d] === "\n" || _0xeebd58[_0x30979d] === "\r")) {
        _0x30979d++;
      }
      var _0xeaba4 = _0xeebd58.indexOf("```", _0x30979d);
      if (_0xeaba4 !== -0x1) {
        var _0xf6eca3 = _0xeebd58.substring(_0x30979d, _0xeaba4).trim();
        try {
          return JSON.parse(_0xf6eca3);
        } catch (_0x453788) {}
      }
    }
    var _0x4ecc67 = 0x0;
    var _0x41683e = -0x1;
    var _0x23c0c5 = -0x1;
    for (var _0x227826 = 0x0; _0x227826 < _0xeebd58.length; _0x227826++) {
      if (_0xeebd58[_0x227826] === '{') {
        if (_0x41683e === -0x1) {
          _0x41683e = _0x227826;
        }
        _0x4ecc67++;
      } else {
        if (_0xeebd58[_0x227826] === '}') {
          _0x4ecc67--;
          if (_0x4ecc67 === 0x0 && _0x41683e !== -0x1) {
            _0x23c0c5 = _0x227826;
            break;
          }
        }
      }
    }
    if (_0x41683e !== -0x1 && _0x23c0c5 !== -0x1) {
      try {
        var _0x4a0ba7 = _0xeebd58.substring(_0x41683e, _0x23c0c5 + 0x1);
        return JSON.parse(_0x4a0ba7);
      } catch (_0x186a30) {}
    }
    var _0x583d89 = _0xeebd58.match(/\{[\s\S]*\}/);
    if (_0x583d89) {
      var _0x4a0ba7 = _0x583d89[0x0];
      try {
        return JSON.parse(_0x4a0ba7);
      } catch (_0x46148d) {
        try {
          var _0x470955 = _0x4a0ba7.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '').replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, "$1\"$2\":").replace(/,\s*}/g, '}').replace(/,\s*]/g, ']').replace(/,(\s*[}\]])/g, '$1');
          try {
            return JSON.parse(_0x470955);
          } catch (_0x3a070b) {
            _0x470955 = _0x470955.replace(/'/g, "\"");
          }
          return JSON.parse(_0x470955);
        } catch (_0x138086) {
          try {
            var _0x296507 = _0x4a0ba7.split("\n");
            var _0x586f34 = [];
            for (var _0x227826 = 0x0; _0x227826 < _0x296507.length; _0x227826++) {
              var _0x341758 = _0x296507[_0x227826].trim();
              if (!_0x341758 || _0x341758.indexOf('//') === 0x0 || _0x341758.indexOf('/*') === 0x0 && _0x341758.indexOf('*/') === _0x341758.length - 0x2) {
                continue;
              }
              _0x586f34.push(_0x296507[_0x227826]);
            }
            var _0x4948f1 = _0x586f34.join("\n");
            _0x4948f1 = _0x4948f1.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']').replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, "$1\"$2\":");
            return JSON.parse(_0x4948f1);
          } catch (_0x2aa2ec) {
            _0x29248a.warn("Не удалось исправить JSON:", _0x2aa2ec.message);
          }
        }
      }
    }
    return null;
  }
  function _0x57a5ff(_0x2eeec1) {
    var _0x5c6e9a = [];
    if (!_0x2eeec1) {
      return _0x5c6e9a;
    }
    var _0x50df44 = _0x2eeec1.recommendations || _0x2eeec1.movies || _0x2eeec1.items || _0x2eeec1.results || [];
    if (!Array.isArray(_0x50df44)) {
      if (_0x50df44 && typeof _0x50df44 === 'object') {
        _0x50df44 = Object.values(_0x50df44).find(function (_0x63bdf) {
          return Array.isArray(_0x63bdf);
        }) || [];
      } else {
        _0x50df44 = [];
      }
    }
    var _0x346dc0 = _0xefcf70();
    for (var _0x118f23 = 0x0; _0x118f23 < _0x50df44.length && _0x5c6e9a.length < _0x346dc0; _0x118f23++) {
      var _0x36d1b6 = _0x50df44[_0x118f23];
      if (!_0x36d1b6 || typeof _0x36d1b6 !== 'object') {
        continue;
      }
      var _0x241b0b = {
        'title': _0x36d1b6.title || _0x36d1b6.name || _0x36d1b6.film || '',
        'year': parseInt(_0x36d1b6.year || _0x36d1b6.release_year || _0x36d1b6.date || '0') || null,
        'reason': _0x36d1b6.reason || _0x36d1b6.explanation || _0x36d1b6.description || _0x36d1b6.why || ''
      };
      if (_0x241b0b.title && _0x241b0b.title.trim()) {
        _0x5c6e9a.push(_0x241b0b);
      }
    }
    return _0x5c6e9a;
  }
  function _0x1452c6(_0x2728bb, _0x120aaa, _0x55e4ef, _0x12e4ee) {
    _0x55e4ef = _0x55e4ef || 0x0;
    _0x12e4ee = _0x12e4ee || false;
    var _0x319564 = _0xe13f28();
    if (!_0x319564 || !_0x319564.trim()) {
      _0x120aaa(new Error(Lampa.Lang.translate("ai_search_error_api_not_configured")));
      return;
    }
    var _0x38f4db = _0x278e62();
    if (!_0x38f4db || !_0x38f4db.trim()) {
      _0x120aaa(new Error(Lampa.Lang.translate("ai_search_error_model_not_configured")));
      return;
    }
    var _0x139b9c = "query_" + _0x3c18e8(_0x2728bb);
    var _0x2774e8 = _0x2bf850("ai_search_cache", _0x139b9c);
    if (_0x2774e8) {
      _0x120aaa(null, _0x2774e8);
      return;
    }
    var _0x212f43 = _0xefcf70();
    var _0x5b2b6d = "Запрос пользователя: \"" + _0x2728bb + "\"\n\n" + "Проанализируй запрос и предложи " + _0x212f43 + " фильмов/сериалов, которые ТОЧНО соответствуют запросу.\n\n" + "КРИТИЧЕСКИ ВАЖНО:\n" + "1. Строго соблюдай категории: если запрос про детские фильмы - предлагай ТОЛЬКО детские (0+, 6+, 12+), если про взрослые - только взрослые. НЕ смешивай категории!\n" + "2. Учитывай все параметры запроса: жанры, эпохи, стили, тематику\n" + "3. Приоритет известным и популярным фильмам с высоким рейтингом (IMDB 7.0+, TMDB 7.0+)\n" + "4. Обеспечь разнообразие: разные годы выпуска, разные поджанры, разные стили\n" + "5. Используй точные названия фильмов (оригинальные или официальные русские)\n\n" + "Формат ответа - ТОЛЬКО валидный JSON без дополнительного текста:\n" + "{\"recommendations\":[{\"title\":\"Точное название фильма\",\"year\":2023}]}\n\n" + "Требования к JSON: валидный формат, все строки в двойных кавычках, без лишних запятых, ровно " + _0x212f43 + " элементов в массиве recommendations.";
    var _0xbb0a5a = {
      role: "user",
      content: _0x5b2b6d
    };
    var _0x12f046 = {
      'model': _0x38f4db,
      'messages': [{
        'role': 'system',
        'content': "Ты эксперт по кино и сериалам. Твоя задача - подбирать фильмы и сериалы, которые ТОЧНО соответствуют запросу пользователя.\n\nПРАВИЛА ПОДБОРА:\n1. Строго соблюдай категории: детские (0+, 6+, 12+) и взрослые фильмы НЕ смешивать\n2. Учитывай все параметры запроса: возрастные ограничения, жанры, эпохи, стили, тематику\n3. Приоритет популярным и высокооцененным фильмам (рейтинг IMDB/TMDB 7.0+)\n4. Обеспечивай разнообразие: разные годы, поджанры, стили, режиссеры\n5. Используй точные официальные названия фильмов\n6. Если запрос неоднозначен, выбирай наиболее популярные и качественные варианты\n\nОтвечай ТОЛЬКО валидным JSON без дополнительного текста или объяснений."
      }, _0xbb0a5a],
      'temperature': 0.6,
      'max_tokens': 0x5dc
    };
    if (_0x55e4ef === 0x0 && !_0x12e4ee) {
      try {
        var _0x1e6f4d = {
          type: "json_object"
        };
        _0x12f046.response_format = _0x1e6f4d;
      } catch (_0x516450) {}
    }
    var _0x43e7da = new Promise(function (_0x2338de, _0xaddd30) {
      setTimeout(function () {
        _0xaddd30(new Error(Lampa.Lang.translate("ai_search_error_timeout")));
      }, 0xafc8);
    });
    var _0x3f5ffc = _0x28b1c8();
    var _0x1d77e6 = _0x3f5ffc.endsWith('/') ? _0x3f5ffc + "chat/completions" : _0x3f5ffc + "/chat/completions";
    Promise.race([fetch(_0x1d77e6, {
      'method': 'POST',
      'headers': {
        'Authorization': "Bearer " + _0x319564.trim(),
        'Content-Type': "application/json",
        'HTTP-Referer': window.location.origin,
        'X-Title': "Lampa AI Search"
      },
      'body': JSON.stringify(_0x12f046)
    }), _0x43e7da]).then(function (_0x13b795) {
      if (!_0x13b795.ok) {
        return _0x13b795.text().then(function (_0x4df5c3) {
          var _0x363862 = "Ошибка API: " + _0x13b795.status;
          var _0x4dac5f = null;
          try {
            _0x4dac5f = JSON.parse(_0x4df5c3);
            if (_0x4dac5f.error && _0x4dac5f.error.message) {
              _0x363862 += " - " + _0x4dac5f.error.message;
            } else {
              _0x363862 += " - " + _0x4df5c3.substring(0x0, 0xc8);
            }
          } catch (_0x20a132) {
            _0x363862 += " - " + _0x4df5c3.substring(0x0, 0xc8);
          }
          if (_0x13b795.status === 0x1ad) {
            var _0x61f805 = _0x13b795.headers.get("Retry-After");
            var _0x26cdba = 0x0;
            if (_0x61f805) {
              var _0x23f80c = parseInt(_0x61f805);
              if (!isNaN(_0x23f80c)) {
                _0x26cdba = _0x23f80c * 0x3e8;
              }
            }
            if (_0x26cdba === 0x0) {
              _0x26cdba = Math.max(0x1388, Math.pow(0x2, _0x55e4ef) * 0x3e8);
              _0x26cdba = Math.min(_0x26cdba, 0xea60);
            }
            if (_0x55e4ef < 0x5) {
              _0x29248a.warn("Ошибка 429 (Rate Limit). Ожидание " + Math.round(_0x26cdba / 0x3e8) + " секунд перед повторной попыткой " + (_0x55e4ef + 0x1) + '/' + 6);
              setTimeout(function () {
                _0x1452c6(_0x2728bb, _0x120aaa, _0x55e4ef + 0x1, _0x12e4ee);
              }, _0x26cdba);
              return;
            } else {
              throw new Error(Lampa.Lang.translate("ai_search_error_rate_limit"));
            }
          }
          var _0x2de839 = _0x4dac5f && _0x4dac5f.error && _0x4dac5f.error.message || _0x4df5c3 || '';
          if (_0x55e4ef === 0x0 && _0x12f046.response_format && !_0x12e4ee && (_0x2de839.includes("response_format") || _0x2de839.includes("unsupported") || _0x2de839.includes("invalid") || _0x13b795.status === 0x190)) {
            _0x29248a.warn("Параметр response_format не поддерживается, повторяем запрос без него");
            setTimeout(function () {
              _0x1452c6(_0x2728bb, _0x120aaa, 0x0, true);
            }, 0x1f4);
            return;
          }
          throw new Error(_0x363862);
        });
      }
      return _0x13b795.json();
    }).then(function (_0x5380b9) {
      try {
        if (!_0x5380b9.choices || !_0x5380b9.choices[0x0] || !_0x5380b9.choices[0x0].message) {
          throw new Error("Неверная структура ответа API: отсутствуют choices");
        }
        var _0x2fac50 = _0x5380b9.choices[0x0].message.content;
        if (!_0x2fac50 || typeof _0x2fac50 !== "string" || !_0x2fac50.trim()) {
          throw new Error("Пустой ответ от ИИ");
        }
        var _0x195462 = _0x4bb816(_0x2fac50);
        if (!_0x195462) {
          throw new Error(Lampa.Lang.translate("ai_search_error_invalid_response"));
        }
        var _0x4b72b9 = _0x57a5ff(_0x195462);
        if (!_0x4b72b9 || _0x4b72b9.length === 0x0) {
          throw new Error(Lampa.Lang.translate("ai_search_error_no_results"));
        }
        var _0x6029be = {
          recommendations: _0x4b72b9
        };
        _0x281fa1("ai_search_cache", _0x139b9c, _0x6029be);
        _0x120aaa(null, _0x6029be);
      } catch (_0x330114) {
        if (_0x55e4ef < 0x2) {
          _0x29248a.warn("Ошибка парсинга ответа ИИ (попытка " + (_0x55e4ef + 0x1) + '):', _0x330114.message);
          setTimeout(function () {
            _0x1452c6(_0x2728bb, _0x120aaa, _0x55e4ef + 0x1, _0x12e4ee);
          }, 0x3e8 * (_0x55e4ef + 0x1));
        } else {
          _0x120aaa(new Error("Ошибка парсинга ответа ИИ после 3 попыток: " + _0x330114.message));
        }
      }
    })["catch"](function (_0x3ef402) {
      if (_0x55e4ef < 0x2 && (_0x3ef402.message.includes("Failed to fetch") || _0x3ef402.message.includes("NetworkError"))) {
        _0x29248a.warn("Сетевая ошибка (попытка " + (_0x55e4ef + 0x1) + '):', _0x3ef402.message);
        setTimeout(function () {
          _0x1452c6(_0x2728bb, _0x120aaa, _0x55e4ef + 0x1, _0x12e4ee);
        }, 0x3e8 * (_0x55e4ef + 0x1));
      } else {
        _0x120aaa(_0x3ef402);
      }
    });
  }
  function _0x244e48(_0x28c654, _0x16b1fc, _0x4688d4) {
    var _0x2af921 = [];
    var _0x25115d = 0x0;
    var _0x4003ad = _0xefcf70();
    var _0x3edc03 = Math.min(_0x28c654.length, _0x4003ad);
    var _0x1980e6 = new Lampa.Reguest();
    if (_0x3edc03 === 0x0) {
      _0x16b1fc(_0x2af921);
      return;
    }
    if (_0x4688d4) {
      var _0x1ee997 = {
        current: 0x0,
        total: _0x3edc03,
        title: '',
        phase: "start"
      };
      _0x4688d4(_0x1ee997);
    }
    function _0x2ef5ac(_0x57d69f) {
      if (!_0x57d69f || !_0x57d69f.title) {
        _0x349534();
        return;
      }
      if (_0x4688d4) {
        var _0x8621e9 = {
          current: _0x25115d + 0x1,
          total: _0x3edc03,
          title: _0x57d69f.title,
          phase: 'searching'
        };
        _0x4688d4(_0x8621e9);
      }
      var _0x40bad6 = _0x2fcac6();
      var _0x4afe88 = "tmdb_" + _0x3c18e8(_0x57d69f.title + (_0x57d69f.year || '') + '_' + _0x40bad6);
      var _0x2fe730 = _0x2bf850("ai_search_tmdb_cache", _0x4afe88);
      if (_0x2fe730) {
        _0x2af921.push(_0x2fe730);
        _0x349534();
        return;
      }
      var _0xda1662 = Lampa.TMDB.api("search/multi?query=" + encodeURIComponent(_0x57d69f.title) + "&api_key=" + Lampa.TMDB.key() + '&language=' + _0x40bad6);
      _0x1980e6.silent(_0xda1662, function (_0x2a0f04) {
        if (_0x2a0f04 && _0x2a0f04.results && _0x2a0f04.results.length > 0x0) {
          var _0x4e3bc8 = _0x2a0f04.results[0x0];
          if (_0x57d69f.year) {
            for (var _0x591c50 = 0x0; _0x591c50 < _0x2a0f04.results.length; _0x591c50++) {
              var _0x5223c8 = _0x2a0f04.results[_0x591c50];
              var _0x4f3853 = null;
              if (_0x5223c8.media_type === 'movie' && _0x5223c8.release_date) {
                _0x4f3853 = parseInt(_0x5223c8.release_date.substring(0x0, 0x4));
              } else if (_0x5223c8.media_type === 'tv' && _0x5223c8.first_air_date) {
                _0x4f3853 = parseInt(_0x5223c8.first_air_date.substring(0x0, 0x4));
              }
              if (_0x4f3853 === parseInt(_0x57d69f.year)) {
                _0x4e3bc8 = _0x5223c8;
                break;
              }
            }
          }
          if (_0x4e3bc8.media_type === "movie" || _0x4e3bc8.media_type === 'tv') {
            var _0x356269 = {
              'id': _0x4e3bc8.id,
              'title': _0x4e3bc8.media_type === "movie" ? _0x4e3bc8.title : _0x4e3bc8.name,
              'original_title': _0x4e3bc8.media_type === "movie" ? _0x4e3bc8.original_title : _0x4e3bc8.original_name,
              'overview': _0x4e3bc8.overview || '',
              'poster_path': _0x4e3bc8.poster_path,
              'backdrop_path': _0x4e3bc8.backdrop_path,
              'vote_average': _0x4e3bc8.vote_average,
              'release_date': _0x4e3bc8.media_type === "movie" ? _0x4e3bc8.release_date : _0x4e3bc8.first_air_date,
              'ai_reason': _0x57d69f.reason || '',
              'type': _0x4e3bc8.media_type === 'tv' ? 'tv' : "movie"
            };
            _0x2af921.push(_0x356269);
            _0x281fa1("ai_search_tmdb_cache", _0x4afe88, _0x356269);
          }
        }
        _0x349534();
      }, function () {
        _0x349534();
      });
    }
    function _0x349534() {
      _0x25115d++;
      if (_0x25115d >= _0x3edc03) {
        if (_0x4688d4) {
          var _0x4b6242 = {
            current: _0x3edc03,
            total: _0x3edc03,
            title: '',
            phase: 'complete',
            found: _0x2af921.length
          };
          _0x4688d4(_0x4b6242);
        }
        _0x16b1fc(_0x2af921);
      }
    }
    for (var _0x4d8bd4 = 0x0; _0x4d8bd4 < _0x3edc03; _0x4d8bd4++) {
      _0x2ef5ac(_0x28c654[_0x4d8bd4]);
    }
  }
  function _0x1c53ec() {
    var _0x2b70ac = document.querySelector(".ai-search-overlay");
    if (_0x2b70ac && document.body.contains(_0x2b70ac)) {
      var _0x443da6 = _0x2b70ac.style.display !== "none" && window.getComputedStyle(_0x2b70ac).display !== "none";
      if (_0x443da6) {
        return;
      } else {
        try {
          if (document.body.contains(_0x2b70ac)) {
            document.body.removeChild(_0x2b70ac);
          }
        } catch (_0x48358c) {}
      }
    }
    var _0x2331ae = _0xe13f28();
    var _0x623e3f = _0x278e62();
    var _0x3dea99 = _0x2331ae && _0x2331ae.trim() && _0x623e3f && _0x623e3f.trim();
    if (!document.getElementById("ai-search-styles")) {
      var _0x59eba8 = document.createElement('style');
      _0x59eba8.id = "ai-search-styles";
      _0x59eba8.textContent = ".ai-search-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.85);z-index:10000;display:flex;align-items:center;justify-content:center}.ai-search-modal{background:#1a1a1a;border-radius:12px;padding:24px;max-width:600px;width:90%;max-height:85vh;overflow-y:auto;position:relative}.ai-search-header{margin-bottom:20px;display:flex;justify-content:space-between;align-items:center}.ai-search-header h2{color:#fff;margin:0;font-size:24px;display:flex;align-items:center;gap:8px}.ai-search-header h2 svg{width:32px;height:32px;flex-shrink:0}.ai-search-close{background:0;border:0;color:#fff;font-size:28px;cursor:pointer;padding:0;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px}.ai-search-close:hover{background:rgba(255,255,255,.1)}.ai-search-input-group{margin-bottom:20px}.ai-search-input-group label{color:#fff;display:block;margin-bottom:8px;font-weight:500}.ai-search-input-wrapper{position:relative}.ai-search-input{width:100%;padding:12px;border:1px solid #444;border-radius:8px;background:#2a2a2a;color:#fff;font-size:16px;box-sizing:border-box}.ai-search-input:focus{outline:0;border-color:#007bff}.ai-search-history-dropdown{position:absolute;top:100%;left:0;right:0;margin-top:4px;background:#1a1a1a;border:1px solid #444;border-radius:8px;max-height:300px;overflow-y:auto;z-index:10001;box-shadow:0 4px 12px rgba(0,0,0,.5)}.ai-search-history-header{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border-bottom:1px solid #444;color:#aaa;font-size:12px;font-weight:500}.ai-search-history-clear-all{background:0;border:0;color:#aaa;cursor:pointer;font-size:16px;padding:2px 6px;border-radius:4px;line-height:1}.ai-search-history-clear-all:hover{background:rgba(255,255,255,.1);color:#fff}.ai-search-history-items{max-height:250px;overflow-y:auto}.ai-search-history-item{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;cursor:pointer;border-bottom:1px solid #2a2a2a;color:#fff;font-size:14px;transition:background .2s}.ai-search-history-item:hover{background:#2a2a2a}.ai-search-history-item:last-child{border-bottom:0}.ai-search-history-item-text{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-right:8px}.ai-search-history-item-delete{background:0;border:0;color:#888;cursor:pointer;font-size:16px;padding:2px 6px;border-radius:4px;line-height:1;flex-shrink:0}.ai-search-history-item-delete:hover{background:rgba(255,0,0,.2);color:#ff6b6b}.ai-search-history-empty{padding:20px;text-align:center;color:#888;font-size:14px}.ai-search-buttons{display:flex;gap:10px;justify-content:flex-end}.ai-search-btn{padding:10px 20px;border:0;border-radius:6px;cursor:pointer;font-size:16px;font-weight:500}.ai-search-btn-cancel{background:#444;color:#fff}.ai-search-btn-cancel:hover{background:#555}.ai-search-btn-submit{background:linear-gradient(90deg,#8B5CF6,#06B6D4);color:#fff}.ai-search-btn-submit:hover{background:linear-gradient(90deg,#7C3AED,#0891B2)}.ai-search-btn-submit:disabled{background:#555;cursor:not-allowed}.ai-search-btn.selector,.ai-search-result-item.selector{outline:0}.ai-search-btn.selector.focus,.ai-search-result-item.selector.focus{outline:3px solid #007bff;outline-offset:2px;background:#333}.ai-search-btn-cancel.selector.focus{background:#555}.ai-search-btn-submit.selector.focus{background:linear-gradient(90deg,#7C3AED,#0891B2)}.ai-search-input.selector.focus{outline:3px solid #007bff;outline-offset:2px;border-color:#007bff}.ai-search-loading{text-align:center;padding:40px 20px;color:#fff}.ai-search-loading-text{margin-bottom:20px;font-size:18px}.ai-search-progress-info{margin-top:15px;font-size:14px;color:#aaa}.ai-search-progress-bar{width:100%;height:6px;background:#333;border-radius:3px;overflow:hidden;margin-top:15px}.ai-search-progress-fill{height:100%;background:linear-gradient(90deg,#007bff,#0056b3);transition:width .3s ease;border-radius:3px}.ai-search-dots{display:flex;justify-content:center;gap:8px}.ai-search-dot{width:12px;height:12px;border-radius:50%;background:#007bff;animation:ai-search-pulse 1.4s infinite}.ai-search-dot:nth-child(2){animation-delay:.2s}.ai-search-dot:nth-child(3){animation-delay:.4s}@keyframes ai-search-pulse{0%,80%,100%{opacity:.3;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}.ai-search-results{margin-top:20px}.ai-search-results-title{color:#fff;font-size:20px;margin-bottom:16px}.ai-search-result-item{background:#2a2a2a;border-radius:8px;padding:16px;margin-bottom:12px;display:flex;gap:16px;cursor:pointer;transition:background .2s,outline .2s}.ai-search-result-item:hover{background:#333}.ai-search-history-item.selector.focus{background:#333;outline:2px solid #007bff;outline-offset:-2px}.ai-search-close.selector.focus{background:rgba(255,255,255,.2);outline:2px solid #007bff;outline-offset:2px}.ai-search-result-poster{width:80px;height:120px;min-width:80px;min-height:120px;background:#444;border-radius:4px;object-fit:cover;flex-shrink:0;display:block}.ai-search-result-poster img{width:100%;height:100%;object-fit:cover;border-radius:4px}.ai-search-result-info{flex:1}.ai-search-result-title{color:#fff;font-weight:700;font-size:18px;margin-bottom:4px}.ai-search-result-meta{color:#aaa;font-size:14px;margin-bottom:8px}.ai-search-result-rating{color:#ffd700;margin-bottom:8px}.ai-search-result-overview{color:#ddd;font-size:14px;line-height:1.5}.ai-search-error{background:#4a1a1a;border:1px solid #ff6b6b;border-radius:8px;padding:16px;color:#ff6b6b;text-align:center}.ai-search-empty{text-align:center;padding:40px 20px;color:#aaa}.ai-search-history-permanent{margin:20px 0}.ai-search-history-permanent-title{color:#fff;font-size:16px;font-weight:500;margin-bottom:12px}.ai-search-history-permanent-list{display:flex;flex-wrap:wrap;gap:8px}.ai-search-history-permanent-item{background:#2a2a2a;border:1px solid #444;border-radius:6px;padding:8px 12px;cursor:pointer;color:#fff;font-size:14px;transition:background .2s,border-color .2s;white-space:nowrap;max-width:100%;overflow:hidden;text-overflow:ellipsis}.ai-search-history-permanent-item:hover{background:#333;border-color:#007bff}.ai-search-history-permanent-item.selector.focus{background:#333;border-color:#007bff;outline:2px solid #007bff;outline-offset:2px}.ai-search-history-permanent-empty{color:#888;font-size:14px;text-align:center;padding:20px 0}";
      document.head.appendChild(_0x59eba8);
    }
    var _0x5581bf = document.createElement("div");
    _0x5581bf.className = "ai-search-overlay";
    _0x5581bf.setAttribute("data-modal-active", "true");
    _0x5581bf.style.pointerEvents = 'auto';
    var _0x578f30 = document.createElement("div");
    _0x578f30.className = "ai-search-modal";
    _0x578f30.setAttribute("data-modal-content", "true");
    if (!_0x3dea99) {
      var _0x491234 = !_0x2331ae || !_0x2331ae.trim() ? Lampa.Lang.translate("ai_search_modal_config_api_key") : '';
      var _0x23db07 = !_0x623e3f || !_0x623e3f.trim() ? Lampa.Lang.translate("ai_search_modal_config_model") : '';
      var _0x2b2728 = [_0x491234, _0x23db07].filter(function (_0x45910b) {
        return _0x45910b;
      });
      _0x578f30.innerHTML = "\n            <div class=\"ai-search-header\">\n                <h2><svg viewBox=\"12 18 42 30\"><defs><linearGradient id=\"aiGradient\"><stop offset=\"0%\" stop-color=\"#8B5CF6\"><animate attributeName=\"stop-color\" values=\"#8B5CF6;#A855F7;#8B5CF6\" dur=\"3s\" repeatCount=\"indefinite\"/></stop><stop offset=\"100%\" stop-color=\"#06B6D4\"><animate attributeName=\"stop-color\" values=\"#06B6D4;#0EA5E9;#06B6D4\" dur=\"3s\" repeatCount=\"indefinite\"/></stop></linearGradient></defs><path fill=\"url(#aiGradient)\" d=\"M14 44L24 20C24.5 19 25.5 18.5 26.5 18.5H29.5C30.5 18.5 31.5 19 32 20L42 44C42.5 45 42 46 41 46H37.5C36.5 46 35.7 45.5 35.3 44.7L33.8 41H22.2L20.7 44.7C20.3 45.5 19.5 46 18.5 46H15C14 46 13.5 45 14 44ZM23.5 36H32.5L28 26.5L23.5 36ZM46 20C46 19.4477 46.4477 19 47 19H51C51.5523 19 52 19.4477 52 20V45C52 45.5523 51.5523 46 51 46H47C46.4477 46 46 45.5523 46 45V20Z\"><animate attributeName=\"opacity\" values=\"1;0.7;1\" dur=\"3s\" repeatCount=\"indefinite\"/></path></svg> " + Lampa.Lang.translate("ai_search_modal_title") + "</h2>\n                <button class=\"ai-search-close selector\" tabindex=\"-1\">&times;</button>\n            </div>\n            <div class=\"ai-search-body\">\n                <div class=\"ai-search-error\" style=\"background: #2a2a2a; border: 1px solid #ffa500; color: #ffa500; padding: 24px; text-align: left; line-height: 1.6;\">\n                    <div style=\"font-size: 20px; font-weight: bold; margin-bottom: 16px; text-align: center;\">⚠️ " + Lampa.Lang.translate("ai_search_modal_not_configured") + "</div>\n                    <div style=\"color: #fff; margin-bottom: 16px;\">\n                        " + Lampa.Lang.translate("ai_search_modal_config_required") + ("\n                    </div>\n                    <ul style=\"color: #ffa500; margin: 0 0 16px 20px; padding: 0;\">\n                        " + _0x2b2728.map(function (_0x4b2891) {
        return "<li style=\"margin-bottom: 8px;\">" + _0x4b2891 + '</li>';
      }).join('') + "\n                    </ul>\n                    <div style=\"color: #fff; margin-bottom: 8px; font-weight: bold;\">") + Lampa.Lang.translate("ai_search_modal_setup_steps") + "</div>\n                    <ol style=\"color: #ddd; margin: 0 0 16px 20px; padding: 0;\">\n                        <li style=\"margin-bottom: 8px;\">" + Lampa.Lang.translate("ai_search_modal_setup_step1") + "</li>\n                        <li style=\"margin-bottom: 8px;\">" + Lampa.Lang.translate("ai_search_modal_setup_step2") + "</li>\n                        <li style=\"margin-bottom: 8px;\">" + Lampa.Lang.translate("ai_search_modal_setup_step3") + "</li>\n                        <li style=\"margin-bottom: 8px;\">" + Lampa.Lang.translate("ai_search_modal_setup_step4") + "</li>\n                    </ol>\n                    <div style=\"color: #aaa; font-size: 14px; text-align: center; margin-top: 16px;\">\n                        " + Lampa.Lang.translate("ai_search_modal_setup_info") + "\n                    </div>\n                </div>\n                <div class=\"ai-search-buttons\" style=\"margin-top: 20px; justify-content: center;\">\n                    <button class=\"ai-search-btn ai-search-btn-cancel selector\" tabindex=\"-1\" style=\"min-width: 150px;\">" + Lampa.Lang.translate("ai_search_modal_cancel") + "</button>\n                </div>\n            </div>\n        ";
    } else {
      _0x578f30.innerHTML = "\n            <div class=\"ai-search-header\">\n                <h2><svg viewBox=\"12 18 42 30\"><defs><linearGradient id=\"aiGradient\"><stop offset=\"0%\" stop-color=\"#8B5CF6\"><animate attributeName=\"stop-color\" values=\"#8B5CF6;#A855F7;#8B5CF6\" dur=\"3s\" repeatCount=\"indefinite\"/></stop><stop offset=\"100%\" stop-color=\"#06B6D4\"><animate attributeName=\"stop-color\" values=\"#06B6D4;#0EA5E9;#06B6D4\" dur=\"3s\" repeatCount=\"indefinite\"/></stop></linearGradient></defs><path fill=\"url(#aiGradient)\" d=\"M14 44L24 20C24.5 19 25.5 18.5 26.5 18.5H29.5C30.5 18.5 31.5 19 32 20L42 44C42.5 45 42 46 41 46H37.5C36.5 46 35.7 45.5 35.3 44.7L33.8 41H22.2L20.7 44.7C20.3 45.5 19.5 46 18.5 46H15C14 46 13.5 45 14 44ZM23.5 36H32.5L28 26.5L23.5 36ZM46 20C46 19.4477 46.4477 19 47 19H51C51.5523 19 52 19.4477 52 20V45C52 45.5523 51.5523 46 51 46H47C46.4477 46 46 45.5523 46 45V20Z\"><animate attributeName=\"opacity\" values=\"1;0.7;1\" dur=\"3s\" repeatCount=\"indefinite\"/></path></svg> " + Lampa.Lang.translate("ai_search_modal_title") + "</h2>\n                <button class=\"ai-search-close selector\" tabindex=\"-1\">&times;</button>\n            </div>\n            <div class=\"ai-search-body\">\n                <div class=\"ai-search-input-group\">\n                    <label>" + Lampa.Lang.translate("ai_search_modal_label") + "</label>\n                    <div class=\"ai-search-input-wrapper\">\n                        <input type=\"text\" class=\"ai-search-input selector\" id=\"ai-search-query\"\n                               placeholder=\"" + Lampa.Lang.translate("ai_search_modal_placeholder") + "\"\n                               autocomplete=\"off\" tabindex=\"0\"\n                               inputmode=\"text\"\n                               enterkeyhint=\"search\">\n                    </div>\n                </div>\n                <div class=\"ai-search-loading\" style=\"display: none;\">\n                    <div class=\"ai-search-loading-text\">" + Lampa.Lang.translate("ai_search_modal_loading") + "</div>\n                    <div class=\"ai-search-dots\">\n                        <div class=\"ai-search-dot\"></div>\n                        <div class=\"ai-search-dot\"></div>\n                        <div class=\"ai-search-dot\"></div>\n                    </div>\n                    <div class=\"ai-search-progress-bar\" style=\"display: none;\">\n                        <div class=\"ai-search-progress-fill\" style=\"width: 0%;\"></div>\n                    </div>\n                    <div class=\"ai-search-progress-info\"></div>\n                </div>\n                <div class=\"ai-search-history-permanent\">\n                    <div class=\"ai-search-history-permanent-title\">" + Lampa.Lang.translate("ai_search_modal_history_title") + "</div>\n                    <div class=\"ai-search-history-permanent-list\" id=\"ai-search-history-permanent-list\">\n                    </div>\n                </div>\n                <div class=\"ai-search-buttons\">\n                    <button class=\"ai-search-btn ai-search-btn-cancel selector\" tabindex=\"-1\">" + Lampa.Lang.translate("ai_search_modal_cancel") + "</button>\n                    <button class=\"ai-search-btn ai-search-btn-submit selector\" tabindex=\"-1\">" + Lampa.Lang.translate("ai_search_modal_search") + "</button>\n                </div>\n                <div class=\"ai-search-results\" style=\"display: none;\"></div>\n            </div>\n        ";
    }
    _0x5581bf.appendChild(_0x578f30);
    document.body.appendChild(_0x5581bf);
    var _0xda3c3a = _0x578f30.querySelector(".ai-search-close");
    var _0x442319 = _0x578f30.querySelector(".ai-search-btn-cancel");
    var _0x1f312c = _0x578f30.querySelector(".ai-search-btn-submit");
    var _0x12668d = _0x578f30.querySelector("#ai-search-query");
    var _0xbde720 = _0x578f30.querySelector(".ai-search-loading");
    var _0x59bdaf = _0x578f30.querySelector(".ai-search-results");
    var _0x2f48da = _0x578f30.querySelector(".ai-search-input-group");
    var _0x272ed7 = _0x578f30.querySelector(".ai-search-buttons");
    var _0x8ff14e = _0x578f30.querySelector(".ai-search-progress-bar");
    var _0xac2a2b = _0x578f30.querySelector(".ai-search-progress-fill");
    var _0x47b861 = _0x578f30.querySelector(".ai-search-progress-info");
    var _0x167e50 = _0x578f30.querySelector(".ai-search-loading-text");
    var _0x233e3c = _0x578f30.querySelector(".ai-search-dots");
    var _0x2e4f68 = _0x578f30.querySelector("#ai-search-history-permanent-list");
    var _0x50bc2a = null;
    var _0x21f9f6 = null;
    function _0x29f497() {
      if (!_0x2e4f68) {
        return;
      }
      var _0x1c7482 = _0x1b0367();
      if (_0x1c7482.length === 0x0) {
        _0x2e4f68.innerHTML = "<div class=\"ai-search-history-permanent-empty\">" + Lampa.Lang.translate("ai_search_modal_history_empty") + '</div>';
        return;
      }
      var _0x3095b3 = '';
      _0x1c7482.forEach(function (_0x6e5314) {
        var _0x46395e = _0x6e5314.replace(/"/g, '&quot;').replace(/'/g, "&#39;");
        _0x3095b3 += "<div class=\"ai-search-history-permanent-item selector\" data-query=\"" + _0x46395e + "\" tabindex=\"-1\" title=\"" + _0x46395e + "\">" + _0x6e5314 + "</div>";
      });
      _0x2e4f68.innerHTML = _0x3095b3;
      var _0x2f899b = _0x2e4f68.querySelectorAll(".ai-search-history-permanent-item");
      _0x2f899b.forEach(function (_0x2d50d1) {
        var _0x1fedf6 = _0x2d50d1.getAttribute("data-query");
        var _0x3c0cc5 = function (_0x24f0e) {
          if (_0x24f0e) {
            _0x24f0e.stopPropagation();
            _0x24f0e.preventDefault();
          }
          if (_0x12668d) {
            _0x12668d.value = _0x1fedf6;
          }
          _0x3958ff();
        };
        _0x1b918d(_0x2d50d1, _0x3c0cc5);
      });
      if (_0x50bc2a) {
        setTimeout(function () {
          _0x1aaf94();
        }, 0x32);
      }
    }
    function _0x5bbf6e() {
      if (_0x50bc2a && Lampa && Lampa.Controller) {
        try {
          var _0x17a49c = _0x21f9f6;
          if (typeof Navigator !== "undefined") {
            try {
              if (typeof Navigator.setCollection === 'function') {
                Navigator.setCollection([]);
              }
              if (typeof Navigator.unfocus === "function") {
                Navigator.unfocus();
              }
            } catch (_0x198105) {}
          }
          if (_0x17a49c && typeof Lampa.Controller.toggle === 'function') {
            try {
              Lampa.Controller.toggle(_0x17a49c);
            } catch (_0x413ae0) {
              _0x29248a.warn("Ошибка при восстановлении контроллера:", _0x413ae0);
              try {
                Lampa.Controller.toggle("content");
              } catch (_0xc88474) {}
            }
          } else {
            if (typeof Lampa.Controller.toggle === 'function') {
              try {
                Lampa.Controller.toggle('content');
              } catch (_0xdb7663) {}
            }
          }
        } catch (_0x41f141) {
          _0x29248a.warn("Ошибка при работе с контроллером:", _0x41f141);
          if (typeof Lampa.Controller.toggle === 'function') {
            try {
              Lampa.Controller.toggle("content");
            } catch (_0x7a684b) {}
          }
        }
      }
      if (typeof Navigator !== "undefined" && Navigator._aiSearchScrollHandler) {
        try {
          if (typeof Navigator.unfollow === "function") {
            Navigator.unfollow('focus', Navigator._aiSearchScrollHandler);
          }
          Navigator._aiSearchScrollHandler = null;
        } catch (_0xd895b5) {}
      }
      if (_0x5581bf && _0x5581bf._aiSearchKeyHandler) {
        window.removeEventListener('keydown', _0x5581bf._aiSearchKeyHandler, true);
        _0x5581bf._aiSearchKeyHandler = null;
      }
      _0x50bc2a = null;
      _0x21f9f6 = null;
      var _0x474971 = _0x5581bf;
      if (!_0x474971 || !document.body.contains(_0x474971)) {
        _0x474971 = document.querySelector(".ai-search-overlay");
      }
      if (_0x474971 && document.body.contains(_0x474971)) {
        _0x474971.style.display = 'none';
        try {
          document.body.removeChild(_0x474971);
        } catch (_0x3e98f6) {
          setTimeout(function () {
            if (_0x474971 && document.body.contains(_0x474971)) {
              try {
                document.body.removeChild(_0x474971);
              } catch (_0x5a0999) {}
            }
          }, 0x32);
        }
      }
    }
    _0x1b918d(_0xda3c3a, _0x5bbf6e);
    _0x1b918d(_0x442319, _0x5bbf6e);
    _0x5581bf.addEventListener("click", function (_0x11c6f4) {
      if (_0x11c6f4.target === _0x5581bf) {
        _0x5bbf6e();
      }
    });
	function _0x582018() {
		if (!_0x12668d) {
			return;
		}
      
		// Вызываем нативную клавиатуру Lampa
		Lampa.Keyboard.edit({
			title: Lampa.Lang.translate("ai_search_modal_label") || 'Поиск',
			value: _0x12668d.value
		}, function (new_value) {
			_0x12668d.value = new_value;
        // Возвращаем фокус на контроллер модального окна после закрытия клавиатуры
			if (typeof Lampa.Controller.toggle === 'function') {
           Lampa.Controller.toggle("ai_search_modal");
        }
      });
    }
	
    if (_0x12668d) {
      _0x12668d.addEventListener("keydown", function (_0x5e31e9) {
        if (_0x5e31e9.key === "Enter" || _0x5e31e9.keyCode === 0xd) {
          _0x5e31e9.preventDefault();
          _0x5e31e9.stopPropagation();
          _0x5e31e9.stopImmediatePropagation();
          _0x3958ff();
          return false;
        }
      }, true);
      _0x12668d.addEventListener('keypress', function (_0x4a1244) {
        if (_0x4a1244.key === 'Enter' || _0x4a1244.keyCode === 0xd) {
          _0x4a1244.preventDefault();
          _0x4a1244.stopPropagation();
          _0x4a1244.stopImmediatePropagation();
          return false;
        }
      }, true);
      
      // Убран нативный addEventListener("click"), так как он конфликтует с Lampa
      // Оставляем только системный вызов hover:enter через алиас плагина
      _0xf99ee4(_0x12668d, _0x582018);
    }
    function _0x1aaf94() {
      if (!Lampa || !Lampa.Controller || !_0x50bc2a) {
        return;
      }
      try {
        var _0x2234e3 = [];
        if (_0xda3c3a && _0xda3c3a.offsetParent !== null) {
          _0x2234e3.push(_0xda3c3a);
        }
        if (_0x12668d && _0x2f48da && _0x2f48da.style.display !== "none" && _0x12668d.offsetParent !== null) {
          _0x2234e3.push(_0x12668d);
        }
        if (_0x272ed7 && _0x272ed7.style.display !== 'none') {
          if (_0x442319 && _0x442319.offsetParent !== null) {
            _0x2234e3.push(_0x442319);
          }
          if (_0x1f312c && _0x1f312c.offsetParent !== null && !_0x1f312c.disabled) {
            _0x2234e3.push(_0x1f312c);
          }
        }
        if (_0x59bdaf && _0x59bdaf.style.display !== 'none') {
          var _0x2883d5 = _0x59bdaf.querySelectorAll(".ai-search-result-item.selector");
          for (var _0x599ecf = 0x0; _0x599ecf < _0x2883d5.length; _0x599ecf++) {
            if (_0x2883d5[_0x599ecf].offsetParent !== null) {
              _0x2234e3.push(_0x2883d5[_0x599ecf]);
            }
          }
        }
        if (_0x2e4f68) {
          var _0x259f92 = _0x2e4f68.querySelectorAll(".ai-search-history-permanent-item.selector");
          for (var _0x599ecf = 0x0; _0x599ecf < _0x259f92.length; _0x599ecf++) {
            if (_0x259f92[_0x599ecf].offsetParent !== null) {
              _0x2234e3.push(_0x259f92[_0x599ecf]);
            }
          }
        }
        if (_0x2234e3.length > 0x0) {
          var _0x1d8fcf = typeof $ !== "undefined" ? $(_0x2234e3) : _0x2234e3;
          if (typeof Lampa.Controller.collectionSet === "function") {
            Lampa.Controller.collectionSet(_0x1d8fcf);
          }
          var _0x4380ae = false;
          var _0xa57e83 = document.activeElement;
          if (_0xa57e83 && _0x2234e3.indexOf(_0xa57e83) !== -0x1) {
            _0x4380ae = _0xa57e83;
          } else {
            _0x4380ae = _0x2234e3[0x0] || false;
          }
          if (typeof Lampa.Controller.collectionFocus === "function") {
            Lampa.Controller.collectionFocus(_0x4380ae, _0x1d8fcf);
          }
          if (typeof Navigator !== "undefined") {
            try {
              if (typeof Navigator.setCollection === "function") {
                Navigator.setCollection(_0x2234e3);
              }
              if (_0x4380ae && typeof Navigator.focused === "function") {
                Navigator.focused(_0x4380ae);
              } else if (_0x2234e3.length > 0x0 && typeof Navigator.focus === "function") {
                Navigator.focus();
              }
              if (!Navigator._aiSearchScrollHandler) {
                Navigator._aiSearchScrollHandler = function (_0x245bfd) {
                  if (_0x245bfd && _0x245bfd.elem) {
                    var _0x493788 = _0x245bfd.elem;
                    if (_0x59bdaf && _0x59bdaf.contains(_0x493788)) {
                      try {
                        var _0x4d1353 = _0x578f30 || _0x59bdaf.closest(".ai-search-modal");
                        if (_0x4d1353) {
                          var _0x4ca5f7 = _0x493788.getBoundingClientRect();
                          var _0x2d134a = _0x4d1353.getBoundingClientRect();
                          if (_0x4ca5f7.top < _0x2d134a.top || _0x4ca5f7.bottom > _0x2d134a.bottom) {
                            var _0x85d8bb = {
                              behavior: "smooth",
                              block: "center",
                              inline: "nearest"
                            };
                            _0x493788.scrollIntoView(_0x85d8bb);
                          }
                        } else {
                          var _0xcb593b = {
                            behavior: "smooth",
                            block: "center",
                            inline: "nearest"
                          };
                          _0x493788.scrollIntoView(_0xcb593b);
                        }
                      } catch (_0x2bc663) {
                        try {
                          _0x493788.scrollIntoView(false);
                        } catch (_0x1be4b) {}
                      }
                    } else {
                      if (_0x2e4f68 && _0x2e4f68.contains(_0x493788)) {
                        try {
                          var _0x4d1353 = _0x578f30 || _0x2e4f68.closest(".ai-search-modal");
                          if (_0x4d1353) {
                            var _0x4ca5f7 = _0x493788.getBoundingClientRect();
                            var _0x2d134a = _0x4d1353.getBoundingClientRect();
                            if (_0x4ca5f7.top < _0x2d134a.top || _0x4ca5f7.bottom > _0x2d134a.bottom) {
                              var _0x4be19f = {
                                behavior: "smooth",
                                block: "nearest",
                                inline: "nearest"
                              };
                              _0x493788.scrollIntoView(_0x4be19f);
                            }
                          } else {
                            var _0x10470a = {
                              behavior: "smooth",
                              block: "nearest",
                              inline: "nearest"
                            };
                            _0x493788.scrollIntoView(_0x10470a);
                          }
                        } catch (_0x5bb8bf) {
                          try {
                            _0x493788.scrollIntoView(false);
                          } catch (_0x2fa6b0) {}
                        }
                      }
                    }
                  }
                };
                if (typeof Navigator.follow === "function") {
                  Navigator.follow('focus', Navigator._aiSearchScrollHandler);
                }
              }
            } catch (_0x1c4a0c) {}
          }
        } else if (typeof Lampa.Controller.collectionSet === 'function') {
          Lampa.Controller.collectionSet($([]));
        }
      } catch (_0x4c9212) {
        _0x29248a.warn("Ошибка при обновлении навигации:", _0x4c9212);
      }
    }
    function _0x4ffa7b() {
      if (!Lampa || !Lampa.Controller) {
        _0x29248a.warn("Lampa.Controller недоступен");
        return;
      }
      try {
        try {
          if (typeof Lampa.Controller.enabled === "function") {
            var _0x5e8127 = Lampa.Controller.enabled();
            if (_0x5e8127 && _0x5e8127.name) {
              _0x21f9f6 = _0x5e8127.name;
              if (typeof Lampa.Controller.disable === 'function') {
                try {
                  Lampa.Controller.disable(_0x21f9f6);
                } catch (_0x7d2eb4) {}
              }
            }
          }
        } catch (_0x28302a) {}
        var _0x57ea79 = function (_0x4fb277) {
          if (!_0x5581bf || !document.body.contains(_0x5581bf) || _0x5581bf.style.display === 'none') {
            return;
          }
          var _0x5b096a = _0x4fb277.keyCode || _0x4fb277.which;
          var _0x714600 = [0x25, 0x26, 0x27, 0x28, 0xd, 0x1b, 0x8, 0x21, 0x22, 0x23, 0x24];
          var _0x36d57c = _0x714600.indexOf(_0x5b096a) !== -0x1;
          var _0x247913 = document.activeElement;
          var _0x5a630a = _0x247913 && _0x247913.tagName === "INPUT" && _0x247913 === _0x12668d;
          if (_0x5b096a === 0x1b) {
            _0x4fb277.stopImmediatePropagation();
            _0x4fb277.stopPropagation();
            _0x4fb277.preventDefault();
            _0x5bbf6e();
            return false;
          }
          if (_0x5b096a === 0xd && _0x5a630a) {
            _0x4fb277.stopImmediatePropagation();
            _0x4fb277.stopPropagation();
            _0x4fb277.preventDefault();
            return false;
          }
          if (_0x5b096a === 0x8 && _0x5a630a) {
            _0x4fb277.stopImmediatePropagation();
            _0x4fb277.stopPropagation();
            return false;
          }
          if (_0x36d57c && _0x5a630a && _0x5b096a !== 0xd && _0x5b096a !== 0x8) {
            _0x4fb277.stopImmediatePropagation();
            _0x4fb277.stopPropagation();
            _0x4fb277.preventDefault();
            return false;
          }
        };
        window.addEventListener('keydown', _0x57ea79, true);
        _0x5581bf._aiSearchKeyHandler = _0x57ea79;
        if (typeof Lampa.Controller.add === 'function') {
          Lampa.Controller.add("ai_search_modal", {
            'invisible': false,
            'toggle': function () {
              _0x1aaf94();
            },
            'up': function () {
              if (typeof Navigator !== "undefined" && Navigator.canmove && Navigator.canmove('up')) {
                Navigator.move('up');
              }
            },
            'down': function () {
              if (typeof Navigator !== "undefined" && Navigator.canmove && Navigator.canmove('down')) {
                Navigator.move('down');
              }
            },
            'left': function () {
              if (typeof Navigator !== "undefined" && Navigator.canmove && Navigator.canmove("left")) {
                Navigator.move("left");
              }
            },
            'right': function () {
              if (typeof Navigator !== "undefined" && Navigator.canmove && Navigator.canmove("right")) {
                Navigator.move("right");
              }
            },
            'enter': function () {
              var _0x35581f = document.activeElement;
              if (_0x35581f && _0x35581f.tagName === "INPUT" && _0x35581f === _0x12668d) {
                _0x3958ff();
              }
            },
            'back': function () {
              _0x5bbf6e();
            }
          });
          _0x50bc2a = "ai_search_modal";
          if (typeof Lampa.Controller.toggle === "function") {
            Lampa.Controller.toggle("ai_search_modal");
          }
        }
        setTimeout(function () {
          _0x1aaf94();
        }, 0xc8);
      } catch (_0x3d6f14) {
        _0x29248a.error("Ошибка при инициализации навигации:", _0x3d6f14);
      }
    }
    function _0x3958ff() {
      if (!_0x12668d || !_0x2f48da || !_0x272ed7 || !_0x59bdaf || !_0xbde720 || !_0x1f312c) {
        _0x29248a.warn("Невозможно выполнить поиск: отсутствуют необходимые элементы");
        return;
      }
      var _0x4415ce = _0x12668d ? _0x12668d.value.trim() : '';
      if (!_0x4415ce) {
        Lampa.Noty.show(Lampa.Lang.translate("ai_search_input_required"));
        return;
      }
      var _0x234024 = _0xe13f28();
      if (!_0x234024 || !_0x234024.trim()) {
        Lampa.Noty.show(Lampa.Lang.translate("ai_search_error_api_not_configured"));
        return;
      }
      var _0x507995 = _0x278e62();
      if (!_0x507995 || !_0x507995.trim()) {
        Lampa.Noty.show(Lampa.Lang.translate("ai_search_error_model_not_configured"));
        return;
      }
      _0x2f48da.style.display = 'none';
      _0x272ed7.style.display = 'none';
      _0x59bdaf.style.display = 'none';
      _0xbde720.style.display = 'block';
      _0x1f312c.disabled = true;
      var _0x392b3d = _0xbde720.querySelector(".ai-search-loading-text");
      var _0x3850ec = _0xbde720.querySelector(".ai-search-dots");
      if (!_0x392b3d || !_0x3850ec) {
        _0xbde720.innerHTML = "<div class=\"ai-search-loading-text\">ИИ анализирует ваш запрос...</div><div class=\"ai-search-dots\"><div class=\"ai-search-dot\"></div><div class=\"ai-search-dot\"></div><div class=\"ai-search-dot\"></div></div><div class=\"ai-search-progress-bar\" style=\"display: none;\"><div class=\"ai-search-progress-fill\" style=\"width: 0%;\"></div></div><div class=\"ai-search-progress-info\"></div>";
        var _0x317180 = _0xbde720.querySelector(".ai-search-loading-text");
        var _0x427d89 = _0xbde720.querySelector(".ai-search-dots");
        var _0x398d51 = _0xbde720.querySelector(".ai-search-progress-bar");
        var _0x559f2e = _0xbde720.querySelector(".ai-search-progress-fill");
        var _0x27651f = _0xbde720.querySelector(".ai-search-progress-info");
        if (_0x317180) {
          _0x167e50 = _0x317180;
        }
        if (_0x427d89) {
          _0x233e3c = _0x427d89;
        }
        if (_0x398d51) {
          _0x8ff14e = _0x398d51;
        }
        if (_0x559f2e) {
          _0xac2a2b = _0x559f2e;
        }
        if (_0x27651f) {
          _0x47b861 = _0x27651f;
        }
      }
      if (_0x167e50) {
        _0x167e50.textContent = Lampa.Lang.translate("ai_search_analyzing");
      }
      if (_0x233e3c) {
        _0x233e3c.style.display = 'flex';
      }
      if (_0x8ff14e) {
        _0x8ff14e.style.display = 'none';
      }
      if (_0xac2a2b) {
        _0xac2a2b.style.width = '0%';
      }
      if (_0x47b861) {
        _0x47b861.textContent = '';
      }
      _0x1452c6(_0x4415ce, function (_0x42025d, _0x1a6b14) {
        if (_0x42025d) {
          var _0x374da9 = _0x42025d.message;
          if (_0x374da9.includes("429") || _0x374da9.includes("лимит запросов")) {
            _0x374da9 = Lampa.Lang.translate("ai_search_rate_limit_error") + "\n\n" + Lampa.Lang.translate("ai_search_error_rate_limit_solutions");
          } else {
            if (_0x374da9.includes('попыток')) {
              _0x374da9 = Lampa.Lang.translate("ai_search_error_retry_instructions");
            } else {
              if (_0x374da9.includes("API ключ")) {
                _0x374da9 = Lampa.Lang.translate("ai_search_error_prefix") + _0x374da9;
              } else if (_0x374da9.includes("Ошибка API")) {
                _0x374da9 = Lampa.Lang.translate("ai_search_error_server") + _0x374da9 + "\nПопробуйте позже или измените запрос.";
              } else {
                _0x374da9 = Lampa.Lang.translate("ai_search_error_prefix") + _0x374da9 + "\nПопробуйте изменить формулировку запроса.";
              }
            }
          }
          _0xbde720.innerHTML = "<div class=\"ai-search-error\">" + _0x374da9.replace(/\n/g, '<br>') + "</div>";
          _0x272ed7.style.display = 'flex';
          _0x2f48da.style.display = 'block';
          _0x1f312c.disabled = false;
          if (_0x50bc2a) {
            setTimeout(function () {
              _0x1aaf94();
            }, 0x64);
          }
          return;
        }
        if (!_0x1a6b14.recommendations || !_0x1a6b14.recommendations.length) {
          _0xbde720.innerHTML = "<div class=\"ai-search-error\">" + Lampa.Lang.translate("ai_search_ai_no_results") + "</div>";
          _0x272ed7.style.display = "flex";
          _0x2f48da.style.display = 'block';
          _0x1f312c.disabled = false;
          if (_0x50bc2a) {
            setTimeout(function () {
              _0x1aaf94();
            }, 0x64);
          }
          return;
        }
        if (_0x167e50) {
          _0x167e50.textContent = Lampa.Lang.translate("ai_search_received_recommendations") + _0x1a6b14.recommendations.length + Lampa.Lang.translate("ai_search_recommendations_count") + ". " + Lampa.Lang.translate("ai_search_starting");
        }
        if (_0x233e3c) {
          _0x233e3c.style.display = "none";
        }
        if (_0x8ff14e) {
          _0x8ff14e.style.display = 'block';
        }
        if (_0x47b861) {
          _0x47b861.textContent = Lampa.Lang.translate("ai_search_starting");
        }
        _0x244e48(_0x1a6b14.recommendations, function (_0x1a8a9b) {
          _0xbde720.style.display = 'none';
          if (_0x1a8a9b.length === 0x0) {
            _0x59bdaf.innerHTML = "<div class=\"ai-search-empty\">" + Lampa.Lang.translate("ai_search_no_results") + '</div>';
            _0x59bdaf.style.display = "block";
            _0x272ed7.style.display = "flex";
            _0x2f48da.style.display = "block";
            _0x1f312c.disabled = false;
            if (_0x50bc2a) {
              setTimeout(function () {
                _0x1aaf94();
              }, 0x64);
            }
            return;
          }
          var _0x38f89f = "<div class=\"ai-search-results-title\">" + Lampa.Lang.translate("ai_search_results_found") + _0x1a8a9b.length + '</div>';
          _0x1a8a9b.forEach(function (_0x4bae47) {
            var _0x3f9594 = _0x4bae47.poster_path ? Lampa.Api.img(_0x4bae47.poster_path, "w200") : '';
            var _0x4f4ae7 = _0x4bae47.release_date ? _0x4bae47.release_date.substring(0x0, 0x4) : '?';
            var _0x4650d2 = _0x4bae47.vote_average ? _0x4bae47.vote_average.toFixed(0x1) : 'N/A';
            var _0xecfc9e = _0x4bae47.overview ? _0x4bae47.overview.length > 0x96 ? _0x4bae47.overview.substring(0x0, 0x96) + '...' : _0x4bae47.overview : Lampa.Lang.translate("ai_search_no_description");
            _0x38f89f += "<div class=\"ai-search-result-item selector\" data-movie-id=\"" + _0x4bae47.id + "\" data-movie-type=\"" + _0x4bae47.type + "\" tabindex=\"-1\">";
            if (_0x3f9594) {
              _0x38f89f += "<img class=\"ai-search-result-poster\" src=\"" + _0x3f9594 + "\" alt=\"" + _0x4bae47.title + "\" onerror=\"this.src='./img/img_broken.svg'\">";
            } else {
              _0x38f89f += "<div class=\"ai-search-result-poster\" style=\"background: #444; display: flex; align-items: center; justify-content: center; color: #888; font-size: 12px;\">Нет<br>постера</div>";
            }
            _0x38f89f += "<div class=\"ai-search-result-info\">";
            _0x38f89f += "<div class=\"ai-search-result-title\">" + _0x4bae47.title + "</div>";
            _0x38f89f += "<div class=\"ai-search-result-meta\">" + _0x4f4ae7 + " • " + (_0x4bae47.type === 'tv' ? Lampa.Lang.translate("ai_search_type_tv") : Lampa.Lang.translate("ai_search_type_movie")) + '</div>';
            _0x38f89f += "<div class=\"ai-search-result-rating\">★ " + _0x4650d2 + '</div>';
            _0x38f89f += "<div class=\"ai-search-result-overview\">" + _0xecfc9e + '</div>';
            _0x38f89f += "</div></div>";
          });
          _0x59bdaf.innerHTML = _0x38f89f;
          _0x59bdaf.style.display = "block";
          _0x272ed7.style.display = "flex";
          _0x2f48da.style.display = 'block';
          if (_0x1f312c) {
            _0x1f312c.disabled = false;
            _0x1f312c.textContent = Lampa.Lang.translate("ai_search_new_search");
          }
          _0x5af6ea(_0x4415ce);
          _0x29f497();
          var _0x535eda = _0x59bdaf.querySelectorAll(".ai-search-result-item");
	function _0x3858b4(_0x27b7ab) {
            if (!_0x27b7ab) {
              _0x29248a.warn("openMovie: элемент не найден");
              return;
            }
            var _0x5872ee = _0x27b7ab.getAttribute("data-movie-id");
            var _0x5c7b31 = _0x27b7ab.getAttribute("data-movie-type");
            if (!_0x5872ee || !_0x5c7b31) {
              var _0x29cb51 = {
                movieId: _0x5872ee,
                movieType: _0x5c7b31
              };
              _0x29248a.warn("openMovie: отсутствуют данные фильма", _0x29cb51);
              return;
            }
            if (!Lampa || !Lampa.Activity || typeof Lampa.Activity.push !== 'function') {
              _0x29248a.error("openMovie: Lampa.Activity недоступен");
              if (Lampa && Lampa.Noty && typeof Lampa.Noty.show === "function") {
                Lampa.Noty.show(Lampa.Lang.translate("ai_search_error_open_movie"));
              }
              return;
            }
            var _0x3ea04a = parseInt(_0x5872ee, 0xa);
            if (isNaN(_0x3ea04a)) {
              _0x29248a.warn("openMovie: неверный ID фильма", _0x5872ee);
              return;
            }
            try {
              _0x5bbf6e();
            } catch (_0x44c24d) {
              _0x29248a.warn("openMovie: ошибка при закрытии модального окна", _0x44c24d);
            }
            setTimeout(function () {
              try {
                Lampa.Activity.push({
                  'url': '',
                  'title': _0x5c7b31 === 'tv' ? Lampa.Lang.translate("ai_search_type_tv") : Lampa.Lang.translate("ai_search_type_movie"),
                  'component': "full",
                  'id': _0x3ea04a,
                  'method': _0x5c7b31 === 'tv' ? 'tv' : "movie",
                  'source': 'tmdb',
                  // Добавлен обязательный объект item для Lampa
                  'item': {
                    'id': _0x3ea04a,
                    'source': 'tmdb',
                    'type': _0x5c7b31 === 'tv' ? 'tv' : "movie"
                  }
                });
              } catch (_0x196a1d) {
                _0x29248a.error("openMovie: ошибка при открытии фильма", _0x196a1d);
                if (Lampa && Lampa.Noty && typeof Lampa.Noty.show === 'function') {
                  Lampa.Noty.show(Lampa.Lang.translate("ai_search_error_opening_movie"));
                }
              }
            }, 0x64);
          }
          _0x535eda.forEach(function (_0x365744) {
            var _0x77889d = false;
            var _0x26c6b4 = function (_0x528c4e) {
              if (_0x77889d) {
                if (_0x528c4e) {
                  _0x528c4e.preventDefault();
                  _0x528c4e.stopPropagation();
                }
                return false;
              }
              _0x77889d = true;
              _0x3858b4(_0x365744);
              setTimeout(function () {
                _0x77889d = false;
              }, 0x1f4);
              if (_0x528c4e) {
                _0x528c4e.preventDefault();
                _0x528c4e.stopPropagation();
              }
              return false;
            };
            // Убран нативный обработчик click во избежание конфликтов
            // _0x365744.addEventListener('click', _0x26c6b4, true); 
            _0xf99ee4(_0x365744, _0x26c6b4);
          });
          if (_0x50bc2a) {
            setTimeout(function () {
              _0x1aaf94();
            }, 0x64);
          }
        }, function (_0x4a721f) {
          if (_0x4a721f.phase === 'searching') {
            var _0x3f83e1 = Math.round(_0x4a721f.current / _0x4a721f.total * 0x64);
            if (_0xac2a2b) {
              _0xac2a2b.style.width = _0x3f83e1 + '%';
            }
            if (_0x47b861) {
              _0x47b861.textContent = Lampa.Lang.translate("ai_search_searching_for") + _0x4a721f.current + Lampa.Lang.translate("ai_search_progress_of") + _0x4a721f.total + " (" + _0x4a721f.title + ')';
            }
          } else if (_0x4a721f.phase === 'complete') {
            if (_0xac2a2b) {
              _0xac2a2b.style.width = '100%';
            }
            if (_0x47b861) {
              _0x47b861.textContent = Lampa.Lang.translate("ai_search_progress_found") + _0x4a721f.found + Lampa.Lang.translate("ai_search_progress_of") + _0x4a721f.total;
            }
          }
        });
      });
    }
    if (_0x1f312c) {
      var _0x1e0f63 = function () {
        if (_0x1f312c.textContent === Lampa.Lang.translate("ai_search_new_search")) {
          var _0x20bcd8 = _0x12668d ? _0x12668d.value.trim() : '';
          if (_0x20bcd8) {
            _0x3958ff();
          } else {
            if (_0x12668d) {
              _0x12668d.value = '';
            }
            _0x59bdaf.style.display = 'none';
            _0x59bdaf.innerHTML = '';
            _0xbde720.style.display = 'none';
            _0x2f48da.style.display = 'block';
            _0x272ed7.style.display = "flex";
            _0x1f312c.textContent = Lampa.Lang.translate("ai_search_modal_search");
            if (_0x50bc2a) {
              setTimeout(function () {
                _0x1aaf94();
              }, 0x64);
            }
          }
        } else {
          _0x3958ff();
        }
      };
      _0x1b918d(_0x1f312c, _0x1e0f63);
    }
    var _0x58fde3 = function (_0x1358d4) {
      if (_0x1358d4.key === "Escape" || _0x1358d4.keyCode === 0x1b) {
        _0x5bbf6e();
      }
    };
    document.addEventListener("keydown", _0x58fde3);
    var _0x4f455f = _0x5bbf6e;
    _0x5bbf6e = function () {
      document.removeEventListener('keydown', _0x58fde3);
      _0x4f455f();
    };
    if (Lampa && Lampa.Controller) {
      _0x4ffa7b();
    }
    if (_0x12668d && (!Lampa || !Lampa.Controller)) {
      setTimeout(function () {
        _0x12668d.focus();
      }, 0x64);
    }
    if (_0x3dea99) {
      _0x29f497();
    }
    return _0x5581bf;
  }
  function _0x48e627() {
    if (document.querySelector(".ai-search-header-btn")) {
      return;
    }
    var _0x5c01d0 = document.querySelector(".head__actions");
    if (!_0x5c01d0) {
      setTimeout(_0x48e627, 0x1f4);
      return;
    }
    var _0xa2b76 = document.createElement("div");
    _0xa2b76.className = "head__action selector ai-search-header-btn";
    _0xa2b76.innerHTML = "<svg viewBox=\"12 18 42 30\"><defs><linearGradient id=\"aiGradient\"><stop offset=\"0%\" stop-color=\"#8B5CF6\"><animate attributeName=\"stop-color\" values=\"#8B5CF6;#A855F7;#8B5CF6\" dur=\"3s\" repeatCount=\"indefinite\"/></stop><stop offset=\"100%\" stop-color=\"#06B6D4\"><animate attributeName=\"stop-color\" values=\"#06B6D4;#0EA5E9;#06B6D4\" dur=\"3s\" repeatCount=\"indefinite\"/></stop></linearGradient></defs><path fill=\"url(#aiGradient)\" d=\"M14 44L24 20C24.5 19 25.5 18.5 26.5 18.5H29.5C30.5 18.5 31.5 19 32 20L42 44C42.5 45 42 46 41 46H37.5C36.5 46 35.7 45.5 35.3 44.7L33.8 41H22.2L20.7 44.7C20.3 45.5 19.5 46 18.5 46H15C14 46 13.5 45 14 44ZM23.5 36H32.5L28 26.5L23.5 36ZM46 20C46 19.4477 46.4477 19 47 19H51C51.5523 19 52 19.4477 52 20V45C52 45.5523 51.5523 46 51 46H47C46.4477 46 46 45.5523 46 45V20Z\"><animate attributeName=\"opacity\" values=\"1;0.7;1\" dur=\"3s\" repeatCount=\"indefinite\"/></path></svg>";
    _0xa2b76.title = Lampa.Lang.translate("ai_search_header_button_title");
    _0x1b918d(_0xa2b76, _0x1c53ec, "click", "hover:enter hover:click hover:touch");
    _0x5c01d0.appendChild(_0xa2b76);
  }
  function _0x12387d() {
    try {
      _0x29248a.log("AI Search Plugin: Начало очистки кеша");
      var _0x5949ec = Lampa.Storage.get("ai_search_cache");
      var _0x42b3d9 = Lampa.Storage.get("ai_search_tmdb_cache");
      _0x29248a.log("AI Search Plugin: Кеш до очистки - AI:", _0x5949ec, 'TMDB:', _0x42b3d9);
      try {
        Lampa.Storage.set("ai_search_cache", {});
      } catch (_0x2e16cc) {
        _0x29248a.warn("AI Search Plugin: Не удалось очистить AI кеш через set:", _0x2e16cc);
        try {
          Lampa.Storage.remove("ai_search_cache");
        } catch (_0x33705f) {
          _0x29248a.warn("AI Search Plugin: Не удалось очистить AI кеш через remove:", _0x33705f);
        }
      }
      try {
        Lampa.Storage.set("ai_search_tmdb_cache", {});
      } catch (_0x51d70b) {
        _0x29248a.warn("AI Search Plugin: Не удалось очистить TMDB кеш через set:", _0x51d70b);
        try {
          Lampa.Storage.remove("ai_search_tmdb_cache");
        } catch (_0x514a1a) {
          _0x29248a.warn("AI Search Plugin: Не удалось очистить TMDB кеш через remove:", _0x514a1a);
        }
      }
      var _0x44a938 = Lampa.Storage.get("ai_search_cache");
      var _0x1a5a64 = Lampa.Storage.get("ai_search_tmdb_cache");
      _0x29248a.log("AI Search Plugin: Кеш после очистки - AI:", _0x44a938, 'TMDB:', _0x1a5a64);
      var _0x19a134 = !_0x44a938 || typeof _0x44a938 === 'object' && Object.keys(_0x44a938).length === 0x0;
      var _0x1d31dc = !_0x1a5a64 || typeof _0x1a5a64 === 'object' && Object.keys(_0x1a5a64).length === 0x0;
      if (_0x19a134 && _0x1d31dc) {
        Lampa.Noty.show(Lampa.Lang.translate("ai_search_cache_cleared"));
        _0x29248a.log("AI Search Plugin: Кеш успешно очищен");
      } else {
        Lampa.Noty.show(Lampa.Lang.translate("ai_search_cache_partially_cleared"));
        _0x29248a.log("AI Search Plugin: Кеш очищен, но возможно остались данные");
      }
      return true;
    } catch (_0x129fca) {
      _0x29248a.error("AI Search Plugin: Ошибка при очистке кеша:", _0x129fca);
      Lampa.Noty.show(Lampa.Lang.translate("ai_search_error_clearing_cache") + ": " + (_0x129fca.message || _0x129fca.toString()));
      return false;
    }
  }
  function _0x58109e() {
    Lampa.SettingsApi.addComponent({
      'component': 'ai_search',
      'name': Lampa.Lang.translate("ai_search_title"),
      'icon': "<svg viewBox=\"12 18 42 30\"><path fill=\"#fff\" d=\"M14 44L24 20C24.5 19 25.5 18.5 26.5 18.5H29.5C30.5 18.5 31.5 19 32 20L42 44C42.5 45 42 46 41 46H37.5C36.5 46 35.7 45.5 35.3 44.7L33.8 41H22.2L20.7 44.7C20.3 45.5 19.5 46 18.5 46H15C14 46 13.5 45 14 44ZM23.5 36H32.5L28 26.5L23.5 36ZM46 20C46 19.4477 46.4477 19 47 19H51C51.5523 19 52 19.4477 52 20V45C52 45.5523 51.5523 46 51 46H47C46.4477 46 46 45.5523 46 45V20Z\"/></svg>"
    });
    var _0xdfd63c = {
      name: "ai_search_section_api",
      type: "title"
    };
    Lampa.SettingsApi.addParam({
      'component': "ai_search",
      'param': _0xdfd63c,
      'field': {
        'name': Lampa.Lang.translate("ai_search_section_api")
      },
      'onChange': function (_0xc56e7c) {}
    });
    Lampa.SettingsApi.addParam({
      'component': 'ai_search',
      'param': {
        'name': "ai_search_api_key",
        'type': "input",
        'placeholder': Lampa.Lang.translate("ai_search_api_key_placeholder"),
        'values': Lampa.Storage.get("ai_search_api_key") || '',
        'default': ''
      },
      'field': {
        'name': Lampa.Lang.translate("ai_search_api_key_label"),
        'description': Lampa.Lang.translate("ai_search_api_key_description")
      },
      'onChange': function (_0xf42990) {
        var _0x782a9b = _0xf42990 ? _0xf42990.trim() : '';
        Lampa.Storage.set("ai_search_api_key", _0x782a9b);
        if (_0x782a9b) {
          Lampa.Noty.show(Lampa.Lang.translate("ai_search_api_key_saved"));
        }
      }
    });
    Lampa.SettingsApi.addParam({
      'component': "ai_search",
      'param': {
        'name': "ai_search_model",
        'type': 'input',
        'placeholder': Lampa.Lang.translate("ai_search_model_placeholder"),
        'values': Lampa.Storage.get("ai_search_model") || '',
        'default': ''
      },
      'field': {
        'name': Lampa.Lang.translate("ai_search_model_label"),
        'description': Lampa.Lang.translate("ai_search_model_description")
      },
      'onChange': function (_0x2ce28d) {
        var _0x503a5c = _0x2ce28d ? _0x2ce28d.trim() : '';
        Lampa.Storage.set("ai_search_model", _0x503a5c);
        if (_0x503a5c) {
          Lampa.Noty.show(Lampa.Lang.translate("ai_search_model_changed") + _0x503a5c);
        } else {
          Lampa.Noty.show(Lampa.Lang.translate("ai_search_model_cleared"));
        }
      }
    });
    Lampa.SettingsApi.addParam({
      'component': "ai_search",
      'param': {
        'name': "ai_search_base_url",
        'type': "input",
        'placeholder': Lampa.Lang.translate("ai_search_base_url_placeholder"),
        'values': Lampa.Storage.get("ai_search_base_url") || "https://openrouter.ai/api/v1",
        'default': "https://openrouter.ai/api/v1"
      },
      'field': {
        'name': Lampa.Lang.translate("ai_search_base_url_label"),
        'description': Lampa.Lang.translate("ai_search_base_url_description")
      },
      'onChange': function (_0x25e7b4) {
        var _0x427215 = _0x25e7b4 ? _0x25e7b4.trim() : "https://openrouter.ai/api/v1";
        _0x427215 = _0x427215.replace(/\/+$/, '');
        Lampa.Storage.set("ai_search_base_url", _0x427215);
        if (_0x427215) {
          Lampa.Noty.show(Lampa.Lang.translate("ai_search_base_url_changed") + _0x427215);
        } else {
          Lampa.Noty.show(Lampa.Lang.translate("ai_search_base_url_reset"));
        }
      }
    });
    Lampa.SettingsApi.addParam({
      'component': "ai_search",
      'param': {
        'name': "ai_search_section_search",
        'type': "title"
      },
      'field': {
        'name': Lampa.Lang.translate("ai_search_section_search")
      },
      'onChange': function (_0x47eaa5) {}
    });
    var _0x14a6a1 = {};
    for (var _0x2a041e = 0x5; _0x2a041e <= 0x1e; _0x2a041e += 0x5) {
      _0x14a6a1[_0x2a041e] = _0x2a041e.toString();
    }
    var _0x2250d8 = {
      name: "ai_search_max_results",
      type: "select",
      values: _0x14a6a1,
      "default": 0xf
    };
    Lampa.SettingsApi.addParam({
      'component': "ai_search",
      'param': _0x2250d8,
      'field': {
        'name': Lampa.Lang.translate("ai_search_max_results_label"),
        'description': Lampa.Lang.translate("ai_search_max_results_description")
      },
      'onChange': function (_0x8b3e08) {
        var _0x391da9 = parseInt(_0x8b3e08) || 0xf;
        Lampa.Storage.set("ai_search_max_results", _0x391da9);
        _0x3e3358 = _0x391da9;
        Lampa.Noty.show(Lampa.Lang.translate("ai_search_max_results_changed") + _0x391da9);
      }
    });
    var _0x2e8664 = {};
    for (var _0x2a041e = 0x5; _0x2a041e <= 0x14; _0x2a041e += 0x5) {
      _0x2e8664[_0x2a041e] = _0x2a041e.toString();
    }
    var _0x5407e4 = {
      name: "ai_search_history_max",
      type: 'select',
      values: _0x2e8664,
      "default": 0x14
    };
    Lampa.SettingsApi.addParam({
      'component': "ai_search",
      'param': _0x5407e4,
      'field': {
        'name': Lampa.Lang.translate("ai_search_history_max_label"),
        'description': Lampa.Lang.translate("ai_search_history_max_description")
      },
      'onChange': function (_0x242e66) {
        var _0x355b5e = parseInt(_0x242e66) || 0x14;
        Lampa.Storage.set("ai_search_history_max", _0x355b5e);
        var _0x1a2299 = _0x1b0367();
        if (_0x1a2299.length > _0x355b5e) {
          _0x1a2299 = _0x1a2299.slice(0x0, _0x355b5e);
          Lampa.Storage.set("ai_search_history", _0x1a2299);
        }
        Lampa.Noty.show(Lampa.Lang.translate("ai_search_history_max_changed") + _0x355b5e);
      }
    });
    var _0xe65863 = {
      name: "ai_search_section_cache"
    };
    _0xe65863.type = "title";
    Lampa.SettingsApi.addParam({
      'component': "ai_search",
      'param': _0xe65863,
      'field': {
        'name': Lampa.Lang.translate("ai_search_section_cache")
      },
      'onChange': function (_0x432368) {}
    });
    Lampa.SettingsApi.addParam({
      'component': "ai_search",
      'param': {
        'name': "ai_search_auto_clear_cache_enabled",
        'type': "select",
        'values': {
          'true': Lampa.Lang.translate("ai_search_auto_clear_enabled"),
          'false': Lampa.Lang.translate("ai_search_auto_clear_disabled")
        },
        'default': 'true'
      },
      'field': {
        'name': Lampa.Lang.translate("ai_search_auto_clear_label"),
        'description': Lampa.Lang.translate("ai_search_auto_clear_description")
      },
      'onChange': function (_0x5e211a) {
        var _0x6fea27 = _0x5e211a === "true" || _0x5e211a === true;
        Lampa.Storage.set("ai_search_auto_clear_cache_enabled", _0x6fea27);
        if (_0x6fea27) {
          Lampa.Noty.show(Lampa.Lang.translate("ai_search_auto_clear_enabled"));
          _0x1db10c();
        } else {
          Lampa.Noty.show(Lampa.Lang.translate("ai_search_auto_clear_disabled"));
        }
      }
    });
    var _0x43793f = {};
    for (var _0x2a041e = 0x1; _0x2a041e <= 0x18; _0x2a041e++) {
      var _0x216787 = _0x2a041e === 0x1 ? Lampa.Lang.translate("ai_search_interval_1_hour") : _0x2a041e < 0x5 ? _0x2a041e + Lampa.Lang.translate("ai_search_interval_hours") : _0x2a041e + Lampa.Lang.translate("ai_search_interval_many_hours");
      _0x43793f[_0x2a041e] = _0x216787;
    }
    _0x43793f[0x30] = Lampa.Lang.translate("ai_search_interval_2_days");
    _0x43793f[0x48] = Lampa.Lang.translate("ai_search_interval_3_days");
    _0x43793f[0x78] = Lampa.Lang.translate("ai_search_interval_5_days");
    _0x43793f[0xa8] = Lampa.Lang.translate("ai_search_interval_7_days");
    Lampa.SettingsApi.addParam({
      'component': "ai_search",
      'param': {
        'name': "ai_search_auto_clear_cache_interval",
        'type': 'select',
        'values': _0x43793f,
        'default': Math.round(24).toString()
      },
      'field': {
        'name': Lampa.Lang.translate("ai_search_auto_clear_interval_label"),
        'description': Lampa.Lang.translate("ai_search_auto_clear_interval_description")
      },
      'onChange': function (_0x5b2977) {
        var _0xa8110a = parseInt(_0x5b2977) || 0x18;
        Lampa.Storage.set("ai_search_auto_clear_cache_interval", _0xa8110a);
        var _0x86867a = _0x43793f[_0xa8110a] || '';
        Lampa.Noty.show(Lampa.Lang.translate("ai_search_interval_changed") + _0x86867a);
        _0x1db10c();
      }
    });
    Lampa.SettingsApi.addParam({
      'component': "ai_search",
      'param': {
        'name': "ai_search_clear_cache",
        'type': "button"
      },
      'field': {
        'name': Lampa.Lang.translate("ai_search_clear_cache_label"),
        'description': Lampa.Lang.translate("ai_search_clear_cache_description")
      },
      'onChange': function (_0x17459c) {
        _0x29248a.log("AI Search Plugin: Кнопка очистки кеша нажата, value:", _0x17459c);
        _0x12387d();
      }
    });
    var _0x4d6a0f = {
      name: "ai_search_section_history",
      type: "title"
    };
    Lampa.SettingsApi.addParam({
      'component': "ai_search",
      'param': _0x4d6a0f,
      'field': {
        'name': Lampa.Lang.translate("ai_search_section_history")
      },
      'onChange': function (_0x27e05d) {}
    });
    var _0x22da58 = {
      name: "ai_search_clear_history",
      type: 'button'
    };
    Lampa.SettingsApi.addParam({
      'component': "ai_search",
      'param': _0x22da58,
      'field': {
        'name': Lampa.Lang.translate("ai_search_clear_history_btn_label"),
        'description': Lampa.Lang.translate("ai_search_clear_history_btn_description")
      },
      'onChange': function (_0x485d16) {
        _0x5cf0ec();
        Lampa.Noty.show(Lampa.Lang.translate("ai_search_history_cleared"));
      }
    });
    var _0x4ee358 = {
      name: "ai_search_section_info",
      type: "title"
    };
    Lampa.SettingsApi.addParam({
      'component': "ai_search",
      'param': _0x4ee358,
      'field': {
        'name': Lampa.Lang.translate("ai_search_section_info")
      },
      'onChange': function (_0x569b83) {}
    });
    var _0x245d20 = {
      name: "ai_search_creator",
      type: "static"
    };
    Lampa.SettingsApi.addParam({
      'component': "ai_search",
      'param': _0x245d20,
      'field': {
        'name': Lampa.Lang.translate("ai_search_info_about_label"),
        'description': Lampa.Lang.translate("ai_search_info_about_description")
      },
      'onChange': function (_0x5edd5b) {}
    });
    var _0x219f0a = {
      name: "ai_search_contact",
      type: "static"
    };
    Lampa.SettingsApi.addParam({
      'component': "ai_search",
      'param': _0x219f0a,
      'field': {
        'name': Lampa.Lang.translate("ai_search_info_contact_label"),
        'description': Lampa.Lang.translate("ai_search_info_contact_description")
      },
      'onChange': function (_0x5caa03) {}
    });
    function _0x4862e9() {
      var _0x6552db = null;
      var _0x540122 = [function () {
        var _0x3da5a0 = document.querySelector("[data-name=\"ai_search_clear_cache\"]");
        if (_0x3da5a0) {
          var _0x162b9c = _0x3da5a0.closest(".settings__param");
          if (_0x162b9c) {
            return _0x162b9c.querySelector("button, .selector, .settings__param-value button, .settings__param-value .selector");
          }
          return _0x3da5a0.querySelector("button, .selector");
        }
        return null;
      }, function () {
        var _0x1bc996 = document.querySelectorAll(".settings__param");
        for (var _0x531f67 = 0x0; _0x531f67 < _0x1bc996.length; _0x531f67++) {
          var _0x2eb365 = _0x1bc996[_0x531f67];
          var _0x2e826b = _0x2eb365.querySelector(".settings__param-name");
          if (_0x2e826b && _0x2e826b.textContent && _0x2e826b.textContent.indexOf("Очистка кеша") !== -0x1) {
            return _0x2eb365.querySelector("button, .selector, .settings__param-value button, .settings__param-value .selector");
          }
        }
        return null;
      }, function () {
        var _0x43868e = document.querySelectorAll(".settings__param");
        for (var _0x13fba4 = 0x0; _0x13fba4 < _0x43868e.length; _0x13fba4++) {
          var _0x3807bc = _0x43868e[_0x13fba4];
          var _0x3288ed = _0x3807bc.querySelector(".settings__param-description");
          if (_0x3288ed && _0x3288ed.textContent && _0x3288ed.textContent.indexOf("Очистить все закэшированные") !== -0x1) {
            return _0x3807bc.querySelector("button, .selector, .settings__param-value button, .settings__param-value .selector");
          }
        }
        return null;
      }];
      for (var _0x30f38b = 0x0; _0x30f38b < _0x540122.length; _0x30f38b++) {
        _0x6552db = _0x540122[_0x30f38b]();
        if (_0x6552db) {
          break;
        }
      }
      if (_0x6552db && !_0x6552db.hasAttribute("data-ai-cache-handler-attached")) {
        _0x29248a.log("AI Search Plugin: Найдена кнопка очистки кеша, добавляем обработчик", _0x6552db);
        _0x6552db.setAttribute("data-ai-cache-handler-attached", 'true');
        var _0x2d4c89 = function (_0x4d577c) {
          _0x4d577c.preventDefault();
          _0x4d577c.stopPropagation();
          _0x29248a.log("AI Search Plugin: Клик по кнопке очистки кеша");
          _0x12387d();
          return false;
        };
        _0x6552db.addEventListener('click', _0x2d4c89, true);
        _0xf99ee4(_0x6552db, _0x2d4c89, "hover:enter hover:click hover:touch");
        return true;
      }
      return false;
    }
    if (Lampa.Settings && Lampa.Settings.listener) {
      Lampa.Settings.listener.follow('open', function () {
        function _0x5dd7eb() {
          var _0x5f07a7 = document.querySelector("[data-name=\"ai_search_api_key\"]");
          if (_0x5f07a7) {
            var _0x1c7c71 = Lampa.Storage.get("ai_search_api_key");
            if (_0x1c7c71 !== null && _0x1c7c71 !== undefined) {
              _0x5f07a7.value = _0x1c7c71;
            } else {
              _0x5f07a7.value = '';
            }
          }
          var _0xb90086 = document.querySelector("[data-name=\"ai_search_model\"]");
          if (_0xb90086) {
            var _0x495b96 = Lampa.Storage.get("ai_search_model");
            if (_0x495b96 !== null && _0x495b96 !== undefined) {
              _0xb90086.value = _0x495b96;
            } else {
              _0xb90086.value = '';
            }
          }
          var _0x32d208 = document.querySelector("[data-name=\"ai_search_base_url\"]");
          if (_0x32d208) {
            var _0x4aa785 = Lampa.Storage.get("ai_search_base_url");
            if (_0x4aa785 !== null && _0x4aa785 !== undefined) {
              _0x32d208.value = _0x4aa785;
            } else {
              _0x32d208.value = "https://openrouter.ai/api/v1";
            }
          }
          _0x4862e9();
        }
        var _0x2482db = [0x64, 0x12c, 0x1f4, 0x3e8];
        for (var _0x2a8b53 = 0x0; _0x2a8b53 < _0x2482db.length; _0x2a8b53++) {
          (function (_0x4e82b4) {
            setTimeout(function () {
              _0x5dd7eb();
            }, _0x4e82b4);
          })(_0x2482db[_0x2a8b53]);
        }
        var _0x5bfdd7 = document.querySelector(".settings");
        if (_0x5bfdd7) {
          var _0x3dddfd = new MutationObserver(function (_0x589e26) {
            _0x4862e9();
          });
          var _0x338bfa = {
            childList: true,
            subtree: true
          };
          _0x3dddfd.observe(_0x5bfdd7, _0x338bfa);
          setTimeout(function () {
            _0x3dddfd.disconnect();
          }, 0x1388);
          var _0x2f2163 = function (_0x139db5) {
            var _0x2f4c3b = _0x139db5.target;
            var _0xb43141 = _0x2f4c3b.closest(".settings__param");
            if (_0xb43141) {
              var _0x580640 = _0xb43141.querySelector(".settings__param-name");
              if (_0x580640 && _0x580640.textContent && _0x580640.textContent.indexOf("Очистка кеша") !== -0x1) {
                _0x139db5.preventDefault();
                _0x139db5.stopPropagation();
                _0x29248a.log("AI Search Plugin: Клик по кнопке очистки кеша (через делегирование)");
                _0x12387d();
                return false;
              }
            }
          };
          _0x5bfdd7.addEventListener("click", _0x2f2163, true);
          if (typeof $ !== "undefined") {
            $(_0x5bfdd7).on("hover:enter hover:click hover:touch", ".settings__param", function (_0x114003) {
              var _0x1a77be = $(this).find(".settings__param-name");
              if (_0x1a77be.length && _0x1a77be.text().indexOf("Очистка кеша") !== -0x1) {
                _0x114003.preventDefault();
                _0x114003.stopPropagation();
                _0x29248a.log("AI Search Plugin: Активация кнопки очистки кеша через пульт (делегирование)");
                _0x12387d();
                return false;
              }
            });
          }
        }
      });
    }
  }
  function _0x1f20af() {
    if (!Lampa) {
      _0x29248a.error("AI Search Plugin: Lampa API not available");
      return;
    }
    _0x2bfdfd();
    _0x58109e();
    _0x3e3358 = _0xefcf70();
    _0x29248a.log("AI Search Plugin: Инициализация с моделью " + _0x278e62());
    _0x1db10c();
    setInterval(function () {
      _0x1db10c();
    }, 600000);
    _0x48e627();
    var _0x508c10 = new MutationObserver(function (_0x3c8422) {
      if (!document.querySelector(".ai-search-header-btn")) {
        _0x48e627();
      }
    });
    var _0x2ff924 = {
      childList: true,
      subtree: true
    };
    _0x508c10.observe(document.body, _0x2ff924);
  }
  if (window.appready) {
    setTimeout(_0x1f20af, 0x1f4);
  } else {
    Lampa.Listener.follow("app", function (_0x3063a6) {
      if (_0x3063a6.type === "ready") {
        setTimeout(_0x1f20af, 0x1f4);
      }
    });
  }
})();
