    /* Maps */
    const map = L.map('map').setView([-7.938746, -34.824908], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([-7.938746, -34.824908])
        .addTo(map)
        .bindPopup('Mercadinho Air<br>Avenida Doutor Cláudio José Gueiros Leite.')
        .openPopup();


    /* Footer */
    document.getElementById('year').textContent = new Date().getFullYear();

    /* Chatbot */
    const chatbotIcon = document.getElementById("chatbot-icon");
    const chatbotPopup = document.getElementById("chatbot-popup");
    const closeButton = document.getElementById("close-chat");
    const sendButton = document.getElementById("send-message");
    const userMessageInput = document.getElementById("user-message");
    const chatbotMessages = document.getElementById("chatbot-messages");

    const topics = [
    "Como nosso serviço pode ajudar você?",
    "Quais são as opções de preços disponíveis?",
    "Como posso fazer meu pedido de maneira simples?",
    "Preciso de ajuda personalizada, como posso obter?"
    ];
    
    const responses = [
        "Nosso serviço oferece soluções personalizadas e inovadoras para atender às suas necessidades, com foco em qualidade, eficiência e resultados duradouros.",
        "Os preços são flexíveis e adaptáveis, baseados nos produtos e serviços escolhidos. Oferecemos pacotes especiais e descontos para diferentes demandas.",
        "Você pode realizar seu pedido facilmente pelo nosso site, com uma navegação intuitiva. Basta selecionar o que deseja e finalizar a compra de forma rápida e segura.",
        "Se você precisar de uma orientação mais detalhada ou apoio exclusivo, nossa equipe está pronta para ajudá-lo. Entre em contato pelo WhatsApp: 4002-8922 ou envie um e-mail para contato@onn.digital para uma resposta ágil."
    ];


    let isGoodbye = false;

    chatbotIcon.addEventListener("click", () => {
        chatbotPopup.style.display = "block";
        openChat();
    });

    closeButton.addEventListener("click", () => {
        chatbotPopup.style.display = "none";
    });

    sendButton.addEventListener("click", () => {
        const userMessage = userMessageInput.value.trim();
        if (userMessage) {
            const userMessageElement = document.createElement('div');
            userMessageElement.classList.add('message-bubble', 'user-bubble');
            userMessageElement.innerHTML = `<strong>Você:</strong> ${userMessage}`;
            chatbotMessages.appendChild(userMessageElement);
            userMessageInput.value = '';

            if (isGoodbye) {
                showTopics(); 
                isGoodbye = false;
            } else {
                provideResponse(userMessage);
            }
        }
    });

    userMessageInput.addEventListener("keypress", (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });

    function openChat() {
        chatbotMessages.innerHTML = "<div class='message-bubble bot-bubble'><strong>Bot:</strong> Olá usuário(a)! Quais desses tópicos você gostaria de discutir?</div>";
        topics.forEach((topic, index) => {
            chatbotMessages.innerHTML += `<button class="topics-chatbot" onclick="selectTopic(${index})">${topic}</button>`;
        });
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function selectTopic(index) {
        const userMessageElement = document.createElement('div');
        userMessageElement.classList.add('message-bubble', 'user-bubble');
        userMessageElement.innerHTML = `<strong>Você:</strong> ${topics[index]}`;
        chatbotMessages.appendChild(userMessageElement);

        const botMessageElement = document.createElement('div');
        botMessageElement.classList.add('message-bubble', 'bot-bubble');
        botMessageElement.innerHTML = `<strong>Bot:</strong> ${responses[index]}`;
        chatbotMessages.appendChild(botMessageElement);
        
        const botFollowUpElement = document.createElement('div');
        botFollowUpElement.classList.add('message-bubble', 'bot-bubble');
        botFollowUpElement.innerHTML = '<strong>Bot:</strong> Algo mais que gostaria de discutir?';
        chatbotMessages.appendChild(botFollowUpElement);

        chatbotMessages.innerHTML += `<br><button class="topics-chatbot" onclick="showTopics()">Sim</button>`;
        chatbotMessages.innerHTML += `<button class="topics-chatbot" onclick="sayGoodbye()">Não</button>`;
        
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function showTopics() {
        chatbotMessages.innerHTML = "<div class='message-bubble bot-bubble'><strong>Bot:</strong> Olá usuário(a)! Quais desses tópicos você gostaria de discutir?</div>";
        topics.forEach((topic, index) => {
            chatbotMessages.innerHTML += `<button class="topics-chatbot" onclick="selectTopic(${index})">${topic}</button>`;
        });
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function sayGoodbye() {
        const botMessageElement = document.createElement('div');
        botMessageElement.classList.add('message-bubble', 'bot-bubble');
        botMessageElement.innerHTML = '<strong>Bot:</strong> Obrigado por conversar comigo! Até mais!';
        chatbotMessages.appendChild(botMessageElement);
        
        isGoodbye = true;

        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function provideResponse(userMessage) {
        const index = topics.findIndex(topic => topic.toLowerCase().includes(userMessage.toLowerCase()));
        const botMessageElement = document.createElement('div');

        if (index !== -1) {
            botMessageElement.classList.add('message-bubble', 'bot-bubble');
            botMessageElement.innerHTML = `<strong>Bot:</strong> ${responses[index]}`;
            chatbotMessages.appendChild(botMessageElement);
            
            const followUpMessage = document.createElement('div');
            followUpMessage.classList.add('message-bubble', 'bot-bubble');
            followUpMessage.innerHTML = '<strong>Bot:</strong> Algo mais que gostaria de discutir?';
            chatbotMessages.appendChild(followUpMessage);
            
            chatbotMessages.innerHTML += `<button class="topics-chatbot" onclick="showTopics()">Sim</button>`;
            chatbotMessages.innerHTML += `<button class="topics-chatbot" onclick="sayGoodbye()">Não</button>`;
        } else {
            botMessageElement.classList.add('message-bubble', 'bot-bubble');
            botMessageElement.innerHTML = `<strong>Bot:</strong> Desculpe, não entendi sua pergunta.`;
            chatbotMessages.appendChild(botMessageElement);
        }

        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    chatbotIcon.addEventListener("click", function() {
        chatbotPopup.classList.toggle("show");
    });
    

    /* Mensagem pro WhatsApp dos servicos */
    const serviceItems = document.querySelectorAll('.service-item');

    serviceItems.forEach(item => {
        item.addEventListener('click', () => {
            const serviceName = item.querySelector('h4').textContent;
            const message = `Olá, vim pelo site e gostaria de saber mais sobre o serviço: ${serviceName}`;
            const phoneNumber = '5581993861630';
            const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

            window.open(whatsappLink, '_blank');
        });
    });
    /* Mensagem pro WhatsApp do formulário */
    function sendToWhatsApp() {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
    
        if (!name || !email || !message) {
            alert("Por favor, preencha todos os campos antes de enviar.");
            return;
        }
    
        const whatsappMessage = `Olá! sou um potencial cliente e quero entrar em contato com vocês:
*Nome*: ${name}
*E-mail*: ${email}
*Mensagem*: ${message}`;
    
        const whatsappNumber = "+5581973428591";
        const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;
    
        window.open(whatsappURL, "_blank");
    }
