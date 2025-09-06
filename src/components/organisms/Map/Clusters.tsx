//import 'react-leaflet-markercluster/dist/styles.min.css';
import 'leaflet/dist/leaflet.css';

import { MapContainer, TileLayer } from 'react-leaflet';
//import MarkerClusterGroup from 'react-leaflet-markercluster';

const center = [32.5, 53.5];

const points = [
	{
		lat: 52.230020586193795,
		lng: 21.01083755493164,
		title: 'point 1',
	},
	{
		lat: 52.22924516170657,
		lng: 21.011320352554325,
		title: 'point 2',
	},
	{
		lat: 52.229511304688444,
		lng: 21.01270973682404,
		title: 'point 3',
	},
	{
		lat: 52.23040500771883,
		lng: 21.012146472930908,
		title: 'point 4',
	},
];

const MapWrapper = () => {
	return (
		<MapContainer
			center={center}
			zoom={3}
			maxZoom={18}
			style={{ width: '95%', height: '400px', marginTop: '10px', borderRadius: '10px' }}
		>
			<TileLayer
				url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			/>
			{/* <MarkerClusterGroup>
				{points.map(({ lat, lng, title }, index) => (
					<Marker key={index} position={[lat, lng]}>
						<Popup>{title}</Popup>
					</Marker>
				))}
			</MarkerClusterGroup> */}
		</MapContainer>
	);
};

export default MapWrapper;
