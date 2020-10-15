export interface NewsItem {
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