"use client"

import React, { useEffect } from 'react';
import { initThreeScene } from './three-scene';

function BasicScene() {
    useEffect(() => {
        const threeScene = initThreeScene();
    }, []);

    return (
        <div>
            <canvas id="webGL" className='bg-black'></canvas>
        </div>
    );
}

export default BasicScene;