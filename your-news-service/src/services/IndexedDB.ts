import {ArticleItem} from "../models";
import {get, set} from "idb-keyval";

export const setNewsCache = async (category: string, items: ArticleItem[]) => {
    const now = new Date();
    await set(category, {
        items,
        storedAt: now,
    });
}

export const getNewsCache = async (category: string): Promise<ArticleItem[]> => {
    // Return cached news articles for a category if they were store at most one hour ago
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);
    return get(category)
        .then(res => {
            if (res.storedAt > oneHourAgo) return res.items;
            return [];
        })
        .catch(err => []);
}
