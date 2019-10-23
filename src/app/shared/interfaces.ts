export interface User {
    email: string
    password: string,
    returnSecureToken?: boolean
}

export interface FbAuthResponse {
    idToken: string,
    expiresIn: string
}

export interface Task {
    id?: string,
    title: string,
    text: string,
    author: string,
    date: Date,
    priority: string,
    planningTime: number,
    spendingTime: number,
    status: string
}

export interface FbCreateResponse {
    name: string
}

export interface Priority {
    name: string
}

export interface Status {
    name: string
}