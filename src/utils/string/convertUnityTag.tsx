import React from "react";

export const convertUnityTag = (input: string): React.ReactElement => {
    const regex = /<color=(#[a-zA-Z0-9]{6})>(.*?)<\/color>/g;
    const parts = input.split(regex);

    const processedParts = parts.map((part, index) => {
        switch (index % 3) {
            case 0: {
                return part;
            }
            case 1: {
                    const color = parts[index];
                    const text = parts[index + 1];
                    return <span style={{color}}>{text}</span>;
            }
            case 2: {
                return null;
            }
        }
    });

    return <>{processedParts}</>;
};

