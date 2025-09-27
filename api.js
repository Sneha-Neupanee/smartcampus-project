
const API = 'http://localhost:4000'
function tok(){ return localStorage.getItem('token')||'' }
async function req(path,method='GET',body){ const res = await fetch(API+path,{method,headers:{'Content-Type': body instanceof FormData? undefined: 'application/json','Authorization': tok()? `Bearer ${tok()}` : ''},body: body? (body instanceof FormData? body: JSON.stringify(body)): undefined}); if(!res.ok) throw new Error((await res.json()).error||'Request failed'); return res.json(); }
export const api = {
  signup:(email,password,role,name)=> req('/api/auth/signup','POST',{email,password,role,name}),
  login:(email,password)=> req('/api/auth/login','POST',{email,password}),
  me:()=> req('/api/me'),
  logout:()=> req('/api/auth/logout','POST'),
  adminUsers:()=> req('/api/admin/users'),
  notices:()=> req('/api/notices'),
  createNotice:(title,text)=> req('/api/notices','POST',{title,text}),
  teacherClasses:()=> req('/api/teacher/classes'),
  takeAttendance:(classId,date,present)=> req(`/api/classes/${classId}/attendance`,'POST',{date,presentEmails:present}),
  createHomework:(classId,data)=> req(`/api/classes/${classId}/homework`,'POST',data),
  studentClasses:()=> req('/api/student/classes'),
  classHomework:(classId)=> req(`/api/classes/${classId}/homework`),
  submitHomework:(classId,homeworkId,text,file)=> { const fd=new FormData(); fd.append('homeworkId',homeworkId); fd.append('text',text||''); if(file) fd.append('file',file); return req(`/api/classes/${classId}/submit`,'POST',fd) },
  badges:()=> req('/api/student/badges'),
  search:(q)=> req(`/api/search?q=${encodeURIComponent(q)}`)
}
export function saveToken(t){ localStorage.setItem('token',t) }
export function clearToken(){ localStorage.removeItem('token') }
export function saveCreds(e,p,role){ localStorage.setItem('remember',JSON.stringify({email:e,password:p,role})) }
export function loadCreds(){ try{return JSON.parse(localStorage.getItem('remember')||'null')}catch{return null} }
