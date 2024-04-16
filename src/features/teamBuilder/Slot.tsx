import {FC, useEffect, useRef, useState} from 'react';
import {IoMenu} from 'react-icons/io5';
import {GiDiamondRing} from 'react-icons/gi';
import {useDispatch, useSelector} from "react-redux";
import {
    resetFocusItem,
    selectFocusedItem,
    selectLeaderIndex,
    selectSlotByIndex,
    setAsLeader,
    setFocusedItem,
    SlotIndex, swapFocusItemFromTab, SwapPayload,
    swapSlot,
} from "./teamSlice.ts";
import {useDrag, useDrop} from "react-dnd";
import {DraggedItemType} from "../../DragItemType.ts";
import useCharacters from "../../hooks/useCharacters.ts";
import toast from "react-hot-toast";
import {Spinner} from "@material-tailwind/react";
import {GameItemType, setTabType} from "../tabs/selectTabsSlice.ts";
import useBigScreenQuery from "../../hooks/useBigScreenQuery.ts";
import clsx from "clsx";
import GameItemIcon, {IconRenderDetails} from "../../ui/GameItemIcon.tsx";
import usePosters from "../../hooks/usePosters.ts";

const Slot: FC<{
    slotIndex: SlotIndex,
}> = ({slotIndex}) => {
    // Media Query
    const isBigScreen = useBigScreenQuery();

    // Redux
    const {
              character: {
                  characterId,
              },
              posterId,
          } = useSelector(state => selectSlotByIndex(state, slotIndex));
    const leaderIndex = useSelector(selectLeaderIndex);
    const selectedItem = useSelector(selectFocusedItem);
    const dispatch = useDispatch();

    // Derive selected item
    const currentSlotFocusedItem = selectedItem?.slotIndex === slotIndex ? selectedItem.itemType : 'none';

    // Fetch character data & find
    const {
              isLoading,
              isError,
              characters,
          } = useCharacters();
    const [characterDetail, setCharacterDetail] = useState<CharacterDetail>();
    useEffect(() => {
        if (characterId && characters) {
            const character = characters?.find(character => character.id === characterId) ?? {} as CharacterDetail;
            setCharacterDetail(character);
        }
    }, [characterId, characters]);

    const {posters} = usePosters();
    const [posterDetail, setPosterDetail] = useState<PosterDetail>();
    useEffect(() => {
        if (posterId !== 0 && posters) {
            const poster = posters?.find(poster => poster.id === posterId) ?? {} as PosterDetail;
            setPosterDetail(poster);
        }
    }, [posterId, posters]);

    // DnD Slot
    const [{isDragging}, drag, preview] = useDrag({
        type: DraggedItemType.SLOT,
        item: {
            index: slotIndex,
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const [{canDrop, isOver}, drop] = useDrop<{ index: SlotIndex }, void, { canDrop: boolean, isOver: boolean }>({
        accept: DraggedItemType.SLOT,
        drop: (item) => {
            dispatch(swapSlot({
                to: item.index,
                from: slotIndex,
            }));
        },
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver(),
        }),
    });
    const dndRef = useRef<HTMLDivElement>(null);
    drag(drop(dndRef));

    // DnD character
    const [{canDropCharacter}, characterDrop] = useDrop<SwapPayload, void, { canDropCharacter: boolean }>({
        accept: DraggedItemType.CHARACTER,
        drop: (item) => {
            dispatch(setFocusedItem({slotIndex, itemType: 'character'}));
            dispatch(swapFocusItemFromTab(item));
            dispatch(resetFocusItem());
        },
        collect: (monitor) => ({
            canDropCharacter: monitor.canDrop(),
        }),
    });

    // DnD Poster
    const [{canDropPoster}, posterDrop] = useDrop<SwapPayload, void, { canDropPoster: boolean }>({
        accept: DraggedItemType.POSTER,
        drop: (item) => {
            dispatch(setFocusedItem({slotIndex, itemType: 'poster'}));
            dispatch(swapFocusItemFromTab(item));
            dispatch(resetFocusItem());
        },
        collect: (monitor) => ({
            canDropPoster: monitor.canDrop(),
        }),
    });

    // Handler functions
    const handleSetLeader = () => {
        dispatch(setAsLeader(slotIndex));
    };
    const handleFocus = (gameItem: GameItemType) => {
        dispatch(setFocusedItem({
            slotIndex,
            itemType: gameItem,
        }));
        dispatch(setTabType(gameItem));
    };

    if (isLoading) {
        return (
            <div className={'flex h-20 w-[24rem] flex-row items-center justify-center rounded-2xl border-[3px] border-solid border-gray-500 pl-2 pr-4'}>
                <Spinner className={'h-16 w-16'} />
            </div>
        );
    }

    if (isError) {
        toast.error('Fetching data wrong');
        return null;
    }

    // Character
    let bloom: number,
        characterIconDetail: IconRenderDetails;

    if (!characterDetail) {
        bloom = 0;
        characterIconDetail = {
            type: 'character',
            rarity: 'Rare1',
            attribute: 'Cute',
            sense: 'None',
        };
    } else {
        bloom = characterDetail.sense.coolTime.bloom;
        characterIconDetail = {
            type: 'character',
            rarity: characterDetail.rarity,
            attribute: characterDetail.attribute,
            sense: characterDetail.sense.type,
        };
    }

    // Poster
    let posterIconDetail: IconRenderDetails;
    if (!posterDetail) {
        posterIconDetail = {
            type: 'poster',
            rarity: 'R',
        };
    } else {
        posterIconDetail = {
            type: 'poster',
            rarity: posterDetail.rarity,
        };
    }


    return (
        <div
            ref={preview}
            className={'flex h-20 md:w-[24rem] w-[20rem] flex-row items-center justify-between rounded-2xl border-[3px] border-solid border-gray-500 pl-2 pr-4 '
                + `${isDragging ? 'opacity-0' : ''}`}
        >
            <div ref={dndRef} className={'flex h-20 md:w-16 w-12 items-center justify-center cursor-pointer '}>
                <IoMenu
                    size={isBigScreen ? 50 : 40}
                    color={'rgb(158 158 158'}
                    className={'rounded-xl ' + `${canDrop && !isDragging ? 'bg-green-100 ' : ' '}` + `${isOver ? ' bg-fuchsia-200 ' : ' '}`}
                />
            </div>

            {/* Character card display, can drop from tab and focus */}
            <div
                // className={'md:h-16 md:w-16 h-14 w-14 rounded-xl bg-gradient-to-br from-[#62e2f9] via-[#aa77ee] to-[#fedd77] md:p-1 p-[3px] relative ' +
                //     `${currentSlotFocusedItem === 'character' ? 'ring-2 ring-red-500 ' : ' '}` +
                //     `${canDropCharacter ? 'ring-4 ring-orange-300 ' : ' '}`
                // }
                className={clsx(currentSlotFocusedItem === 'character' && 'ring-2 ring-red-500', canDropCharacter && 'ring-4 ring-orange-300')}
                onClick={() => handleFocus('character')}
                ref={characterDrop}
            >
                <GameItemIcon id={characterId} detail={characterIconDetail} />
            </div>

            {/* Poster display, can drop from tab and focus */}
            <div
                // className={'md:h-16 md:w-16 h-14 w-14 rounded-full bg-gradient-to-br from-[#62e2f9] via-[#aa77ee] to-[#fedd77] p-1 ' +
                //     `${currentSlotFocusedItem === 'poster' ? ' ring-2 ring-red-500 ' : ' '}` +
                //     `${canDropPoster && 'ring-4 ring-orange-300 '}`
                // }
                className={clsx(currentSlotFocusedItem === 'poster' && ' ring-2 ring-red-500', canDropPoster && 'ring-4 ring-orange-300')}
                onClick={() => handleFocus('poster')}
                ref={posterDrop}
            >
                <GameItemIcon id={posterId} detail={posterIconDetail} />
            </div>

            <div
                className={'flex md:h-16 md:w-16 h-14 w-14 items-center justify-center rounded-full border-2 border-gray-300' +
                    `${currentSlotFocusedItem === 'accessory' ? ' ring-2 ring-red-500' : ''}`}
                onClick={() => handleFocus('accessory')}
            >
                <GiDiamondRing size={isBigScreen ? 35 : 28} color={'#78909c'} />
            </div>

            <div className={'w-16 flex h-16 flex-col gap-y-3 select-none cursor-pointer'} onClick={handleSetLeader}>
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
                <div className={'text-center relative bottom-2.5 text-nowrap'}>
                    CT <span className={'text-2xl w-6 inline-block'}>{bloom}</span> 秒
                </div>
            </div>
        </div>
    );
};

export default Slot;
