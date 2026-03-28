const translations = {
  en: {
    nav_login: "Login",
    hero_badge: "Global QR Protection Technology",
    hero_title: 'The Longest Second of <br> Your Life is Losing <span class="gradient-text">Someone.</span>',
    hero_subtitle: "Protect your pet, your luggage, and your family with smart tags that never run out of battery. Recover what you love in minutes.",
    hero_cta: "Secure My Protection Now ➔",
    prob_title: 'Why common tags <span class="gradient-text">fail?</span>',
    prob_1_title: "Batteries Die",
    prob_1_desc: "GPS trackers die right when you need them most. Back2me is passive and eternal.",
    prob_2_title: "App Barrier",
    prob_2_desc: "No one wants to download an app to return something. Our QR opens directly in any phone's browser.",
    prob_3_title: "Abusive Costs",
    prob_3_desc: "No $500 activation fees. Affordable protection for everything that matters.",
    how_title: 'The direct bridge <br> <span class="gradient-text">back home.</span>',
    how_subtitle: "When someone finds your item and scans the tag, the miracle happens in real-time:",
    how_1: "<strong>Secure Chat:</strong> Chat anonymously with whoever found the item.",
    how_2: "<strong>Instant GPS:</strong> Receive the exact scan location.",
    how_3: "<strong>Multimedia Proof:</strong> Ask for photos or audio to confirm the item's condition.",
    price_title: 'Choose your <span class="gradient-text">Peace of Mind.</span>',
    price_badge: "Launch Offer",
    price_plan: "Individual Smart Tag + Safety Plus Subscription",
    price_value: "$ 5.99",
    price_period: "/month",
    price_footer: "Physical tag included + Unlimited Global Protection",
    price_cta: "Subscribe Now ➔",
    price_cancel: "Cancel for free any time.",
    footer: "© 2026 Back2me Global. Protecting what is irreplaceable."
  },
  pt: {
    nav_login: "Entrar",
    hero_badge: "Tecnologia QR de Proteção Global",
    hero_title: 'O Segundo Mais Longo da <br> Sua Vida é o de <span class="gradient-text">Perder Alguém.</span>',
    hero_subtitle: "Proteja seu pet, sua bagagem e sua família com tags inteligentes que nunca ficam sem bateria. Recupere o que você ama em minutos.",
    hero_cta: "Garantir Minha Proteção Agora ➔",
    prob_title: 'Por que tags comuns <span class="gradient-text">falham?</span>',
    prob_1_title: "Baterias Acabam",
    prob_1_desc: "Rastreadores GPS morrem justo quando você mais precisa. A Back2me é passiva e eterna.",
    prob_2_title: "Barreira de Apps",
    prob_2_desc: "Ninguém quer baixar um app para devolver algo. Nosso QR abre direto no navegador de qualquer celular.",
    prob_3_title: "Custos Abusivos",
    prob_3_desc: "Sem taxas de ativação de R$ 500. Proteção acessível para tudo que importa.",
    how_title: 'A ponte direta de <br> <span class="gradient-text">volta para casa.</span>',
    how_subtitle: "Quando alguém encontra seu pertence e escaneia a tag, o milagre acontece em tempo real:",
    how_1: "<strong>Chat Seguro:</strong> Converse anonimamente com quem encontrou o item.",
    how_2: "<strong>GPS Instantâneo:</strong> Receba a localização exata do escaneamento.",
    how_3: "<strong>Provas Multimídia:</strong> Peça fotos ou áudios para confirmar o estado do objeto.",
    price_title: 'Escolha sua <span class="gradient-text">Paz de Espírito.</span>',
    price_badge: "Oferta de Lançamento",
    price_plan: "Smart Tag Individual + Assinatura Safety Plus",
    price_value: "R$ 29,90",
    price_period: "/mês",
    price_footer: "Tag física incluída + Proteção Global Ilimitada",
    price_cta: "Assinar Agora ➔",
    price_cancel: "Cancelamento grátis a qualquer momento.",
    footer: "© 2026 Back2me Global. Protegendo o que é insubstituível."
  }
};

function setLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang][key]) {
      element.innerHTML = translations[lang][key];
    }
  });
  localStorage.setItem('back2me-lang', lang);
  document.getElementById('lang-switcher').value = lang;
}

// Auto-detection
const savedLang = localStorage.getItem('back2me-lang');
const browserLang = navigator.language.startsWith('pt') ? 'pt' : 'en';
const finalLang = savedLang || browserLang;

document.addEventListener('DOMContentLoaded', () => {
  setLanguage(finalLang);
  
  document.getElementById('lang-switcher').addEventListener('change', (e) => {
    setLanguage(e.target.value);
  });
});
