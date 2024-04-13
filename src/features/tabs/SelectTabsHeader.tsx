import {FC} from 'react';
import TabSelector from "./tabsHeaderComponent/TabSelector.tsx";
import TabsOptions from "./tabsHeaderComponent/TabsOptions.tsx";

const SelectTabsHeader: FC = () => {
    return (
        <div className={'flex md:flex-row flex-col items-center gap-4'}>
            <TabSelector />
            <TabsOptions />
        </div>
    )
}

export default SelectTabsHeader