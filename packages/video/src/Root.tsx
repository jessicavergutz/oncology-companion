import React from 'react';
import { Composition, Folder } from 'remotion';

// Import compositions
import { BussolaAd30s } from './compositions/bussola/bussola-ad-30s.tsx';
import { BussolaAd1 } from './compositions/bussola/bussola-ad1.tsx';
import { BussolaAd2 } from './compositions/bussola/bussola-ad2.tsx';
import { BussolaAd3 } from './compositions/bussola/bussola-ad3.tsx';
import { BussolaAd4 } from './compositions/bussola/bussola-ad4.tsx';
import { BussolaAd5 } from './compositions/bussola/bussola-ad5.tsx';
import { BussolaAd6 } from './compositions/bussola/bussola-ad6.tsx';

export const Root: React.FC = () => {
	return (
		<>
			<Folder name="Bussola-Ads">
				{/* Existing composition — NOT modified */}
				<Composition
					id="Bussola-Reels-30s"
					component={BussolaAd30s}
					durationInFrames={900}
					fps={30}
					width={1080}
					height={1920}
				/>

				{/* Ad1 — "A Espiral das 3h da Manhã" (~33s) */}
				<Composition
					id="Bussola-Ad1-Espiral"
					component={BussolaAd1}
					durationInFrames={990}
					fps={30}
					width={1080}
					height={1920}
				/>

				{/* Ad2 — "O Momento do Instagram" (~33.4s) */}
				<Composition
					id="Bussola-Ad2-Instagram"
					component={BussolaAd2}
					durationInFrames={1002}
					fps={30}
					width={1080}
					height={1920}
				/>

				{/* Ad3 — "A Mulher Que Tinha Tudo Resolvido" (~41s) */}
				<Composition
					id="Bussola-Ad3-Resolvida"
					component={BussolaAd3}
					durationInFrames={1229}
					fps={30}
					width={1080}
					height={1920}
				/>

				{/* Ad4 — "O Espelho" (30s) */}
				<Composition
					id="Bussola-Ad4-Espelho"
					component={BussolaAd4}
					durationInFrames={900}
					fps={30}
					width={1080}
					height={1920}
				/>

				{/* Ad5 — "A Permissão" (23s synced) */}
				<Composition
					id="Bussola-Ad5-Permissao"
					component={BussolaAd5}
					durationInFrames={690}
					fps={30}
					width={1080}
					height={1920}
				/>

				{/* Ad6 — "Acorda. Finge. Repete." (39s synced) */}
				<Composition
					id="Bussola-Ad6-Ciclo"
					component={BussolaAd6}
					durationInFrames={1185}
					fps={30}
					width={1080}
					height={1920}
				/>
			</Folder>
		</>
	);
};
