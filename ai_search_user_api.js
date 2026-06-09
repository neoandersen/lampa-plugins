// @name AI Search User API (OMDb Version)
// @version 1.1.0
// @author neoandersen
// @description AI assistant for Lampa/Lampac with user provider profiles and OMDb API integration
// @lampa-check Lampa.
(function () {
    'use strict';

    if (window.ai_search_legacy_user_api_ready) return;
    window.ai_search_legacy_user_api_ready = true;

    var VERSION = '1.1.0-omdb-api';
    var WATCH_ORDER_CACHE_VERSION = 'v2';
    var AI_SETTINGS_COMPONENT = 'ai_search_legacy_user_api';
    var AI_ACTIVE_PROFILE = 'ai_search_legacy_active_profile';
    var AI_OMDB_KEY = 'ai_search_legacy_omdb_key';
    var AI_PROFILE_COUNT = 3;
    var AI_PROVIDER_PRESETS = {
        deepseek: { title: 'DeepSeek', base: 'https://api.deepseek.com/v1', model: 'deepseek-chat', mode: 'openai' },
        openai: { title: 'OpenAI', base: 'https://api.openai.com/v1', model: 'gpt-4o-mini', mode: 'openai' },
        openrouter: { title: 'OpenRouter', base: 'https://openrouter.ai/api/v1', model: 'openai/gpt-4o-mini', mode: 'openai' },
        together: { title: 'Together', base: 'https://api.together.xyz/v1', model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free', mode: 'openai' },
        groq: { title: 'Groq', base: 'https://api.groq.com/openai/v1', model: 'llama-3.1-8b-instant', mode: 'openai' },
        gemini: { title: 'Gemini', base: 'https://generativelanguage.googleapis.com/v1beta', model: 'gemini-1.5-flash', mode: 'gemini' },
        custom: { title: 'Custom', base: '', model: '', mode: 'openai' }
    };
    var SCAN_TIMER = null;

    function storeGet(name, fallback) {
        try {
            if (window.Lampa && Lampa.Storage) {
                var value = Lampa.Storage.get(name, fallback);
                return value === undefined || value === null ? fallback : value;
            }
        } catch (e) {}
        try {
            var raw = window.localStorage ? localStorage.getItem(name) : null;
            return raw === undefined || raw === null ? fallback : raw;
        } catch (e) {}
        return fallback;
    }

    function storeSet(name, value) {
        try {
            if (window.Lampa && Lampa.Storage) {
                Lampa.Storage.set(name, value);
                return;
            }
        } catch (e) {}
        try { if (window.localStorage) localStorage.setItem(name, value); } catch (e) {}
    }

    function cleanValue(value) {
        return String(value === undefined || value === null ? '' : value).replace(/^\s+|\s+$/g, '');
    }

    function activeProfileNumber() {
        var num = parseInt(storeGet(AI_ACTIVE_PROFILE, '1'), 10);
        return num >= 1 && num <= AI_PROFILE_COUNT ? num : 1;
    }

    function activeProfile() {
        var num = activeProfileNumber();
        var prefix = 'ai_search_legacy_profile_' + num + '_';
        var provider = cleanValue(storeGet(prefix + 'provider', num === 1 ? 'deepseek' : 'custom')) || 'custom';
        var preset = AI_PROVIDER_PRESETS[provider] || AI_PROVIDER_PRESETS.custom;
        return {
            number: num,
            provider: provider,
            mode: preset.mode || 'openai',
            title: cleanValue(storeGet(prefix + 'title', preset.title || ('Profile ' + num))) || (preset.title || ('Profile ' + num)),
            base: cleanValue(storeGet(prefix + 'base', preset.base || '')),
            model: cleanValue(storeGet(prefix + 'model', preset.model || '')),
            key: cleanValue(storeGet(prefix + 'key', ''))
        };
    }

    function isKnownAiPresetValue(value, field) {
        value = cleanValue(value);
        if (!value) return true;

        for (var key in AI_PROVIDER_PRESETS) {
            if (!AI_PROVIDER_PRESETS.hasOwnProperty(key)) continue;
            if (key === 'custom') continue;
            if (cleanValue(AI_PROVIDER_PRESETS[key][field]) === value) return true;
        }

        return false;
    }

    function applyAiProviderPreset(prefix, provider, force) {
        provider = cleanValue(provider) || 'custom';

        var preset = AI_PROVIDER_PRESETS[provider] || AI_PROVIDER_PRESETS.custom;
        var currentBase = cleanValue(storeGet(prefix + 'base', ''));
        var currentModel = cleanValue(storeGet(prefix + 'model', ''));

        if (provider !== 'custom' && (force || isKnownAiPresetValue(currentBase, 'base'))) {
            storeSet(prefix + 'base', preset.base || '');
        }

        if (provider !== 'custom' && (force || isKnownAiPresetValue(currentModel, 'model'))) {
            storeSet(prefix + 'model', preset.model || '');
        }
    }

    function normalizeAiBase(base) {
        base = cleanValue(base).replace(/\/+$/, '');
        if (!base) return '';
        if (/\/chat\/completions$/i.test(base)) return base;
        return base + '/chat/completions';
    }

    function requireOmdbKey() {
        var key = cleanValue(storeGet(AI_OMDB_KEY, ''));
        if (!key) throw new Error('Добавьте ключ OMDb API в Настройки → AI Поиск.');
        return key;
    }

    function aiKeyMessage() {
        return 'Добавьте API ключ активного AI-профиля в Настройки → AI Поиск.';
    }

    function omdbKeyMessage() {
        return 'Добавьте ключ OMDb API в Настройки → AI Поиск.';
    }

    function ensureAiReady() {
        var profile = activeProfile();

        if (!profile.key) {
            notify(aiKeyMessage());
            return false;
        }
        if (!profile.base) {
            notify('Выберите провайдера или укажите адрес сервиса в Настройки → AI Поиск.');
            return false;
        }
        if (!profile.model) {
            notify('Выберите провайдера или укажите модель в Настройки → AI Поиск.');
            return false;
        }
        return true;
    }

    function ensureOmdbReady() {
        if (!cleanValue(storeGet(AI_OMDB_KEY, ''))) {
            notify(omdbKeyMessage());
            return false;
        }
        return true;
    }

    function ensureActionReady(action) {
        if (action === 'facts' || action === 'spoiler_free_summary' || action === 'series_brief') return ensureAiReady();
        if (action === 'recommendations' || action === 'better_rated' || action === 'mood' || action === 'actor_movies') return ensureAiReady() && ensureOmdbReady();
        if (action === 'watch_order') return ensureAiReady();
        return true;
    }

    function readAiContent(data) {
        try {
            if (data.choices && data.choices[0] && data.choices[0].message) return data.choices[0].message.content || '';
            if (data.choices && data.choices[0] && data.choices[0].text) return data.choices[0].text || '';
            if (data.output_text) return data.output_text;
            if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
                var out = [];
                for (var i = 0; i < data.candidates[0].content.parts.length; i++) out.push(data.candidates[0].content.parts[i].text || '');
                return out.join('');
            }
        } catch (e) {}
        return '';
    }

    var text = {
        ru: {
            ai_search: 'AI поиск',
            assistant: 'AI Ассистент',
            recommendations: 'Рекомендации',
            better_rated: 'Похожие, но лучше рейтингом',
            similar_same_rating: 'Похожие с таким же рейтингом',
            facts: 'Малоизвестные факты',
            spoiler_free_summary: 'Краткий пересказ без спойлеров',
            watch_order: 'Порядок просмотра',
            series_brief: 'Коротко о фильме/сериале',
            actor_movies: 'Работы актера',
            mood: 'По настроению',
            loading: 'Загрузка...',
            no_data: 'Нет данных о фильме',
            no_results: 'Ничего не найдено',
            no_better_results: 'Похожих фильмов с рейтингом выше не найдено',
            same_rating_fallback: 'Выше рейтингом не найдено, показываю похожие с таким же рейтингом',
            no_watch_order: 'Порядок просмотра не найден',
            standalone_watch_order: 'Для этого фильма/сериала не найдено обязательной франшизы или отдельного порядка просмотра.\n\nМожно смотреть как самостоятельную историю.',
            open: 'Открыть',
            close: 'Закрыть',
            choose_actor: 'Выберите актера',
            choose_mood: 'Выберите настроение',
            movies_found: 'Найдено',
            rating_from: 'Рейтинг выше',
            movie_type_movie: 'Фильм',
            movie_type_tv: 'Сериал',
            rating_votes: 'оценок',
            error: 'Ошибка',
            retry: 'Повторить',
            facts_title: 'Факты',
            summary_title: 'Краткий пересказ',
            watch_order_title: 'Порядок просмотра',
            series_brief_title: 'Коротко о сериале',
            movie_brief_title: 'Коротко о фильме',
            mood_comedy: 'Хочу посмеяться / Комедия',
            mood_drama: 'Хочу драму',
            mood_thriller: 'Триллер и напряжение',
            mood_inspiring: 'Вдохновение',
            mood_romantic: 'Романтика',
            mood_mystery: 'Детектив / Загадка',
            mood_adventure: 'Приключения',
            mood_horror: 'Ужасы',
            mood_cozy: 'Уютный вечер',
            mood_scifi: 'Фантастика'
        }
    };

    function currentLang() { return 'ru'; }
    function t(key) { return text.ru[key] || key; }
    function aiLang() { return 'Russian'; }

    function safeString(value) {
        if (value === null || value === undefined) return '';
        return String(value);
    }

    function trim(value) { return safeString(value).replace(/^\s+|\s+$/g, ''); }
    function stripHtml(value) { return trim(safeString(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ')); }

    function notify(message) {
        try {
            if (window.Lampa && Lampa.Noty) Lampa.Noty.show(message);
            else alert(message);
        } catch (e) {}
    }

    function showLoading() {
        hideLoading();
        var html = '<div class="ai-legacy-loading selector"><div class="ai-legacy-loading__box">' +
            '<div class="ai-legacy-loading__dot"></div><div class="ai-legacy-loading__text">' + t('loading') + '</div>' +
            '</div></div>';
        $('body').append(html);
    }

    function hideLoading() { $('.ai-legacy-loading').remove(); }

    function xhrJson(method, url, body, headers, success, fail) {
        var xhr = new XMLHttpRequest();
        var done = false;

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4 || done) return;
            done = true;
            if (xhr.status >= 200 && xhr.status < 300) {
                try { success(JSON.parse(xhr.responseText || '{}')); } catch (e) { fail(e); }
            } else { fail(new Error('HTTP ' + xhr.status)); }
        };

        xhr.onerror = function () { if (!done) { done = true; fail(new Error('Network error')); } };
        xhr.ontimeout = function () { if (!done) { done = true; fail(new Error('Timeout')); } };

        try {
            xhr.open(method, url, true);
            xhr.timeout = 35000;
            if (headers) {
                for (var k in headers) if (headers.hasOwnProperty(k)) xhr.setRequestHeader(k, headers[k]);
            }
            xhr.send(body ? JSON.stringify(body) : null);
        } catch (e) { fail(e); }
    }

    function deepSeek(prompt, system, maxTokens, success, fail, temperature) {
        var profile = activeProfile();
        if (!profile.key) return fail(new Error(aiKeyMessage()));
        if (!profile.base) return fail(new Error('Укажите адрес сервиса в Настройки → AI Поиск.'));
        if (!profile.model) return fail(new Error('Укажите модель в Настройки → AI Поиск.'));

        var body;
        var url;
        var headers = { 'Content-Type': 'application/json' };

        if (profile.mode === 'gemini') {
            url = profile.base.replace(/\/+$/, '') + '/models/' + encodeURIComponent(profile.model) + ':generateContent?key=' + encodeURIComponent(profile.key);
            body = {
                contents: [{ role: 'user', parts: [{ text: (system ? system + '\n\n' : '') + prompt }] }],
                generationConfig: {
                    maxOutputTokens: maxTokens || 1300,
                    temperature: typeof temperature === 'number' ? temperature : 0.65
                }
            };
        } else {
            url = normalizeAiBase(profile.base);
            headers.Authorization = 'Bearer ' + profile.key;
            body = {
                model: profile.model,
                messages: [
                    { role: 'system', content: system || 'You are a helpful film expert.' },
                    { role: 'user', content: prompt }
                ],
                temperature: typeof temperature === 'number' ? temperature : 0.65,
                max_tokens: maxTokens || 1300
            };
        }

        xhrJson('POST', url, body, headers, function (data) {
            var content = readAiContent(data);
            if (!content) fail(new Error('Empty AI response'));
            else success(content);
        }, fail);
    }

    // Внутренняя низкоуровневая обертка для OMDb API
    function omdbGet(params, success, fail) {
        var key;
        try { key = requireOmdbKey(); } catch (e) { if (fail) fail(e); else notify(e.message || omdbKeyMessage()); return; }
        params = params || {};
        params.apikey = key;

        var query = [];
        for (var k in params) {
            if (params.hasOwnProperty(k) && params[k] !== undefined && params[k] !== null && params[k] !== '') {
                query.push(encodeURIComponent(k) + '=' + encodeURIComponent(params[k]));
            }
        }
        xhrJson('GET', 'https://www.omdbapi.com/?' + query.join('&'), null, null, success, fail);
    }

    // Конвертер моделей данных OMDb под структуру карточек Lampa
    function omdbToLampaModel(it) {
        if (!it || it.Response === "False") return null;
        var type = (it.Type === 'series' || it.Type === 'tv') ? 'tv' : 'movie';
        var rating = it.imdbRating && it.imdbRating !== 'N/A' ? parseFloat(it.imdbRating) : 0;
        var votes = it.imdbVotes && it.imdbVotes !== 'N/A' ? parseInt(String(it.imdbVotes).replace(/,/g, ''), 10) : 0;
        var yearStr = it.Year ? String(it.Year).substring(0, 4) : '';

        return {
            id: it.imdbID || '',
            media_type: type,
            title: it.Title || '',
            name: it.Title || '',
            original_title: it.Title || '',
            original_name: it.Title || '',
            overview: it.Plot && it.Plot !== 'N/A' ? it.Plot : '',
            poster_path: it.Poster && it.Poster !== 'N/A' ? it.Poster : '',
            backdrop_path: it.Poster && it.Poster !== 'N/A' ? it.Poster : '',
            vote_average: rating,
            vote_count: votes,
            release_date: yearStr ? yearStr + '-01-01' : '',
            first_air_date: yearStr ? yearStr + '-01-01' : '',
            popularity: rating * 10,
            genres: it.Genre && it.Genre !== 'N/A' ? it.Genre : '',
            director: it.Director && it.Director !== 'N/A' ? it.Director : '',
            actors: it.Actors && it.Actors !== 'N/A' ? it.Actors : ''
        };
    }

    // Умный поиск фильмов по названию и году через OMDb
    function omdbSearchOrLookup(title, year, success, fail) {
        var params = { t: title };
        if (year) params.y = year;

        omdbGet(params, function (data) {
            if (data && data.Response !== "False") {
                success({ results: [omdbToLampaModel(data)] });
            } else {
                omdbGet({ s: title }, function (searchData) {
                    if (searchData && searchData.Search && searchData.Search.length) {
                        var processed = [];
                        for (var i = 0; i < searchData.Search.length; i++) {
                            var model = omdbToLampaModel(searchData.Search[i]);
                            if (model) processed.push(model);
                        }
                        success({ results: processed });
                    } else if (year) {
                        omdbSearchOrLookup(title, '', success, fail);
                    } else {
                        fail(new Error('Not found'));
                    }
                }, fail);
            }
        }, fail);
    }

    function getActiveMovie() {
        var data = { title: '', original_title: '', year: '', id: '', media_type: 'movie', overview: '', genres: '', cast: '', director: '', poster_path: '', backdrop_path: '', rating: '' };
        try {
            var active = window.Lampa && Lampa.Activity ? Lampa.Activity.active() : null;
            if (active) {
                data.id = active.id || '';
                data.media_type = active.method || active.media_type || 'movie';
                if (active.card) {
                    var c = active.card;
                    data.title = c.title || c.name || '';
                    data.original_title = c.original_title || c.original_name || '';
                    data.overview = c.overview || '';
                    data.poster_path = c.poster_path || '';
                    data.backdrop_path = c.backdrop_path || '';
                    data.rating = c.vote_average || '';
                    var date = c.release_date || c.first_air_date || '';
                    if (date) data.year = safeString(date).split('-')[0];
                }
            }
        } catch (e) {}

        if (!data.title) data.title = stripHtml($('.full-start-new__title, .full-start__title, .full__title').first().text());
        if (!data.year) {
            var details = stripHtml($('.full-start-new__details, .full-start__details, .full__details').first().text());
            var m = details.match(/\b(19|20)\d{2}\b/);
            if (m) data.year = m[0];
        }
        if (!data.media_type || data.media_type === 'tvshow') data.media_type = 'tv';
        if (data.media_type !== 'movie' && data.media_type !== 'tv') data.media_type = 'movie';
        return data;
    }

    function movieInfo(movie) {
        var lines = [];
        if (movie.title) lines.push('Title: ' + movie.title);
        if (movie.year) lines.push('Year: ' + movie.year);
        if (movie.media_type) lines.push('Type: ' + movie.media_type);
        if (movie.rating) lines.push('Rating: ' + movie.rating);
        if (movie.overview) lines.push('Overview: ' + movie.overview);
        return lines.join('\n');
    }

    function parseAIList(raw) {
        var textValue = safeString(raw);
        var start = textValue.indexOf('[');
        var end = textValue.lastIndexOf(']');
        if (start >= 0 && end > start) {
            try { return normalizeAIItems(JSON.parse(textValue.substring(start, end + 1))); } catch (e) {}
        }
        var lines = textValue.split(/\n+/);
        var out = [];
        for (var i = 0; i < lines.length; i++) {
            var line = trim(lines[i].replace(/^\d+[\.\)]\s*/, '').replace(/^[-*]\s*/, ''));
            if (!line) continue;
            var year = '';
            var ym = line.match(/\b(19|20)\d{2}\b/);
            if (ym) year = ym[0];
            line = trim(line.replace(/\((19|20)\d{2}\)/g, '').replace(/\b(19|20)\d{2}\b/g, '').replace(/["']/g, ''));
            if (line) out.push({ title: line, year: year, type: '' });
            if (out.length >= 20) break;
        }
        return out;
    }

    function normalizeAIItems(arr) {
        var out = [];
        for (var i = 0; arr && i < arr.length; i++) {
            var item = arr[i] || {};
            if (typeof item === 'string') item = { title: item };
            var title = item.title || item.name || item.ru_title || '';
            if (title) out.push({ title: safeString(title), year: safeString(item.year || ''), type: safeString(item.type || '') });
        }
        return out;
    }

    function parseWatchOrderList(raw) {
        var textValue = safeString(raw);
        var start = textValue.indexOf('[');
        var end = textValue.lastIndexOf(']');
        if (start >= 0 && end > start) {
            try { return normalizeWatchOrderItems(JSON.parse(textValue.substring(start, end + 1))); } catch (e) {}
        }
        return parseWatchOrderLines(textValue);
    }

    function normalizeWatchOrderItems(arr) {
        var out = [];
        for (var i = 0; arr && i < arr.length && out.length < 35; i++) {
            var item = arr[i] || {};
            if (typeof item === 'string') item = { title: item };
            var title = item.title || item.name || '';
            if (!title) continue;
            var order = parseInt(item.order || (out.length + 1), 10);
            out.push({ order: order, title: safeString(title), original_title: safeString(item.original_title || ''), year: safeString(item.year || ''), type: safeString(item.type || ''), note: safeString(item.note || '') });
        }
        out.sort(function (a, b) { return a.order - b.order; });
        return out;
    }

    function parseWatchOrderLines(raw) {
        var lines = safeString(raw).split(/\n+/);
        var out = [];
        for (var i = 0; i < lines.length && out.length < 35; i++) {
            var line = trim(lines[i]);
            if (!line || !/^\s*(\d+|[-*])[\.\)]?\s+/.test(line)) continue;
            line = line.replace(/^\s*\d+[\.\)]?\s+/, '').replace(/^\s*[-*]\s+/, '');
            var year = '', ym = line.match(/\b(19|20)\d{2}\b/);
            if (ym) year = ym[0];
            var dashIndex = line.indexOf(' - ');
            var title = dashIndex >= 0 ? trim(line.substring(0, dashIndex)) : line;
            var note = dashIndex >= 0 ? trim(line.substring(dashIndex + 3)) : '';
            title = trim(title.replace(/\((19|20)\d{2}\)/g, '').replace(/\b(19|20)\d{2}\b/g, '').replace(/["']/g, ''));
            if (title) out.push({ order: out.length + 1, title: title, original_title: '', year: year, type: '', note: note });
        }
        return out;
    }

    function watchOrderCacheKey(movie) {
        return 'ai_search_legacy_watch_order_v2_ru_' + (movie.media_type || 'movie') + '_' + (movie.id || normalizeTitleForCompare(movie.title));
    }

    function getCachedWatchOrder(movie) {
        try {
            var raw = window.localStorage ? localStorage.getItem(watchOrderCacheKey(movie)) : '';
            if (!raw) return null;
            var data = JSON.parse(raw);
            if (!data || new Date().getTime() - data.time > 30 * 24 * 60 * 60 * 1000) return null;
            return data.list;
        } catch (e) { return null; }
    }

    function setCachedWatchOrder(movie, list) {
        try { if (window.localStorage && list && list.length) localStorage.setItem(watchOrderCacheKey(movie), JSON.stringify({ time: new Date().getTime(), list: list })); } catch (e) {}
    }

    function selectMenu(title, items, onSelect) {
        try { Lampa.Select.show({ title: title, items: items, onSelect: onSelect }); } catch (e) { notify(title); }
    }

    function showAssistant() {
        var movie = getActiveMovie();
        if (!movie.title && !movie.id) { notify(t('no_data')); return; }
        window.ai_search_legacy_movie = movie;

        selectMenu(t('assistant'), [
            { title: t('recommendations'), action: 'recommendations' },
            { title: t('better_rated'), action: 'better_rated' },
            { title: t('facts'), action: 'facts' },
            { title: t('spoiler_free_summary'), action: 'spoiler_free_summary' },
            { title: t('watch_order'), action: 'watch_order' },
            { title: t('series_brief'), action: 'series_brief' },
            { title: t('actor_movies'), action: 'actor_movies' },
            { title: t('mood'), action: 'mood' }
        ], function (item) {
            if (!item || !ensureActionReady(item.action)) return;
            if (item.action === 'recommendations') getRecommendations(movie);
            else if (item.action === 'better_rated') getBetterRatedRecommendations(movie);
            else if (item.action === 'facts') getFacts(movie);
            else if (item.action === 'spoiler_free_summary') getSpoilerFreeSummary(movie);
            else if (item.action === 'watch_order') getWatchOrder(movie);
            else if (item.action === 'series_brief') getSeriesBrief(movie);
            else if (item.action === 'actor_movies') getActors(movie);
            else if (item.action === 'mood') showMoodMenu();
        });
    }

    function getRecommendations(movie) {
        showLoading();
        var prompt = 'Recommend 15 popular movies or TV series similar to this title.\nUse Russian language for titles if possible.\nReturn ONLY valid JSON array. Format: [{"title":"Movie title","year":"2020","type":"movie"}].\n\n' + movieInfo(movie);
        deepSeek(prompt, 'You are an expert movie recommendation system.', 1500, function (raw) {
            var list = parseAIList(raw);
            if (!list.length) { hideLoading(); notify(t('no_results')); return; }
            findMoviesForList(list, 0, [], function (results) { hideLoading(); showMovieResults(t('recommendations'), results); });
        }, function (err) { hideLoading(); notify(t('error') + ': ' + err.message); });
    }

    function getBetterRatedRecommendations(movie) {
        showLoading();
        var currentRating = numericRating(movie.rating);
        var minRating = currentRating > 0 ? currentRating : 7.0;
        var prompt = 'Recommend 25 popular movies or TV series similar to this title, but with a higher reputation.\nUse Russian language for titles.\nThe current title rating is about ' + minRating.toFixed(1) + '.\nReturn ONLY valid JSON array. Format: [{"title":"Movie title","year":"2020","type":"movie"}].\n\n' + movieInfo(movie);

        deepSeek(prompt, 'You write movie recommendation arrays.', 1800, function (raw) {
            var list = parseAIList(raw);
            if (!list.length) { hideLoading(); notify(t('no_better_results')); return; }
            findBetterMoviesForList(list, 0, [], minRating, false, function (results) {
                hideLoading();
                if (!results.length) {
                    notify(t('same_rating_fallback'));
                    showLoading();
                    findBetterMoviesForList(list, 0, [], minRating, true, function (sameResults) {
                        hideLoading();
                        if (!sameResults.length) { notify(t('no_better_results')); return; }
                        showMovieResults(t('similar_same_rating'), sameResults);
                    });
                    return;
                }
                showMovieResults(t('better_rated'), results);
            });
        }, function (err) { hideLoading(); notify(t('error') + ': ' + err.message); });
    }

    function showMoodMenu() {
        selectMenu(t('choose_mood'), [
            { title: t('mood_comedy'), mood: 'comedy' }, { title: t('mood_drama'), mood: 'drama' }, { title: t('mood_thriller'), mood: 'thriller' },
            { title: t('mood_inspiring'), mood: 'inspiring' }, { title: t('mood_romantic'), mood: 'romantic' }, { title: t('mood_mystery'), mood: 'mystery' },
            { title: t('mood_adventure'), mood: 'adventure' }, { title: t('mood_horror'), mood: 'horror' }, { title: t('mood_cozy'), mood: 'cozy' }, { title: t('mood_scifi'), mood: 'scifi' }
        ], function (item) { if (item && item.mood) getMoodRecommendations(item.title); });
    }

    function getMoodRecommendations(moodTitle) {
        showLoading();
        var prompt = 'Recommend 15 popular movies or TV series for this mood: ' + moodTitle + '.\nReturn ONLY valid JSON array. Format: [{"title":"Movie title","year":"2020","type":"movie"}].';
        deepSeek(prompt, 'You are an expert guide.', 1400, function (raw) {
            var list = parseAIList(raw);
            if (!list.length) { hideLoading(); notify(t('no_results')); return; }
            findMoviesForList(list, 0, [], function (results) { hideLoading(); showMovieResults(t('mood'), results); });
        }, function (err) { hideLoading(); notify(t('error') + ': ' + err.message); });
    }

    function getFacts(movie) {
        showLoading();
        var prompt = 'Give exactly 7 interesting and little-known facts about this movie or TV series. Write in Russian.\n\n' + movieInfo(movie);
        deepSeek(prompt, 'You are a careful film historian.', 1500, function (raw) { hideLoading(); showTextScreen(t('facts_title') + ': ' + movie.title, raw); }, function (err) { hideLoading(); notify(t('error') + ': ' + err.message); });
    }

    function getSpoilerFreeSummary(movie) {
        showLoading();
        var prompt = 'Write a short spoiler-free summary for this movie/TV series in Russian. Explain the premise and why it is interesting, using 4-6 paragraphs.\n\n' + movieInfo(movie);
        deepSeek(prompt, 'You write summaries without spoilers.', 1200, function (raw) { hideLoading(); showTextScreen(t('summary_title') + ': ' + movie.title, raw); }, function (err) { hideLoading(); notify(t('error') + ': ' + err.message); });
    }

    function getWatchOrder(movie) {
        var cached = getCachedWatchOrder(movie);
        if (cached && cached.length) {
            showLoading();
            findWatchOrderMoviesForList(cached, 0, [], function (res) { hideLoading(); if (res.length) showMovieResults(t('watch_order_title') + ': ' + movie.title, res); else showWatchOrderPlainList(movie, cached); });
            return;
        }
        showLoading();
        requestWatchOrder(movie, false);
    }

    function requestWatchOrder(movie, retryExpanded) {
        var prompt = 'Find the recommended watch order for the franchise connected to this title. Return ONLY valid JSON array.\nFormat: [{"order":1,"title":"Title","year":"1999","type":"movie","note":"main film"}].\n\n' + movieInfo(movie);
        deepSeek(prompt, 'You build franchise watch orders.', 1700, function (raw) {
            var list = parseWatchOrderList(raw);
            if (!list.length) { hideLoading(); showTextScreen(t('watch_order_title') + ': ' + movie.title, t('standalone_watch_order')); return; }
            setCachedWatchOrder(movie, list);
            findWatchOrderMoviesForList(list, 0, [], function (res) { hideLoading(); showMovieResults(t('watch_order_title') + ': ' + movie.title, res.length ? res : list); });
        }, function (err) { hideLoading(); notify(t('error') + ': ' + err.message); }, 0.15);
    }

    function getSeriesBrief(movie) {
        if (!movie.id) { notify(t('no_data')); return; }
        showLoading();
        omdbGet({ i: movie.id }, function (data) { requestSeriesBrief(movie, data); }, function () { requestSeriesBrief(movie, null); });
    }

    function requestSeriesBrief(movie, omdbData) {
        var prompt = 'Create a concise viewer guide for this title in Russian. Adapt advice to runtime or seasons.\n\n' + movieInfo(movie) + (omdbData ? '\nOMDb Data: ' + buildSeriesTmdbInfo(omdbData) : '');
        deepSeek(prompt, 'You give practical movie advice.', 1400, function (raw) { hideLoading(); showTextScreen((movie.media_type === 'tv' ? t('series_brief_title') : t('movie_brief_title')) + ': ' + movie.title, raw); }, function (err) { hideLoading(); notify(t('error') + ': ' + err.message); }, 0.35);
    }

    function buildSeriesTmdbInfo(data) {
        var lines = [];
        if (!data || data.Response === "False") return '';
        if (data.Title) lines.push('Name: ' + data.Title);
        if (data.Genre) lines.push('Genre: ' + data.Genre);
        if (data.imdbRating) lines.push('IMDb rating: ' + data.imdbRating);
        if (data.totalSeasons && data.totalSeasons !== 'N/A') lines.push('Seasons: ' + data.totalSeasons);
        if (data.Plot) lines.push('Overview: ' + data.Plot);
        if (data.Actors) lines.push('Actors: ' + data.Actors);
        return lines.join('\n');
    }

    // Извлечение списка актеров из строки OMDb
    function getActors(movie) {
        if (!movie.id) { notify(t('no_data')); return; }
        showLoading();
        omdbGet({ i: movie.id }, function (data) {
            hideLoading();
            var actorsStr = data && data.Actors && data.Actors !== 'N/A' ? data.Actors : '';
            if (!actorsStr) { notify(t('no_results')); return; }
            var actorNames = actorsStr.split(',').map(function (item) { return item.trim(); });
            var items = [];
            for (var i = 0; i < actorNames.length; i++) {
                if (actorNames[i]) items.push({ title: actorNames[i], subtitle: 'Actor', person_name: actorNames[i] });
            }
            selectMenu(t('choose_actor'), items, function (item) { if (item && item.person_name) getActorWorks(item); });
        }, function (err) { hideLoading(); notify(t('error') + ': ' + err.message); });
    }

    // Использование ИИ профиля для генерации фильмографии актера под OMDb
    function getActorWorks(actor) {
        showLoading();
        var prompt = 'List 20 famous movies or TV series featuring the actor/actress: "' + actor.person_name + '".\nUse Russian language for titles if possible.\nReturn ONLY valid JSON array. Format: [{"title":"Movie title","year":"2020","type":"movie"}].';
        deepSeek(prompt, 'You are an expert filmography builder.', 1500, function (raw) {
            var list = parseAIList(raw);
            if (!list.length) { hideLoading(); notify(t('no_results')); return; }
            findMoviesForList(list, 0, [], function (results) { hideLoading(); showMovieResults(actor.title, results); });
        }, function (err) { hideLoading(); notify(t('error') + ': ' + err.message); });
    }

    function findMoviesForList(list, index, results, done) {
        if (!list || index >= list.length || results.length >= 24) { done(results); return; }
        var item = list[index];
        if (!item.title) { findMoviesForList(list, index + 1, results, done); return; }

        omdbSearchOrLookup(item.title, item.year || '', function (data) {
            if (data && data.results && data.results.length) {
                results.push(makeMovieItem(data.results[0], item.year || ''));
            }
            findMoviesForList(list, index + 1, results, done);
        }, function () { findMoviesForList(list, index + 1, results, done); });
    }

    function findWatchOrderMoviesForList(list, index, results, done) {
        if (!list || index >= list.length || results.length >= 35) { done(results); return; }
        var item = list[index];
        if (!item || !item.title) { findWatchOrderMoviesForList(list, index + 1, results, done); return; }

        omdbSearchOrLookup(item.title, item.year || '', function (data) {
            if (data && data.results && data.results.length) {
                var best = data.results[0];
                var menuItem = makeMovieItem(best, item.note || '');
                menuItem.title = (item.order < 10 ? '0' + item.order : item.order) + '. ' + menuItem.title;
                results.push(menuItem);
            } else {
                results.push({ title: item.title, subtitle: item.year + (item.note ? ' · ' + item.note : ''), notice: t('no_results') });
            }
            findWatchOrderMoviesForList(list, index + 1, results, done);
        }, function () {
            results.push({ title: item.title, subtitle: item.year + (item.note ? ' · ' + item.note : ''), notice: t('no_results') });
            findWatchOrderMoviesForList(list, index + 1, results, done);
        });
    }

    function findBetterMoviesForList(list, index, results, minRating, allowSameRating, done) {
        if (!list || index >= list.length || results.length >= 18) { done(results); return; }
        var item = list[index];
        if (!item.title) { findBetterMoviesForList(list, index + 1, results, minRating, allowSameRating, done); return; }

        omdbSearchOrLookup(item.title, item.year || '', function (data) {
            if (data && data.results && data.results.length) {
                var best = data.results[0];
                if (allowSameRating ? (best.vote_average >= minRating - 0.2) : (best.vote_average > minRating)) {
                    results.push(makeMovieItem(best, '↑ ' + best.vote_average));
                }
            }
            findBetterMoviesForList(list, index + 1, results, minRating, allowSameRating, done);
        }, function () { findBetterMoviesForList(list, index + 1, results, minRating, allowSameRating, done); });
    }

    function numericRating(value) {
        if (!value) return 0;
        var n = parseFloat(safeString(value).replace(',', '.'));
        return isNaN(n) ? 0 : n;
    }

    function normalizeTitleForCompare(value) { return trim(safeString(value).toLowerCase().replace(/[«»"']/g, '')); }

    function makeMovieItem(movie, extra) {
        var subtitle = [];
        var year = movie.release_date ? movie.release_date.substring(0, 4) : '';
        if (year) subtitle.push(year);
        subtitle.push(movie.media_type === 'tv' ? t('movie_type_tv') : t('movie_type_movie'));
        if (movie.vote_average) subtitle.push('IMDb ' + movie.vote_average);
        if (extra) subtitle.push(extra);

        return { title: movie.title, subtitle: subtitle.join(' · '), movie: movie, id: movie.id, media_type: movie.media_type };
    }

    function showMovieResults(title, items) {
        if (!items || !items.length) { notify(t('no_results')); return; }
        selectMenu(title + ' · ' + t('movies_found') + ': ' + items.length, items, function (item) {
            if (item && item.movie) openMovie(item.movie);
            else if (item && item.notice) notify(item.notice);
        });
    }

    function openMovie(movie) {
        try {
            Lampa.Activity.push({
                url: '', title: movie.title, component: 'full', id: movie.id, method: movie.media_type,
                source: 'imdb', // Важно: сообщаем Lampa, что ID карточки — это IMDb токен (ttXXXXX)
                card: movie
            });
            scheduleButtonScan();
        } catch (e) { notify(t('error') + ': ' + e.message); }
    }

    function showTextScreen(title, body) {
        var html = '<div class="ai-legacy-modal selector"><div class="ai-legacy-modal__box">' +
            '<div class="ai-legacy-modal__title">' + escapeHtml(title) + '</div>' +
            '<div class="ai-legacy-modal__body">' + formatText(safeString(body).replace(/\n{3,}/g, '\n\n')) + '</div>' +
            '<div class="ai-legacy-modal__buttons"><div class="selector ai-legacy-close">' + t('close') + '</div></div>' +
            '</div></div>';
        $('.ai-legacy-modal').remove();
        $('body').append(html);
        $('.ai-legacy-close').on('hover:enter click', function () { $('.ai-legacy-modal').remove(); Lampa.Controller.toggle('content'); });

        try {
            Lampa.Controller.add('ai_legacy_modal', {
                enter: function () { $('.ai-legacy-close').trigger('hover:enter'); },
                up: function () { $('.ai-legacy-modal__body').scrollTop($('.ai-legacy-modal__body').scrollTop() - 150); },
                down: function () { $('.ai-legacy-modal__body').scrollTop($('.ai-legacy-modal__body').scrollTop() + 150); },
                back: function () { $('.ai-legacy-modal').remove(); Lampa.Controller.toggle('content'); }
            });
            Lampa.Controller.toggle('ai_legacy_modal');
            Lampa.Controller.collectionSet($('.ai-legacy-modal'));
        } catch (e) {}
    }

    function escapeHtml(value) { return safeString(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
    function formatText(value) {
        var parts = safeString(value).split(/\n+/), out = [];
        for (var i = 0; i < parts.length; i++) {
            var line = trim(parts[i]);
            if (line) out.push('<p>' + escapeHtml(line).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') + '</p>');
        }
        return out.join('');
    }

    function createButton(container) {
        if (!container || !container.length || container.find('.ai-search-legacy-button').length) return;
        var button = $('<div class="full-start__button selector ai-search-legacy-button" tabindex="0">' +
            '<span class="ai-search-legacy-button__icon"><svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M13.5 4.2l1.25 3.65 3.65 1.25-3.65 1.25-1.25 3.65-1.25-3.65L8.6 9.1l3.65-1.25 1.25-3.65z" fill="currentColor"/><path d="M11.9 14.6a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2zm0 2.15a2.95 2.95 0 1 1 0 5.9 2.95 2.95 0 0 1 0-5.9z" fill="currentColor"/><path d="M15.75 23.15l3.35 3.35" stroke="currentColor" stroke-width="2.2"/></svg></span>' +
            '<span class="ai-search-legacy-button__text">' + t('ai_search') + '</span></div>');
        button.on('hover:enter click', function () { showAssistant(); });
        container.append(button);
    }

    function scanButton() { try { var c = $('.full-start-new__buttons:visible, .full-start__buttons:visible, .full__buttons:visible').last(); if (c.length) createButton(c); } catch (e) {} }
    function scheduleButtonScan() { setTimeout(scanButton, 100); setTimeout(scanButton, 500); }

    function addStyles() {
        if ($('#ai-search-legacy-css').length) return;
        $('head').append('<style id="ai-search-legacy-css">' +
            '.ai-search-legacy-button{position:relative!important;display:inline-flex!important;align-items:center!important;gap:12px!important;height:66px!important;padding:0 24px!important;border-radius:22px!important;border:1px solid rgba(109,216,255,.28)!important;background:rgba(14,24,38,.74)!important;color:#dff8ff!important;backdrop-filter:blur(14px);}' +
            '.ai-search-legacy-button__icon{display:flex!important;align-items:center!important;justify-content:center!important;width:36px!important;height:36px!important;background:rgba(104,216,255,.20);color:#7ee7ff!important;border-radius:13px;}' +
            '.ai-search-legacy-button__text{font-size:22px;font-weight:700;color:#f5fdff;}' +
            '.ai-search-legacy-button.focus,.ai-search-legacy-button.hover{transform:scale(1.035)!important;border-color:rgba(104,216,255,.78)!important;background:rgba(24,51,76,.90)!important;}' +
            '.ai-legacy-loading{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center}' +
            '.ai-legacy-loading__box{min-width:260px;padding:34px;border-radius:14px;background:#20242b;color:#fff;text-align:center;}' +
            '.ai-legacy-loading__dot{width:42px;height:42px;margin:0 auto 18px;border-radius:50%;border:5px solid rgba(104,216,255,.25);border-top-color:#68d8ff;animation:aiLegacySpin 1s linear infinite}' +
            '.ai-legacy-loading__text{font-size:24px;}' +
            '@keyframes aiLegacySpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}' +
            '.ai-legacy-modal{position:fixed;inset:0;z-index:99998;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:4vw}' +
            '.ai-legacy-modal__box{width:780px;max-width:92vw;max-height:86vh;background:#20242b;color:#fff;border-radius:12px;display:flex;flex-direction:column;overflow:hidden}' +
            '.ai-legacy-modal__title{font-size:32px;padding:28px;border-bottom:1px solid rgba(255,255,255,.08)}' +
            '.ai-legacy-modal__body{font-size:24px;line-height:1.35;padding:26px;overflow:auto;}' +
            '.ai-legacy-modal__body p{margin:0 0 16px}' +
            '.ai-legacy-modal__buttons{padding:18px;display:flex;justify-content:center}' +
            '.ai-legacy-close{font-size:22px;padding:14px 32px;border-radius:8px;background:#2d8cff;color:#fff;min-width:150px;text-align:center}' +
            '.ai-legacy-close.focus,.ai-legacy-close.hover{background:#58b9ff}' +
            '</style>');
    }

    function registerSettings() {
        try {
            if (!window.Lampa || !Lampa.SettingsApi) return;
            if (!window.ai_search_legacy_user_api_settings_component_ready) {
                window.ai_search_legacy_user_api_settings_component_ready = true;
                Lampa.SettingsApi.addComponent({ component: AI_SETTINGS_COMPONENT, name: 'AI Поиск', icon: '<svg viewBox="0 0 24 24" fill="white"><path d="M12 2L14.8 8.3L22 9L16.6 13.7L18.2 21L12 17.2L5.8 21L7.4 13.7L2 9L9.2 8.3L12 2Z"/></svg>' });
            }
            renderSettingsParams();
        } catch (e) {}
    }

    function rerenderSettingsParams() {
        window.ai_search_legacy_user_api_settings_rendered_profile = '';
        setTimeout(function () { renderSettingsParams(); try { if (window.Lampa && Lampa.Settings && Lampa.Settings.create) Lampa.Settings.create(AI_SETTINGS_COMPONENT); } catch (e) {} }, 80);
    }

    function renderSettingsParams() {
        if (!window.Lampa || !Lampa.SettingsApi) return;
        var num = activeProfileNumber();
        var profileKey = String(num);

        try { if (Lampa.SettingsApi.removeParams) Lampa.SettingsApi.removeParams(AI_SETTINGS_COMPONENT); else if (window.ai_search_legacy_user_api_settings_rendered_profile === profileKey) return; } catch (e) {}
        window.ai_search_legacy_user_api_settings_rendered_profile = profileKey;

        var prefix = 'ai_search_legacy_profile_' + num + '_';
        var defaultProvider = num === 1 ? 'deepseek' : 'custom';
        var currentProvider = cleanValue(storeGet(prefix + 'provider', defaultProvider)) || defaultProvider;
        var currentPreset = AI_PROVIDER_PRESETS[currentProvider] || AI_PROVIDER_PRESETS[defaultProvider] || AI_PROVIDER_PRESETS.custom;

        Lampa.SettingsApi.addParam({ component: AI_SETTINGS_COMPONENT, param: { type: 'title' }, field: { name: 'Основной профиль' } });
        Lampa.SettingsApi.addParam({
            component: AI_SETTINGS_COMPONENT,
            param: { name: AI_ACTIVE_PROFILE, type: 'select', values: { '1': 'Профиль 1', '2': 'Профиль 2', '3': 'Профиль 3' }, default: '1' },
            field: { name: 'Использовать профиль', description: 'Ниже показываются настройки только выбранного профиля.' },
            onChange: rerenderSettingsParams
        });

        Lampa.SettingsApi.addParam({ component: AI_SETTINGS_COMPONENT, param: { type: 'title' }, field: { name: 'Настройки профиля ' + num } });
        Lampa.SettingsApi.addParam({ component: AI_SETTINGS_COMPONENT, param: { name: prefix + 'title', type: 'input', values: '', default: num === 1 ? 'DeepSeek' : '' }, field: { name: 'Название' } });
        Lampa.SettingsApi.addParam({
            component: AI_SETTINGS_COMPONENT,
            param: {
                name: prefix + 'provider', type: 'select',
                values: { deepseek: 'DeepSeek', openai: 'OpenAI', openrouter: 'OpenRouter', together: 'Together', groq: 'Groq', gemini: 'Gemini', custom: 'Совместимый / свой адрес' },
                default: defaultProvider
            },
            field: { name: 'Провайдер' },
            onChange: function () {
                var provider = cleanValue(storeGet(prefix + 'provider', defaultProvider)) || 'custom';
                applyAiProviderPreset(prefix, provider);
                rerenderSettingsParams();
            }
        });
        Lampa.SettingsApi.addParam({ component: AI_SETTINGS_COMPONENT, param: { name: prefix + 'key', type: 'input', values: '', default: '' }, field: { name: 'Ключ' } });
        Lampa.SettingsApi.addParam({ component: AI_SETTINGS_COMPONENT, param: { name: prefix + 'base', type: 'input', values: '', default: currentProvider === 'custom' ? '' : (currentPreset.base || '') }, field: { name: 'Адрес сервиса' } });
        Lampa.SettingsApi.addParam({ component: AI_SETTINGS_COMPONENT, param: { name: prefix + 'model', type: 'input', values: '', default: currentProvider === 'custom' ? '' : (currentPreset.model || '') }, field: { name: 'Модель' } });

        Lampa.SettingsApi.addParam({ component: AI_SETTINGS_COMPONENT, param: { type: 'title' }, field: { name: 'Каталог фильмов (IMDb)' } });
        Lampa.SettingsApi.addParam({
            component: AI_SETTINGS_COMPONENT,
            param: { name: AI_OMDB_KEY, type: 'input', values: '', default: '' },
            field: { name: 'Ключ OMDb API', description: 'Нужен для получения карточек, постеров и рейтингов фильмов с IMDb через базу OMDb. Общий для всех профилей.' }
        });
    }

    function ensureSettingsRegistration() {
        registerSettings();
        setTimeout(registerSettings, 300);
        setTimeout(registerSettings, 1800);
        try { if (window.Lampa && Lampa.Listener && !window.ai_search_legacy_user_api_settings_listener) { window.ai_search_legacy_user_api_settings_listener = true; Lampa.Listener.follow('app', function (e) { if (e && e.type === 'ready') registerSettings(); }); } } catch (e) {}
        try { if (window.Lampa && Lampa.Settings && Lampa.Settings.listener && !window.ai_search_legacy_user_api_settings_open_listener) { window.ai_search_legacy_user_api_settings_open_listener = true; Lampa.Settings.listener.follow('open', function () { registerSettings(); }); } } catch (e) {}
    }

    function start() {
        if (!window.Lampa || !window.$) { setTimeout(start, 300); return; }
        ensureSettingsRegistration();
        addStyles();
        scheduleButtonScan();
        if (window.Lampa && Lampa.Listener) { try { Lampa.Listener.follow('activity', function (e) { if (e) scheduleButtonScan(); }); } catch (e) {} }
        if (!SCAN_TIMER) { SCAN_TIMER = setInterval(scanButton, 1500); }
    }

    start();
})();