import {FC, useState} from 'react';
import {Button, Dialog, DialogBody, DialogHeader} from "@material-tailwind/react";
import TeamPreview from "./TeamPreview.tsx";
import {CopiedTeamProvider} from "./CopiedTeamContext.tsx";

const TeamPreviewButton: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(!isOpen);

    return (
        <>
            <Button onClick={handleOpen} className={'w-60'}>
                Preview All Teams
            </Button>
            <Dialog open={isOpen} handler={handleOpen} size={'lg'}>
                <DialogHeader className={'flex justify-center'}>Teams Preview</DialogHeader>
                <DialogBody>
                    <div className={'flex flex-col items-center overflow-auto h-[40em]'}>
                        <CopiedTeamProvider>
                            <TeamPreview teamIndex={'team1'} />
                            <TeamPreview teamIndex={'team2'} />
                            <TeamPreview teamIndex={'team3'} />
                            <TeamPreview teamIndex={'team4'} />
                            <TeamPreview teamIndex={'team5'} />
                            <TeamPreview teamIndex={'team6'} />
                            <TeamPreview teamIndex={'team7'} />
                            <TeamPreview teamIndex={'team8'} />
                            <TeamPreview teamIndex={'team9'} />
                            <TeamPreview teamIndex={'team10'} />
                            <TeamPreview teamIndex={'team11'} />
                            <TeamPreview teamIndex={'team12'} />
                        </CopiedTeamProvider>
                    </div>
                </DialogBody>
            </Dialog>
        </>

    );
};

export default TeamPreviewButton;