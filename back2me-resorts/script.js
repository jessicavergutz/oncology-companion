const translations = {
  en: {
    nav_demo: "Request Demo",
    hero_badge: "Exclusive Hospitality Partnership",
    hero_title: 'Elevate Your Resort\'s Luxury by <br> Never Letting a Guest <span class="gradient-text">Lose a Memory.</span>',
    hero_subtitle: "The first 'Scan-to-Chat' recovery system designed for world-class hospitality. Turn Lost & Found friction into 5-star guest loyalty.",
    hero_cta_main: "Transform Guest Experience ➔",
    hero_cta_sec: "View ROI for Resorts",
    stat_1: "Faster Item Recovery",
    stat_2: "Apps Required for Guests",
    stat_3: "Reduction in L&F Admin Time",
    benefits_title: 'Excellence in every <span class="gradient-text">Interaction.</span>',
    ben_1_title: "Guest Asset Protection",
    ben_1_desc: "Provide co-branded smart tags for luggage and personal items at check-in as a premium welcome gift.",
    ben_2_title: "Pet-Friendly Luxury",
    ben_2_desc: "A 'must-have' for pet-friendly properties. GPS-enabled (via scan) medical alerts for guest pets.",
    ben_3_title: "Operational Control",
    ben_3_desc: "Centralized dashboard for staff to manage found items and contact guests instantly via secure bridge.",
    cta_banner_title: "Ready to define the future of resort hospitality?",
    cta_banner_text: "Join the world's most innovative properties using Back2me Global.",
    cta_banner_button: "Get a Private Quote",
    footer: "© 2026 Back2me Global | Hospitality Division. All rights reserved."
  },
  pt: {
    nav_demo: "Solicitar Demonstração",
    hero_badge: "Parceria Exclusiva de Hospitalidade",
    hero_title: 'Eleve o Luxo do seu Resort ao <br> Nunca Deixar um Hóspede <span class="gradient-text">Perder uma Memória.</span>',
    hero_subtitle: "O primeiro sistema de recuperação 'Scan-to-Chat' desenhado para hospitalidade de classe mundial. Transforme o atrito de Achados e Perdidos em lealdade 5 estrelas.",
    hero_cta_main: "Transformar Experiência do Hóspede ➔",
    hero_cta_sec: "Ver ROI para Resorts",
    stat_1: "Recuperação de Itens Mais Rápida",
    stat_2: "Apps Exigidos dos Hóspedes",
    stat_3: "Redução no Tempo de Gestão de A&P",
    benefits_title: 'Excelência em cada <span class="gradient-text">Interação.</span>',
    ben_1_title: "Proteção de Ativos do Hóspede",
    ben_1_desc: "Forneça tags inteligentes personalizadas para bagagem e itens pessoais no check-in como um presente premium.",
    ben_2_title: "Luxo Pet-Friendly",
    ben_2_desc: "Um 'must-have' para propriedades pet-friendly. Alertas médicos com localização via scan para pets de hóspedes.",
    ben_3_title: "Controle Operacional",
    ben_3_desc: "Dashboard centralizado para o staff gerenciar itens encontrados e contatar hóspedes instantaneamente.",
    cta_banner_title: "Pronto para definir o futuro da hospitalidade em resorts?",
    cta_banner_text: "Junte-se às propriedades mais inovadoras do mundo usando a Back2me Global.",
    cta_banner_button: "Obter Orçamento Personalizado",
    footer: "© 2026 Back2me Global | Divisão de Hospitalidade. Todos os direitos reservados."
  }
};

function setLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      element.innerHTML = translations[lang][key];
    }
  });

  localStorage.setItem('back2me-resort-lang', lang);
  document.getElementById('lang-switcher').value = lang;
}

// Auto-detection
const savedLang = localStorage.getItem('back2me-resort-lang');
const browserLang = navigator.language.startsWith('pt') ? 'pt' : 'en';
const finalLang = savedLang || browserLang;

document.addEventListener('DOMContentLoaded', () => {
  setLanguage(finalLang);
  
  document.getElementById('lang-switcher').addEventListener('change', (e) => {
    setLanguage(e.target.value);
  });
});
