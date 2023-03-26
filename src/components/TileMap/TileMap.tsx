import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useStores } from '../../hooks/useStores';
import { IRegionsShort } from '../../models/RegionsInterfaces';
import { OperatorStore } from '../../stores/OperatorStore';
import EmptyTile from './EmptyTile';
import Tile from './Tile';

import './Tile.scss';

export interface Tile {
    isActive: boolean;
    // short: string;
    // name: string;
    region: IRegionsShort;
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

// let mapValues: mapValuesI[] = require('/Users/shmat/GitHub/mark-hack-front/src/components/TileMap/regions.json');

const region1 = {} as IRegionsShort;

let initialMap: Array<Array<Tile>> = [[]];
const mapWidth = 16,
    mapHeight = 11;
for (let i = 0; i < mapHeight; i++) {
    initialMap[i] = [];
    for (let j = 0; j < mapWidth; j++) {
        initialMap[i][j] = { isActive: false, region: region1 };
    }
}

const TileMap: FC = observer(() => {
    const [mapT, setMap] = React.useState<Array<Array<Tile>>>(initialMap);
    const { operatorStore } = useStores();
    console.log('regionsShort: ', operatorStore.regionsShort);

    React.useEffect(() => {
        operatorStore.regionsShort.forEach((value) => {
            if (value.x >= 0 && value.y >= 0) {
                mapT[value.x][value.y] = {
                    isActive: true,
                    // short: value.iso_code,
                    // name: value.name,
                    // value: value.cnt_manufacturer_normalized,
                    region: value,
                };
            }
        });

        setMap(mapT);
    }, [mapT, operatorStore.regionsShort]);

    const renderMap = (maT: Array<Array<Tile>>) => {
        console.log('map', mapT);
        if (mapT) {
            return mapT.map((row, i) => {
                // console.log('row', row);

                return (
                    <div key={i} className='row'>
                        {row &&
                            row.map((tile, j) => {
                                return tile.isActive ? (
                                    <Tile key={j} region={tile.region} />
                                ) : (
                                    <EmptyTile />
                                );
                            })}
                    </div>
                );
            });
        }
    };

    return <div className='tile-map'>{renderMap(mapT)}</div>;
});

export default TileMap;
