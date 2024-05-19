import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeObj = async (key:string, value:any) => 
{
    try
    {

        const jsonVal = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonVal);
    }
    catch (e)
    {
        console.error("Cannot store KV pair (" + key + "," + value + "): " + e);
    }
}

export const getObj = async (key:string) => 
{
    try
    {
        const jsonVal = await AsyncStorage.getItem(key);
        return jsonVal != null ? JSON.parse(jsonVal) : null
    }
    catch (e)
    {
        console.error("Could not retrieve item at key " + key + ": " + e);
        return null;
    }
}

export async function getFavourites() : Promise<Set<string>>
{
    const favourites = await getObj("favourites");
    return favourites != null ? new Set<string>(favourites) : new Set<string>();
}

export async function storeFavourite(favourite:string)
{
    let currentFavourites = new Set<string>(await getObj("favourites"));
    console.log("poop");
    currentFavourites.add(favourite);
    console.log("poop");
    storeObj("favourites", Array.from(currentFavourites));
}

export async function deleteFavourite(favourite:string)
{
    let currentFavourites = await getFavourites();
    currentFavourites.delete(favourite);
    storeObj("favourites", currentFavourites);
}