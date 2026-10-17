document.querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();document.getElementById(button.dataset.open).showModal();}));
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});});
document.getElementById('quote-form').addEventListener('submit',async event=>{event.preventDefault();const data=new FormData(event.target);const viz=data.get('viz')?"3D visualisation: yes, free of charge":'';const text=`Hi Cutline! I would like a quote for a vinyl wrap.\nCar: ${data.get('car')}\nScope: ${data.get('scope')}\nColour / finish: ${data.get('finish')||"Help me choose"}${viz?'\n'+viz:''}`;const status=event.target.querySelector('.form-status');try{await navigator.clipboard.writeText(text);status.textContent="Enquiry copied. You can send it to the studio once contact details are available.";}catch{const field=document.getElementById('request-text');field.hidden=false;field.value=text;field.select();status.textContent="Your enquiry is ready. Copy the text below.";}});

// Native ranges support touch dragging, keyboard arrows, Home and End.
document.querySelectorAll('.comparison input').forEach(input=>{
 const update=()=>{input.closest('.comparison').style.setProperty('--split',input.value+'%');input.setAttribute('aria-valuetext',`${input.value}% before, ${100-Number(input.value)}% after`);};
 input.addEventListener('input',update);update();
});
document.querySelectorAll('[data-film],[data-service]').forEach(button=>button.addEventListener('click',()=>{
 if(button.dataset.film)document.querySelector('[name="finish"]').value=button.dataset.film;
 if(button.dataset.service)document.querySelector('[name="scope"]').value=button.dataset.service;
}));

// Progressive enhancement: content remains visible without observers or motion.
(()=>{
 const story=document.querySelector('.studio-story'),steps=[...document.querySelectorAll('.story-step')];
 if(!story||!('IntersectionObserver' in window))return;
 story.dataset.progress='0';
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 if(!motion.matches){const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');reveal.unobserve(entry.target);}}),{threshold:.08});steps.forEach(step=>{step.classList.add('reveal-pending');reveal.observe(step);});}
 const progress=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)story.dataset.progress=String(steps.indexOf(entry.target));});},{rootMargin:'-15% 0px -40% 0px',threshold:0});steps.forEach(step=>progress.observe(step));
})();

// One open decision at a time; native buttons keep keyboard and touch behavior.
(()=>{const lab=document.querySelector('.film-lab');if(!lab)return;const buttons=[...lab.querySelectorAll('.lab-choice h3 button')],labels={style:"COLOUR YOU CAN FEEL",care:"AN EXTRA LAYER OF CARE",return:"FREEDOM TO CHANGE AGAIN"};buttons.forEach((button,index)=>{button.addEventListener('click',()=>{const closing=button.getAttribute('aria-expanded')==='true';if(!closing){lab.dataset.mode=button.dataset.mode;document.getElementById('lab-material').textContent=labels[button.dataset.mode];}buttons.forEach(other=>{const active=!closing&&other===button;other.setAttribute('aria-expanded',String(active));other.closest('.lab-choice').classList.toggle('is-active',active);document.getElementById(other.getAttribute('aria-controls')).hidden=!active;});});button.addEventListener('keydown',event=>{let next;if(event.key==='ArrowDown')next=(index+1)%buttons.length;if(event.key==='ArrowUp')next=(index+buttons.length-1)%buttons.length;if(event.key==='Home')next=0;if(event.key==='End')next=buttons.length-1;if(next!==undefined){event.preventDefault();buttons[next].focus();}});});})();

(()=>{const buttons=[...document.querySelectorAll('[data-service-index]')],panel=document.getElementById('svc-panel');if(!panel)return;const services=[{caption:"Full wrap",description:"A new colour for the whole car. Gloss, satin, matte or metallic — to match your character.",scope:"Full wrap"},{caption:"Individual panels",description:"Roof, mirrors, bonnet. Contrasting details that change the feel of the entire car.",scope:"Individual panels"},{caption:"Chrome delete",description:"Deep black in place of chrome. A clean, understated look with carefully chosen accents.",scope:"Chrome delete / custom design"},{caption:"Custom design",description:"Stripes, two-tone combinations and graphics. We create a design that follows your car’s lines.",scope:"Chrome delete / custom design"}];let active=0;function select(index){active=index;const item=services[index];buttons.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===index));b.tabIndex=i===index?0:-1;});panel.setAttribute('aria-labelledby',buttons[index].id);document.getElementById('svc-caption').textContent=item.caption;document.getElementById('svc-description').textContent=item.description;document.getElementById('svc-cta').dataset.service=item.scope;const photo=panel.querySelector('.service-photo-main');photo.style.setProperty('--photo',`${index/3*100}%`);photo.classList.remove('swapping');void photo.offsetWidth;photo.classList.add('swapping');}buttons.forEach((b,index)=>{b.addEventListener('click',()=>select(index));b.addEventListener('keydown',event=>{let next;if(event.key==='ArrowDown'||event.key==='ArrowRight')next=(active+1)%4;if(event.key==='ArrowUp'||event.key==='ArrowLeft')next=(active+3)%4;if(event.key==='Home')next=0;if(event.key==='End')next=3;if(next!==undefined){event.preventDefault();select(next);buttons[next].focus();}});});const links=[...document.querySelectorAll('.main-nav a:not([data-open])')];links.forEach(link=>link.addEventListener('click',()=>{links.forEach(other=>other.removeAttribute('aria-current'));link.setAttribute('aria-current','location');}));})();

