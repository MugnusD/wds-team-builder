import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../ui/Sidebar.tsx';

const AppLayout: FC = () => {
    return (
        <div className={'grid h-screen grid-cols-[auto_1fr]'}>
            {/*<div className={'col-span-2'}>Header</div>*/}

            <div className={'row-span-1'}>
                <Sidebar />
            </div>


            <div className={'overflow-auto bg-gray-50'}>
                <main className={'max-w-6xl mx-auto h-full p-4'}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
