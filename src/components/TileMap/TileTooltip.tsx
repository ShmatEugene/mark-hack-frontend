import { Box, Typography } from '@mui/joy';
import { Grid } from '@mui/material';
import React from 'react';
import { IRegionsShort } from '../../models/RegionsInterfaces';

type Props = {
    region: IRegionsShort;
};

export default function TileTooltip({ region }: Props) {
    return (
        <Box className='tile-tooltip'>
            <Typography className='tile-tooltip__title' level='h6'>
                {region.name_with_type}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography level='body3'>объем продаж</Typography>
                    <Typography className='tile-tooltip__price' level='body2'>
                        {region.sum} руб
                    </Typography>
                    {/* <Typography level='body3'>объем продаж</Typography>
                    <Typography className='tile-tooltip__price' level='body2'>
                        120221 руб
                    </Typography> */}
                </Grid>
                <Grid item xs={6}>
                    <Typography level='body3'>кол-во проданных товаров</Typography>
                    <Typography className='tile-tooltip__price' level='body2'>
                        {region.cnt} шт.
                    </Typography>
                    {/* <Typography level='body3'>объем продаж</Typography>
                    <Typography className='tile-tooltip__price' level='body2'>
                        120221 руб
                    </Typography> */}
                </Grid>
            </Grid>
        </Box>
    );
}
