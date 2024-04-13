import {FC} from 'react';
import TabSelector from "./tabsHeaderComponent/TabSelector.tsx";
import TabsOptions from "./tabsHeaderComponent/TabsOptions.tsx";
import TabsSortAndFilterDialogButton from "./tabsHeaderComponent/TabsSortAndFilterDialogButton.tsx";

const SelectTabsHeader: FC = () => {
    return (
        <div className={'flex md:flex-row flex-col items-center gap-4'}>
            <TabSelector />
            <TabsOptions />
            <TabsSortAndFilterDialogButton />
        </div>
    )
}

export default SelectTabsHeader