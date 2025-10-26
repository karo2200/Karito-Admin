import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

import { Box, Button, Dialog } from '@mui/material';
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import React, { useEffect, useRef, useState } from 'react';
import { FeatureGroup, MapContainer, Polygon, TileLayer, useMap } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
	iconRetinaUrl,
	iconUrl,
	shadowUrl,
});

function parseWKT(wkt) {
	if (!wkt || typeof wkt !== 'string') return null;

	const match = wkt.match(/\(\(([^)]+)\)\)/);
	if (!match) return null;

	const coords = match[1].split(',').map((pair) => {
		const [lng, lat] = pair.trim().split(' ').map(Number);
		return { lat, lng };
	});

	return coords;
}

// کامپوننت برای زوم خودکار روی محدوده نقاط
function FitBounds({ positions }) {
	const map = useMap();

	useEffect(() => {
		if (!positions || positions.length === 0) return;
		const latlngs = positions.map((p) => [p.lat, p.lng]);
		const bounds = L.latLngBounds(latlngs);
		map.fitBounds(bounds, { padding: [50, 50] });
	}, [positions, map]);

	return null;
}

function MyModal({ open, handleClose, handleConfirm, lat, disabled }) {
	const [polygonCoords, setPolygonCoords] = useState(null);
	const featureGroupRef = useRef(null);

	useEffect(() => {
		if (lat && typeof lat === 'string') {
			const parsed = parseWKT(lat);
			if (parsed && parsed.length > 0) {
				setPolygonCoords(parsed);
			} else {
				setPolygonCoords(null);
			}
		} else if (Array.isArray(lat)) {
			setPolygonCoords(lat);
		} else {
			setPolygonCoords(null);
		}
	}, [lat]);

	const convertToWKT = (coords) => {
		if (!coords || coords.length === 0) return '';
		const ring = Array.isArray(coords[0]) ? coords[0] : coords;
		if (!ring || ring.length === 0) return '';

		const wktCoords = ring.map((point) => `${point.lng} ${point.lat}`).join(', ');
		const first = ring[0];
		const firstWKT = `${first.lng} ${first.lat}`;

		return `POLYGON ((${wktCoords}, ${firstWKT}))`;
	};

	const _onCreated = (e) => {
		if (disabled) return;
		const layer = e.layer;
		if (layer?.getLatLngs) {
			const latlngs = layer.getLatLngs()[0];
			setPolygonCoords(latlngs);
		}
	};

	const _onEdited = (e) => {
		if (disabled) return;
		const layers = e.layers;
		layers.eachLayer((layer) => {
			if (layer?.getLatLngs) {
				const latlngs = layer.getLatLngs()[0];
				setPolygonCoords(latlngs);
			}
		});
	};

	const _onDeleted = () => {
		if (disabled) return;
		setPolygonCoords(null);
	};

	const onSave = () => {
		if (disabled) {
			handleClose();
			return;
		}
		const wkt = convertToWKT(polygonCoords);
		handleConfirm(wkt);
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			dir="rtl"
			PaperProps={{
				sx: {
					borderRadius: 3,
					boxShadow: '0 10px 20px rgba(0,0,0,0.12)',
					padding: 3,
					width: 500,
				},
			}}
		>
			<Box>
				<MapContainer
					center={[35.715, 51.307]}
					zoom={13}
					style={{ height: '500px', width: '100%' }}
					scrollWheelZoom={true}
				>
					<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
					{polygonCoords && <FitBounds positions={polygonCoords} />}
					<FeatureGroup ref={featureGroupRef}>
						{polygonCoords && <Polygon positions={polygonCoords} />}
						{!disabled && (
							<EditControl
								position="topright"
								onCreated={_onCreated}
								onEdited={_onEdited}
								onDeleted={_onDeleted}
								draw={{
									rectangle: false,
									circle: false,
									circlemarker: false,
									marker: false,
									polyline: false,
									polygon: true,
								}}
							/>
						)}
					</FeatureGroup>
				</MapContainer>
				<Button variant="contained" color="primary" onClick={onSave} sx={{ mt: 2 }}>
					{disabled ? 'بستن' : 'ذخیره محدوده'}
				</Button>
			</Box>
		</Dialog>
	);
}

export default MyModal;
