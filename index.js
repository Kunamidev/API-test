const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/gemini-ai', async (req, res) => {
    const url = 'https://www.pinoygpt.com/gemini-ai/';
    
    try {
        const response = await axios.get(url);
        
        if (response.status === 200) {
            const $ = cheerio.load(response.data);
            
            // Extract relevant data. Adjust this part based on the actual content of the page.
            // This example assumes there's a div with class 'content' holding the main text.
            const contentDiv = $('.content');
            const content = contentDiv.text().trim() || "Content not found.";
            
            res.status(200).json({
                message: 'Content fetched successfully',
                content: content
            });
        } else {
            console.error(`Failed to fetch the page: ${response.status}`);
            res.status(response.status).json({ 
                message: 'Failed to fetch the page',
                error: `Received status code ${response.status}`
            });
        }
    } catch (error) {
        console.error('An error occurred while fetching the page:', error.message);
        res.status(500).json({ 
            message: 'An error occurred while fetching the page',
            error: error.message
        });
    }
});

app.get('/', (req, res) => {
    res.status(200).send('welcone to API');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
