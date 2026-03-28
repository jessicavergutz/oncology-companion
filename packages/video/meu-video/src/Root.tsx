import React from 'react';
import { Composition } from 'remotion';
import { MyComposition } from './Composition';
import { ReelsCreative } from './ReelsCreative';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="MyComp"
				component={MyComposition}
				durationInFrames={300}
				fps={30}
				width={1280}
				height={720}
			/>
			<Composition
				id="Bussola-Reels-Hook"
				component={ReelsCreative}
				durationInFrames={900}
				fps={30}
				width={1080}
				height={1920}
			/>
		</>
	);
};
