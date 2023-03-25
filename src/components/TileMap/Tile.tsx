import { Button, Tooltip, Typography } from '@mui/joy';
import interpolate from 'color-interpolate';
import React from 'react';

import './Tile.scss';

type Props = {
    short: string;
    name: string;
    value: number;
};

const colormap = interpolate(['#002B5B', '#57C5B6']);

export default function Tile({ short, name, value }: Props) {
    return (
        <>
            <Tooltip title='Amazon, 300' variant='solid' placement='top-start'>
                <div className='tile' style={{ backgroundColor: colormap(value) }}>
                    <Typography level='h5'>{short}</Typography>
                </div>
            </Tooltip>
        </>
    );
}
