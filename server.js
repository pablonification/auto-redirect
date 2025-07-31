const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Main redirect route - redirects to DESTINATION_URL
app.get('/', (req, res) => {
    const destinationUrl = process.env.DESTINATION_URL;
    
    if (!destinationUrl) {
        return res.status(500).json({
            error: 'DESTINATION_URL not configured in environment variables'
        });
    }
    
    // Immediate redirect to the destination URL
    res.redirect(301, destinationUrl);
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

// Catch-all route for any other paths
app.get('*', (req, res) => {
    const destinationUrl = process.env.DESTINATION_URL;
    
    if (!destinationUrl) {
        return res.status(500).json({
            error: 'DESTINATION_URL not configured in environment variables'
        });
    }
    
    // Immediate redirect to the destination URL
    res.redirect(301, destinationUrl);
});

app.listen(PORT, () => {
    console.log(`🚀 Auto-redirect server running on port ${PORT}`);
    console.log(`📡 Will redirect to: ${process.env.DESTINATION_URL || 'Not configured'}`);
    console.log(`🌐 Visit http://localhost:${PORT} to test the redirect`);
}); 