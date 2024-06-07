import {FC} from 'react';
import {GiBowTieRibbon, GiChestnutLeaf} from "react-icons/gi";
import {BiSolidMoon} from "react-icons/bi";
import {PiSunFill} from "react-icons/pi";

const AttributeIcon: FC<{
    attribute: AttributeType | undefined,
    size?: 'normal' | 'large',
}> = ({attribute, size = 'normal'}) => {
    const iconSize = size === 'normal' ? 16 : 32;

    switch (attribute) {
        case "Cute": {
            return <GiBowTieRibbon color={'deeppink'} size={iconSize} />;
        }
        case "Cool": {
            return <BiSolidMoon color={'deepskyblue'} size={iconSize} />;
        }
        case "Colorful": {
            return <GiChestnutLeaf color={'limegreen'} size={iconSize} />;
        }
        case "Cheerful": {
            return <PiSunFill color={'#F1C40F'} size={iconSize} />;
        }
        default: {
            return null;
        }
    }

};

export default AttributeIcon;