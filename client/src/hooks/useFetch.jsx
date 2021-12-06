import {useState, useEffect} from 'react'
import serverAPI from "../APIs/serverAPI"

const useFetch = (url, options) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await serverAPI.get(url, options)
                const data = await response.json();
                setData(data);
            } catch (e) {
                setData([]);
                setError(e);
            }
        }

        fetchData();
    }, [options, url]);
    return { data, error }
}

export default useFetch
