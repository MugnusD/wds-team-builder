import {FC} from 'react';
import SelectTabsHeader from "./SelectTabsHeader.tsx";
import SelectTabsBody from "./SelectTabsBody.tsx";


const SelectTabs: FC = () => {
    return (
        <div className={'border-2 border-blue-gray-200 rounded-3xl w-full grid md:grid-rows-1 md:grid-cols-[auto_1fr] grid-cols-1 grid-rows-[auto_1fr] p-4 gap-2 max-h-[26em] min-h-[14em]'}>
            <SelectTabsHeader />
            <SelectTabsBody />
        </div>
    )
}

export default SelectTabs;