(()=>{const root=document.querySelector('.garage');if(!root)return;const cars=[{name:'LAMBORGHINI',model:'HURACÁN',build:'ULTRA VIOLET / STORM GRAPHICS',quote:"“Guys, this is f***ing unreal!”",author:"Rostyslav",owner:"Lamborghini Huracán · concept",detail:"Violet gloss · white and black graphics · carbon accents",alt:"Concept: violet Lamborghini Huracán with white and black graphics",image:'huracan'},{name:'NISSAN',model:'SKYLINE',build:'ULTRA BLUE / SILVER LINES',quote:"“Now even a short drive gives me a reason to look back at my car.”",author:"Andrii",owner:"Skyline R34 · concept",detail:"Blue metallic · silver graphics · contrasting details",alt:"Blue Nissan Skyline R34 concept with silver graphics"},{name:'DAEWOO',model:'MATIZ',build:'HOT PINK / STORM GRAPHICS',quote:"“She’s tiny, but now the whole car park notices her.”",author:"Kateryna",owner:"Daewoo Matiz · concept",detail:"Pink gloss · white and black graphics · custom design",alt:"Concept: pink Daewoo Matiz with white and black graphics",image:'matiz'}];let current=0;const scene=root.querySelector('.garage-scene'),stage=root.querySelector('.garage-stage'),tabs=[...root.querySelectorAll('[data-garage]')];function select(index){current=(index+cars.length)%cars.length;const c=cars[current];scene.style.setProperty('--scene',current*50+'%');scene.classList.remove('scene-matiz','scene-huracan');if(c.image)scene.classList.add('scene-'+c.image);scene.setAttribute('aria-label',c.alt);scene.classList.remove('changing');void scene.offsetWidth;scene.classList.add('changing');document.getElementById('garage-model').replaceChildren(document.createTextNode(c.name+' '),Object.assign(document.createElement('em'),{textContent:c.model}));for(const [id,value]of Object.entries({build:c.build,quote:c.quote,author:c.author,owner:c.owner,detail:c.detail,initial:c.author[0],count:'0'+(current+1)+' / 03',live:c.owner}))document.getElementById('garage-'+id).textContent=value;tabs.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===current)));}tabs.forEach((b,i)=>b.addEventListener('click',()=>select(i)));document.getElementById('garage-prev').addEventListener('click',()=>select(current-1));document.getElementById('garage-next').addEventListener('click',()=>select(current+1));root.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();select(current+(e.key==='ArrowRight'?1:-1));}});let start=null;stage.addEventListener('touchstart',e=>{start=[e.touches[0].clientX,e.touches[0].clientY]},{passive:true});stage.addEventListener('touchend',e=>{if(!start)return;const dx=e.changedTouches[0].clientX-start[0],dy=e.changedTouches[0].clientY-start[1];start=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.4)select(current+(dx<0?1:-1));},{passive:true});stage.addEventListener('touchcancel',()=>start=null,{passive:true});})();



