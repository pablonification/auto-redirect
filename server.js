const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Add debugging for deployment
console.log('Environment variables:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DESTINATION_URL:', process.env.DESTINATION_URL);
console.log('PORT:', process.env.PORT);

// Middleware to parse JSON
app.use(express.json());

// Function to detect social media crawlers
function isSocialMediaCrawler(userAgent) {
    if (!userAgent) return false;
    
    const socialMediaBots = [
        'facebookexternalhit',
        'facebookcatalog',
        'twitterbot',
        'linkedinbot',
        'whatsapp',
        'telegrambot',
        'discordbot',
        'slackbot',
        'redditbot',
        'pinterest',
        'instagram',
        'tiktok',
        'snapchat',
        'line',
        'wechat',
        'qq',
        'baiduspider',
        'googlebot',
        'bingbot',
        'yandexbot',
        'duckduckbot',
        'slurp',
        'ia_archiver'
    ];
    
    const lowerUserAgent = userAgent.toLowerCase();
    return socialMediaBots.some(bot => lowerUserAgent.includes(bot.toLowerCase()));
}

// Main route - serve HTML for social media crawlers, redirect for regular users
app.get('/', (req, res) => {
    const userAgent = req.headers['user-agent'];
    const isSocialBot = isSocialMediaCrawler(userAgent);
    
    console.log('Request received');
    console.log('User-Agent:', userAgent);
    console.log('Is social media crawler:', isSocialBot);
    
    if (isSocialBot) {
        console.log('Serving HTML page for social media crawler');
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } else {
        const destinationUrl = process.env.DESTINATION_URL;
        
        if (!destinationUrl) {
            console.error('DESTINATION_URL not configured');
            return res.status(500).json({
                error: 'DESTINATION_URL not configured in environment variables'
            });
        }
        
        console.log('Redirecting regular user to:', destinationUrl);
        res.redirect(301, destinationUrl);
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        destination: process.env.DESTINATION_URL || 'Not configured',
        timestamp: new Date().toISOString()
    });
});

// Serve static files only for specific routes
app.use('/static', express.static('public'));

// Fallback route to serve HTML if redirect fails
app.get('/fallback', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Catch-all route for any other paths
app.get('*', (req, res) => {
    const userAgent = req.headers['user-agent'];
    const isSocialBot = isSocialMediaCrawler(userAgent);
    
    console.log('Catch-all request received for path:', req.path);
    console.log('User-Agent:', userAgent);
    console.log('Is social media crawler:', isSocialBot);
    
    if (isSocialBot) {
        console.log('Serving HTML page for social media crawler on catch-all route');
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } else {
        const destinationUrl = process.env.DESTINATION_URL;
        
        if (!destinationUrl) {
            console.error('DESTINATION_URL not configured');
            return res.status(500).json({
                error: 'DESTINATION_URL not configured in environment variables'
            });
        }
        
        console.log('Redirecting regular user to:', destinationUrl);
        res.redirect(301, destinationUrl);
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Auto-redirect server running on port ${PORT}`);
    console.log(`📡 Will redirect to: ${process.env.DESTINATION_URL || 'Not configured'}`);
    console.log(`🌐 Visit http://localhost:${PORT} to test the redirect`);
    console.log(`📱 Social media crawlers will see the HTML page with metadata`);
}); 