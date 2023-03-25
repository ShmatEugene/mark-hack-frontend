import { Button, Tooltip, Typography } from '@mui/joy';
import interpolate from 'color-interpolate';
import React from 'react';

import './Tile.scss';
import TileTooltip from './TileTooltip';

type Props = {
    short: string;
    name: string;
    value: number;
};

const colormap = interpolate(['#FFD966', '#57C5B6']);

export default function Tile({ short, name, value }: Props) {
    return (
        <>
            <Tooltip
                title={
                    <React.Fragment>
                        <TileTooltip />
                    </React.Fragment>
                }
                variant='solid'
                placement='top-start'
            >
                <div className='tile' style={{ backgroundColor: colormap(value) }}>
                    <Typography level='h6'>{short}</Typography>
                </div>
            </Tooltip>
        </>
    );
}
