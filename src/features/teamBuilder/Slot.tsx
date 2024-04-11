import {FC} from 'react';
import {IoMenu} from 'react-icons/io5';
import {GiDiamondRing} from 'react-icons/gi';
import {useDispatch, useSelector} from "react-redux";
import {selectLeaderIndex, selectSlotByIndex, setAsLeader, SlotIndex} from "./teamSlice.ts";
import {BsFileImage} from "react-icons/bs";
import {useDrag} from "react-dnd";
import {ItemTypes} from "../../itemTypes.ts";

const Slot: FC<{
    slotIndex: SlotIndex,
}> = ({slotIndex}) => {
    const [, drag, preview] = useDrag(() => ({
        type: ItemTypes.CHARACTER,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    }))

    const {
              characterId,
              posterId,
          } = useSelector(state => selectSlotByIndex(state, slotIndex));
    const leaderIndex = useSelector(selectLeaderIndex);

    const dispatch = useDispatch();

    const handleSetLeader = () => {
        dispatch(setAsLeader(slotIndex));
    }

    return (
            <div ref={preview} className='flex h-20 w-[24rem] flex-row items-center justify-between  rounded-2xl border-[3px] border-solid border-gray-500 pl-2 pr-4'>
                <div ref={drag} className={'flex h-20 w-16 items-center justify-center'}>
                    <IoMenu size={50} color={'rgb(158 158 158'} />
                </div>
                <div className='h-16 w-16 rounded-xl bg-gradient-to-br from-[#62e2f9] via-[#aa77ee] to-[#fedd77] p-1'>
                    <img
                        src={`/characterIcons/${characterId}_0.png`}
                        alt={characterId.toString()}
                    />
                </div>
                <div className='h-16 w-16  rounded-full bg-gradient-to-br from-[#62e2f9] via-[#aa77ee] to-[#fedd77] p-1'>
                    {posterId === 0
                        ? (
                            <div className={'w-full h-full bg-white rounded-full flex items-center justify-center'}>
                                <BsFileImage size={35} color={'#78909c'} />
                            </div>
                        )
                        : (
                            <img
                                src={`/posterIcons/${posterId}.png`}
                                alt={posterId.toString()}
                                className={'rounded-full'}
                            />
                        )

                    }
                </div>
                <div className='flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-300' >
                    <GiDiamondRing size={50} color={'#78909c'} />
                </div>
                <div className={'w-16flex h-16 flex-col gap-y-3 select-none cursor-pointer'} onClick={handleSetLeader}>
                    {leaderIndex === slotIndex
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
                    <div className={'text-center'}>
                        CT <span className={'text-2xl'}>60</span> 秒
                    </div>
                </div>
            </div>
    );
};

export default Slot;
