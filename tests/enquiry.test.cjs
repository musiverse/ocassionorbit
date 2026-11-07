/* eslint-disable @typescript-eslint/no-require-imports -- Node test harness loads TypeScript helpers without extra dependencies. */
const {test}=require('node:test');
const assert=require('node:assert/strict');
const ts=require('typescript');
const fs=require('node:fs');
function load(file) {const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText; const m={exports:{}};new Function('module','exports','require',code)(m,m.exports,require);return m.exports;}
const {validPhone,localDate,enquiryPrefills,enquiryMessage}=load('src/lib/enquiry.ts');
const {whatsappLink}=load('src/lib/contact.ts');
const {damruCordPath,DAMRU_CORD_LENGTH}=load('src/lib/damruMotion.ts');
test('phone rejects blank, symbols and invalid digit counts',()=>{for(const v of ['', '          ', '+91     ', '123456','1'.repeat(16),'1234abc7890']) assert.equal(validPhone(v),false,v);for(const v of ['+91 98765 43210','(987) 654-3210','1234567']) assert.equal(validPhone(v),true,v);});
test('date uses local calendar components',()=>assert.equal(localDate(new Date(2026,10,8,0,1)),'2026-11-08'));
test('category, event, occasion and coverage links prefill',()=>{assert.deepEqual(enquiryPrefills(new URLSearchParams('category=Jazz&event=Private+party&occasion=Birthday')),{initialStyle:'Jazz',initialEvent:'Private party',initialOccasion:'Birthday'});assert.equal(enquiryPrefills(new URLSearchParams('style=Photography+%26+Videography')).initialStyle,'Photography & Videography');assert.equal(enquiryPrefills(new URLSearchParams('service='+ 'a'.repeat(200))).initialStyle.length,120);});
test('message trims values, omits blanks and encodes safely',()=>{const message=enquiryMessage(false,[['Name',' Test & Guest '],['Notes',' '],['Service','Photography & Videography']]);assert.ok(message.includes('Name: Test & Guest'));assert.ok(!message.includes('Notes:'));const link=new URL(whatsappLink(message));assert.equal(link.searchParams.get('text'),message);assert.equal(link.hostname,'wa.me');assert.ok(enquiryMessage(true,[]).includes('introduce myself'));});
test('damru cached cycle source stays attached, clear of shell, and constant length',()=>{for(let i=0;i<240;i++)for(const side of [-1,1]){const {cord,bead}=damruCordPath(i/240*Math.PI*2/7.5,side);assert.deepEqual(cord[0],{x:side*.26,y:0,z:0});assert.ok(Math.hypot(cord.at(-1).x-bead.x,cord.at(-1).y-bead.y,cord.at(-1).z-bead.z)<1e-12);const len=cord.slice(1).reduce((sum,p,j)=>sum+Math.hypot(p.x-cord[j].x,p.y-cord[j].y,p.z-cord[j].z),0);assert.ok(Math.abs(len-DAMRU_CORD_LENGTH)<.0001);for(const p of cord.slice(1,-1)){if(Math.abs(p.y)<1.15){const shell=.23+.65*Math.pow(Math.abs(p.y)/1.15,.9);assert.ok(Math.hypot(p.x,p.z)>shell);}}}});
test('scene clock suspends hidden and obscured work, and renders reduced motion once',()=>{
 const saved={window:global.window,document:global.document,MutationObserver:global.MutationObserver,requestAnimationFrame:global.requestAnimationFrame,cancelAnimationFrame:global.cancelAnimationFrame};
 let reduced=false,modal=false,observerCallback; const listeners={}; const frames=new Map();let id=0;
 global.window={innerWidth:1280,location:{pathname:'/'},matchMedia:()=>({get matches(){return reduced;},addEventListener:(event,fn)=>listeners.motion=fn,removeEventListener:()=>{}})};
 global.document={hidden:false,querySelector:()=>modal?{}:null,body:{},addEventListener:(event,fn)=>listeners[event]=fn,removeEventListener:()=>{}};
 global.MutationObserver=class{constructor(fn){observerCallback=fn;}observe(){}disconnect(){}};
 global.requestAnimationFrame=fn=>{frames.set(++id,fn);return id;}; global.cancelAnimationFrame=n=>frames.delete(n);
 const flush=time=>{const pending=[...frames.values()];frames.clear();pending.forEach(fn=>fn(time));};
 try{const {createSceneLoop}=load('src/lib/sceneMotion.ts');let draws=0;const loop=createSceneLoop(()=>draws++);flush(100);assert.equal(draws,1);assert.equal(frames.size,1);document.hidden=true;listeners.visibilitychange();flush(200);assert.equal(draws,1);document.hidden=false;listeners.visibilitychange();flush(300);assert.equal(draws,2);modal=true;observerCallback();flush(400);assert.equal(draws,2);modal=false;reduced=true;observerCallback();flush(500);assert.equal(draws,3);assert.equal(frames.size,0);loop.dispose();assert.equal(frames.size,0);}finally{Object.assign(global,saved);}
});