(()=>{const video=document.getElementById('hero-film'),play=document.getElementById('film-play'),sound=document.getElementById('film-sound');if(!video||!play||!sound)return;const motion=matchMedia('(prefers-reduced-motion: reduce)');let manualPause=motion.matches;const update=()=>{play.textContent=video.paused?'▶':'Ⅱ';play.setAttribute('aria-label',video.paused?"Play video":"Pause video");sound.textContent=video.muted?"Sound on":"Sound off";sound.setAttribute('aria-label',sound.textContent);sound.setAttribute('aria-pressed',String(!video.muted));};let finished=false;const start=()=>{if(!finished)video.play().catch(update);};video.addEventListener('ended',()=>{finished=true;update();});video.addEventListener('cutline-replay',()=>{finished=false;manualPause=false;video.currentTime=0;start();});if(motion.matches){video.autoplay=false;video.pause();}play.onclick=()=>{manualPause=!video.paused;if(video.paused)start();else video.pause();};sound.onclick=()=>{video.muted=!video.muted;if(!video.muted){manualPause=false;start();}update();};video.addEventListener('play',update);video.addEventListener('pause',update);let inView=true;new IntersectionObserver(([entry])=>{inView=entry.isIntersecting&&entry.intersectionRatio>=.4;if(!inView)video.pause();else if(!manualPause&&!document.hidden)start();},{threshold:[0,.4]}).observe(video);document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();else if(!manualPause&&inView)start();});motion.addEventListener('change',()=>{if(motion.matches){manualPause=true;video.pause();}});update();})();

(()=>{const intro=document.querySelector('.story-intro');if(!intro||!('IntersectionObserver'in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;intro.classList.add('arrival-pending');const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){intro.classList.add('arrival-visible');observer.disconnect();}},{threshold:.1});observer.observe(intro);})();

(()=>{const header=document.querySelector('.header'),nav=header&&header.querySelector('.main-nav');if(!nav)return;let navTop=0,ticking=false;const measure=()=>{const pinned=header.classList.contains('nav-pinned');header.classList.remove('nav-pinned');header.style.minHeight='';navTop=nav.getBoundingClientRect().top+scrollY;if(pinned)pin(true);};const pin=on=>{if(on){header.style.minHeight=header.offsetHeight+'px';header.classList.add('nav-pinned');}else{header.classList.remove('nav-pinned');header.style.minHeight='';}};const pinTop=()=>innerWidth>900?14:10;const formLink=nav.querySelector('a[data-open]'),closing=document.querySelector('.closing-cta'),links=[...nav.querySelectorAll('a[href^="#"]:not([data-open])')],sections=links.map(a=>document.querySelector(a.getAttribute('href')));const update=()=>{ticking=false;const on=scrollY>Math.max(8,navTop-pinTop());if(on!==header.classList.contains('nav-pinned'))pin(on);let current=links[0];sections.forEach((s,i)=>{if(s&&s.getBoundingClientRect().top<=innerHeight*.35)current=links[i];});if(formLink&&closing&&(closing.getBoundingClientRect().top<=innerHeight*.5||innerHeight+scrollY>=document.documentElement.scrollHeight-4))current=formLink;[...links,formLink].filter(Boolean).forEach(a=>{const on=a===current;if(on!==a.hasAttribute('aria-current'))on?a.setAttribute('aria-current','location'):a.removeAttribute('aria-current');});};addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update);}},{passive:true});addEventListener('resize',()=>{measure();update();});measure();update();})();

(()=>{const heads=[...document.querySelectorAll('main>section:not(.hero) h2')];if(!heads.length||!('IntersectionObserver'in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;heads.forEach(h=>{let i=0;const walk=node=>{[...node.childNodes].forEach(c=>{if(c.nodeType===3){const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(part=>{if(!part)return;if(/^\s+$/.test(part)){f.append(part);return;}const word=document.createElement('h-word'),inner=document.createElement('h-word-in');inner.style.setProperty('--i',i++);inner.textContent=part;word.append(inner);f.append(word);});c.replaceWith(f);}else if(c.nodeType===1&&c.tagName!=='BR')walk(c);});};walk(h);h.classList.add('split-pending');});const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('split-in');const tgt=e.target;setTimeout(()=>tgt.classList.add('split-done'),1300+tgt.querySelectorAll('h-word').length*65);observer.unobserve(e.target);}}),{threshold:.3,rootMargin:'0px 0px -8% 0px'});heads.forEach(h=>observer.observe(h));})();

(()=>{const car=document.querySelector('.viz-car');if(car&&car.pauseAnimations&&matchMedia('(prefers-reduced-motion: reduce)').matches){car.setCurrentTime(2);car.pauseAnimations();}})();

