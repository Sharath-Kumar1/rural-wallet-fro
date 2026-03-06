import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import API from "../api";

export default function Login(){

const navigate = useNavigate();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleSubmit = async(e)=>{

e.preventDefault();

try{

const res = await API.post("/auth/login",{
email,
password
});

alert(res.data.message);

localStorage.setItem("userId",res.data.userId);

navigate("/dashboard");

}catch(err){

alert(err.response?.data?.message || "Login failed");

}

};

return(

<div style={styles.page}>

<h1 style={styles.title}>🏦 Rural Wallet</h1>

<div style={styles.card}>

<h2 style={styles.heading}>Login</h2>

<form onSubmit={handleSubmit} style={styles.form}>

<input
type="email"
placeholder="Enter Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={styles.input}
/>

<input
type="password"
placeholder="Enter Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={styles.input}
/>

<button style={styles.button}>
Login
</button>

</form>

</div>

</div>

);

}

/* ---------- Styles ---------- */

const styles={

page:{
height:"100vh",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
background:"#f4f6fb",
fontFamily:"Arial"
},

title:{
color:"#1e3a8a",
marginBottom:"20px"
},

card:{
background:"white",
padding:"40px",
borderRadius:"10px",
width:"350px",
boxShadow:"0px 6px 20px rgba(0,0,0,0.15)"
},

heading:{
textAlign:"center",
marginBottom:"20px",
color:"#1e3a8a"
},

form:{
display:"flex",
flexDirection:"column",
gap:"15px"
},

input:{
padding:"12px",
borderRadius:"6px",
border:"1px solid #ccc",
fontSize:"15px"
},

button:{
background:"#1e3a8a",
color:"white",
border:"none",
padding:"12px",
borderRadius:"6px",
fontSize:"16px",
cursor:"pointer"
}

};