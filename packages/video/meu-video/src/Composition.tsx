import React from 'react';
import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate, Sequence, spring } from 'remotion';
import dossier from './sample-dossier.json';

const Scene = ({ title, content, index }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
	const translateY = spring({
		frame,
		fps,
		from: 20,
		to: 0,
		config: { damping: 200 }
	});

	return (
		<AbsoluteFill style={{
			backgroundColor: '#0f172a',
			color: 'white',
			justifyContent: 'center',
			alignItems: 'center',
			fontFamily: 'system-ui, sans-serif',
			padding: '0 100px'
		}}>
			<div style={{ opacity, transform: `translateY(${translateY}px)`, textAlign: 'center' }}>
				<h2 style={{ fontSize: 40, color: '#38bdf8', marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
					{title}
				</h2>
				<p style={{ fontSize: 60, fontWeight: 'bold', lineHeight: 1.2 }}>
					{content}
				</p>
			</div>
		</AbsoluteFill>
	);
};

export const MyComposition = () => {
	const { fps } = useVideoConfig();
	const sceneDuration = 90; // 3 seconds per scene

	return (
		<AbsoluteFill>
			{dossier.layers.map((layer, i) => (
				<Sequence from={i * sceneDuration} durationInFrames={sceneDuration} key={layer.name}>
					<Scene title={layer.name} content={layer.content} index={i} />
				</Sequence>
			))}
		</AbsoluteFill>
	);
};
