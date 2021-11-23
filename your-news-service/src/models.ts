export interface NewsItem {
    name: string;
    url: string;
    image: {
        thumbnail: {
            contentUrl: string;
            width: number;
            height: number;
        };
        isLicensed: boolean;
    };
    description: string;
    provider: {
        name: string;
        image: {
            thumbnail: {
                contentUrl: string;
            }
        }
    }[];
    datePublished: string;
}

export interface NewsResponse {
    value: NewsItem[];
}

export interface ArticleItem {
    description: string;
    title: string;
    source: {
        name: string;
        imageUrl?: string;
    };
    sourceLink: string;
    category: string;
    imageUrl?: string;
    datePublished: string;
}
