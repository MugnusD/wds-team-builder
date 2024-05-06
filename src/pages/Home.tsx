import {Typography} from "@material-tailwind/react";
import {FC} from "react";

const Home: FC = () => {
    return (
        <div className={'flex h-full flex-col'}>
            <Typography variant={'h5'}>
                访问代码仓库来帮助我构建 app 或者提交任何问题：
                <a href="https://github.com/MugnusD/wds-team-builder" target="_blank">
                    <img src={'/stamps/GitHub.webp'} alt={'github'} className={'h-[170px] inline-block'} />
                </a>
            </Typography>
            <Typography variant={'h5'}>
                Powered By: &nbsp;
                <a href={'https://react.dev/?uwu=true'} target="_blank">
                    <img src={'/stamps/React.webp'} alt={'reactjs'} className={'h-[130px] inline-block'} />
                </a>
                <a href={'https://vitejs.dev/?uwu=true'} target="_blank">
                    <img src={'/stamps/Vite.webp'} alt={'vitejs'} className={'h-[170px] inline-block'} />
                </a>
            </Typography>
            <Typography variant={'h5'}>
                Written In:
                <a href={'https://www.typescriptlang.org/'} target="_blank">
                    <img src={'/stamps/TypeScript.webp'} alt={'typescript'} className={'h-[170px] inline-block'} />
                </a>
            </Typography>
            <Typography variant={'h5'}>
                Styled By: &emsp;
                <a href={'https://tailwindcss.com/'} target="_blank">
                    <img src={'/stamps/Tailwindcss6.webp'} alt={'tailwindcss'} className={'h-[140px] inline-block'} />
                </a>
            </Typography>

            <footer className={'mt-auto'}>
                Icons created by <a href="https://github.com/SAWARATSUKI" target="_blank" className={'text-blue-500 hover:underline'}>@SAWARATSUKI</a>. License: <a
                    href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh"
                    target="_blank"
                    className={'text-blue-500 hover:underline'}
                >CC BY-NC-SA 4.0</a>
            </footer>
        </div>
    );
};

export default Home;