(()=>{if(!('IntersectionObserver'in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const items=[...document.querySelectorAll('main>section:not(.hero,.studio-story)>:not(.sr-only,img),main>aside')];const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;observer.unobserve(el);el.classList.add('is-in');const done=ev=>{if(ev.target!==el||ev.propertyName!=='translate')return;el.classList.remove('block-reveal','is-in');el.removeEventListener('transitionend',done);};el.addEventListener('transitionend',done);}),{rootMargin:'0px 0px -10% 0px',threshold:0});items.forEach(el=>{if(el.getBoundingClientRect().top<innerHeight)return;el.classList.add('block-reveal');observer.observe(el);});})();

addEventListener('load',()=>{const decode=()=>['services-sheet','garage-sheet','m4-before','m4-after','huracan-before','huracan-after','matiz-before','matiz-after','garage-matiz','garage-huracan','studio-triptych','process-studio-soft','film-sculpture'].forEach(n=>{const img=new Image();img.src='assets/'+n+'.webp';img.decode&&img.decode().catch(()=>{});});'requestIdleCallback'in window?requestIdleCallback(decode,{timeout:2500}):setTimeout(decode,1200);});

(()=>{const hero=document.querySelector('.hero'),sig=hero&&hero.querySelector('.signature'),stats=hero&&hero.querySelector('.stats');if(!sig||!stats)return;const place=()=>{if(innerWidth<=900){sig.style.bottom='';return;}const h=hero.getBoundingClientRect(),s=stats.getBoundingClientRect();let b=Math.round(h.bottom-s.top+22);sig.style.bottom=b+'px';const off=s.top-22-sig.getBoundingClientRect().bottom;if(Math.abs(off)>1)sig.style.bottom=Math.round(b-off)+'px';};place();addEventListener('resize',place);document.fonts&&document.fonts.ready.then(place);})();

/* hero car + configurator: see the car-drive IIFE at the end of this file */


(()=>{const o=document.querySelector('.hero .copy h1>.outline');if(!o||o.querySelector('ghost-w'))return;const t=o.textContent;const w=document.createElement('ghost-w');w.dataset.t=t;w.textContent=t;o.replaceChildren(w);})();
(()=>{const hero=document.querySelector('.hero');if(!hero)return;hero.classList.add('in-view');new IntersectionObserver(es=>es.forEach(e=>hero.classList.toggle('in-view',e.isIntersecting))).observe(hero);
})();
/* Hero: car drive-in (stacked-alpha video keyed from a pink backdrop, drawn with WebGL), colour configurator,
   and a one-shot electric pulse along the key word toward the car. Everything is timed off the video clock.
   Tweak here:
   - pulseAt: video time (s) when the pulse starts; travel: how long the pulse runs from the speed line to the car
   - arcAt/arcDur: under-car light trail; fade: how long glow and haze take to die out
   - color/intensity: effect colour (RGB) and strength; mobile: multiplier on phones
   - The drive-in length is the video itself (assets/car-drive-stacked.mp4, ~1.5 s). Car size/position: CSS `.hero-stage .cfg-car`. */
