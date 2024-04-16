import {Typography} from "@material-tailwind/react";
import {FC} from "react";

const Home: FC = () => {
    return (
        <div className={'flex items-center justify-center h-screen flex-col gap-3'}>
            <img src={'/stamps/40503.png'} alt={'img'}/>
            <Typography variant={'h3'}>
                如有问题在 <a href='https://github.com/MugnusD/wds-team-builder' className={'text-blue-600 hover:underline'}>Git</a> 中提交
            </Typography>
            <Typography variant={'paragraph'}>
                （看到了也不一定会解决）
            </Typography>
        </div>
    )
};

export default Home;