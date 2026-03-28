const translations = {
  en: {
    status_lost: "Lost Pet",
    found_title: 'You found "Bolinha"!',
    label_breed: "Breed",
    val_breed: "Beagle",
    label_age: "Age",
    val_age: "2 years",
    alert_title: "CRITICAL MEDICAL ALERT",
    alert_desc: "Bolinha is **highly allergic** to common pet food. Please, **DO NOT feed** him. He only consumes a specific veterinary diet.",
    found_desc: "The owner has been notified of your location and is anxious for the rescue.",
    btn_chat: "Message the Owner ✉️",
    footer_note: "Protected by the Back2me Global network.<br>Your connection is secure and anonymous.",
    chat_title: "Secure Chat",
    chat_subtitle: "Connected with the Owner",
    input_placeholder: "Type your message...",
    btn_title_photo: "Send Photo",
    btn_title_location: "Share Location",
    btn_title_audio: "Record Audio",
    msg_owner_init: "Hi! Thanks for scanning the tag. I'm the owner of this pet. Where did you find him?",
    msg_owner_reply: "Location received! I'm on my way to pick him up. Thank you so much!",
    loc_msg: "My current location:",
    loc_btn: "View on Google Maps ➔",
    loc_error: "Unable to get your location. Please authorize access.",
    loc_unsupported: "Your browser does not support geolocation."
  },
  pt: {
    status_lost: "Pet Perdido",
    found_title: 'Você encontrou o "Bolinha"!',
    label_breed: "Raça",
    val_breed: "Beagle",
    label_age: "Idade",
    val_age: "2 anos",
    alert_title: "ALERTA MÉDICO CRÍTICO",
    alert_desc: "O Bolinha é **altamente alérgico** a rações comuns. Por favor, **NÃO dê comida** a ele. Ele só consome uma dieta veterinária específica.",
    found_desc: "O proprietário já foi notificado da sua localização e está ansioso para o resgate.",
    btn_chat: "Falar com o Proprietário ✉️",
    footer_note: "Protegido pela rede global Back2me.<br>Sua conexão é segura e anônima.",
    chat_title: "Chat Seguro",
    chat_subtitle: "Conectado com o Proprietário",
    input_placeholder: "Digite sua mensagem...",
    btn_title_photo: "Enviar Foto",
    btn_title_location: "Compartilhar Localização",
    btn_title_audio: "Gravar Áudio",
    msg_owner_init: "Olá! Obrigado por escanear o código. Eu sou o dono deste pet. Onde você o encontrou?",
    msg_owner_reply: "Localização recebida! Estou a caminho para retirá-lo. Muito obrigado!",
    loc_msg: "Minha localização atual:",
    loc_btn: "Ver no Google Maps ➔",
    loc_error: "Não foi possível obter sua localização. Por favor, autorize o acesso.",
    loc_unsupported: "Seu navegador não suporta geolocalização."
  }
};

let currentLang = 'en';

function setLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      element.innerHTML = translations[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      element.placeholder = translations[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-title]').forEach(element => {
    const key = element.getAttribute('data-i18n-title');
    if (translations[lang] && translations[lang][key]) {
      element.title = translations[lang][key];
    }
  });

  localStorage.setItem('back2me-poc-lang', lang);
  const switcher = document.getElementById('lang-switcher');
  if (switcher) switcher.value = lang;
}

document.addEventListener('DOMContentLoaded', () => {
  const btnStartChat = document.getElementById('btn-start-chat');
  const viewFound = document.getElementById('view-found');
  const viewChat = document.getElementById('view-chat');
  const chatInput = document.getElementById('chat-input');
  const btnSend = document.getElementById('btn-send');
  const chatMessages = document.getElementById('chat-messages');
  const btnAttach = document.getElementById('btn-attach');
  const photoInput = document.getElementById('photo-input');
  const btnRecord = document.getElementById('btn-record');
  const btnLocation = document.getElementById('btn-location');

  // Language switcher
  const langSwitcher = document.getElementById('lang-switcher');
  if (langSwitcher) {
    langSwitcher.addEventListener('change', (e) => setLanguage(e.target.value));
  }
  
  // Auto-detection
  const savedLang = localStorage.getItem('back2me-poc-lang');
  const browserLang = navigator.language.startsWith('pt') ? 'pt' : 'en';
  setLanguage(savedLang || browserLang);

  // Transition to Chat
  btnStartChat.addEventListener('click', () => {
    viewFound.style.display = 'none';
    viewChat.style.display = 'block';
    
    // Initial message from owner
    setTimeout(() => {
      addMessage('bot', translations[currentLang].msg_owner_init);
    }, 500);

    // Trigger animation for chat
    viewChat.style.animation = 'fadeIn 0.5s ease-out';
  });

  // Photo Upload
  btnAttach.addEventListener('click', () => photoInput.click());
  photoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        addMessage('user', `<img src="${event.target.result}" class="message-img">`);
        simulateReply(translations[currentLang].msg_owner_reply);
      };
      reader.readAsDataURL(file);
    }
  });

  // Audio Recording (Mock)
  btnRecord.addEventListener('click', () => {
    const originalText = btnRecord.textContent;
    btnRecord.textContent = '🔴';
    btnRecord.style.color = '#ff1744';
    
    setTimeout(() => {
      btnRecord.textContent = originalText;
      btnRecord.style.color = '';
      addMessage('user', `
        <div class="voice-message">
          <span>▶️</span>
          <div class="waveform"></div>
          <span>0:03</span>
        </div>
      `);
      simulateReply(translations[currentLang].msg_owner_reply);
    }, 2000);
  });

  // Location Sharing
  btnLocation.addEventListener('click', () => {
    if (!navigator.geolocation) {
      alert(translations[currentLang].loc_unsupported);
      return;
    }

    btnLocation.style.color = '#D4AF37';
    
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
      
      addMessage('user', `
        ${translations[currentLang].loc_msg}
        <div class="location-preview">
          <div class="map-placeholder"></div>
          <a href="${mapUrl}" target="_blank" class="location-link">${translations[currentLang].loc_btn}</a>
        </div>
      `);
      
      simulateReply(translations[currentLang].msg_owner_reply);
      btnLocation.style.color = '';
    }, (error) => {
      alert(translations[currentLang].loc_error);
      btnLocation.style.color = '';
    });
  });

  // Unified message adding
  const addMessage = (type, html) => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = html;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const simulateReply = (text) => {
    setTimeout(() => {
      addMessage('bot', text);
    }, 1500);
  };

  // Sending Messages
  const sendMessage = () => {
    const text = chatInput.value.trim();
    if (text === '') return;

    addMessage('user', text);
    chatInput.value = '';

    // Simulate Owner Reply
    simulateReply("Excelente! Muito obrigado. Posso ir buscar agora? Onde exatamente você está?");
  };

  btnSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
});
