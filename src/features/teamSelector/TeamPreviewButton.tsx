import {FC, useState} from 'react';
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader} from "@material-tailwind/react";
import TeamPreview from "./TeamPreview.tsx";

const TeamPreviewButton: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(!isOpen);

    return (
        <>
            <Button onClick={handleOpen}>
                Preview All Teams
            </Button>
            <Dialog open={isOpen} handler={handleOpen} size={'sm'}>
                <DialogHeader>Its a simple dialog.</DialogHeader>
                <DialogBody>
                    <div className={'flex-col overflow-auto h-[40em]'}>
                        <TeamPreview teamIndex={'team1'} />
                        <TeamPreview teamIndex={'team2'} />
                        <TeamPreview teamIndex={'team3'} />
                        <TeamPreview teamIndex={'team4'} />
                        <TeamPreview teamIndex={'team5'} />
                        <TeamPreview teamIndex={'team6'} />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleOpen}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>

    );
};

export default TeamPreviewButton;