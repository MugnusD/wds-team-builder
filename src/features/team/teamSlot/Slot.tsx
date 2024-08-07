import {FC, useEffect, useRef, useState} from 'react';
import {IoMenu} from 'react-icons/io5';
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
} from "../teamSlice.ts";
import {useDrag, useDrop} from "react-dnd";
import {DraggedItemType} from "../../../types/DragItemType.ts";
import toast from "react-hot-toast";
import { Dialog, Spinner} from "@material-tailwind/react";
import {GameItemType, setTabType} from "../../tabs/selectTabsSlice.ts";
import useBigScreenQuery from "../../../hooks/useBigScreenQuery.ts";
import clsx from "clsx";
import GameItemIcon, {IconRenderDetails} from "../../../ui/GameItemIcon.tsx";
import {getEmptyImage} from "react-dnd-html5-backend";
import {SlotItemType} from "../../../ui/CustomDragLayer.tsx";
import CharacterSortAndFilterButton from "../../tabs/tabsHeaderComponent/CharacterSortAndFilterButton.tsx";
import PosterSortAndFilterButton from "../../tabs/tabsHeaderComponent/PosterSortAndFilterButton.tsx";
import CharacterTabsContent from "../../tabs/tabBodyComponents/CharacterTabsContent.tsx";
import PosterTabsContent from "../../tabs/tabBodyComponents/PosterTabsContent.tsx";
import AccessoryTabsContent from "../../tabs/tabBodyComponents/AccessoryTabsContent.tsx";
import useCurrentTeamContext from "../useCurrentTeamContext.ts";
import {selectCoolTime} from "../teamTimeLine/coolTimeSlice.ts";

