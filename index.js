const { Telegraf, Markup, Scenes, session } = require('telegraf')
const { ref, get, child, set, update } = require("firebase/database");
const db = require("./scenes/bd");
const bot = new Telegraf('5673371091:AAE4oc71_O99KqsM2M2zWnx17a4gCNBrbuk')
bot.command('start', async (ctx) => {
    const inkeyboard2 = {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: '🔍 Подобрать займ', callback_data: 'searchzaym'}
                ]
            ]
        }
    }
    const keyboar = {
        reply_markup: {
            keyboard: [
                [
                    {text: '🔍 Подобрать займ'}
                ],
                [
                    {text: '📊 Мониторинг МФО'},
                    {text: '⚒ Помощь'}
                ],
            ], resize_keyboard: true
        }
    }
    let value = await get(child(ref(db), "users/" + ctx.chat.id))
    value = value.val();
    let profile = await get(child(ref(db), "users/" + ctx.chat.id + '/profile/'))
    profile = profile.val();
    if(value == null) {
        await update(child(ref(db), 'users/' + ctx.chat.id), {'username': '@' + ctx.chat.username, 'msg_id': 0, 'msg_id2': 0})
        await ctx.reply('Спасибо, что решили выбрать именно нас!', keyboar)
        await ctx.reply('✋ Привет! Меня зовут Ника.\n\n🤖 Я Бот-помощник для поиска выгодных предложений по займам. Я имею сотни предложений и подберу самое выгодное для тебя. \n\n👁 Полученные от тебя данные анализируются, основываясь на них, я корректирую выдачу результатов наилучшим образом.\n\n✅ Для получения полного списка предложений нужно нажать по кнопке снизу.\n\n--------------------------------------------\n🙋‍♀️Совет: чтобы увеличить вероятность и скорость одобрения займа, оставьте анкеты сразу в нескольких компаниях', inkeyboard2)
    } else {
        await ctx.reply('Спасибо, что решили выбрать именно нас!', keyboar)
        await ctx.reply('✋ Привет! Меня зовут Ника.\n\n🤖 Я Бот-помощник для поиска выгодных предложений по займам. Я имею сотни предложений и подберу самое выгодное для тебя. \n\n👁 Полученные от тебя данные анализируются, основываясь на них, я корректирую выдачу результатов наилучшим образом.\n\n✅ Для получения полного списка предложений нужно нажать по кнопке снизу.\n\n--------------------------------------------\n🙋‍♀️Совет: чтобы увеличить вероятность и скорость одобрения займа, оставьте анкеты сразу в нескольких компаниях', inkeyboard2)
    }
})
bot.action('searchzaym', async (ctx) => {
    const keyboar = {
        reply_markup: {
            keyboard: [
                [
                    {text: 'Отмена'}
                ],
            ], resize_keyboard: true
        }
    }
    const inkeyboard2 = {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Никогда не брал(а) займ', callback_data: 'next'}
                ],
                [
                    {text: 'Регулярно использую', callback_data: 'next'}
                ],
                [
                    {text: 'Пользуюсь редко', callback_data: 'next'}
                ],
            ],
        }, parse_mode: 'Markdown'
    }
   const idmesnew = await ctx.reply('Вы в любой момент можете отменить ввод, воспользовавшись, кнопкой на клавиатуре.', keyboar)
   let mes = await ctx.reply('*# ШАГ (1/3)\n❗️Как часто Вы пользуетесь услугами займов?*\n\n------------------------------\nСейчас бот реагирует только на кнопки под этим постом', inkeyboard2)
   await update(child(ref(db), 'users/' + ctx.chat.id), {'msg_id': mes.message_id})
   await update(child(ref(db), 'users/' + ctx.chat.id), {'msg_id2': idmesnew.message_id})
})
bot.hears('Отмена', async (ctx) => {
    const keyboar = {
        reply_markup: {
            keyboard: [
                [
                    {text: '🔍 Подобрать займ'}
                ],
                [
                    {text: '📊 Мониторинг МФО'},
                    {text: '⚒ Помощь'}
                ],
            ], resize_keyboard: true
        }
    }
    ctx.reply('Отменено', keyboar)
})
bot.hears('🔍 Подобрать займ', async (ctx) => {
    const inkeyboard2 = {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: '✅ Запустить', callback_data: 'zapusk'}
                ],
            ],
        }, parse_mode: 'Markdown'
    }
    ctx.reply('*🔍 Запуск мастера по подбору займов...\n\nМастер по подбору займов* — это автоматизированный процесс, направленный на выявление списка наиболее подходящих(конкретному пользователю) предложений, основываясь на полученных данных.\n\n*Что он умеет?*\n❕ Выберет варианты под Вашу кредитную историю\n❕ Автоматически подберет самый низкий процент\n❕ Отсортирует по проценту одобрений\n\n*❗️ Нажми на кнопку для запуска поиска*', inkeyboard2)
})
bot.action('zapusk', async (ctx) => {
    const keyboar = {
        reply_markup: {
            keyboard: [
                [
                    {text: 'Отмена'}
                ],
            ], resize_keyboard: true
        }
    }
    const inkeyboard2 = {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Никогда не брал(а) займ', callback_data: 'next'}
                ],
                [
                    {text: 'Регулярно использую', callback_data: 'next'}
                ],
                [
                    {text: 'Пользуюсь редко', callback_data: 'next'}
                ],
            ],
        }, parse_mode: 'Markdown'
    }
   const idmesnew = await ctx.reply('Вы в любой момент можете отменить ввод, воспользовавшись, кнопкой на клавиатуре.', keyboar)
   await update(child(ref(db), 'users/' + ctx.chat.id), {'msg_id2': idmesnew.message_id})
   let mes = await ctx.reply('*# ШАГ (1/3)\n❗️Как часто Вы пользуетесь услугами займов?*\n\n------------------------------\nСейчас бот реагирует только на кнопки под этим постом', inkeyboard2)
   await update(child(ref(db), 'users/' + ctx.chat.id), {'msg_id': mes.message_id})
})
bot.action('next', async (ctx) => {
    try{
        let mesid = await get(child(ref(db), "users/" + ctx.chat.id + '/msg_id'))
    mesid = mesid.val();
    await ctx.deleteMessage(mesid)
    const inkeyboard2 = {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Показать займы под низкий процент', callback_data: 'next_2'}
                ],
                [
                    {text: 'Показать все возможные займы', callback_data: 'next_2'}
                ],
            ],
        }, parse_mode: 'Markdown'
    }
    let mes = await ctx.reply('*# ШАГ (2/3)\n❗️Выберите какой вариант займа вам интересен. Под низкий процент или под обычный процент?*\n\n------------------------------\nСейчас бот реагирует только на кнопки под этим постом.', inkeyboard2)
    await update(child(ref(db), 'users/' + ctx.chat.id), {'msg_id': mes.message_id})    
} catch(e) {
        console.log(e)
    }
})
bot.action('next_2', async (ctx) => {
    const inkeyboard2 = {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Показать', callback_data: 'next_3'}
                ],
            ],
        }, parse_mode: 'Markdown'
    }
    try {
        let mesid = await get(child(ref(db), "users/" + ctx.chat.id + '/msg_id'))
        let mesid2 = await get(child(ref(db), "users/" + ctx.chat.id + '/msg_id2'))
        mesid = mesid.val();
        mesid2 = mesid2.val()
    await ctx.deleteMessage(mesid2)
    await ctx.deleteMessage(mesid)
    let mes = await ctx.reply('*♻️ Идёт анализ полученных данных...*\n\n*⚠️ Бот ИСКЛЮЧИЛ из выдачи предложения, где:*\n├ Организации для заёмщиков с плохой кредитной историей\n├ Можно взять займ под высокий процент\n└ Минимальный возраст меньше 18 лет\n\n⚠️ Дополнительная сортировка по рейтингу организаций.\n*Предложений, приготовленных для Вас: (5)  - на самых выгодных и наиболее подходящих условиях.*\n\n___Нажмите на кнопку показать, для продолжения.___', inkeyboard2)
    await update(child(ref(db), 'users/' + ctx.chat.id), {'msg_id': mes.message_id})    
    } catch(e) {
        console.log(e)
    }
})
bot.action('next_3', async (ctx) => {
    let mesid = await get(child(ref(db), "users/" + ctx.chat.id + '/msg_id'))
    mesid = mesid.val();
    await ctx.deleteMessage(mesid)
    await ctx.reply('Ваши результаты:')
    let mes = await ctx.replyWithPhoto({ source: './image/money_man.jpg'}, {caption: '*✅ Доступен займ под 0%*\n\n*Займ:* от 5000 руб\n*Срок:* от 5 дней\n*Процент:* от 0 до 1% в день\n*Возраст:* от 18 лет\n\n*Условия займа под 0%:*\nЗайм под 0% выдается только если вы берете займ в этой организации первый раз. До 30 000 руб. и до 21 дня.\n\n*Подтверждение личности*:\nПаспорт', reply_markup: {inline_keyboard: [[{text: 'Получить деньги', url: 'https://go.leadgid.ru/aff_c?aff_id=89075&offer_id=5853'}],[{text: 'Далее [5] ➡️', callback_data: 'dalee5'}],],}, parse_mode: 'Markdown'})
    await update(child(ref(db), 'users/' + ctx.chat.id), {'msg_id': mes.message_id})
})
bot.action('dalee5', async (ctx) => {
    let mesid = await get(child(ref(db), "users/" + ctx.chat.id + '/msg_id'))
    mesid = mesid.val();
   await ctx.deleteMessage(mesid)
   let mes = await ctx.replyWithPhoto({source: './image/belka_kredit.jpg'}, {caption: '*✅ Доступен займ под 0%*\n\n*Займ:* от 1 000 до 30 000 рублей\n*Срок:* От 7 до 30 дней\n*Процент:* от 0% на 10 дней\n*Возраст:* от 18 до 75 лет\n\n*Условия займа под 0%:*\nЗайм под 0% выдается только если вы берете займ в этой организации первый раз. До 30 000 руб. и до 10 дней.', reply_markup: {inline_keyboard: [[{text: 'Получить денег', url: 'https://go.leadgid.ru/aff_c?aff_id=89075&offer_id=4472'}], [{text: '⬅️ Назад [1]', callback_data: 'money_man'}, {text: 'Далее [4] ➡️', callback_data: 'dalee4'}],],}, parse_mode: 'markdown'})
   await update(child(ref(db), 'users/' + ctx.chat.id), {'msg_id': mes.message_id})
})
bot.action('money_man', async (ctx) => {
    let mesid = await get(child(ref(db), "users/" + ctx.chat.id + '/msg_id'))
    mesid = mesid.val();
    await ctx.deleteMessage(mesid)
    let mes = await ctx.replyWithPhoto({ source: './image/money_man.jpg'}, {caption: '*✅ Доступен займ под 0%*\n\n*Займ:* от 5000 руб\n*Срок:* от 5 дней\n*Процент:* от 0 до 1% в день\n*Возраст:* от 18 лет\n\n*Условия займа под 0%:*\nЗайм под 0% выдается только если вы берете займ в этой организации первый раз. До 30 000 руб. и до 21 дня.\n\n*Подтверждение личности*:\nПаспорт', reply_markup: {inline_keyboard: [[{text: 'Получить деньги', url: 'https://go.leadgid.ru/aff_c?aff_id=89075&offer_id=5853'}],[{text: 'Далее [5] ➡️', callback_data: 'dalee5'}],],}, parse_mode: 'Markdown'})
    await update(child(ref(db), 'users/' + ctx.chat.id), {'msg_id': mes.message_id})
})
bot.action('dalee4', async (ctx) => {
    let mesid = await get(child(ref(db), "users/" + ctx.chat.id + '/msg_id'))
    mesid = mesid.val();
    await ctx.deleteMessage(mesid)
    let mes = await ctx.replyWithPhoto({source: './image/fast_money.jpg'}, {caption: '*✅ Доступен займ под 0%*\n\n*Займ:* от 1 000 до 15 000 руб.\n*Срок:* от 7 до 30 дней\n*Процент:* 1% в день\n*Возраст:* от 18 лет\n\n*Условия займа под 0%:*\nЗайм под 0% выдается только если вы берете займ в этой организации первый раз. До 15 000 руб. и до 30 дней', reply_markup: {inline_keyboard: [[{text: 'Получить деньги', url: 'https://go.leadgid.ru/aff_c?aff_id=89075&offer_id=4464'}],[{text: '⬅️ Назад [2]', callback_data: 'nazad2'},{text: 'Далее [3] ➡️', callback_data: 'dalee3'}],],}, parse_mode: 'Markdown'})
    await update(child(ref(db), 'users/' + ctx.chat.id), {'msg_id': mes.message_id})
})
bot.action('nazad2', async (ctx) => {
    let mesid = await get(child(ref(db), "users/" + ctx.chat.id + '/msg_id'))
    mesid = mesid.val();
    await ctx.deleteMessage(mesid)
   let mes = await ctx.replyWithPhoto({source: './image/belka_kredit.jpg'}, {caption: '*✅ Доступен займ под 0%*\n\n*Займ:* от 1 000 до 30 000 рублей\n*Срок:* От 7 до 30 дней\n*Процент:* от 0% на 10 дней\n*Возраст:* от 18 до 75 лет\n\n*Условия займа под 0%:*\nЗайм под 0% выдается только если вы берете займ в этой организации первый раз. До 30 000 руб. и до 10 дней.', reply_markup: {inline_keyboard: [[{text: 'Получить денег', url: 'https://go.leadgid.ru/aff_c?aff_id=89075&offer_id=4472'}], [{text: '⬅️ Назад [1]', callback_data: 'money_man'}, {text: 'Далее [4] ➡️', callback_data: 'dalee4'}],],}, parse_mode: 'markdown'})
   await update(child(ref(db), 'users/' + ctx.chat.id), {'msg_id': mes.message_id})
})
bot.action('dalee3', async (ctx) => {
    let mesid = await get(child(ref(db), "users/" + ctx.chat.id + '/msg_id'))
    mesid = mesid.val();
    await ctx.deleteMessage(mesid)
    let mes = await ctx.replyWithPhoto({source: './image/orange_zaym.jpg'}, {caption: '*✅ Доступен займ под 0%*\n\n*Займ:* от 2 000 до 30 000 руб.\n*Срок:* от 7 до 30 дней\n*Процент:* от 0% в день, 1% в день далее\n*Возраст:* от 18 лет\n\n*Условия займа под 0%:*\nЗайм под 0% выдается только если вы берете займ в этой организации первый раз. До 30 000 руб. и до 7 дней.', reply_markup: {inline_keyboard: [[{text: 'Получить деньги', url: 'https://go.leadgid.ru/aff_c?aff_id=89075&offer_id=3331'}],[{text: '⬅️ Назад [3]', callback_data: 'nazad3'},{text: 'Далее [2] ➡️', callback_data: 'dalee2'}],],}, parse_mode: 'Markdown'})
    await update(child(ref(db), 'users/' + ctx.chat.id), {'msg_id': mes.message_id})
})
bot.action('nazad3', async (ctx) => {
    let mesid = await get(child(ref(db), "users/" + ctx.chat.id + '/msg_id'))
    mesid = mesid.val();
    await ctx.deleteMessage(mesid)
    let mes = await ctx.replyWithPhoto({source: './image/fast_money.jpg'}, {caption: '*✅ Доступен займ под 0%*\n\n*Займ:* от 1 000 до 15 000 руб.\n*Срок:* от 7 до 30 дней\n*Процент:* 1% в день\n*Возраст:* от 18 лет\n\n*Условия займа под 0%:*\nЗайм под 0% выдается только если вы берете займ в этой организации первый раз. До 15 000 руб. и до 30 дней', reply_markup: {inline_keyboard: [[{text: 'Получить деньги', url: 'https://go.leadgid.ru/aff_c?aff_id=89075&offer_id=4464'}],[{text: '⬅️ Назад [2]', callback_data: 'nazad2'},{text: 'Далее [3] ➡️', callback_data: 'dalee3'}],],}, parse_mode: 'Markdown'})
    await update(child(ref(db), 'users/' + ctx.chat.id), {'msg_id': mes.message_id})
})
bot.action('dalee2', async (ctx) => {
    let mesid = await get(child(ref(db), "users/" + ctx.chat.id + '/msg_id'))
    mesid = mesid.val();
    await ctx.deleteMessage(mesid)
    let mes = await ctx.replyWithPhoto({source: './image/nado_money.jpg'}, {caption: '*✅ Доступен займ под 0%*\n\n*Займ:* от 1 000 до 30 000 руб.\n*Срок:* от 7 до 30 дней\n*Процент:* от 0% до 1% в день\n*Возраст:* от 18 лет\n\n*Условия займа под 0%:*\nЗайм под 0% выдается только если вы берете займ в этой организации первый раз. До 30 000 руб. и до 7 дней.', reply_markup: {inline_keyboard: [[{text: 'Получить деньги', url: 'https://go.leadgid.ru/aff_c?aff_id=89075&offer_id=4946'}],[{text: '⬅️ Назад [4]', callback_data: 'nazad4'},{text: 'Далее [1] ➡️', callback_data: 'dalee1'}],],}, parse_mode: 'Markdown'})
    await update(child(ref(db), 'users/' + ctx.chat.id), {'msg_id': mes.message_id})
})
bot.action('nazad4', async (ctx) => {
    let mesid = await get(child(ref(db), "users/" + ctx.chat.id + '/msg_id'))
    mesid = mesid.val();
    await ctx.deleteMessage(mesid)
    let mes = await ctx.replyWithPhoto({source: './image/orange_zaym.jpg'}, {caption: '*✅ Доступен займ под 0%*\n\n*Займ:* от 2 000 до 30 000 руб.\n*Срок:* от 7 до 30 дней\n*Процент:* от 0% в день, 1% в день далее\n*Возраст:* от 18 лет\n\n*Условия займа под 0%:*\nЗайм под 0% выдается только если вы берете займ в этой организации первый раз. До 30 000 руб. и до 7 дней.', reply_markup: {inline_keyboard: [[{text: 'Получить деньги', url: 'https://go.leadgid.ru/aff_c?aff_id=89075&offer_id=3331'}],[{text: '⬅️ Назад [3]', callback_data: 'nazad3'},{text: 'Далее [2] ➡️', callback_data: 'dalee2'}],],}, parse_mode: 'Markdown'})
    await update(child(ref(db), 'users/' + ctx.chat.id), {'msg_id': mes.message_id})
})
bot.action('dalee1', async (ctx) => {
    let mesid = await get(child(ref(db), "users/" + ctx.chat.id + '/msg_id'))
    mesid = mesid.val();
    await ctx.deleteMessage(mesid)
    let mes = await ctx.replyWithPhoto({source: './image/vivus_zaym.jpg'}, {caption: '*✅ Доступен займ под 0%*\n\n*Займ:* от 3 000 руб. до 100 000 руб.\n*Срок:* от 1 до 365 дней\n*Процент:* 0% (новым клиентам) от 0,5% до 1%\n*Возраст:* от 18 лет\n\n*Условия займа под 0%:*\nЗайм под 0% выдается только если вы берете займ в этой организации первый раз. До 30 000 руб. и до 7 дней.', reply_markup: {inline_keyboard: [[{text: 'Получить деньги', url: 'https://go.leadgid.ru/aff_c?aff_id=89075&offer_id=1782'}],[{text: '⬅️ Назад [5]', callback_data: 'nazad5'}],],}, parse_mode: 'Markdown'})
    await update(child(ref(db), 'users/' + ctx.chat.id), {'msg_id': mes.message_id})
})
bot.action('nazad5', async (ctx) => {
    let mesid = await get(child(ref(db), "users/" + ctx.chat.id + '/msg_id'))
    mesid = mesid.val();
    await ctx.deleteMessage(mesid)
    let mes = await ctx.replyWithPhoto({source: './image/nado_money.jpg'}, {caption: '*✅ Доступен займ под 0%*\n\n*Займ:* от 1 000 до 30 000 руб.\n*Срок:* от 7 до 30 дней\n*Процент:* от 0% до 1% в день\n*Возраст:* от 18 лет\n\n*Условия займа под 0%:*\nЗайм под 0% выдается только если вы берете займ в этой организации первый раз. До 30 000 руб. и до 7 дней.', reply_markup: {inline_keyboard: [[{text: 'Получить деньги', url: 'https://go.leadgid.ru/aff_c?aff_id=89075&offer_id=4946'}],[{text: '⬅️ Назад [4]', callback_data: 'nazad4'},{text: 'Далее [1] ➡️', callback_data: 'dalee1'}],],}, parse_mode: 'Markdown'})
    await update(child(ref(db), 'users/' + ctx.chat.id), {'msg_id': mes.message_id})
})
bot.hears('⚒ Помощь', async (ctx) => {
    const inkeyboard2 = {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: '❓ Как пользоваться ботом ❓', url: 'https://telegra.ph'}
                ],
                [
                    {text: '❓ Как точно получить займ ❓', url: 'https://telegra.ph'}
                ],
                [
                    {text: '🔅 Обратиться в тех поддержку', url: 'https://support.com'}
                ],
                [
                    {text: '🔅 Предложить идеи по улучшению', url: 'https://support.com'}
                ]
            ]
        }
    }
    ctx.reply('Как я могу тебе помочь?', inkeyboard2)
})
bot.hears('📊 Мониторинг МФО', async (ctx) => {
    const inkeyboard2 = {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: '✅ Запустить', callback_data: 'monitoring'}
                ],
            ],
        }, parse_mode: 'HTML'
    }
    ctx.reply('📊 Запуск мониторинга МФО...\n\nМониторинг МФО - модуль, позволяющий в реальном времени наблюдать за статистикой той или иной организации. \n\nКруглосуточно бот собирает информацию об одобренных займах, выявляет среднее значение и выдает результат.\n\n❗️ Вы увидите предложения из всевозможных стран.\n\nНажмите на кнопку "Запустить"', inkeyboard2)
})
bot.action('monitoring', async (ctx) => {
    const inkeyboard2 = {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: '❌ Закрыть сообщение', callback_data: 'close_mes'}
                ],
            ],
        }, parse_mode: 'HTMl'
    }
    const mes = await ctx.editMessageText('<b>Название МФО - Процент одобренных займов</b>\n\n<b>🇷🇺 [0%]</b> MoneyMan - 26.5%\n<b>🇷🇺 [0%]</b> Быстроденьги - 24.07%\n🇷🇺 Vivus - 7.26%\n<b>🇷🇺 [0%]</b> BelkaCredit - 28.57%\n<b>🇷🇺 [0%]</b> Займ-Экспресс - 19.35%\n\n❗️ В дальнейшем список МФО с низким процентом будет пополняться', inkeyboard2)
    await update(child(ref(db), 'users/' + ctx.chat.id), {'msg_id': mes.message_id})
})
bot.action('close_mes', async (ctx) => {
    try{
        let mesid = await get(child(ref(db), "users/" + ctx.chat.id + '/msg_id'))
    mesid = mesid.val();
    await ctx.deleteMessage(mesid)
    await ctx.reply('Успешно закрыто')
    } catch(e) {
        console.log(e)
    }
})
bot.launch()