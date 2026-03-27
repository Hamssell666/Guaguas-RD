const KEY = 'gt_favs';
export const getFavs = () => JSON.parse(localStorage.getItem(KEY)) || [];
export const saveFav = (id) => {
    const favs = getFavs();
    if(!favs.includes(id)) {
        favs.push(id);
        localStorage.setItem(KEY, JSON.stringify(favs));
        return true;
    }
    return false;
};
export const removeFav = (id) => {
    const newFavs = getFavs().filter(f => f !== id);
    localStorage.setItem(KEY, JSON.stringify(newFavs));
};