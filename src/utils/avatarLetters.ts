export const avatarLetters = (name: string) => {
    const nameArray = name.split(" ");
    if (nameArray.length > 1) {
        const letters = nameArray[0].charAt(0) + nameArray[1].charAt(0);
        return letters.toUpperCase();
    } else return nameArray[0].charAt(0).toUpperCase();
};
