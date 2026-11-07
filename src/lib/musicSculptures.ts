/** Original numbered surfaces shared by the decorative gallery and its 360° viewer. */
export function makeMusicSculptures() {
  type Point = { x:number; y:number; z:number; nx:number; ny:number; nz:number; digit:string; vessel:boolean; twoSided?:boolean };
  const build = (kind: 'tabla' | 'vinyl' | 'microphone') => {
    const points: Point[] = [];
    const add = (x:number,y:number,z:number,nx:number,ny:number,nz:number,vessel=false) => points.push({x,y,z,nx,ny,nz,vessel,digit:String((points.length*7+Math.floor(points.length/11))%10)});
    const shell = (cx:number, top:number, bottom:number, radius:(t:number)=>number, rows=22) => {
      for(let row=0;row<=rows;row++) {
        const t=row/rows, r=radius(t);
        for(let col=0;col<44;col++) {
          const a=(col+(row%2)*.5)/44*Math.PI*2;
          add(cx+r*Math.cos(a),top+(bottom-top)*t,r*Math.sin(a),Math.cos(a),0,Math.sin(a),row===0||row===rows);
        }
      }
    };
    const head = (cx:number,y:number,r:number) => {
      for(let ring=0;ring<=12;ring++) for(let col=0;col<Math.max(1,ring*5);col++) {
        const a=col/Math.max(1,ring*5)*Math.PI*2, rr=r*ring/12;
        add(cx+rr*Math.cos(a),y,rr*Math.sin(a),0,-1,0,ring<4||ring===12);
      }
    };
    if(kind==='tabla') {
      for(const [cx,r,top,bottom] of [[-.66,.73,-.45,.72],[.66,.51,-.78,.8]]) {
        shell(cx,top,bottom,t=>r*(.82+.25*Math.sin(t*Math.PI)-.22*t));
        head(cx,top-.02,r*.82);
        for(let cord=0;cord<12;cord++) for(let row=0;row<=22;row++) {
          const t=row/22,a=cord/12*Math.PI*2,rr=r*(.82+.25*Math.sin(t*Math.PI)-.22*t)+.025;
          add(cx+rr*Math.cos(a),top+(bottom-top)*t,rr*Math.sin(a),Math.cos(a),0,Math.sin(a),true);
        }
      }
    } else if(kind==='vinyl') {
      for(const face of [-1,1]) for(let ring=2;ring<=23;ring++) for(let col=0;col<ring*6;col++) {
        const a=col/(ring*6)*Math.PI*2,r=ring/23*1.2;
        add(r*Math.cos(a),r*Math.sin(a),face*.055,0,0,face,ring<7||ring===23);
      }
      // A raised centre label and a visible spindle hole.
      for(let col=0;col<44;col++) { const a=col/44*Math.PI*2; add(.09*Math.cos(a),.09*Math.sin(a),.065,0,0,1,true); }
    } else {
      shell(0,-.85,.05,()=>.42,18);
      // Rounded capsule grille, with a contrasting numbered band below.
      for(let row=1;row<=12;row++) for(let col=0;col<40;col++) {
        const a=row/12*Math.PI/2,b=col/40*Math.PI*2;
        add(.42*Math.sin(a)*Math.cos(b),-.85-.42*Math.cos(a),.42*Math.sin(a)*Math.sin(b),Math.sin(a)*Math.cos(b),-Math.cos(a),Math.sin(a)*Math.sin(b),true);
      }
      shell(0,.05,.22,()=>.43,4);
      shell(0,.22,1.25,t=>.21-.05*t,22);
      head(0,1.26,.16);
      // Side yoke makes the silhouette read as a vintage stage microphone.
      for(const side of [-1,1]) for(let row=0;row<28;row++) {
        const t=row/27;
        add(side*(.57-.35*t*t),-.5+t*1.13,.02,side,0,1,true);
      }
    }
    return points;
  };
  return {tabla:build('tabla'),vinyl:build('vinyl'),microphone:build('microphone')};
}
