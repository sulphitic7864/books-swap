import usersSeed from '../data/sample_users.json';import booksSeed from '../data/sample_books.json';import requestsSeed from '../data/sample_exchange_requests.json';import activitySeed from '../data/sample_activity.json';
const KEY='bookswap-state-v2', TOKEN='bookswap-token-v2';
export const demoPasswords=Object.fromEntries(usersSeed.map(u=>[u.email,u.password]));
const enrichBooks=(books,users)=>books.map(b=>({...b,location:b.location||users.find(u=>u.id===b.ownerId)?.neighborhood||'Community Library'}));
export function seed(){return {users:usersSeed.map(u=>({...u,demo:true})),books:enrichBooks(booksSeed,usersSeed),requests:requestsSeed,activity:activitySeed};}
export function getState(){try{let raw=localStorage.getItem(KEY); if(!raw){const s=seed(); localStorage.setItem(KEY,JSON.stringify(s)); return s;} return JSON.parse(raw)}catch{return seed()}}
export function setState(s){localStorage.setItem(KEY,JSON.stringify(s))}
export function resetState(){const s=seed(); localStorage.setItem(KEY,JSON.stringify(s)); localStorage.removeItem(TOKEN); return s}
const b64=s=>btoa(unescape(encodeURIComponent(JSON.stringify(s)))).replace(/=+$/,'');
export function makeToken(user){const payload={sub:user.id,email:user.email,exp:Math.floor(Date.now()/1000)+60*60*6};return `${b64({alg:'HS256',typ:'JWT'})}.${b64(payload)}.${b64('local-demo-signature')}`}
export function readToken(){return localStorage.getItem(TOKEN)} export function saveToken(t){localStorage.setItem(TOKEN,t)} export function clearToken(){localStorage.removeItem(TOKEN)}
export function decodeToken(t=readToken()){try{const parts=t?.split('.'); if(parts?.length!==3)return null; const payload=JSON.parse(decodeURIComponent(escape(atob(parts[1].replace(/-/g,'+').replace(/_/g,'/'))))); if(!payload.exp||payload.exp<Math.floor(Date.now()/1000))return null; return payload}catch{return null}}
export function uid(p='id'){return `${p}_${Date.now()}_${Math.random().toString(36).slice(2,7)}`}
