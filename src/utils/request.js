import axios from "axios"

function request(method = "get", url, data) {
    return new Promise((resolve, reject) => {
        const config = {
            method,
            url,
            [(method.toLowerCase() === 'get') ? 'params': 'data']: data
        }
        axios(config).then(({data}) => {
            resolve(data)
        }).catch((err) => {
            const { response: { data }} = err;
            reject({error: data.error})
        })
    })
}

export default request;