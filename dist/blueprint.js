var S=(b,h)=>{const{Component:f,svgElements:m,elements:p,vars:e}=h,{svg:d,g:k,circle:r,polygon:n,path:w}=m,{div:C,xinSlot:v}=p;class a extends f{timezone=null;offset=0;time=null;interval=null;updateInterval=1000;constructor(){super();this.initAttributes("timezone","time","offset","updateInterval")}content=()=>[d({viewBox:"0 0 600 600",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},k({part:"assembly",stroke:"none",fill:"none",fillRule:"evenodd"},r({part:"face",class:"face",fillRule:"nonzero",cx:"300",cy:"300",r:"291.54"}),n({part:"hour",class:"hour",fillRule:"nonzero",points:"286.17 127.81 312.58 127.81 315.22 362.85 283.53 362.85"}),n({part:"minute",class:"minute",fillRule:"nonzero",points:"289.21 46.22 310.34 46.22 312.98 363.12 286.57 363.12"}),w({part:"second",class:"second",fillRule:"nonzero",d:"M300,102.93 C315.31,102.93 327.72,115.35 327.72,130.66 C327.72,145.08 316.72,156.92 302.66,158.26 L304.48,390.78 L296.56,390.78 L294.73,157.89 C281.93,155.43 272.27,144.17 272.27,130.66 C272.27,115.35 284.68,102.93 300,102.93 Z"}),r({class:"pin",fillRule:"nonzero",cx:300,cy:300,r:3}))),C({class:"caption"},v())];timezoneOffset(s){const i=this.offset;if(!this.timezone)return i;const t=this.time?0:s.getTimezoneOffset()/60;return i+Number(Intl.DateTimeFormat("en-GB",{hour:"numeric",minute:"numeric",timeZoneName:"shortOffset",timeZone:this.timezone}).format(s).split("GMT").pop().replace(/:30/,".5"))+t}update(){if(this.time)this.killInterval;else if(!this.interval)this.interval=setInterval(this.queueRender.bind(this),this.updateInterval);const{hour:s,minute:i,second:t}=this.parts,l=this.time?new Date(this.time):new Date;this.ariaLabel=l.toLocaleTimeString();let o=l.getSeconds();const c=this.timezoneOffset(l),u=(l.getMinutes()+60*c)%60+o/60,F=l.getHours()+u/60+Math.floor(c);if(s.setAttribute("transform",`rotate(${F*30}, 300, 300)`),i.setAttribute("transform",`rotate(${u*6}, 300, 300)`),this.updateInterval>1000)t.style.display="none";else{t.style.display="";const g=Math.round(l.getMilliseconds()/this.updateInterval)*this.updateInterval;o+=g*0.001,t.setAttribute("transform",`rotate(${o*6}, 300, 300)`)}}connectedCallback(){super.connectedCallback();const{assembly:s,hour:i}=this.parts;for(let t=0;t<60;t++)if(t%5===0)s.insertBefore(n({class:"hour-tick",fillRule:"nonzero",transform:`rotate(${t*6}, 300, 300)`,points:"289.43 35.91 310.56 35.91 310.56 100.61 289.43 100.61"}),i);else s.insertBefore(n({class:"minute-tick",fillRule:"nonzero",transform:`rotate(${t*6}, 300, 300)`,points:"303.91 36.26 296.08 36.26 296.08 58.26 303.91 58.26"}),i);this.update()}killInterval(){if(this.interval)clearInterval(this.interval),this.interval=null}disconnectedCallback(){super.disconnectedCallback(),this.killInterval}role="time";render(){super.render(),this.update()}}return{type:a,styleSpec:{":root":{_swissClockFaceStroke:"#D3D3D3",_swissClockFaceStrokeWidth:"16.9",_swissClockFaceFill:"#FFFFFF",_swissClockTickFill:"#404040",_swissClockHourFill:"#202020",_swissClockMinuteFill:"#202020",_swissClockSecondFill:"#D02020",_swissClockPinFill:"#707070",_swissClockSize:"256px"},":host":{display:"inline-block",position:"relative",width:e.swissClockSize,height:e.swissClockSize},":host .face":{width:"100%",height:"100%",stroke:e.swissClockFaceStroke,strokeWidth:e.swissClockFaceStrokeWidth,fill:e.swissClockFaceFill},":host .hour-tick, :host .minute-tick":{fill:e.swissClockTickFill},":host .hour":{fill:e.swissClockHourFill},":host .minute":{fill:e.swissClockMinuteFill},":host .second":{fill:e.swissClockSecondFill},":host .caption":{position:"absolute",display:"block",textAlign:"center",left:0,right:0,top:"70%",transform:"translateY(-50%)"},":host .pin":{fill:e.swissClockPinFill}}}},y=S;export{S as swissClock,y as default};

//# debugId=55FE1B9FFC136B0B64756E2164756E21
//# sourceMappingURL=blueprint.js.map
