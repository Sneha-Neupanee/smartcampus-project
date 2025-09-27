
import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { api, saveToken, loadCreds } from '../lib/api.js'
export default function Login(){ const n=useNavigate(); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [err,setErr]=useState(''); useEffect(()=>{ const r=loadCreds(); if(r){ setEmail(r.email); setPassword(r.password) } },[]) 
async function submit(e){ e.preventDefault(); setErr(''); try{ const {token,user}=await api.login(email,password); saveToken(token); if(user.role==='admin') n('/admin'); else if(user.role==='teacher') n('/teacher'); else n('/student'); }catch(e){ setErr(e.message) } }
return (<div className="card"><h2>Login</h2>{err && <p style={{color:'#f88'}}>{err}</p>}<form onSubmit={submit} className="grid"><div><div className="label">Email</div><input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" /></div><div><div className="label">Password</div><input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" /></div><button className="btn">Login</button></form></div>) }
