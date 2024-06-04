import {FC} from 'react';

const GradientLine: FC<{
    position: number,
    length: number,
}> = ({position, length}) => {
    const percent = Math.round(position / length * 10000) / 100;

    return (
        <div style={{
            height: '432px',
            width: '4px',
            borderLeft: '4px dashed #fff',
            background: 'linear-gradient(#fff, #fff) padding-box, linear-gradient(to bottom, #4fc3f7, #ab5ca4 49%, #ff512f) border-box',
            position: 'absolute',
            transform: 'translateX(-2px)',
            left: `${percent}%`,
            zIndex: 10,
        }}>
        </div>
    );
};

export default GradientLine;