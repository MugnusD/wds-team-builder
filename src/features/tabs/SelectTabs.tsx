import {FC} from 'react';
import SelectTabsHeader from "./SelectTabsHeader.tsx";
import SelectTabsBody from "./SelectTabsBody.tsx";
import TooltipWithHelperIcon from "../../ui/TooltipWithHelperIcon.tsx";


const SelectTabs: FC = () => {
    return (
        <div className={'border-2 border-blue-gray-200 rounded-3xl w-full grid  grid-cols-1 grid-rows-[auto_1fr] p-4 gap-2 max-h-[26em] min-h-[14em] relative'}>
            <SelectTabsHeader />
            <SelectTabsBody />
            <div className={'absolute right-3 top-3'}>
                <TooltipWithHelperIcon />
            </div>
        </div>
    )
}

export default SelectTabs;