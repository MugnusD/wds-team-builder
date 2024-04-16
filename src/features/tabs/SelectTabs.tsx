import {FC} from 'react';
import SelectTabsHeader from './SelectTabsHeader.tsx';
import SelectTabsBody from './SelectTabsBody.tsx';
import TooltipWithHelperIcon from '../../ui/TooltipWithHelperIcon.tsx';

const SelectTabs: FC = () => {
    return (
        <div
            className={'relative grid max-h-[26em] min-h-[14em] w-full grid-cols-1 grid-rows-[auto_1fr] gap-2 rounded-3xl border-2 border-blue-gray-200 p-4'}>
            <SelectTabsHeader />
            <SelectTabsBody />
            <div className={'absolute right-3 top-3'}>
                <TooltipWithHelperIcon />
            </div>
        </div>
    );
};

export default SelectTabs;