(()=>{const CAR_FX={video:'assets/car-drive-stacked',still:'assets/car-final.webp',fadeIn:.18,pulseAt:.95,travel:.62,arcAt:1.5,arcDur:.42,fade:.75,color:[212,255,0],intensity:1,mobile:.75,
anchors:[[.075,.42],[.40,.41]],floor:{cx:.48,cy:.865,rx:.47,ry:.055}};
const hero=document.querySelector('.hero'),stage=hero&&hero.querySelector('.hero-stage'),cfg=stage&&stage.querySelector('.cfg'),car=cfg&&cfg.querySelector('.cfg-car'),cv=car&&car.querySelector('.car-gl');if(!car||!cv||car.dataset.ready)return;car.dataset.ready='1';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
hero.classList.add('cfg-on');stage.classList.add('show-cfg');
/* --- WebGL car renderer --- */
let gl=null,tex=null,U={},stacked=1,tint=[.83,1,0],mix=0,tgtTint=[.83,1,0],tgtMix=0,anim=0;
try{gl=cv.getContext('webgl',{premultipliedAlpha:true,alpha:true,antialias:false})}catch(e){}
const fallback=()=>{car.classList.add('fallback');};
if(gl){const sh=(t,src)=>{const o=gl.createShader(t);gl.shaderSource(o,src);gl.compileShader(o);return gl.getShaderParameter(o,gl.COMPILE_STATUS)?o:null;};
const vs=sh(gl.VERTEX_SHADER,'attribute vec2 a;varying vec2 v;void main(){v=vec2(a.x*.5+.5,.5-a.y*.5);gl_Position=vec4(a,0.,1.);}');
const fs=sh(gl.FRAGMENT_SHADER,`precision mediump float;varying vec2 v;uniform sampler2D t;uniform float uS,uMix;uniform vec3 uTint;
void main(){vec3 c;float a;if(uS>.5){c=texture2D(t,vec2(v.x,min(v.y*.5,.4994))).rgb;a=texture2D(t,vec2(v.x,max(.5006,.5+v.y*.5))).r;}else{vec4 q=texture2D(t,v);c=q.rgb;a=q.a;}
float lm=smoothstep(.06,.2,c.g-max(c.r*.82,c.b*1.25))*smoothstep(.16,.32,c.g);float l=dot(c,vec3(.299,.587,.114));
c=mix(c,uTint*clamp(l/.6,0.,1.35),lm*uMix);a=clamp(a,0.,1.);gl_FragColor=vec4(c*a,a);}`);
const pr=gl.createProgram();if(vs&&fs){gl.attachShader(pr,vs);gl.attachShader(pr,fs);gl.linkProgram(pr);}
if(!vs||!fs||!gl.getProgramParameter(pr,gl.LINK_STATUS)){gl=null;}else{gl.useProgram(pr);const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);const l=gl.getAttribLocation(pr,'a');gl.enableVertexAttribArray(l);gl.vertexAttribPointer(l,2,gl.FLOAT,false,0,0);
['t','uS','uMix','uTint'].forEach(k=>U[k]=gl.getUniformLocation(pr,k));tex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tex);[[gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE],[gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE],[gl.TEXTURE_MIN_FILTER,gl.LINEAR],[gl.TEXTURE_MAG_FILTER,gl.LINEAR]].forEach(([k,v])=>gl.texParameteri(gl.TEXTURE_2D,k,v));gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false);gl.clearColor(0,0,0,0);}}
let hasTex=false;
const upload=src=>{if(!gl)return false;try{gl.bindTexture(gl.TEXTURE_2D,tex);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,src);hasTex=true;return true}catch(e){return false}};
const render=()=>{if(!gl||!hasTex)return;gl.viewport(0,0,cv.width,cv.height);gl.clear(gl.COLOR_BUFFER_BIT);gl.uniform1f(U.uS,stacked);gl.uniform1f(U.uMix,mix);gl.uniform3fv(U.uTint,tint);gl.drawArrays(gl.TRIANGLES,0,3);};
const showStill=()=>{if(!gl){fallback();return;}const im=new Image();im.decoding='async';im.onload=()=>{stacked=0;if(upload(im)){render();}else fallback();};im.onerror=fallback;im.src=CAR_FX.still;};
/* colour configurator: lime accents (decal, wing, calipers) take the chosen film colour */
const sw=[...cfg.querySelectorAll('.cfg-sw')],name=cfg.querySelector('.cfg-name'),fin=cfg.querySelector('.cfg-fin'),count=cfg.querySelector('.cfg-count');let current=0;const pad=n=>String(n).padStart(2,'0');
const hex=h=>{h=h.replace('#','');return[0,2,4].map(i=>parseInt(h.slice(i,i+2),16)/255)};
const ease=()=>{cancelAnimationFrame(anim);const from=tint.slice(),fm=mix,t0=performance.now();const step=t=>{const k=Math.min(1,(t-t0)/420),e=k*(2-k);tint=from.map((v,i)=>v+(tgtTint[i]-v)*e);mix=fm+(tgtMix-fm)*e;render();if(k<1)anim=requestAnimationFrame(step);};anim=requestAnimationFrame(step);};
const select=i=>{current=(i+sw.length)%sw.length;const b=sw[current];sw.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));name.textContent=b.querySelector('.sr-only').textContent;fin.textContent=b.querySelector('i').textContent;count.textContent=pad(current+1)+' / '+pad(sw.length);
const c=b.style.getPropertyValue('--c').trim();cfg.style.setProperty('--ring',c);tgtTint=hex(c);tgtMix=current===0?0:1;if(current===0)tgtTint=tint.slice();ease();};
sw.forEach((b,i)=>b.addEventListener('click',()=>select(i)));
cfg.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();select(current+(e.key==='ArrowRight'?1:-1));}});
let sx=null;cfg.addEventListener('touchstart',e=>{sx=e.touches[0].clientX},{passive:true});cfg.addEventListener('touchend',e=>{if(sx===null)return;const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>40)select(current+(dx<0?1:-1));sx=null;});
if(reduce){car.classList.add('floor-on');showStill();return;}
/* --- effect layer --- */
const fx=document.createElement('canvas');fx.className='car-fx';fx.setAttribute('aria-hidden','true');hero.appendChild(fx);const ctx=fx.getContext('2d');
const R=(a,b)=>a+Math.random()*(b-a),[CR,CG,CB]=CAR_FX.color,col=a=>`rgba(${CR},${CG},${CB},${Math.max(0,a).toFixed(3)})`,hot=a=>`rgba(246,255,214,${Math.max(0,a).toFixed(3)})`;
const mctx=document.createElement('canvas').getContext('2d');let G=null,dpr=1,branches=[],jit=[],jitT=-1,arcJit=[];
const geom=()=>{const hr=hero.getBoundingClientRect(),out=hero.querySelector('.copy h1>.outline'),w=out&&(out.querySelector('ghost-w')||out);if(!out)return null;
dpr=Math.min(devicePixelRatio||1,innerWidth<700?1.5:2);const W=Math.round(hr.width*dpr),H=Math.round(hr.height*dpr);if(fx.width!==W||fx.height!==H){fx.width=W;fx.height=H;}
const orr=out.getBoundingClientRect(),wr=w.getBoundingClientRect(),cs=getComputedStyle(w),fs=parseFloat(cs.fontSize),bs=getComputedStyle(out,'::before'),lw=parseFloat(bs.width)||0,rr=parseFloat(bs.right)||0;
mctx.font=`${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;const m=mctx.measureText(w.dataset&&w.dataset.t||out.textContent),fa=m.fontBoundingBoxAscent||fs*.9,fd=m.fontBoundingBoxDescent||fs*.25,aa=m.actualBoundingBoxAscent||fs*.72,base=wr.top+(wr.height-(fa+fd))/2+fa,capT=base-aa;
const X=x=>(x-hr.left)*dpr,Y=y=>(y-hr.top)*dpr,cr=car.getBoundingClientRect(),capH=aa*dpr,sR=orr.right-rr,sL=sR-lw,ly=orr.top+orr.height*.52;
const wordY=Y(capT)-capH*.04,x0=X(sL),x1=X(wr.left)+capH*.05,x2=X(wr.right)-capH*.05;
const an=CAR_FX.anchors.map(([u,v])=>[X(cr.left+cr.width*u),Y(cr.top+cr.height*v)]),end=an.reduce((b,p)=>Math.hypot(p[0]-x2,p[1]-wordY)<Math.hypot(b[0]-x2,b[1]-wordY)?p:b);
const pts=[],push=(x,y,amp)=>pts.push([x,y,amp]),st=Math.max(2,2.5*dpr);
for(let x=x0;x<x1;x+=st){const k=(x-x0)/Math.max(1,x1-x0),e=k*k*(3-2*k);push(x,Y(ly)+(wordY-Y(ly))*e,.05);}
for(let x=x1;x<x2;x+=st)push(x,wordY,.06);
const near=Y(cr.top)<Y(base)+capH*1.5;/* car below the text (phones): short tail instead of a long bridge */
if(!near){end[0]=x2+capH*1.3;end[1]=wordY+capH*.55;}
const c1=[x2+capH*(near?1.1:.6),wordY],c2=[end[0]-(near?(end[0]>x2?capH*1.2:-capH*.4):capH*.3),end[1]-capH*(near?.9:.2)],bz=t=>{const u=1-t;return[u*u*u*x2+3*u*u*t*c1[0]+3*u*t*t*c2[0]+t*t*t*end[0],u*u*u*wordY+3*u*u*t*c1[1]+3*u*t*t*c2[1]+t*t*t*end[1]]};
let prev=[x2,wordY],bl=0;for(let t=0;t<=1;t+=.01){const p=bz(t);bl+=Math.hypot(p[0]-prev[0],p[1]-prev[1]);prev=p;}const n=Math.max(8,Math.round(bl/st));for(let i=1;i<=n;i++){const p=bz(i/n);push(p[0],p[1],.07+.07*(i/n));}
let L=0;const P=pts.map((p,i)=>{if(i)L+=Math.hypot(p[0]-pts[i-1][0],p[1]-pts[i-1][1]);const q=pts[Math.min(pts.length-1,i+1)],o=pts[Math.max(0,i-1)],dx=q[0]-o[0],dy=q[1]-o[1],d=Math.hypot(dx,dy)||1;return{x:p[0],y:p[1],a:p[2],s:L,nx:-dy/d,ny:dx/d}});
const f=CAR_FX.floor;return{P,L,capH,fs:fs*dpr,q:Math.max(.55,Math.min(1.2,fs/90))*(innerWidth<700?.85:1),k:CAR_FX.intensity*(innerWidth<700?CAR_FX.mobile:1),wordL:x1,wordR:x2,
arc:{cx:X(cr.left+cr.width*f.cx),cy:Y(cr.top+cr.height*f.cy),rx:cr.width*f.rx*dpr,ry:cr.height*f.ry*dpr}};};
const seed=()=>{branches=[];for(let i=0;i<11;i++)branches.push({u:R(.04,.97),side:Math.random()<.62?-1:1,len:R(.16,.42),lean:R(-.5,.5),pts:[0,0,0,0,0].map(()=>R(-1,1))});arcJit=[...Array(64)].map(()=>R(-1,1));};
const headAt=t=>{const u=Math.min(1,Math.max(0,(t-CAR_FX.pulseAt)/CAR_FX.travel));return(1-Math.cos(Math.PI*u))/2;};
const passAt=r=>CAR_FX.pulseAt+CAR_FX.travel*Math.acos(1-2*Math.min(1,Math.max(0,r)))/Math.PI;
const glowDot=(x,y,r,a,hotCore)=>{const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,hotCore?hot(a):col(a));g.addColorStop(.35,col(a*.45));g.addColorStop(1,col(0));ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);};
const strokeRun=(pts,alpha,w)=>{if(pts.length<2)return;ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)ctx.lineTo(pts[i][0],pts[i][1]);ctx.lineWidth=w*5.5;ctx.strokeStyle=col(alpha*.1);ctx.stroke();ctx.lineWidth=w*2.6;ctx.strokeStyle=col(alpha*.32);ctx.stroke();ctx.lineWidth=w;ctx.strokeStyle=hot(alpha);ctx.stroke();};
const draw=t=>{if(!G)return;ctx.clearRect(0,0,fx.width,fx.height);const{P,L,capH,q,k}=G,h=headAt(t)*L,fadeStart=CAR_FX.pulseAt+CAR_FX.travel+.1,gF=t<fadeStart?1:Math.max(0,1-(t-fadeStart)/CAR_FX.fade);if(t<CAR_FX.pulseAt||gF<=0)return;
ctx.globalCompositeOperation='lighter';ctx.lineCap='round';ctx.lineJoin='round';
const tick=Math.floor(t*22);if(tick!==jitT){jitT=tick;jit=[...Array(Math.ceil(P.length/5)+2)].map(()=>R(-1,1));}
const W=1.1*dpr*q,pos=[],inten=[];
for(let i=0;i<P.length;i++){const p=P[i];if(p.s>h){break;}const age=t-passAt(p.s/L),j0=jit[Math.floor(i/5)],j1=jit[Math.floor(i/5)+1],fj=(i%5)/5,jj=j0+(j1-j0)*fj,
amp=capH*p.a*(.75+.5*Math.min(1,age*3)),d=amp*(.55*Math.sin(p.s/(capH*.9)+t*9)+.3*Math.sin(p.s/(capH*.31)-t*14)+.45*jj);pos.push([p.x+p.nx*d,p.y+p.ny*d]);inten.push((Math.exp(-age/.32)*.8+.2)*gF*k);}
// haze: soft, rising, spreading
for(let i=0;i<pos.length;i+=Math.max(4,Math.round(capH*.28/(2.5*dpr)))){const age=t-passAt(P[i].s/L),r=capH*(.5+age*1.1),a=.1*inten[i]*(1-Math.min(1,age/1.5));glowDot(pos[i][0],pos[i][1]-capH*(.08+age*.4),r,a,false);}
// thread, drawn in short runs so brightness can vary along it
for(let i=0;i<pos.length-1;i+=6){const run=pos.slice(i,i+7);strokeRun(run,Math.min(1,inten[i]),W);}
// branches
for(const b of branches){const s=b.u*L;if(s>h)continue;const age=t-passAt(b.u),life=.3;if(age>life)continue;const i=Math.min(pos.length-1,Math.round(b.u*(pos.length-1))),o=pos[i];if(!o)continue;const p=P[i],len=capH*b.len,a=(1-age/life)*gF*k,bp=[o];
for(let j=1;j<=5;j++){const u=j/5;bp.push([o[0]+p.nx*b.side*len*u+(p.ny*-1)*b.lean*len*u*.4+b.pts[j-1]*capH*.05,o[1]+p.ny*b.side*len*u+p.nx*b.lean*len*u*.4+b.pts[j-1]*capH*.05]);}strokeRun(bp,a*.8,W*.7);}
// pulse head: local glow on the letters it crosses
if(headAt(t)<1&&pos.length){const o=pos[pos.length-1],onWord=o[0]>G.wordL&&o[0]<G.wordR;glowDot(o[0],o[1],capH*(onWord?.85:.6),.42*k,true);glowDot(o[0],o[1],capH*.14,.9*k,true);}
// under-car light trail
const at=t-CAR_FX.arcAt;if(at>0){const A=G.arc,u=Math.min(1,at/CAR_FX.arcDur),e=1-Math.pow(1-u,3),th0=Math.PI*1.04,th=th0-(Math.PI*1.12)*e,ap=[],N=64;
for(let i=0;i<=N;i++){const tt=th0-(th0-th)*(i/N);ap.push([A.cx+A.rx*Math.cos(tt)+arcJit[i%64]*.7*dpr,A.cy+A.ry*Math.sin(tt)]);}
const aF=Math.max(0,1-Math.max(0,at-CAR_FX.arcDur*.6)/(CAR_FX.fade+.15))*k;strokeRun(ap,.85*aF,W*1.1);for(let i=0;i<ap.length;i+=6)glowDot(ap[i][0],ap[i][1],capH*.45,.05*aF,false);if(u<1)glowDot(ap[ap.length-1][0],ap[ap.length-1][1],capH*.35,.6*aF,true);}
ctx.globalCompositeOperation='source-over';};
/* --- clock: video time while it plays, wall time after it ends (or if it never plays) --- */
let vid=null,started=false,endedAt=0,endT=0,fbAt=0,raf=0,finished=false,floorOn=false;
const clock=()=>{if(fbAt)return CAR_FX.pulseAt-.15+(performance.now()-fbAt)/1000;if(endedAt)return endT+(performance.now()-endedAt)/1000;return vid?vid.currentTime:0;};
const total=Math.max(CAR_FX.pulseAt+CAR_FX.travel+.1+CAR_FX.fade,CAR_FX.arcAt+CAR_FX.arcDur+CAR_FX.fade)+.05;
const loop=()=>{const t=clock();if(started&&!endedAt&&!fbAt)cv.style.opacity=String(Math.min(1,t/CAR_FX.fadeIn));if(t>=CAR_FX.arcAt&&!floorOn){floorOn=true;car.classList.add('floor-on');}
if(t>=CAR_FX.pulseAt-.05&&!G){G=geom();seed();}else if(G&&t>=CAR_FX.pulseAt)G=geom()||G;if(G)draw(t);
if(t>total&&(endedAt||fbAt)){ctx.clearRect(0,0,fx.width,fx.height);finished=true;return;}raf=requestAnimationFrame(loop);};
const startFx=()=>{if(!raf)raf=requestAnimationFrame(loop);};
const toStill=()=>{if(started||fbAt||finished)return;fbAt=performance.now();if(vid)vid.pause();cv.style.opacity='1';showStill();startFx();};
if(!gl){fallback();toStill();return;}
cv.style.opacity='0';
vid=document.createElement('video');vid.className='car-vid';vid.muted=true;vid.defaultMuted=true;vid.playsInline=true;vid.setAttribute('playsinline','');vid.setAttribute('muted','');vid.setAttribute('aria-hidden','true');vid.tabIndex=-1;vid.preload='auto';vid.src=CAR_FX.video+(vid.canPlayType('video/webm; codecs="vp9"')?'.webm':'.mp4');car.appendChild(vid);
const frame=()=>{if(upload(vid))render();};
const onFrame=()=>{frame();if(!endedAt&&vid.requestVideoFrameCallback)vid.requestVideoFrameCallback(onFrame);};
vid.addEventListener('playing',()=>{if(fbAt)return;started=true;startFx();if(vid.requestVideoFrameCallback)vid.requestVideoFrameCallback(onFrame);else{const f=()=>{if(endedAt)return;frame();requestAnimationFrame(f)};requestAnimationFrame(f);}},{once:true});
vid.addEventListener('ended',()=>{if(fbAt)return;endT=vid.duration||vid.currentTime;endedAt=performance.now();frame();cv.style.opacity='1';});
vid.addEventListener('error',toStill);
const timer=setTimeout(()=>{if(!started)toStill();},4000);vid.addEventListener('playing',()=>clearTimeout(timer),{once:true});
const go=()=>{const p=vid.play();if(p&&p.catch)p.catch(toStill);};
go();
})();
