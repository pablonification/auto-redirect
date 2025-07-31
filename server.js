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

// Main redirect route - redirects to DESTINATION_URL
app.get('/', (req, res) => {
    const destinationUrl = process.env.DESTINATION_URL;
    
    console.log('Redirect request received');
    console.log('Destination URL:', destinationUrl);
    console.log('Request headers:', req.headers);
    
    if (!destinationUrl) {
        console.error('DESTINATION_URL not configured');
        return res.status(500).json({
            error: 'DESTINATION_URL not configured in environment variables'
        });
    }
    
    console.log('Redirecting to:', destinationUrl);
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

// Fallback route to serve HTML if redirect fails
app.get('/fallback', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Catch-all route for any other paths
app.get('*', (req, res) => {
    const destinationUrl = process.env.DESTINATION_URL;
    
    console.log('Catch-all redirect request received for path:', req.path);
    console.log('Destination URL:', destinationUrl);
    
    if (!destinationUrl) {
        console.error('DESTINATION_URL not configured');
        return res.status(500).json({
            error: 'DESTINATION_URL not configured in environment variables'
        });
    }
    
    console.log('Redirecting to:', destinationUrl);
    // Immediate redirect to the destination URL
    res.redirect(301, destinationUrl);
});

app.listen(PORT, () => {
    console.log(`🚀 Auto-redirect server running on port ${PORT}`);
    console.log(`📡 Will redirect to: ${process.env.DESTINATION_URL || 'Not configured'}`);
    console.log(`🌐 Visit http://localhost:${PORT} to test the redirect`);
}); 