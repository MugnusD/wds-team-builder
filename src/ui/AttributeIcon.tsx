import {FC} from 'react';
import {GiBowTieRibbon, GiChestnutLeaf} from "react-icons/gi";
import {BiSolidMoon} from "react-icons/bi";
import {PiSunFill} from "react-icons/pi";

const AttributeIcon: FC<{
    attribute: AttributeType | undefined,
}> = ({attribute}) => {
    switch (attribute) {
        case "Cute": {
            return <GiBowTieRibbon color={'deeppink'} />;
        }
        case "Cool": {
            return  <BiSolidMoon color={'deepskyblue'} />;
        }
        case "Colorful": {
            return  <GiChestnutLeaf color={'limegreen'} />;
        }
        case "Cheerful": {
            return  <PiSunFill color={'#F1C40F'} />;
        }
        default: {
            return null;
        }
    }

}

export default AttributeIcon;