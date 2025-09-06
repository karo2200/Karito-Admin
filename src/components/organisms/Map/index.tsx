import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('./Clusters'), {
	ssr: false,
});

export default function Home() {
	return (
		<div>
			<MapWithNoSSR />
		</div>
	);
}
