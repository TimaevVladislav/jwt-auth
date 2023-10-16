
export interface IBlogs {
    data: IBlog[]
    paging: {
        cursors: {
            after: string
            before: string
        }
    }
}

export interface IBlog {
    id: string
    media_type: string
    media_url: string
    caption: string
    timestamp: string
    permalink: string
}

export interface IToken {
    access_token: string
    token_type: string
    expires_in: number
}
