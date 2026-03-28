// Ad6 — "Acorda. Finge. Repete." (39.5s)
// Audio: ad6.mp3 | Duration: ~39.5s (1185 frames @ 30fps)
// Hook: "Você sonhou com ela de novo."
// Narrative: From dream repetition to self-permission
// Visual Identity: Dark → Dawn arc (Night to Morning)
//
// ══════════════════════════════════════════════════════════════════════
// AUDIO WAVEFORM ANALYSIS — 20 speech segments mapped to 10 scenes
// ══════════════════════════════════════════════════════════════════════
//
//  SCENE 1 "hook"    (0.00–3.20s)  Segs 1-2: "Você sonhou com ela de novo"
//    GAP 0.70s
//  SCENE 2 "eyes"    (3.20–6.70s)  Seg 3: "Abriu os olhos" + GAP
//  SCENE 3 "room"    (6.70–11.00s) Segs 4-5: "O quarto era o mesmo. Mas você não"
//    GAP 1.10s
//  SCENE 4 "change"  (11.00–15.20s) Segs 6-8: "Algo mudou... já não dá pra fingir"
//  SCENE 5 "cycle"   (15.20–19.90s) Segs 9-11: "Você conhece esse ciclo: acordar, ignorar"
//    GAP 1.30s
//  SCENE 6 "body"    (19.90–23.70s) Segs 12-13: "e seguir. Mas o corpo lembra. O estômago aperta"
//  SCENE 7 "mind"    (23.70–27.10s) Seg 14: "A mente volta nela sem você pedir"
//    GAP 1.40s
//  SCENE 8 "start"   (27.10–30.10s) Segs 15-16: "Não precisa ter certeza pra começar"
//  SCENE 9 "path"    (30.10–35.10s) Segs 17-18: "Precisa só de um caminho..."
//    GAP 0.90s
//  SCENE 10 "cta"    (35.10–39.50s) Segs 19-20: "Método Bússola Interior..."

export const ad6ScenesData = [
	{
		id: 'hook',
		from: 0,
		duration: 96,    // 0:00–0:03.2  |  "Você sonhou com ela de novo."
		image: 'ad6-hook.png',
		text: 'Sonhou com ela.\nDe novo.',
		subtext: '',
		overlay: 'rgba(52,84,83,0.55)',
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.05, to: 1.18 },
		textStyle: 'hook',
	},
	{
		id: 'eyes',
		from: 96,
		duration: 105,   // 0:03.2–0:06.7  |  "Abriu os olhos." + silence
		image: 'ad6-awake.png',
		text: 'Abriu os olhos.',
		subtext: '',
		overlay: 'rgba(181,114,91,0.45)',
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.0, to: 1.08 },
		textStyle: 'dramatic',
	},
	{
		id: 'room',
		from: 201,
		duration: 129,   // 0:06.7–0:11.0  |  "O quarto era o mesmo. Mas você… não."
		image: 'ad6-awake.png',
		text: 'O quarto\nera o mesmo.',
		subtext: 'Mas você… não.',
		overlay: 'rgba(100,58,31,0.50)',
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.10, to: 1.0 },
		textStyle: 'dramatic',
	},
	{
		id: 'change',
		from: 330,
		duration: 126,   // 0:11.0–0:15.2  |  "Algo mudou enquanto dormia. E já não dá pra fingir."
		image: 'ad6-change.png',
		text: 'Algo mudou.',
		subtext: 'Já não dá pra fingir.',
		overlay: 'rgba(100,58,31,0.55)',
		textColor: '#FAF2E1',
		accentColor: '#E1B787',
		zoom: { from: 1.0, to: 1.08 },
		textStyle: 'normal',
	},
	{
		id: 'cycle',
		from: 456,
		duration: 141,   // 0:15.2–0:19.9  |  "Você conhece esse ciclo: acordar, ignorar"
		image: 'ad6-cycle.png',
		text: 'Acordar.\nIgnorar.\nSeguir.',
		subtext: '',
		overlay: 'rgba(52,84,83,0.55)',
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.0, to: 1.12 },
		textStyle: 'impact',
	},
	{
		id: 'body',
		from: 597,
		duration: 114,   // 0:19.9–0:23.7  |  "e seguir. Mas o corpo lembra. O estômago aperta."
		image: 'ad6-stomach.png',
		text: 'O corpo\nlembra.',
		subtext: 'O estômago aperta.',
		overlay: 'rgba(186,115,89,0.45)',
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.0, to: 1.10 },
		textStyle: 'impact',
	},
	{
		id: 'mind',
		from: 711,
		duration: 102,   // 0:23.7–0:27.1  |  "A mente volta nela sem você pedir."
		image: 'ad6-body.png',
		text: 'A mente\nvolta nela.',
		subtext: 'Sem você pedir.',
		overlay: 'rgba(186,115,89,0.30)',
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.15, to: 1.0 },
		textStyle: 'warm',
	},
	{
		id: 'start',
		from: 813,
		duration: 90,    // 0:27.1–0:30.1  |  "Não precisa ter certeza pra começar."
		image: 'ad6-resolve.png',
		text: 'Não precisa\nter certeza.',
		subtext: '',
		overlay: 'rgba(227,190,132,0.25)',
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.0, to: 1.06 },
		textStyle: 'normal',
	},
	{
		id: 'path',
		from: 903,
		duration: 150,   // 0:30.1–0:35.1  |  "Precisa só de um caminho que respeite..."
		image: 'ad6-resolve.png',
		text: 'Precisa de\num caminho.',
		subtext: 'Que respeite seus sentimentos.',
		overlay: 'rgba(227,190,132,0.20)',
		textColor: '#FAF2E1',
		accentColor: '#E3BE84',
		zoom: { from: 1.06, to: 1.0 },
		textStyle: 'warm',
	},
	{
		id: 'cta',
		from: 1053,
		duration: 132,   // 0:35.1–0:39.5  |  "Método Bússola Interior. Clareza... 100% privado."
		image: 'ad6-cta.png',
		text: 'Método\nBússola Interior™',
		subtext: 'Clareza no seu ritmo.\n100% privado.',
		overlay: 'rgba(250,242,225,0.10)',
		textColor: '#643A1F',
		accentColor: '#B5725B',
		zoom: { from: 1.0, to: 1.03 },
		textStyle: 'cta',
	},
];
