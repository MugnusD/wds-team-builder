import {FC} from 'react';
import TabSelector from "./tabsHeaderComponent/TabSelector.tsx";
import TabsOptions from "./tabsHeaderComponent/TabsOptions.tsx";
import CharacterSortAndFilterButton from "./tabsHeaderComponent/CharacterSortAndFilterButton.tsx";
import {useSelector} from "react-redux";
import {selectGameItemType} from "./selectTabsSlice.ts";

const SelectTabsHeader: FC = () => {
    const tabType = useSelector(selectGameItemType);

    return (
        <div className={'flex md:flex-row flex-col items-center gap-4'}>
            <TabSelector />
            <TabsOptions />
            {tabType === 'character' && <CharacterSortAndFilterButton />}
        </div>
    )
}

export default SelectTabsHeader