var felder=new Array(9);
var elH;
var elB;
var feld=[undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined];
turn=0;
function addLis(){
    for(f of felder){
        document.getElementById(f).addEventListener("mousedown",lis);
    }
}
function lis(){
    if(turn<10){
        const el=this;
        if(el.id && el.className==""){
                if(turn%2==0){
                    drawX(el);
                }else{
                    drawCir(el);
                }
            feld[el.id.substring(1,2)]=turn%2;
            console.log(feld);
            el.classList.add("done");
            turn++;
            document.getElementById("text").innerHTML="Spieler "+(turn%2+1)+" ist am Zug!";
        }  
    }
    if(turn >4 && wincheck()){
        document.getElementById("text").innerHTML="Spieler "+((turn-1)%2+1)+" hat gewonnen!";
        for(const f of felder){
            document.getElementById(f).removeEventListener("mousedown",lis);
        }
    }else if( turn == 9 && !wincheck()){
        document.getElementById("text").innerHTML="Niemand hat gewonnen!   -   Unentschieden!";
        for(const f of felder){
            document.getElementById(f).removeEventListener("mousedown",lis);
        }
    } 
}
function wincheck(){
    if((tmp=feld[0]+feld[4]+feld[8])==0 || (tmp=feld[0]+feld[4]+feld[8])==3 ){
        return true;
    }else if((tmp=feld[2]+feld[4]+feld[6])==0 || (tmp=feld[2]+feld[4]+feld[6])==3 ){
        return true;
    }
    for(var i=0;i<3;i++){
        if((tmp=feld[i*3]+feld[i*3+1]+feld[i*3+2])==0 || (tmp=feld[i*3]+feld[i*3+1]+feld[i*3+2])==3){
            return true;
        }else if((tmp=feld[i]+feld[i+3]+feld[i+6])==0 || (tmp=feld[i]+feld[i+3]+feld[i+6])==3){
            return true;
        }
    }
    return false;
}
function restart(){
    turn=0;
    feld=[undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined];
    addLis();
    farbe();
    document.getElementById("text").innerHTML="Neugestartet!   -   Spieler "+(turn%2+1)+" ist am Zug!";
}
// window.addEventListener("resize",function(e){
//     for(fid of felder){



//     }
// });

/**
 * @param gapH gibt den vertikale Gap an
 * @param gapB gibt die horizontale Gap an
 * @param proB gibt die prozentuale horizontale Anteil der Fläche an der Seite an
 * @param proH gibt die prozentuale veritkalen Anteil der Fläche an der Seite an
 * 
 */
draw(10,10,0.8,0.8);
function draw(gapH,gapB,proB,proH){
    var ho=window.innerHeight;
    var br=window.innerWidth;
    var tmp=0;
    elH=(ho*proH)/3;
    elB=(br*proB)/3;
    var hoEl=ho*((1-proH)/2);
    var brEl=br*((1-proB)/2);
    document.body.innerHTML+='<div id="text" style="position:absolute;top:'+ho*0.03+'px;left:'+brEl+'px;width:'+(3*elB+2*gapB)+'px">Spieler 1 beginnt!</div>';   
    for(var i=0; i < 3;i++){
        for(var j=0;j<3;j++){
            document.body.innerHTML+='<canvas id="f'+tmp+'" width="'+elB+'" height="'+elH+'" style="position:absolute;top:'+hoEl+'px;left:'+brEl+'px"></canvas>';
            felder[tmp]="f"+tmp;
            tmp++;
            brEl+=elB+gapB;
        }
        brEl=br*((1-proB)/2);
        hoEl+=elH+gapH;
    }
    document.body.innerHTML+='<div class="button" style="position:absolute;top:'+ho*0.93+'px;left:'+(brEl+(elB)+gapB)+'px;width:'+elB+'px">Neu starten?</div>';   
    document.getElementsByClassName("button")[0].addEventListener("mousedown",restart);
    farbe();
    addLis();
}
function farbe(){
    for(const f of felder){
        const e = document.getElementById(f); 
        e.className="";
        const c = e.getContext("2d");
        c.clearRect(0,0,elB,elH);
        c.beginPath();
        c.fillStyle="purple";
        c.fillRect(0,0,elB,elH);
        c.stroke();
    }

}
function drawCir(el){
    const con=el.getContext("2d");
    con.strokeStyle="white";
    con.lineWidth=2;
    con.beginPath();
    con.arc(elB/2,elH/2,Math.min(elB/3,elH/3),0,Math.PI*2);
    con.stroke();
}
function drawX(el){
    const con=el.getContext("2d");
    con.strokeStyle="white";
    con.lineWidth=2;
    con.beginPath();
    con.moveTo(elB/3,elH/3);
    con.lineTo(elB*2/3,elH*2/3);
    con.moveTo(elB/3,elH*2/3);
    con.lineTo(elB*2/3,elH/3);
    con.stroke();    
}
