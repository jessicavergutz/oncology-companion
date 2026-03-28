// Ad4 — "O Espelho" (30s)
// Hook: Questionamento direto sobre autoconhecimento
// Narrativa: A jornada do negar ao aceitar
// Duration: 30s (900 frames @ 30fps)

export const ad4ScenesData = [
	{
		id: 'hook',
		from: 0,
		duration: 120,   // 0:00–0:04
		image: 'ad4-hook.png',
		text: 'Talvez não seja\nsó curiosidade.',
		subtext: '',
		overlay: 'rgba(100,58,31,0.60)',
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.05, to: 1.18 },
		textStyle: 'hook',
	},
	{
		id: 'memory',
		from: 120,
		duration: 120,   // 0:04–0:08
		image: 'ad4-memory.png',
		text: 'Aquela risada.',
		subtext: 'Que ficou na sua cabeça.',
		overlay: 'rgba(181,114,91,0.45)',
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.0, to: 1.10 },
		textStyle: 'normal',
	},
	{
		id: 'denial',
		from: 240,
		duration: 150,   // 0:08–0:13
		image: 'ad4-denial.png',
		text: '"É besteira."',
		subtext: 'Você repete.\nMas seu corpo sabe.',
		overlay: 'rgba(52,84,83,0.55)',
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.1, to: 1.0 },
		textStyle: 'dramatic',
	},
	{
		id: 'conflict',
		from: 390,
		duration: 150,   // 0:13–0:18
		image: 'ad4-hook.png',
		text: 'Fugir cansa.',
		subtext: 'De você mesma.',
		overlay: 'rgba(100,58,31,0.55)',
		textColor: '#FAF2E1',
		accentColor: '#B5725B',
		zoom: { from: 1.0, to: 1.12 },
		textStyle: 'impact',
	},
	{
		id: 'truth',
		from: 540,
		duration: 150,   // 0:18–0:23
		image: 'ad4-truth.png',
		text: 'O espelho\nnão mente.',
		subtext: '',
		overlay: 'rgba(181,114,91,0.30)',
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.15, to: 1.0 },
		textStyle: 'warm',
	},
	{
		id: 'product',
		from: 690,
		duration: 120,   // 0:23–0:27
		image: 'ad4-memory.png',
		text: 'Olhe pra dentro.\nSem medo.',
		subtext: '',
		overlay: 'rgba(100,58,31,0.40)',
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.0, to: 1.06 },
		textStyle: 'normal',
	},
	{
		id: 'cta',
		from: 810,
		duration: 90,    // 0:27–0:30
		image: 'ad1-cta.png',
		text: 'Método\nBússola Interior™',
		subtext: 'Sua verdade. Sem filtros.',
		overlay: 'rgba(250,242,225,0.10)',
		textColor: '#643A1F',
		accentColor: '#B5725B',
		zoom: { from: 1.0, to: 1.03 },
		textStyle: 'cta',
	},
];
