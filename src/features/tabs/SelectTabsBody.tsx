import {FC} from 'react';
import {useSelector} from 'react-redux';
import {selectGameItemType} from './selectTabsSlice.ts';
import CharacterTabsContent from './CharacterTabsContent.tsx';
import PosterTabsContent from "./PosterTabsContent.tsx";

const SelectTabsBody: FC = () => {
    const gameItemType = useSelector(selectGameItemType);

    return (
        <div
            className={
                'flex flex-row flex-wrap justify-start gap-2 overflow-y-auto rounded-2xl border-2 border-light-blue-100 bg-light-blue-50 p-4'
            }
        >
            {gameItemType === 'character' && <CharacterTabsContent />}
            {gameItemType === 'poster' && <PosterTabsContent />}
            {gameItemType === 'accessory' && null}

        </div>
    );
};

export default SelectTabsBody;
