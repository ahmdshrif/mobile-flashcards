import { AsyncStorage } from 'react-native'

STORAGE_KEY = "flachcard:data"

export const saveDeckTitle = (title) => {
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [title]: []
    }))
};
export const getDecks = async () => {
    const res = await AsyncStorage.getItem(STORAGE_KEY)
    const data = await JSON.parse(res)
    return data
}
export const deletDeck = async (key) => {
    const results = await AsyncStorage.getItem(STORAGE_KEY);
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
export const addCardToDeck = async (key, card) => {
    const results = await AsyncStorage.getItem(STORAGE_KEY);
    const data = JSON.parse(results);
    data[key].push(card);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
