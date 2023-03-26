import { Button, Tooltip, Typography } from '@mui/joy';
import interpolate from 'color-interpolate';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStores } from '../../hooks/useStores';
import { IRegionsShort } from '../../models/RegionsInterfaces';

import './Tile.scss';
import TileTooltip from './TileTooltip';

type Props = {
    // short: string;
    // name: string;
    // value: number;
    region: IRegionsShort;
};

const colormap = interpolate(['#FFD966', '#57C5B6']);

const Tile = observer(({ region }: Props) => {
    const { operatorStore } = useStores();
    let color = 0;
    if (operatorStore.tileMapType === 1) {
        color = region.norm_sum;
    } else {
        color = region.cnt_norm;
    }
    return (
        <>
            <Tooltip
                title={
                    <React.Fragment>
                        <TileTooltip region={region} />
                    </React.Fragment>
                }
                variant='solid'
                placement='top-start'
            >
                <div
                    className='tile'
                    style={{
                        backgroundColor: colormap(Math.min(color * 20, 1)),
                    }}
                    onClick={() => {
                        operatorStore.setActiveRegion(region.geoname_code);
                        operatorStore.setIsRegionActive(true);
                    }}
                >
                    <Typography level='h6'>{region.iso_code}</Typography>
                </div>
            </Tooltip>
        </>
    );
});

export default Tile;
