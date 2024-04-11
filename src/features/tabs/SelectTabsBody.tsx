import {FC} from 'react';
import {useSelector} from "react-redux";
import {selectGameItemType} from "./selectTabsSlice.ts";
import CharacterTabsContent from "./CharacterTabsContent.tsx";

const SelectTabsBody: FC = () => {
    const gameItemType = useSelector(selectGameItemType);

    return (
        <div className={'border-2 border-light-blue-100 rounded-2xl p-4 bg-light-blue-50 flex flex-row flex-wrap gap-2 overflow-y-auto justify-start h-[24rem]'}>
            {gameItemType === 'character' && <CharacterTabsContent />}
        </div>
    )
}

export default SelectTabsBody;