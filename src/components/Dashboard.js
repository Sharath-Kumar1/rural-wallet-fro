import React,{useEffect,useState} from "react";
import API from "../api";

export default function Dashboard(){

const userId = localStorage.getItem("userId");

const [balance,setBalance] = useState(0);
const [amount,setAmount] = useState("");
const [pin,setPin] = useState("");
const [history,setHistory] = useState([]);

useEffect(()=>{
loadBalance();
loadHistory();
},[]);

/* ---------- Load Balance ---------- */

const loadBalance = async ()=>{
try{
const res = await API.get("/wallet/balance/"+userId);
setBalance(res.data.balance);
}catch(err){
console.log(err);
}
};

/* ---------- Load History ---------- */

const loadHistory = async ()=>{
try{
const res = await API.get("/wallet/history/"+userId);
setHistory(res.data);
}catch(err){
console.log(err);
}
};

/* ---------- Deposit ---------- */

const deposit = async ()=>{

if(!amount || !pin){
alert("Enter amount and PIN");
return;
}

try{

const res = await API.post("/wallet/transaction",{
userId,
amount,
pin
});

alert(res.data.message);

setBalance(res.data.balance);

setAmount("");
setPin("");

loadHistory();

}catch(err){

alert(err.response?.data?.message || "Server error");

}

};

/* ---------- Generate Receipt ---------- */

const generateReceipt = (t)=>{

return `
Rural Wallet Receipt
---------------------------
User ID : ${userId}
Type    : ${t.type}
Amount  : ₹${t.amount}
Date    : ${t.date}
---------------------------
Thank you for using Rural Wallet
`;

};

/* ---------- Download Receipt ---------- */

const downloadReceipt = (t)=>{

const receipt = generateReceipt(t);

const blob = new Blob([receipt],{type:"text/plain"});

const link = document.createElement("a");

link.href = URL.createObjectURL(blob);

link.download = "receipt.txt";

link.click();

};

/* ---------- View Receipt ---------- */

const viewReceipt = (t)=>{

alert(generateReceipt(t));

};

return(

<div style={styles.page}>

<h1 style={styles.title}>🏦 Rural Wallet</h1>

<div style={styles.card}>

<h3>User ID: {userId}</h3>

<h2 style={styles.balance}>Balance: ₹{balance}</h2>

<div style={styles.depositBox}>

<h3>Deposit Money</h3>

<input
style={styles.input}
placeholder="Enter Amount"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
/>

<input
style={styles.input}
type="password"
placeholder="Enter PIN"
value={pin}
onChange={(e)=>setPin(e.target.value)}
/>

<button style={styles.button} onClick={deposit}>
Deposit
</button>

</div>

</div>

<h3 style={{marginTop:"40px"}}>Transaction History</h3>

<table style={styles.table}>

<thead>
<tr>
<th>Type</th>
<th>Amount</th>
<th>Date</th>
<th>Receipt</th>
</tr>
</thead>

<tbody>

{history.length===0 ? (

<tr>
<td colSpan="4">No Transactions Yet</td>
</tr>

) : (

history.map((t,i)=>(
<tr key={i}>
<td>{t.type}</td>
<td>₹{t.amount}</td>
<td>{t.date}</td>

<td>

<button
style={styles.viewBtn}
onClick={()=>viewReceipt(t)}
>
View
</button>

<button
style={styles.downloadBtn}
onClick={()=>downloadReceipt(t)}
>
Download
</button>

</td>

</tr>
))

)}

</tbody>

</table>

</div>

);

}

/* ---------- Styles ---------- */

const styles={

page:{
minHeight:"100vh",
background:"#f5f7fb",
padding:"40px",
textAlign:"center",
fontFamily:"Arial"
},

title:{
color:"#1e3a8a",
marginBottom:"30px"
},

card:{
background:"white",
width:"400px",
margin:"auto",
padding:"30px",
borderRadius:"10px",
boxShadow:"0px 5px 20px rgba(0,0,0,0.15)"
},

balance:{
color:"#16a34a",
margin:"10px 0"
},

depositBox:{
marginTop:"20px",
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
cursor:"pointer",
fontSize:"16px"
},

table:{
margin:"auto",
marginTop:"20px",
borderCollapse:"collapse",
width:"70%",
background:"white",
boxShadow:"0px 5px 15px rgba(0,0,0,0.1)"
},

viewBtn:{
background:"#2563eb",
color:"white",
border:"none",
padding:"6px 10px",
marginRight:"5px",
borderRadius:"4px",
cursor:"pointer"
},

downloadBtn:{
background:"#16a34a",
color:"white",
border:"none",
padding:"6px 10px",
borderRadius:"4px",
cursor:"pointer"
}

};