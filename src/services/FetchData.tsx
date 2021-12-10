import axios, {Axios, AxiosResponse} from 'axios';

export const BASE_URL = 'https://api.github.com';

export type UserType = {
    login: string;
    name: string;
    id: number;
    avatar_url: string;
    url: string;
    repos_url: string;

}

export type UserListType = {
    items: UserType[]
}

export type RepositorySpecs = {
    id: number;
    name: string;
    html_url: string;
    description: string;
    url: string;
    created_at: string;
    stargazers_count: number;
    language: string;
}

export type ErrorSpecs = {
    status: number;
    errorType: string;
}

class FetchDataSource {
    getData(url: string) {
        console.log(`${url}`)
        return axios.get(`${url}`)
            .then((res) => {
                return res.data;
            })
            .catch((err): ErrorSpecs => {
                throw {
                    status: err.response.status,
                    errorType: err.response.data.message
                };
            });
    }
}

export const GetDataSource = new FetchDataSource();