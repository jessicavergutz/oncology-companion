// Ad5 — "A Permissão" (v2 Revised & Synced)
// Audio: ad5.mp3 | Duration: 23s (690 frames @ 30fps)
// Narrative: From repression to inner freedom
// Visual Identity: Soft, warm, delicate tones (Feminine/Intimate)

export const ad5ScenesData = [
	{
		id: 'hook',
		from: 0,
		duration: 110,    // 0:00–0:03.6 (Intro + Phrase 1)
		image: 'ad5-v2-hook.png',
		text: 'Ele fala.\nVocê sorri.\nMas pensa nela.',
		subtext: '',
		overlay: 'rgba(181,114,91,0.40)', // Warmer Rose
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.05, to: 1.15 },
		textStyle: 'hook',
	},
	{
		id: 'secret',
		from: 110,
		duration: 100,   // 3.6–7.0s (Phrase 2)
		image: 'ad5-secret.png', // Keeping this one as it fits the "secret" well
		text: 'Ninguém sabe.',
		subtext: 'Nem você quer admitir.',
		overlay: 'rgba(100,58,31,0.50)',
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.0, to: 1.10 },
		textStyle: 'dramatic',
	},
	{
		id: 'weight',
		from: 210,
		duration: 65,    // 7.0–9.1s (Phrase 3 - Short)
		image: 'ad5-v2-weight.png',
		text: 'O silêncio\npesa.',
		subtext: '',
		overlay: 'rgba(52,84,83,0.45)', // Softer Teal
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.1, to: 1.0 },
		textStyle: 'normal',
	},
	{
		id: 'prison',
		from: 275,
		duration: 125,   // 9.1–13.3s (Phrase 4 - Question)
		image: 'ad5-v2-hidden.png',
		text: 'Quanto tempo\nvai se esconder?',
		subtext: 'A vida tá passando.',
		overlay: 'rgba(181,114,91,0.50)', // Rose/Suppression
		textColor: '#FAF2E1',
		accentColor: '#B5725B',
		zoom: { from: 1.0, to: 1.12 },
		textStyle: 'impact',
	},
	{
		id: 'breathe',
		from: 400,
		duration: 120,   // 13.3–17.3s (Phrase 5 - Courage)
		image: 'ad5-v2-peace.png',
		text: 'Se permitir\nnão é fraqueza.',
		subtext: 'É coragem.',
		overlay: 'rgba(227,190,132,0.25)', // Soft Gold/Warm
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.15, to: 1.0 },
		textStyle: 'warm',
	},
	{
		id: 'product',
		from: 520,
		duration: 80,    // 17.3–20.0s (Phrase 6 - Hope)
		image: 'ad5-breathe.png', // Using the previous breathe image here for continuity or v2 peace
		text: 'Sua história\nmerece ser vivida.',
		subtext: '',
		overlay: 'rgba(100,58,31,0.35)',
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.0, to: 1.06 },
		textStyle: 'normal',
	},
	{
		id: 'cta',
		from: 600,
		duration: 90,    // 20.0–23.0s (CTA)
		image: 'ad1-cta.png',
		text: 'Método\nBússola Interior™',
		subtext: 'Comece em segredo.\nTermine em paz.',
		overlay: 'rgba(250,242,225,0.15)',
		textColor: '#643A1F',
		accentColor: '#B5725B',
		zoom: { from: 1.0, to: 1.03 },
		textStyle: 'cta',
	},
];
