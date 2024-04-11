
export const getCharacters = async () => {
    const response = await fetch('/json/all_character.json');
    const data = await response.json() as CharacterDetail[];

    if (!data) {
        throw new Error('Data fetching failed');
    }

    return data;
}