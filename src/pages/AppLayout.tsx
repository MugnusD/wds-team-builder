import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../ui/Sidebar.tsx';

const AppLayout: FC = () => {
    return (
        <div className={'grid h-screen grid-cols-[auto_1fr]'}>
            {/* Keep sprite images from being unloaded */}
            <img src="/img/character_sprite.webp" alt="sprite" className={'hidden'} />
            <img src="/img/poster_sprite.webp" alt="sprite" className={'hidden'} />
            <img src="/img/accessory_sprite.webp" alt="sprite" className={'hidden'} />

            <div className={'row-span-1'}>
                <Sidebar />
            </div>

            <div className={'overflow-auto bg-gray-50'}>
                <main className={'max-w-[75rem] mx-auto h-full p-4'}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
