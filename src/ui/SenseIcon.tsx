import {FC} from 'react';
import {PiStarFourFill} from "react-icons/pi";

const SenseIcon: FC<{
    senseType: SenseType | undefined,
}> = ({senseType}) => {
    switch (senseType) {
        case "Support": {
            return <PiStarFourFill color={'limegreen'} />;
        }
        case "Amplification": {
            return <PiStarFourFill color={'#FF3838'} />;
        }
        case "Special": {
            return <PiStarFourFill color={'gold'} />;
        }
        case "Control": {
            return <PiStarFourFill color={'#3498DB'} />;
        }
        default: {
            return null;
        }
    }

}

export default SenseIcon;