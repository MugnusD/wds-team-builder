export const getCharacters = async () => {
    const response = await fetch('/json/all_character.json');
    const data = await response.json();

    // forcefully convert string to Date
    data.forEach((item: { displayStartAt: string | Date }) => item.displayStartAt = new Date(item.displayStartAt));

    if (!data) {
        throw new Error('Data fetching failed');
    }

    /*  Already sorted by id
    (data as CharacterDetail[]).sort((a, b) => {
        return b.id - a.id;
    });
    */

    return data as CharacterDetail[];
};

export const getPosters = async () => {
    const response = await fetch('/json/all_poster.json');
    const data = await response.json();

    // forcefully convert string to Date
    data.forEach((item: { displayStartAt: string | Date }) => item.displayStartAt = new Date(item.displayStartAt));

    if (!data) {
        throw new Error('Data fetching failed');
    }

    /*
    (data as PosterDetail[]).sort((a, b) => {
        return b.id - a.id;
    });
    */

    return data as PosterDetail[];
};

export const getCharacterIconPosition = async () => {
    const response = await fetch('/json/character_sprite.json');
    const data: Record<string, { x: number, y: number }> = await response.json();

    return data;
};

export const getPosterIconPosition = async () => {
    const response = await fetch('/json/poster_sprite.json');
    const data: Record<string, { x: number, y: number }> = await response.json();

    return data;
};
