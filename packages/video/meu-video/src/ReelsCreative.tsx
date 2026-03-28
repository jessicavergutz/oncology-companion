import React from 'react';
import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate, Sequence, spring } from 'remotion';
import content from './reels-content.json';

const themes = {
	rose: { bg: '#B5725B', text: '#FAF2E1' },
	night: { bg: '#345453', text: '#E3BE84' },
	gold: { bg: '#E3BE84', text: '#643A1F' },
	nude: { bg: '#FAF2E1', text: '#B5725B' },
};

const AnimatedText = ({ text, color }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const opacity = interpolate(frame, [0, 15], [0, 1]);
	const scale = spring({ frame, fps, from: 0.8, to: 1 });

	return (
		<div style={{ opacity, transform: `scale(${scale})`, color, textAlign: 'center', width: '80%' }}>
			<h1 style={{ fontSize: 70, fontWeight: 'bold', lineHeight: 1.1, wordBreak: 'break-word' }}>
				{text}
			</h1>
		</div>
	);
};

const Scene = ({ scene }) => {
	const theme = themes[scene.theme] || themes.rose;
	return (
		<AbsoluteFill style={{
			backgroundColor: theme.bg,
			justifyContent: 'center',
			alignItems: 'center',
			fontFamily: 'system-ui, sans-serif',
			padding: '0 40px'
		}}>
			<AnimatedText text={scene.text} color={theme.text} />
		</AbsoluteFill>
	);
};

export const ReelsCreative = () => {
	let currentFrame = 0;
	return (
		<AbsoluteFill>
			{content.scenes.map((scene) => {
				const from = currentFrame;
				currentFrame += scene.duration;
				return (
					<Sequence from={from} durationInFrames={scene.duration} key={scene.id}>
						<Scene scene={scene} />
					</Sequence>
				);
			})}
		</AbsoluteFill>
	);
};
