import useRequest from "../../hooks/useRequest";
import Router from "next/router";
import {useEffect} from 'react'

export default () => { 
const {doRequest} = useRequest({
    url:'/api/users/signOut',
    method:'post',
    body:{},
    onSuccess:() =>Router.push('/')
    })
    useEffect(()=>{
        doRequest();
    },[])
    return <div>Sign You Out</div>
}