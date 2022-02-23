document.addEventListener('DOMContentLoaded', () =>{
    
    const gridDisplay= document.querySelector('.grid');
    const scoreDisplay=document.querySelector('#Value');
    const resultDisplay=document.querySelector('#result');
    const width=4;
    let squares=[];
    let score=0;
    //creating theplaying board

    function createBoard(){
        for(let i=0 ; i < width*width ; i++ ){
            square=document.createElement('div');
            square.innerHTML= 0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
    }

    createBoard();


    //generate a number

    function generate(){
       let randomNumber= Math.floor(Math.random() * squares.length);
       if(squares[randomNumber].innerHTML ==0){
           squares[randomNumber].innerHTML=2;
           GameOver();
       }else{
           generate();
       }
    }

    function moveRight (){
        for(let i=0 ; i<16 ; i++ ){
            if(i % 4 === 0){

                //0,4,8,12 are the first row numbers in each row
                //e need to find the inner html of each of these 0,4,2,4 and
                //the cell to the right of these cells
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i+1].innerHTML;
                let totalThree = squares[i+2].innerHTML;
                let totalfour = squares[i+3].innerHTML;

                //particular row element
                //parseInt to covert string to numbers
                let row=[parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalfour)];

                //filters elt in row that has number and make its array
                let filterRow= row.filter(num => num);

                //how many elt left to fill
                let missing= 4- filterRow.length;

                //arrays of zero on the basis of missing elts
                let zeroes=Array(missing).fill(0);

                //after swiping right, how we want our rows to look like, all elements shifted right        
                let new_row=zeroes.concat(filterRow);
                squares[i].innerHTML=new_row[0];
                squares[i+1].innerHTML=new_row[1];
                squares[i+2].innerHTML=new_row[2];
                squares[i+3].innerHTML=new_row[3];

            }
        }
    }

    //swipe left
    function moveLeft (){
        for(let i=0 ; i<16 ; i++ ){
            if(i % 4 === 0){

                //0,4,8,12 are the first row numbers in each row
                //e need to find the inner html of each of these 0,4,2,4 and
                //the cell to the right of these cells
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i+1].innerHTML;
                let totalThree = squares[i+2].innerHTML;
                let totalfour = squares[i+3].innerHTML;

                //particular row element
                //parseInt to covert string to numbers
                let row=[parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalfour)];

                //filters elt in row that has number and make its array
                let filterRow= row.filter(num => num);
                
                //how many elt left to fill
                let missing= 4- filterRow.length;

                //arrays of zero on the basis of missing elts
                let zeroes=Array(missing).fill(0);
               
                //after swiping left, 
                //how we want our rows to look like, all elements shifted left        
                let new_row=filterRow.concat(zeroes);

                squares[i].innerHTML=new_row[0];
                squares[i+1].innerHTML=new_row[1];
                squares[i+2].innerHTML=new_row[2];
                squares[i+3].innerHTML=new_row[3];

            }
        }
    }

    //swipe down
    function moveDown(){
        for(let i=0; i<4; i++){
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i+width].innerHTML;
            let totalThree = squares[i+(width*2)].innerHTML;
            let totalfour = squares[i+(width*3)].innerHTML;

            let column=[parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalfour)];
            let filterColumn=column.filter(num =>num);
            let missing= 4-filterColumn.length;
            let zeroes= Array(missing).fill(0);
            let newColumn=zeroes.concat(filterColumn);

            squares[i].innerHTML=newColumn[0];
            squares[i+width].innerHTML=newColumn[1];
            squares[i+(width*2)].innerHTML=newColumn[2];
            squares[i+(width*3)].innerHTML=newColumn[3];

        }
    }

    function moveUp(){
        for(let i=0; i<4; i++){
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i+width].innerHTML;
            let totalThree = squares[i+(width*2)].innerHTML;
            let totalfour = squares[i+(width*3)].innerHTML;

            let column=[parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalfour)];
            let filterColumn=column.filter(num =>num);
            let missing= 4-filterColumn.length;
            let zeroes= Array(missing).fill(0);
            let newColumn=filterColumn.concat(zeroes);

            squares[i].innerHTML=newColumn[0];
            squares[i+width].innerHTML=newColumn[1];
            squares[i+(width*2)].innerHTML=newColumn[2];
            squares[i+(width*3)].innerHTML=newColumn[3];

        }
    }

    function combineRow(){
        for(let i=0; i<15;i++){
            if(squares[i].innerHTML=== squares[i+1].innerHTML){
                let combineTotal= parseInt(squares[i].innerHTML) +parseInt(squares[i+1].innerHTML);
                squares[i].innerHTML=combineTotal;
                squares[i+1].innerHTML=0;
                score += combineTotal;
                scoreDisplay.innerHTML=score;
            }
        }
        checkWin();
    }

    function combineColumn(){
        for(let i=0; i<12;i++){
            if(squares[i].innerHTML=== squares[i+width].innerHTML){
                let combineTotal= parseInt(squares[i].innerHTML) +parseInt(squares[i+width].innerHTML);
                squares[i].innerHTML=combineTotal;
                squares[i+width].innerHTML=0;
                score += combineTotal;
                scoreDisplay.innerHTML=score;
            }
        }
        checkWin();
    }

    //assign keycodes
    function control(e){
        if(e.keyCode === 39){
            keyRight();
        } else if(e.keyCode === 37){
            keyLeft();
        } else if(e.keyCode === 38){
            keyUp();
        } else if(e.keyCode === 40){
            keyDown();
        }
    }

    document.addEventListener('keyup',control);

    function keyRight(){
        moveRight();
        combineRow();
        moveRight();
        generate();
    }

    function keyLeft(){
        moveLeft();
        combineRow();
        moveLeft();
        generate();
    }

    function keyDown(){
        moveDown();
        combineColumn();
        moveDown();
        generate();
    }

    function keyUp(){
        moveUp();
        combineColumn();
        moveUp();
        generate();
    }


    //check for 2048-to win
    function checkWin(){
        for(let i=0; i< squares.length; i++){
            if(squares[i].innerHTML== 2048){
                resultDisplay.innerHTML = 'YOU WIN!'
                document.removeEventListener('keyup',control);
            }
        }
    }

    //chk function for lose
    function GameOver(){
        let zeros=0;
        for (let i =0; i< squares.length; i++){
            if(squares[i].innerHTML == 0){
                zeros++;
            }
        }
        if(zeros === 0){
            resultDisplay.innerHTML = 'YOU LOSE!';
            document.removeEventListener('keyup',control);
        }
    }

})