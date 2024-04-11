import {FC} from 'react';
import TypeTabsHeader from "./TypeTabsHeader.tsx";
import SelectTabsBody from "./SelectTabsBody.tsx";

const SelectTabs: FC = () => {
    return (
        <div className={'border-2 border-blue-gray-200 rounded-3xl w-full h-full grid grid-rows-1 grid-cols-[auto_1fr] p-4 gap-2'}>
            <TypeTabsHeader />
            <SelectTabsBody />
        </div>
    )
}

export default SelectTabs;