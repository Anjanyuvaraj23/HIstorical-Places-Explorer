class HistoryChatbot {
    constructor() {
        this.chatMessages = document.getElementById('chat-messages');
        this.userInput = document.getElementById('user-input');
        this.sendButton = document.getElementById('send-btn');
        this.geminiApiKey = 'AIzaSyD538_RgAWhwtzKuOkLeo2HUyWN435yQ24'; // Your Gemini API key
        this.useFallback = false; // Set to true to use fallback data instead of API

        this.init();
    }

    init() {
        this.sendButton.addEventListener('click', () => this.handleUserInput());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleUserInput();
            }
        });

        // Add click handlers for suggestion chips
        document.querySelectorAll('.suggestion-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                this.userInput.value = chip.textContent.trim();
                this.handleUserInput();
            });
        });

        this.addBotMessage('Hello! I can help you learn about the history of places around the world. Just ask me about any location!');
    }

    async handleUserInput() {
        const userMessage = this.userInput.value.trim();
        if (!userMessage) return;

        this.addUserMessage(userMessage);
        this.userInput.value = '';

        // Show typing indicator
        this.addTypingIndicator();

        try {
            let response;
            if (this.useFallback) {
                // Use fallback data for testing
                response = this.getFallbackHistoricalInfo(userMessage);
                this.removeTypingIndicator();
                this.addBotMessage(response);
            } else {
                // Try to use the API
                response = await this.getHistoricalInfo(userMessage);
                this.removeTypingIndicator();
                this.addBotMessage(response);
            }
        } catch (error) {
            this.removeTypingIndicator();
            console.error('Error details:', error);
            
            // More specific error message based on the error
            if (error.response && error.response.status === 403) {
                this.addBotMessage('API access denied. Please check your Gemini API key.');
            } else if (error.response && error.response.status === 429) {
                this.addBotMessage('Too many requests. Please try again in a moment.');
            } else if (error.message && error.message.includes('Network Error')) {
                this.addBotMessage('Network error. Please check your internet connection.');
            } else {
                this.addBotMessage('Sorry, I had trouble finding information about that. Please try again!');
            }
        }
    }

    getFallbackHistoricalInfo(query) {
        // Fallback data for testing when API fails
        const fallbackData = {
            'paris': `# Historical Overview of Paris

Paris, the capital of France, has a rich and fascinating history spanning over 2,000 years.

## Early History
- Founded by the Parisii, a Celtic tribe, around 250 BC
- Conquered by the Romans in 52 BC and renamed Lutetia
- Became the capital of the Frankish kingdom under Clovis I in 508 AD

## Medieval Period
- Flourished as a center of learning and culture during the Middle Ages
- Home to the famous Notre-Dame Cathedral, completed in 1345
- Site of numerous royal palaces and the University of Paris

## French Revolution
- The storming of the Bastille on July 14, 1789, marked the beginning of the French Revolution
- King Louis XVI and Queen Marie Antoinette were executed
- The monarchy was abolished and France became a republic

## 19th Century
- Napoleon Bonaparte crowned himself Emperor in Notre-Dame in 1804
- The city underwent major urban renewal under Baron Haussmann
- The Eiffel Tower was built for the 1889 World's Fair

## 20th Century
- Occupied by Nazi Germany during World War II (1940-1944)
- Liberated by Allied forces in August 1944
- Became a center of art, fashion, and intellectual thought

## Notable Landmarks
- Eiffel Tower (1889)
- Notre-Dame Cathedral (1345)
- The Louvre Museum (1793)
- Arc de Triomphe (1836)
- Sacré-Cœur Basilica (1914)
- Palace of Versailles (1682)

Paris continues to be one of the world's most visited cities and a global center for art, fashion, gastronomy, and culture.`,
            'new york': `# Historical Overview of New York City

New York City, often called "The Big Apple," has a rich and diverse history that reflects the broader story of America.

## Early History
- Originally inhabited by the Lenape Native Americans
- First European settlement established by the Dutch in 1624 as New Amsterdam
- Taken over by the English in 1664 and renamed New York

## Colonial Period
- Became a major trading port under British rule
- Site of significant battles during the American Revolution
- Briefly served as the capital of the United States (1785-1790)

## 19th Century Growth
- Population exploded with waves of immigration from Europe
- Construction of the Erie Canal (1825) connected NYC to the Great Lakes
- Development of iconic neighborhoods like Chinatown and Little Italy
- The Statue of Liberty was dedicated in 1886

## The Gilded Age
- Emergence of iconic skyscrapers like the Flatiron Building (1902)
- Construction of the Brooklyn Bridge (1883)
- Establishment of Central Park (1858)
- Rise of Wall Street as a financial center

## 20th Century
- Construction of the Empire State Building (1931)
- Opening of the United Nations headquarters (1952)
- Construction of the World Trade Center (1973)
- Financial crisis of the 1970s and urban renewal

## 21st Century
- September 11, 2001 terrorist attacks destroyed the World Trade Center
- Construction of One World Trade Center (2014)
- Continued growth as a global financial and cultural center

## Notable Landmarks
- Statue of Liberty (1886)
- Empire State Building (1931)
- Central Park (1858)
- Times Square
- Brooklyn Bridge (1883)
- One World Trade Center (2014)
- Grand Central Terminal (1913)

New York City remains one of the world's most influential cities, a melting pot of cultures, and a global center for finance, arts, and media.`,
            'rome': `# Historical Overview of Rome

Rome, the Eternal City, has a history spanning over 2,500 years and was the center of one of the greatest civilizations in history.

## Ancient Rome
- Founded according to legend by Romulus in 753 BC
- Evolved from a monarchy to a republic (509 BC) and then an empire (27 BC)
- Under Emperor Augustus, began the Pax Romana, a period of relative peace and prosperity
- At its peak, the Roman Empire controlled territory from Britain to Egypt

## Roman Republic
- Governed by elected officials and the Senate
- Expansion through military conquest across the Mediterranean
- Development of Roman law, engineering, and military tactics
- Civil wars between powerful generals like Julius Caesar and Pompey

## Roman Empire
- Established by Augustus in 27 BC
- Construction of iconic structures like the Colosseum (70-80 AD)
- Development of extensive road networks and aqueducts
- Spread of Roman culture, language, and law across Europe

## Decline and Fall
- Internal instability, economic problems, and external invasions
- Split into Eastern and Western Empires in 395 AD
- Sacked by Visigoths in 410 AD
- Traditional fall date of the Western Empire in 476 AD

## Medieval and Renaissance Rome
- Became the center of the Catholic Church
- Construction of St. Peter's Basilica (1506-1626)
- Patronage of artists like Michelangelo and Raphael
- Development of Baroque architecture

## Modern Rome
- Became the capital of unified Italy in 1871
- Under fascist rule during Mussolini's regime (1922-1943)
- Hosted the 1960 Summer Olympics
- Continues to be a major tourist destination and cultural center

## Notable Landmarks
- Colosseum (70-80 AD)
- Roman Forum
- Pantheon (126 AD)
- St. Peter's Basilica (1506-1626)
- Trevi Fountain (1762)
- Spanish Steps (1725)
- Vatican Museums

Rome's influence on law, government, art, architecture, and culture continues to be felt throughout the world today.`,
            'tokyo': `# Historical Overview of Tokyo

Tokyo, the capital of Japan, has a fascinating history that reflects Japan's transformation from a feudal society to a modern global power.

## Early History
- Originally a small fishing village called Edo
- Built around Edo Castle, which was constructed in 1457
- Located in the Kanto region of Japan

## Tokugawa Period (1603-1868)
- Became the de facto capital when Tokugawa Ieyasu established his shogunate in Edo
- Grew into one of the world's largest cities with a population of over 1 million
- Developed a vibrant urban culture with theaters, restaurants, and entertainment districts
- Strict social hierarchy with samurai at the top

## Meiji Restoration (1868)
- Emperor Meiji moved from Kyoto to Edo, renaming it Tokyo ("Eastern Capital")
- Rapid modernization and Westernization
- Construction of Western-style buildings and infrastructure
- Development of industry and military power

## Early 20th Century
- Survived the Great Kanto Earthquake of 1923
- Became a center of political and economic power
- Development of modern transportation systems
- Growth of the middle class and consumer culture

## World War II
- Heavily bombed by Allied forces, with large parts of the city destroyed
- Emperor Hirohito announced Japan's surrender on August 15, 1945
- Occupied by American forces until 1952

## Post-War Recovery
- Rapid economic growth during the 1950s and 1960s
- Hosted the 1964 Summer Olympics
- Development of modern infrastructure and skyscrapers
- Emergence as a global economic power

## Modern Tokyo
- One of the world's largest metropolitan economies
- Center of Japanese pop culture, fashion, and technology
- Known for its efficient public transportation
- Blend of ultramodern and traditional architecture

## Notable Landmarks
- Tokyo Skytree (2012)
- Senso-ji Temple (628)
- Imperial Palace
- Shibuya Crossing
- Tsukiji Outer Market
- Meiji Shrine (1920)
- Tokyo Tower (1958)

Tokyo continues to be a global center for technology, finance, and culture, while preserving its rich historical heritage.`
        };

        // Convert query to lowercase for case-insensitive matching
        const queryLower = query.toLowerCase();
        
        // Check if we have fallback data for this query
        for (const key in fallbackData) {
            if (queryLower.includes(key)) {
                return fallbackData[key];
            }
        }
        
        // Generic fallback response if no specific data is available
        return `# Historical Overview of ${query}

While I don't have specific historical data for ${query}, here are some general points about this location:

## General Information
- Historical significance varies based on the specific location
- Local culture and traditions have evolved over time
- The area has likely experienced various historical events

## Notable Aspects
- Cultural heritage and traditions
- Architectural styles and historical buildings
- Local customs and practices
- Historical figures associated with the region

For more accurate information, please try a well-known city or historical site.`;
    }

    async getHistoricalInfo(query) {
        try {
            console.log('Sending request to Gemini API for:', query);
            
            const prompt = `Provide a detailed and engaging historical overview of ${query}. 
            Format the response with clear sections using markdown:
            - Use # for main title
            - Use ## for section headers
            - Use bullet points for lists
            - Include dates and key events
            - Highlight important terms in **bold**
            - Add [links] to relevant historical sites or museums
            - Include a brief summary at the end
            
            Focus on:
            1. Early History
            2. Key Events
            3. Cultural Significance
            4. Notable Landmarks
            5. Modern Impact

            If the query is not about a location or place, respond with:
            "I can only provide historical information about locations and places. Please ask about a specific city, country, landmark, or historical site."`;

            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.geminiApiKey}`,
                {
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Gemini API response:', response.data);

            if (response.data && response.data.candidates && response.data.candidates[0]) {
                return response.data.candidates[0].content.parts[0].text;
            } else {
                console.error('Unexpected response format:', response.data);
                return `I couldn't find specific historical information about "${query}". Try asking about something else!`;
            }
        } catch (error) {
            console.error('Error fetching historical information:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
            }
            throw error;
        }
    }

    addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'flex justify-end mb-4 message-animation';
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateX(20px)';
        messageDiv.innerHTML = `
            <div class="bg-blue-500 text-white rounded-2xl py-3 px-4 max-w-[70%] shadow-sm hover:shadow-md transition-all duration-300">
                ${this.escapeHtml(message)}
            </div>
        `;
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Trigger animation
        requestAnimationFrame(() => {
            messageDiv.style.transition = 'all 0.3s ease-out';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateX(0)';
        });
    }

    addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'flex justify-start mb-4 message-animation';
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateX(-20px)';
        
        // Format the message with markdown
        const formattedMessage = this.formatMessage(message);
        
        messageDiv.innerHTML = `
            <div class="bg-gray-100 text-gray-800 rounded-2xl py-3 px-4 max-w-[70%] shadow-sm hover:shadow-md transition-all duration-300">
                <div class="markdown-content">${formattedMessage}</div>
            </div>
        `;
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Trigger animation
        requestAnimationFrame(() => {
            messageDiv.style.transition = 'all 0.3s ease-out';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateX(0)';
        });
    }

    formatMessage(message) {
        // First, clean up any existing HTML classes that might be in the message
        message = message.replace(/class="[^"]*"/g, '');
        
        // Convert markdown to HTML with enhanced styling
        let formatted = message
            // Headers
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            
            // Lists
            .replace(/^\s*[-*+]\s+(.*$)/gm, '<li>$1</li>')
            .replace(/^\s*\d+\.\s+(.*$)/gm, '<li>$1</li>')
            
            // Bold and Italic
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            
            // Links
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
            
            // Code blocks
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            
            // Paragraphs
            .replace(/\n\n/g, '</p><p>')
            
            // Line breaks
            .replace(/\n/g, '<br>');

        // Wrap in paragraph tags if not already wrapped
        if (!formatted.startsWith('<')) {
            formatted = `<p>${formatted}</p>`;
        }

        // Clean up any remaining class attributes
        formatted = formatted.replace(/class="[^"]*"/g, '');
        
        return formatted;
    }

    addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'flex justify-start mb-4 message-animation';
        typingDiv.style.opacity = '0';
        typingDiv.style.transform = 'translateX(-20px)';
        typingDiv.innerHTML = `
            <div class="bg-gray-100 text-gray-800 rounded-2xl py-3 px-4">
                <div class="typing-indicator flex gap-2">
                    <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                    <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></span>
                </div>
            </div>
        `;
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
        
        // Trigger animation
        requestAnimationFrame(() => {
            typingDiv.style.transition = 'all 0.3s ease-out';
            typingDiv.style.opacity = '1';
            typingDiv.style.transform = 'translateX(0)';
        });
    }

    removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.style.opacity = '0';
            typingIndicator.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                typingIndicator.remove();
            }, 300);
        }
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    scrollToBottom() {
        const scrollOptions = {
            top: this.chatMessages.scrollHeight,
            behavior: 'smooth'
        };
        this.chatMessages.scrollTo(scrollOptions);
    }
}

// Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new HistoryChatbot();
}); 
