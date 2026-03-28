const script = [
    {
        scene: 1,
        time: 0,
        text: "Você já sentiu o peso do silêncio?",
        duration: 4000
    },
    {
        scene: 1,
        time: 4000,
        text: "Aquele segundo eterno onde você chama... e ninguém responde?",
        duration: 5000
    },
    {
        scene: 2,
        time: 9000,
        text: "Conheça a Back2me Global. Sem apps, sem barreiras.",
        duration: 5000
    },
    {
        scene: 2,
        time: 14000,
        text: "Um único scan conecta o mundo ao que você ama.",
        duration: 4000
    },
    {
        scene: 3,
        time: 18000,
        text: "Alertas médicos críticos. Localização GPS precisa.",
        duration: 5000
    },
    {
        scene: 4,
        time: 23000,
        text: "Proteja o que é inestimável hoje. Porque o que é seu...",
        duration: 5000
    },
    {
        scene: 4,
        time: 28000,
        text: "...merece voltar para você.",
        duration: 4000
    }
];

let currentStep = 0;
let isPlaying = false;
let startTime = null;

const playBtn = document.getElementById('play-btn');
const subtitleText = document.getElementById('subtitle-text');
const scenes = document.querySelectorAll('.scene');
const progressBar = document.getElementById('progress');

function updateVSL(timestamp) {
    if (!isPlaying) return;
    if (!startTime) startTime = timestamp;

    const elapsed = timestamp - startTime;
    const totalDuration = 32000;
    const progressPercent = (elapsed / totalDuration) * 100;

    progressBar.style.width = `${Math.min(progressPercent, 100)}%`;

    // Find current script step
    const step = script.find(s => elapsed >= s.time && elapsed < s.time + s.duration);
    
    if (step) {
        subtitleText.innerText = step.text;
        
        // Update active scene
        scenes.forEach((scene, index) => {
            if (index + 1 === step.scene) {
                scene.classList.add('active');
            } else {
                scene.classList.remove('active');
            }
        });
    }

    if (elapsed < totalDuration) {
        requestAnimationFrame(updateVSL);
    } else {
        isPlaying = false;
        playBtn.innerText = "ASSISTIR NOVAMENTE";
        subtitleText.innerText = "VSL Concluída.";
    }
}

playBtn.addEventListener('click', () => {
    isPlaying = true;
    startTime = null;
    playBtn.innerText = "REPRODUZINDO...";
    requestAnimationFrame(updateVSL);
    
    // Optional: Simulation of a beep/music start
    console.log("VSL Sound Bridge Initialized...");
});