const Slot: FC<{
    slotIndex: SlotIndex,
}> = ({slotIndex}) => {
    // Media Query
    const isBigScreen = useBigScreenQuery();

    // details
    const context = useCurrentTeamContext();
    const {characterDetail, posterDetail, accessoryDetail} = context[slotIndex];
    const {isLoading, isError} = context;

    // Redux
    const {
              character: {
                  characterId,
              },
              posterId,
              accessoryId,
          } = useSelector(state => selectSlotByIndex(state, slotIndex));

    const leaderIndex = useSelector(selectLeaderIndex);
    const selectedItem = useSelector(selectFocusedItem);
    const dispatch = useDispatch();

    // Todo: delete this temp code
    const coolTime = useSelector(selectCoolTime)[slotIndex];

    // Small Screen Dialog
    const [isOpen, setIsOpen] = useState(false);
    const handlerOpen = () => setIsOpen(open => !open);
    useEffect(() => {
        if (!selectedItem) {
            setIsOpen(false);
        }
    }, [selectedItem]);

    // Derive selected item
    const currentSlotFocusedItem = selectedItem?.slotIndex === slotIndex ? selectedItem.itemType : null;

    // Fetch character data & find
    // const {
    //           isLoading,
    //           isError,
    //           characters,
    //       } = useCharacters();
    // const [characterDetail, setCharacterDetail] = useState<CharacterDetail>();
    // useEffect(() => {
    //     if (characterId && characters) {
    //         const character = characters?.find(character => character.id === characterId) ?? {} as CharacterDetail;
    //         setCharacterDetail(character);
    //     }
    // }, [characterId, characters]);
    //
    // const {posters} = usePosters();
    // const [posterDetail, setPosterDetail] = useState<PosterDetail>();
    // useEffect(() => {
    //     if (posterId !== 0 && posters) {
    //         const poster = posters?.find(poster => poster.id === posterId) ?? {} as PosterDetail;
    //         setPosterDetail(poster);
    //     }
    // }, [posterId, posters]);
    //
    // const {accessories} = useAccessories();
    // const [accessoryDetail, setAccessoryDetail] = useState<AccessoryDetail>();
    // useEffect(() => {
    //     if (accessoryId !== 0 && accessories) {
    //         const accessory = accessories?.find(accessory => accessory.id === accessoryId) ?? {} as AccessoryDetail;
    //         setAccessoryDetail(accessory);
    //     }
    // }, [accessoryId, accessories]);

    // Character
    let characterIconDetail: IconRenderDetails;

    if (!characterDetail) {
        characterIconDetail = {
            type: 'character',
            rarity: 'Rare1',
            attribute: 'Cute',
            sense: 'None',
        };
    } else {
        characterIconDetail = {
            type: 'character',
            rarity: characterDetail.rarity,
            attribute: characterDetail.attribute,
            sense: characterDetail.sense.type,
        };
    }

    // Poster
    let posterIconDetail: IconRenderDetails;
    if (!posterDetail || posterId === 0) {
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

    // Accessory
    let accessoryIconDetail: IconRenderDetails;
    if (!accessoryDetail || accessoryId === 0) {
        accessoryIconDetail = {
            type: 'accessory',
            rarity: 'R',
        };
    } else {
        accessoryIconDetail = {
            type: 'accessory',
            rarity: accessoryDetail.rarity,
        };
    }

    // DnD Slot
    const [{isDragging}, drag, preview] = useDrag<SlotItemType, void, { isDragging: boolean }>({
        type: DraggedItemType.SLOT,
        item: {
            index: slotIndex,
            characterId,
            posterId,
            accessoryId,
            characterIconDetail,
            posterIconDetail,
            accessoryIconDetail,
            ct: coolTime,
            isLeader: leaderIndex === slotIndex,
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

    // hide html preview
    useEffect(() => {
        preview(getEmptyImage(), {captureDraggingState: true});
    }, [preview]);

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

    // Dnd Accessory
    const [{canDropAccessory}, accessoryDrop] = useDrop<SwapPayload, void, { canDropAccessory: boolean }>({
        accept: DraggedItemType.ACCESSORY,
        drop: (item) => {
            dispatch(setFocusedItem({slotIndex, itemType: 'accessory'}));
            dispatch(swapFocusItemFromTab(item));
            dispatch(resetFocusItem());
        },
        collect: (monitor) => ({
            canDropAccessory: monitor.canDrop(),
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

        if (!isBigScreen) {
            setIsOpen(true);
        }

        dispatch(setTabType(gameItem));
    };

    // Mouse OVer
    const [isMouseOver, setIsMouseOver] = useState(false);

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

    return (
        <div
            className={'flex h-20 md:w-[24rem] w-[20rem] flex-row items-center justify-between rounded-2xl border-[3px] border-solid border-gray-500 pl-2 pr-4 '
                + `${isDragging ? 'opacity-0' : ''}`}
        >
            {isBigScreen &&
                <div ref={dndRef} className={'flex h-20 md:w-16 w-12 items-center justify-center cursor-pointer'}>
                    <IoMenu
                        size={50}
                        color={'rgb(158 158 158'}
                        // className={'rounded-xl ' + `${canDrop && !isDragging ? 'bg-green-100 ' : ' '}` + `${isOver ? ' bg-fuchsia-200 ' : ' '}`}
                        className={clsx('rounded-xl', (canDrop && !isDragging) && 'bg-green-100', isOver && 'bg-fuchsia-200')}
                    />
                </div>}

            {/* Character card display, can drop from tab and focus */}
            <div
                className={clsx(currentSlotFocusedItem === 'character' && 'ring-2 ring-red-500', canDropCharacter && 'ring-4 ring-orange-300 rounded-xl')}
                onClick={() => handleFocus('character')}
                ref={characterDrop}
            >
                <GameItemIcon id={characterId} detail={characterIconDetail} />
            </div>

            {/* Poster display, can drop from tab and focus */}
            <div
                className={clsx(currentSlotFocusedItem === 'poster' && ' ring-2 ring-red-500', canDropPoster && 'ring-4 ring-orange-300 rounded-full')}
                onClick={() => handleFocus('poster')}
                ref={posterDrop}
            >
                <GameItemIcon id={posterId} detail={posterIconDetail} />
            </div>

            <div
                className={clsx(currentSlotFocusedItem === 'accessory' && ' ring-2 ring-red-500', canDropAccessory && 'ring-4 ring-orange-300 rounded-full')}
                onClick={() => handleFocus('accessory')}
                ref={accessoryDrop}
            >
                <GameItemIcon id={accessoryId} detail={accessoryIconDetail} />
            </div>

            <div
                className={'w-16 flex h-16 flex-col gap-y-3 select-none cursor-pointer'}
                onClick={handleSetLeader}
                onMouseEnter={() => setIsMouseOver(true)}
                onMouseLeave={() => setIsMouseOver(false)}
            >
                {leaderIndex === slotIndex
                    ? (
                        <div className={'mt-2 rounded-md bg-red-500 text-center text-white'}>
                            Leader
                        </div>
                    )
                    : isMouseOver
                        ? <div className={'mt-2 rounded-md bg-red-200 text-center text-white'}>
                            Leader
                        </div>
                        : <div className={'mt-2 rounded-md bg-gray-300 text-center'}>
                            &mdash; &mdash;
                        </div>
                }
                <div className={'text-center relative bottom-2.5 flex items-baseline justify-center flex-nowrap'}>
                    CT <span className={'text-2xl w-9 inline-block'}>{coolTime}</span> 秒
                </div>
            </div>
            {!isBigScreen && (
                <Dialog open={isOpen} handler={() => {
                    handlerOpen();
                    if (isOpen) {
                        dispatch(resetFocusItem());
                    }
                }} className={'flex flex-col gap-2'}>
                    <div className={'mt-2 flex justify-between px-4'}>
                        <div className={'flex gap-2'}>
                            <div onClick={() => handleFocus('character')}>
                                <GameItemIcon id={characterId} detail={characterIconDetail} size={'small'} />
                            </div>
                            <div onClick={() => handleFocus('poster')}>
                                <GameItemIcon id={posterId} detail={posterIconDetail} size={'small'} />
                            </div>
                            <div onClick={() => handleFocus('accessory')}>
                                <GameItemIcon id={accessoryId} detail={accessoryIconDetail} size={'small'} />
                            </div>
                        </div>

                        {currentSlotFocusedItem === 'character' && <div className={'flex items-center'}>
                            <CharacterSortAndFilterButton />
                        </div>}
                        {currentSlotFocusedItem === 'poster' && <div className={'flex items-center'}>
                            <PosterSortAndFilterButton />
                        </div>}
                    </div>


                    <div
                        className={
                            'flex flex-row flex-wrap justify-start gap-2 overflow-y-auto rounded-2xl border-2 border-light-blue-100 bg-light-blue-50 p-4 h-[70vh]'
                        }
                    >
                        {currentSlotFocusedItem === 'character' && <CharacterTabsContent />}
                        {currentSlotFocusedItem === 'poster' && <PosterTabsContent />}
                        {currentSlotFocusedItem === 'accessory' && <AccessoryTabsContent />}
                    </div>
                </Dialog>
            )}
        </div>
    );
};

export default Slot;
