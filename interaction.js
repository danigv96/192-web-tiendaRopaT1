var principal = document.querySelector('.interImg');
    var cero = document.querySelector('.iColor1');
    var first = document.querySelector('.iColor2');
    var second = document.querySelector('.iColor3');
    var third = document.querySelector('.iColor4');

    function modCero(){
        //console.log(this.getAttribute("src"));
        console.log('principal');
        principal.setAttribute("src", '/img/interaction0.jpg');
      
    }
    function modFirst(){
        //console.log(this.getAttribute("src"));
        console.log('principal');
        principal.setAttribute("src", '/img/interaction1.jpg');
      
    }
    function modSecond(){
        //console.log(this.getAttribute("src"));
        console.log('principal');
        principal.setAttribute("src", '/img/interaction2.jpg');
      
    }
    function modThird(){
        //console.log(this.getAttribute("src"));
        console.log('principal');
        principal.setAttribute("src", '/img/interaction3.jpg');
      
    }
    cero.addEventListener('click',modCero);
    first.addEventListener('click',modFirst);
    second.addEventListener('click',modSecond);
    third.addEventListener('click',modThird);
