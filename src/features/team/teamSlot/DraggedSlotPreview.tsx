import {FC} from 'react';
import {IoMenu} from "react-icons/io5";
import GameItemIcon from "../../../ui/GameItemIcon.tsx";
import {SlotItemType} from "../../../ui/CustomDragLayer.tsx";

/**
 * Component to generate the preview of the dragged <Slot />, which is highly similar in code of <Slot />.
 * Perhaps requiring further modifications, but able to accomplish the task perfectly.
 * @param characterId
 * @param characterIconDetail
 * @param posterIconDetail
 * @param posterId
 * @param isLeader
 * @param ct
 * @param accessoryIconDetail
 * @param accessoryId
 * @constructor
 */
const DraggedSlotPreview: FC<SlotItemType> = ({characterId,characterIconDetail ,posterIconDetail,posterId, isLeader, ct, accessoryIconDetail, accessoryId}) => {
    return (
        <div
            className={'flex h-20 md:w-[24rem] w-[20rem] flex-row items-center justify-between rounded-2xl border-[3px] border-solid border-gray-500 pl-2 pr-4 bg-white'}
        >
            <div className={'flex h-20 md:w-16 w-12 items-center justify-center cursor-pointer '}>
                <IoMenu
                    size={50}
                    color={'rgb(158 158 158'}
                    className={'rounded-xl '}
                />
            </div>

            {/* Character card display, can drop from tab and focus */}
            <div>
                <GameItemIcon id={characterId} detail={characterIconDetail} />
            </div>

            {/* Poster display, can drop from tab and focus */}
            <div>
                <GameItemIcon id={posterId} detail={posterIconDetail} />
            </div>

            <div className={'flex md:h-16 md:w-16 h-14 w-14 items-center justify-center rounded-full border-2 border-gray-300'}>
                <GameItemIcon id={accessoryId} detail={accessoryIconDetail} />
            </div>

            <div className={'w-16 flex h-16 flex-col gap-y-3 select-none cursor-pointer'} >
                {isLeader
                    ? (
                        <div className={'mt-2 rounded-md bg-red-500 text-center text-white'}>
                            Leader
                        </div>
                    )
                    : (
                        <div className={'mt-2 rounded-md bg-gray-300 text-center'}>
                            &mdash; &mdash;
                        </div>
                    )}
                <div className={'text-center relative bottom-2.5 text-nowrap'}>
                    CT <span className={'text-2xl w-6 inline-block'}>{ct}</span> 秒
                </div>
            </div>
        </div>
    )
}

export default DraggedSlotPreview;