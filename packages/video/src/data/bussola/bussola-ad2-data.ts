// Ad2 — "O Momento do Instagram"
// Audio: ad2.mp3 | Duration: ~33.4s (1002 frames @ 30fps)
// Scene sync: timings aligned to voiceover pauses and emotional shifts

export const ad2ScenesData = [
	{
		id: 'hook',
		from: 0,
		duration: 120,   // 0:00–0:04
		image: 'ad2-hook.png',
		text: 'Só admiração?',
		subtext: '',
		overlay: 'rgba(100,58,31,0.60)',
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.05, to: 1.18 },
		textStyle: 'hook',
	},
	{
		id: 'scroll',
		from: 120,
		duration: 150,   // 0:04–0:09
		image: 'ad2-scroll.png',
		text: 'De novo.',
		subtext: 'Voltou no perfil dela.',
		overlay: 'rgba(100,58,31,0.50)',
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.0, to: 1.10 },
		textStyle: 'dramatic',
	},
	{
		id: 'notice',
		from: 270,
		duration: 150,   // 0:09–0:14
		image: 'ad2-notice.png',
		text: 'O sorriso.\nA voz.',
		subtext: '',
		overlay: 'rgba(52,84,83,0.50)',
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.1, to: 1.0 },
		textStyle: 'normal',
	},
	{
		id: 'convince',
		from: 420,
		duration: 180,   // 0:14–0:20
		image: 'ad2-convince.png',
		text: 'Não significa\nnada.',
		subtext: 'É o que você diz.',
		overlay: 'rgba(100,58,31,0.55)',
		textColor: '#FAF2E1',
		accentColor: '#B5725B',
		zoom: { from: 1.0, to: 1.12 },
		textStyle: 'impact',
	},
	{
		id: 'mirror',
		from: 600,
		duration: 180,   // 0:20–0:26
		image: 'ad2-mirror.png',
		text: 'Só não aprendeu\na ler.',
		subtext: 'Seu comportamento já sabe.',
		overlay: 'rgba(181,114,91,0.30)',
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.15, to: 1.0 },
		textStyle: 'warm',
	},
	{
		id: 'decode',
		from: 780,
		duration: 180,   // 0:26–0:32
		image: 'ad2-decode.png',
		text: 'Sinais\ndo corpo.',
		subtext: '',
		overlay: 'rgba(100,58,31,0.40)',
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.0, to: 1.06 },
		textStyle: 'normal',
	},
	{
		id: 'cta',
		from: 960,
		duration: 42,    // 0:32–0:33.4
		image: 'ad2-cta.png',
		text: 'Método\nBússola Interior™',
		subtext: 'Privado. Sem pressão.',
		overlay: 'rgba(250,242,225,0.10)',
		textColor: '#643A1F',
		accentColor: '#B5725B',
		zoom: { from: 1.0, to: 1.03 },
		textStyle: 'cta',
	},
];
