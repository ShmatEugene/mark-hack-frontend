import React from 'react';
import EmptyTile from './EmptyTile';
import Tile from './Tile';

import './Tile.scss';

export interface Tile {
    isActive: boolean;
    short: string;
    name: string;
    value: number;
}

export interface mapValuesI {
    name: string;
    name_with_type: string;
    iso_code: string;
    eoname_code: number;
    geoname_name: string;
    x: number;
    y: number;
}

let mapValues: mapValuesI[] = require('/Users/shmat/GitHub/mark-hack-front/src/components/TileMap/regions.json');

let initialMap: Array<Array<Tile>> = [[]];
const mapWidth = 16,
    mapHeight = 11;
for (let i = 0; i < mapHeight; i++) {
    initialMap[i] = [];
    for (let j = 0; j < mapWidth; j++) {
        initialMap[i][j] = { isActive: false, short: '', name: '', value: 0 };
    }
}

export default function TileMap() {
    const [map, setMap] = React.useState<Array<Array<Tile>>>(initialMap);

    const renderMap = (map: Array<Array<Tile>>) => {
        return map.map((row, i) => {
            return (
                <div key={i} className='row'>
                    {row.map((tile, j) => {
                        return tile.isActive ? (
                            <Tile key={j} short={tile.short} name={tile.name} value={tile.value} />
                        ) : (
                            <EmptyTile />
                        );
                    })}
                </div>
            );
        });
    };

    React.useEffect(() => {
        mapValues.forEach((value) => {
            if (value.x >= 0 && value.y >= 0) {
                map[value.x][value.y] = {
                    isActive: true,
                    short: value.iso_code,
                    name: value.name,
                    value: Math.random(),
                };
            }
        });
        setMap(map);
    }, [map]);

    return <div className='tile-map'>{renderMap(map)}</div>;
}
