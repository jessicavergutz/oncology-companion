// Ad1 — "A Espiral das 3h da Manhã"
// Audio: ad1.mp3 | Duration: ~33s (990 frames @ 30fps)
// Scene sync: timings aligned to voiceover pauses and emotional shifts

export const ad1ScenesData = [
	{
		id: 'hook',
		from: 0,
		duration: 120,   // 0:00–0:04
		image: 'ad1-hook.png',
		text: 'Não é confusão.',
		subtext: '',
		overlay: 'rgba(100,58,31,0.60)',
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.05, to: 1.18 },
		textStyle: 'hook',
	},
	{
		id: 'insomnia',
		from: 120,
		duration: 120,   // 0:04–0:08
		image: 'ad1-insomnia.png',
		text: 'Você já sabe.',
		subtext: '',
		overlay: 'rgba(100,58,31,0.50)',
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.0, to: 1.08 },
		textStyle: 'dramatic',
	},
	{
		id: 'loop',
		from: 240,
		duration: 150,   // 0:08–0:13
		image: 'ad1-loop.png',
		text: 'Três da manhã.',
		subtext: 'A conversa não para.',
		overlay: 'rgba(52,84,83,0.55)',
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.1, to: 1.0 },
		textStyle: 'normal',
	},
	{
		id: 'fear',
		from: 390,
		duration: 180,   // 0:13–0:19
		image: 'ad1-fear.png',
		text: 'A resposta\nte assusta.',
		subtext: '',
		overlay: 'rgba(100,58,31,0.55)',
		textColor: '#FAF2E1',
		accentColor: '#B5725B',
		zoom: { from: 1.0, to: 1.12 },
		textStyle: 'impact',
	},
	{
		id: 'realization',
		from: 570,
		duration: 180,   // 0:19–0:25
		image: 'ad1-realization.png',
		text: 'Disfarce\nda clareza.',
		subtext: 'Confusão não é o problema.',
		overlay: 'rgba(181,114,91,0.30)',
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.15, to: 1.0 },
		textStyle: 'warm',
	},
	{
		id: 'product',
		from: 750,
		duration: 150,   // 0:25–0:30
		image: 'ad1-hook.png',
		text: 'Decodifique\no que sente.',
		subtext: '',
		overlay: 'rgba(100,58,31,0.45)',
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.0, to: 1.06 },
		textStyle: 'normal',
	},
	{
		id: 'cta',
		from: 900,
		duration: 90,    // 0:30–0:33
		image: 'ad1-cta.png',
		text: 'Método\nBússola Interior™',
		subtext: 'No seu ritmo. Sem rótulos.',
		overlay: 'rgba(250,242,225,0.10)',
		textColor: '#643A1F',
		accentColor: '#B5725B',
		zoom: { from: 1.0, to: 1.03 },
		textStyle: 'cta',
	},
];
