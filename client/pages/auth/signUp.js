import Router from "next/router"
import { useState } from "react"
import useRequest from "../../hooks/useRequest"

export default  () =>{
    const [fname,setFname] = useState("")
    const [lname,setLname] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const {doRequest,errors} = useRequest({
         url:'/api/users/signUp',
         method:'post',
         body:{
            fname,lname,email,password
         },
         onSuccess:()=>Router.push('/')
    });
   
    const handleSub = async(e) => {
        e.preventDefault()
        await doRequest()
    }
    return (
        <form onSubmit={handleSub}>
            <h1>SignUp</h1>
            <div className="form-group">
                <label>First Name</label>
                <input value={fname} onChange={e => setFname(e.target.value)}  className="form-control" />
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input value={lname} onChange={e => setLname(e.target.value)}  className="form-control" />
            </div>
            <div className="form-group">
                <label>Email Address</label>
                <input value={email} onChange={e => setEmail(e.target.value)}  className="form-control" />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input value={password} onChange={e => setPassword(e.target.value)} className="form-control" />
            </div>
            {errors}
            <button className="btn btn-primary">Sign Up</button>
        </form>
    )
}