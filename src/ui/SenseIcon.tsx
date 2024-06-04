import {FC} from 'react';
import {PiStarFourFill} from "react-icons/pi";

const SenseIcon: FC<{
    senseType: SenseType | undefined | 'SP',
}> = ({senseType}) => {
    switch (senseType) {
        case "Support": {
            return <PiStarFourFill color={'limegreen'} />;
        }
        case "Amplification": {
            return <PiStarFourFill color={'gold'} />;
        }
        case "Special": {
            return <PiStarFourFill color={'#3498DB'} />;
        }
        case "Control": {
            return <PiStarFourFill color={'#FF3838'} />;
        }
        case 'SP': {
            return <PiStarFourFill color={'#BDC3C7'} />
        }
        default: {
            return null;
        }
    }

}

export default SenseIcon;