import axios from 'axios'
import store from './store/store'
import router from './router'

export default function setAxios() {
    //每次的有返回的请求，都会先进入该函数进行操作
    axios.interceptors.response.use(
        response => {
            if (response.status == 200) {
                const data = response.data;
                return data;
            }
            return response;
        }
    )
}