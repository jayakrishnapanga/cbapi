// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const axios = require('axios');

// const app = express();
// const port = 3001;

// app.use(bodyParser.json());
// app.use(cors({ origin: '*' }));

// app.get('/', (req, res) => {
//   res.send('hi');
// });


// app.post('/send-message', (req, res) => {
//     const currentMessage = req.body.currentMessage;
//     const recentMessage = req.body.recentMessage; // Retrieve the recent message from the request body
//     console.log('Received current message:', currentMessage);
//     console.log('Received recent message:', recentMessage);

//         let messages = [];
//     if (recentMessage) {
//         messages.push({
//             "role": "user",
//             "content": recentMessage
//         });
//     }

//     messages.push({
//         "role": "user",
//         "content": currentMessage
//     });

//     let data = JSON.stringify({
//         "model": "gpt-3.5-turbo",
//         "messages": messages
//     });

//     let config = {
//         method: 'post',
//         url: 'https://api.openai.com/v1/chat/completions',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer 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'
//         },
//         data: data
//     };

//     axios.request(config)
//         .then((response) => {
//             console.log('OpenAI response:', response.data);
//             console.log('ChatGPT content:', response.data.choices[0].message.content);
//             const content = response.data.choices[0].message.content;
//             res.json({ success: true, message: content });
//         })
//         .catch((error) => {
//             console.error('Error sending message to OpenAI:', error);
//             res.status(500).json({ success: false, message: 'Error sending message to OpenAI' });
//         });
// });



// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); // Import and configure dotenv

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
  res.send('hi');
});


app.post('/send-message', (req, res) => {
    const currentMessage = req.body.currentMessage;
    const recentMessage = req.body.recentMessage; 
    console.log('Received current message:', currentMessage);
    console.log('Received recent message:', recentMessage);

    let messages = [];
    if (recentMessage) {
        messages.push({
            "role": "user",
            "content": recentMessage
        });
    }

    messages.push({
        "role": "user",
        "content": currentMessage
    });

    let data = JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": messages
    });

    let config = {
        method: 'post',
        url: 'https://api.openai.com/v1/chat/completions',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` 
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log('OpenAI response:', response.data);
            console.log('ChatGPT content:', response.data.choices[0].message.content);
            const content = response.data.choices[0].message.content;
            res.json({ success: true, message: content });
        })
        .catch((error) => {
            console.error('Error sending message to OpenAI:', error);
            res.status(500).json({ success: false, message: 'Error sending message to OpenAI' });
        });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
