
export const getCharacters = async () => {
    const response = await fetch('/json/all_character.json');
    const data = await response.json();

    // forcefully convert string to Date
    data.forEach((item: {displayStartAt: string | Date}) => item.displayStartAt = new Date(item.displayStartAt));

    if (!data) {
        throw new Error('Data fetching failed');
    }

    return data as CharacterDetail[];
}

export const getPosters = async () => {
    const response = await fetch('/json/all_poster.json');
    const data = await response.json();

    // forcefully convert string to Date
    data.forEach((item: {displayStartAt: string | Date}) => item.displayStartAt = new Date(item.displayStartAt));

    if (!data) {
        throw new Error('Data fetching failed');
    }

    return data as PosterDetail[];
}

