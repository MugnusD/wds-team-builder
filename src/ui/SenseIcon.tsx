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
            return <PiStarFourFill color={'gold'} />;
        }
        case "Special": {
            return <PiStarFourFill color={'#3498DB'} />;
        }
        case "Control": {
            return <PiStarFourFill color={'#FF3838'} />;
        }
        default: {
            return null;
        }
    }

}

export default SenseIcon;