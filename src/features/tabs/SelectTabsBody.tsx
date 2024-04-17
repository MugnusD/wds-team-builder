import {FC, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {selectGameItemType} from './selectTabsSlice.ts';
import CharacterTabsContent from './tabBodyComponents/CharacterTabsContent.tsx';
import PosterTabsContent from "./tabBodyComponents/PosterTabsContent.tsx";

const SelectTabsBody: FC = () => {
    const gameItemType = useSelector(selectGameItemType);
    const ref = useRef<HTMLDivElement>(null);

    // scroll to the top when change the tab
    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = 1;
        }
    }, [gameItemType]);

    return (
        <div
            className={
                'flex flex-row flex-wrap justify-start gap-2 overflow-y-auto rounded-2xl border-2 border-light-blue-100 bg-light-blue-50 p-4'
            }
            ref={ref}
        >
            {gameItemType === 'character' && <CharacterTabsContent />}
            {gameItemType === 'poster' && <PosterTabsContent />}
            {gameItemType === 'accessory' && null}
        </div>
    );
};

export default SelectTabsBody;
