import {FC} from 'react';
import TabSelector from "./tabsHeaderComponent/TabSelector.tsx";
import TabsOptions from "./tabsHeaderComponent/TabsOptions.tsx";
import CharacterSortAndFilterButton from "./tabsHeaderComponent/CharacterSortAndFilterButton.tsx";
import {useSelector} from "react-redux";
import {selectGameItemType} from "./selectTabsSlice.ts";
import PosterSortAndFilterButton from "./tabsHeaderComponent/PosterSortAndFilterButton.tsx";

const SelectTabsHeader: FC = () => {
    const tabType = useSelector(selectGameItemType);

    return (
        <div className={'flex flex-row items-center gap-4 flex-wrap'}>
            <TabSelector />
            <TabsOptions />
            {tabType === 'character' && <CharacterSortAndFilterButton />}
            {tabType === 'poster' && <PosterSortAndFilterButton />}
        </div>
    )
}

export default SelectTabsHeader