import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import TileMap from '../../components/TileMap/TileMap';

import { useStores } from '../../hooks/useStores';
import Dashboard from '../Dashboard/Dashboard';

import './Home.scss';

const Home: FC = observer(() => {
    const { operatorStore } = useStores();

    return (
        <>
            <Dashboard />
            {/* <TileMap /> */}
        </>
    );
});

export default Home;
