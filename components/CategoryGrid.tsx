import React from 'react';
import CategoryGridComponent from './CategoryGridComponent';

const CategoryGrid = () => {
    const categories = [
        {
            id: 1,
            title: 'HEAD PROTECTION',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHzKDbC1AVSFgHWp_t2eC3p0JoKnDqrjOQTpDyLiHEkca-kmjbhTsk9pk7AzDatFI95oiI_A0CZCwFaFNI14R1tgsyBJFfHJzb6ZyUDzYCBvVBtJ1_ql6tBygy6l_K0yPHFuxX-wZRYNS0BFx8BaPmbCUCRgiz22pPSq_zqUzBHttr0RbiweRD2Fj0Jy_LftmOGMkVCfMjVs6RehJjNcLtyxm072G8JYqDeRCvoN5fBJ-pzpLCDdQiI-GGps9yD0wB35JddMmCk4c'
        },
        {
            id: 2,
            title: 'EYE & FACE',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeiahvgdjODYJqUcZ0YUtU1DZAX0eMneAXb_0U3Qx4r6t1_kcOVmQN4S4l4sZ4UCOvdZHmqI0G-65Rol_Q093dzgEZ9b4KUVfoxx_aG8YpGsUhNmpzDxsTpuxuinLXXs69BvtRYUAJW7jgOoYJ3N20gYkXHZmTpiSD7Oy5R5eLofKsy70y9pnpVJ2A-ioOVM4cA2sA0sjFV6523UyNQWQvR7jDq_zsiVXQOA6GMUpRfzYq2HFWwb2dhCa9PTCWEjZwgaM7JxSkC7U'
        },
        {
            id: 3,
            title: 'FALL ARREST',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoICf_F4G8_F8X6_XPnN3X2_tdfcurhjS03f_1C-u_uaHQvMm6pmC4i2jF3CJIhmqldAo95UHMHatyAvo42usOS8AFKDDlY2bdW4eBPvmgQT7m23mzoQcqBYIHOMnEl6ar3Z30l1Hl_ELMSokSvQfBXCkuN7LO5FcADwuMrrLYl9V1gkDhIhX8nw3EF2Df3ZiyrCKfmCuD6cpAbQg0JlwQmCuMdywj3ocuunQ9w0cVY1Q3NxVBYVC5sjNfpBizlvmz2HdaqIkccL8'
        }
    ];

    return <CategoryGridComponent categories={categories} />;
};

export default CategoryGrid;
