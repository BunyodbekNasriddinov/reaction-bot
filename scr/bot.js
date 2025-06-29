const { Telegraf } = require('telegraf');
const axios = require('axios');

const BOT_TOKEN = '7418528350:AAEDIdLnFa8MNSbY74szV02P970GptOX8vM';

const bot = new Telegraf(BOT_TOKEN);

const bots = [
	{ token: '7418528350:AAEDIdLnFa8MNSbY74szV02P970GptOX8vM', emoji: '❤️‍🔥' },
	{ token: '7951286882:AAFBN1GiGVmKwyd9BpN-DTeOJ--twqX-NQo', emoji: '🔥' },
	{ token: '7656419597:AAExI_QcEK6BfJq-xWDfDmjLliEkOyEqWtI', emoji: '🌚' },
];

bot.start(async (ctx) => {
	const user = ctx.from;

	const msg = `
🟢 Yangi foydalanuvchi botni ishga tushirdi:

👤 Ismi: ${user.first_name || ''} ${user.last_name || ''}
🔗 Username: @${user.username || 'yo‘q'}
🆔 ID: ${user.id}
🌐 Til: ${user.language_code || 'nomaʼlum'}
`;

	// Adminga yuborish
	await ctx.telegram.sendMessage('1990124001', msg);
});

bot.on('channel_post', async (ctx) => {
	const message = ctx.channelPost;
	const chat_id = message.chat.id;
	const message_id = message.message_id;

	if (!message.sender_chat) return;

	for (const b of bots) {
		try {
			await axios.post(
				`https://api.telegram.org/bot${b.token}/setMessageReaction`,
				{
					chat_id,
					message_id,
					reaction: [{ type: 'emoji', emoji: b.emoji }],
				}
			);

			console.log(`✅ ${b.emoji} reaktsiya qo‘yildi`);
		} catch (err) {
			console.error(
				`❌ ${b.emoji} reaksiyada xatolik:`,
				err.response?.data || err.message
			);
		}
	}
});

bot.launch().then(() => {
	console.log('🤖 Bot ishga tushdi');
});
