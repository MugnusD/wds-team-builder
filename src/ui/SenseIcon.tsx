import {FC} from 'react';
import {PiStarFourFill} from "react-icons/pi";

const SenseIcon: FC<{
    senseType: SenseType | undefined | 'SP',
    size?: 'normal' | 'large',
}> = ({senseType, size = 'normal'}) => {
    const iconSize = size === 'normal' ? 16 : 32;

    switch (senseType) {
        case "Support": {
            return <PiStarFourFill color={'limegreen'} size={iconSize} />;
        }
        case "Amplification": {
            return <PiStarFourFill color={'gold'} size={iconSize} />;
        }
        case "Special": {
            return <PiStarFourFill color={'#3498DB'} size={iconSize} />;
        }
        case "Control": {
            return <PiStarFourFill color={'#FF3838'} size={iconSize} />;
        }
        case 'SP': {
            return <PiStarFourFill color={'#BDC3C7'} size={iconSize} />;
        }
        default: {
            return null;
        }
    }

};

export default SenseIcon;