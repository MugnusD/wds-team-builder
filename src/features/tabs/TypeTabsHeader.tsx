import {ChangeEventHandler, FC} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {GameItemType, selectGameItemType, setTabType} from "./selectTabsSlice.ts";
import {resetFocusItem} from "../teamBuilder/teamSlice.ts";

const TypeTabsHeader: FC = () => {
    const currentType = useSelector(selectGameItemType);
    const dispatch = useDispatch();

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (currentType !== event.target.value) {
            dispatch(setTabType(event.target.value as GameItemType));
            dispatch(resetFocusItem());
        }
    };

    return (
        <div className={'flex flex-col'}>
            <div className="grid w-[24rem] grid-cols-3 gap-2 rounded-xl bg-gray-200 p-2">
                <div>
                    <input
                        type="radio"
                        name="option"
                        id="character"
                        value="character"
                        className="peer hidden"
                        checked={currentType === 'character'}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor="character"
                        className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
                    >character</label>
                </div>

                <div>
                    <input
                        type="radio"
                        name="option"
                        id="poster"
                        value="poster"
                        className="peer hidden"
                        checked={currentType === 'poster'}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor="poster"
                        className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
                    >poster</label>
                </div>

                <div>
                    <input
                        type="radio"
                        name="option"
                        id="accessory"
                        value="accessory"
                        className="peer hidden"
                        checked={currentType === 'accessory'}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor="accessory"
                        className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
                    >accessory</label>
                </div>
            </div>
            <div>
                Filter Area
            </div>
        </div>
    )
}

export default TypeTabsHeader;