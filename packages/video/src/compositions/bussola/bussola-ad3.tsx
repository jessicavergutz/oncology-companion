import React from 'react';
import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	interpolate,
	spring,
	Sequence,
	Img,
	staticFile,
	Audio,
} from 'remotion';

import { ad3ScenesData } from '../../data/bussola/bussola-ad3-data';

/* ───────────────────────────────────────────
   CINEMATIC SCENE COMPONENT — AD3
   "A Mulher Que Tinha Tudo Resolvido"
   ─────────────────────────────────────────── */
const CinematicScene = ({ scene }: { scene: any }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Ken Burns zoom
	const scale = interpolate(
		frame,
		[0, scene.duration],
		[scene.zoom.from, scene.zoom.to],
		{ extrapolateRight: 'clamp' }
	);

	// Fade in
	const fadeIn = interpolate(frame, [0, 12], [0, 1], {
		extrapolateRight: 'clamp',
	});

	// Fade out
	const fadeOut = interpolate(
		frame,
		[scene.duration - 15, scene.duration],
		[1, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	const opacity = fadeIn * fadeOut;

	// Text entrance — fade + slide up
	const textDelay = 8;
	const textOpacity = interpolate(frame, [textDelay, textDelay + 18], [0, 1], {
		extrapolateRight: 'clamp',
		extrapolateLeft: 'clamp',
	});

	const textY = spring({
		frame: Math.max(0, frame - textDelay),
		fps,
		from: 30,
		to: 0,
		config: { damping: 100, mass: 0.8 },
	});

	// Subtext entrance (delayed further)
	const subDelay = 25;
	const subOpacity = interpolate(frame, [subDelay, subDelay + 18], [0, 1], {
		extrapolateRight: 'clamp',
		extrapolateLeft: 'clamp',
	});

	const subY = spring({
		frame: Math.max(0, frame - subDelay),
		fps,
		from: 20,
		to: 0,
		config: { damping: 120, mass: 0.6 },
	});

	// Slight parallax drift
	const driftX = interpolate(frame, [0, scene.duration], [0, -8]);

	return (
		<AbsoluteFill style={{ opacity }}>
			{/* Background image with Ken Burns */}
			<AbsoluteFill>
				<Img
					src={require(`../../assets/bussola/images/${scene.image}`)}
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						transform: `scale(${scale}) translateX(${driftX}px)`,
					}}
				/>
			</AbsoluteFill>

			{/* Gradient overlay for depth */}
			<AbsoluteFill
				style={{
					background: `linear-gradient(
						180deg,
						${scene.overlay} 0%,
						rgba(0,0,0,0.05) 40%,
						rgba(0,0,0,0.1) 60%,
						${scene.overlay} 100%
					)`,
				}}
			/>

			{/* Vignette effect */}
			<AbsoluteFill
				style={{
					background:
						'radial-gradient(ellipse at center, transparent 50%, rgba(100,58,31,0.5) 100%)',
				}}
			/>

			{/* Text layer */}
			{scene.text && (
				<AbsoluteFill
					style={{
						justifyContent: 'flex-end',
						alignItems: 'center',
						padding: '0 60px',
						paddingBottom: 350,
					}}
				>
					<div
						style={{
							opacity: textOpacity,
							transform: `translateY(${textY}px)`,
							textAlign: 'center',
						}}
					>
						<h1
							style={{
								fontSize: scene.textStyle === 'hook' ? 96 : scene.textStyle === 'cta' ? 80 : 84,
								fontWeight: 800,
								color: scene.textColor,
								lineHeight: 1.15,
								letterSpacing: scene.textStyle === 'hook' ? '-0.02em' : '0',
								textShadow: '0 4px 30px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)',
								fontFamily: "'Georgia', 'Times New Roman', serif",
								whiteSpace: 'pre-line',
								margin: 0,
							}}
						>
							{scene.text}
						</h1>
					</div>

					{scene.subtext && (
						<div
							style={{
								opacity: subOpacity,
								transform: `translateY(${subY}px)`,
								textAlign: 'center',
								marginTop: 40,
							}}
						>
							<p
								style={{
									fontSize: 42,
									fontWeight: 400,
									color: scene.accentColor,
									lineHeight: 1.4,
									textShadow: '0 2px 15px rgba(0,0,0,0.5)',
									fontFamily: "'Georgia', 'Times New Roman', serif",
									fontStyle: 'italic',
									whiteSpace: 'pre-line',
									margin: 0,
								}}
							>
								{scene.subtext}
							</p>
						</div>
					)}
				</AbsoluteFill>
			)}

			{/* Bottom glow accent line */}
			<div
				style={{
					position: 'absolute',
					bottom: 80,
					left: '50%',
					transform: 'translateX(-50%)',
					width: interpolate(frame, [15, 45], [0, 120], {
						extrapolateRight: 'clamp',
						extrapolateLeft: 'clamp',
					}),
					height: 2,
					background: `linear-gradient(90deg, transparent, ${scene.accentColor}, transparent)`,
					opacity: textOpacity * 0.7,
				}}
			/>
		</AbsoluteFill>
	);
};

/* ───────────────────────────────────────────
   MAIN COMPOSITION — AD3
   ─────────────────────────────────────────── */
export const BussolaAd3 = () => {
	const CROSSFADE = 15;
	return (
		<AbsoluteFill style={{ backgroundColor: '#643A1F' }}>
			<Audio src={staticFile('audio/ad3.mp3')} />
			{ad3ScenesData.map((scene, index) => {
				const isLast = index === ad3ScenesData.length - 1;
				const extendedDuration = isLast ? scene.duration : scene.duration + CROSSFADE;
				return (
					<Sequence
						from={scene.from}
						durationInFrames={extendedDuration}
						key={scene.id}
					>
						<CinematicScene scene={{ ...scene, duration: extendedDuration }} />
					</Sequence>
				);
			})}
		</AbsoluteFill>
	);
};
