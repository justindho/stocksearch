export interface News {
    url: string;
    title: string;
    description: string;
    source: {
        id: string;
        name: string;
    },
    urlToImage: string;
    publishedAt: string;
}