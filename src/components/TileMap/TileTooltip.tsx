import { Box, Typography } from '@mui/joy';
import { Grid } from '@mui/material';
import React from 'react';

export default function TileTooltip() {
    return (
        <Box className='tile-tooltip'>
            <Typography className='tile-tooltip__title' level='h6'>
                Якутский автономный округ
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography level='body3'>объем продаж</Typography>
                    <Typography level='body2'>120221 руб</Typography>
                    <Typography level='body3'>объем продаж</Typography>
                    <Typography level='body2'>120221 руб</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography level='body3'>объем продаж</Typography>
                    <Typography level='body2'>120221 руб</Typography>
                    <Typography level='body3'>объем продаж</Typography>
                    <Typography level='body2'>120221 руб</Typography>
                </Grid>
            </Grid>
        </Box>
    );
}
