export default class CrownRotate {
    constructor(m){
        this.m = m
    }

    apply(cmd='', couronneIndex, nRotate) {
        
        if (cmd== 'y') this.Y(couronneIndex, nRotate);
        if (cmd== 'z') this.Z(couronneIndex, nRotate);
        if (cmd== 'x') this.X(couronneIndex, nRotate);
    }

    X(couronneIndex=1, nRotate=1){

        let elm = this.m.elementToApply;
        let n = elm.length;
        let newCode = '';

        if ( elm.length > 9) {
            console.log('erreur trop de cubi selectionnés', elm.length, 'elements: ',  elm)
            return false;
        }
        for (let index = 0; index < n; index++) {
            
            // if(elm[index].id === 'cube19') {
               // console.log('Position arrivé', elm[index].id , elm[index].t);
            // }
        }

        

        for (let index = 0; index < n; index++) {
            
            //console.log('Position temporaire', elm[index].id , elm[index].t, $('#'+elm[index].id)[0]);
        }

        // execute la rotation de 90 degres n fois. 
        // 1 fois 90deg, 2fois 90+90deg, 3 fois revient à dire une fois -90.
        for (let i = 0; i < nRotate; i++) {

            for (let index = 0; index < n; index++) {
                this.m.cubi(elm[index].i).transform()
                .translateZ(200)
            }
            
            // execution d'un rotation à 90 degres des cubis
            // dans une matrice 3x3
            for (let index = 0; index < n; index++) {

                if(elm[index].i === undefined) {
                    console.error('Erreur elm ',elm[index])
                    break;
                }
                
                if (elm[index].t.y == -1 && elm[index].t.z == 1+4) {
                    
                    newCode = this.m.getCode(elm[index].code, 'x', -1)
                    // console.log(elm[index].code, ">", newCode, '#'+elm[index].id)
                    elm[index].t.x = couronneIndex
                    elm[index].t.y = -1
                    elm[index].t.z = -1
                    elm[index].code = newCode
                    
                }
    
                if (elm[index].t.y == -1 && elm[index].t.z == 0+4) {
                    
                    newCode = this.m.getCode(elm[index].code, 'x', -1)
                    // console.log(elm[index].code, ">", newCode, '#'+elm[index].id)
                    elm[index].t.x = couronneIndex
                    elm[index].t.y = 0
                    elm[index].t.z = -1
                    elm[index].code = newCode
                    
                }
    
                if (elm[index].t.y == -1 && elm[index].t.z == -1+4) {
                    
                    newCode = this.m.getCode(elm[index].code, 'x', -1)
                    // console.log(elm[index].code, ">", newCode, '#'+elm[index].id)
                    elm[index].t.x = couronneIndex
                    elm[index].t.y = 1
                    elm[index].t.z = -1
                    elm[index].code = newCode
                    
                }
    
    
                if (elm[index].t.y == 0 && elm[index].t.z == 1+4) {
                    
                    newCode = this.m.getCode(elm[index].code, 'x', -1)
                    // console.log(elm[index].code, ">", newCode, '#'+elm[index].id)
                    elm[index].t.x = couronneIndex
                    elm[index].t.y = -1
                    elm[index].t.z = 0
                    elm[index].code = newCode
                    
                }
    
                if (elm[index].t.y == 0 && elm[index].t.z == 0+4) {
                    
                    newCode = this.m.getCode(elm[index].code, 'x', -1)
                    // console.log(elm[index].code, ">", newCode, '#'+elm[index].id)
                    elm[index].t.x = couronneIndex
                    elm[index].t.y = 0
                    elm[index].t.z = 0
                    elm[index].code = newCode
                    
                }
    
                if (elm[index].t.y == 0 && elm[index].t.z == -1+4) {
                    
                    newCode = this.m.getCode(elm[index].code, 'x', -1)
                    // console.log(elm[index].code, ">", newCode, '#'+elm[index].id)
                    elm[index].t.x = couronneIndex
                    elm[index].t.y = 1
                    elm[index].t.z = 0
                    elm[index].code = newCode
                    
                }
    
                if (elm[index].t.y == 1 && elm[index].t.z == 1+4) {
                    
                    newCode = this.m.getCode(elm[index].code, 'x', -1)
                    // console.log(elm[index].code, ">", newCode, '#'+elm[index].id)
                    elm[index].t.x = couronneIndex
                    elm[index].t.y = -1
                    elm[index].t.z = 1
                    elm[index].code = newCode
                    
                }
    
                if (elm[index].t.y == 1 && elm[index].t.z == 0+4) {
                    
                    newCode = this.m.getCode(elm[index].code, 'x', -1)
                   //  console.log(elm[index].code, ">", newCode, '#'+elm[index].id)
                    elm[index].t.x = couronneIndex
                    elm[index].t.y = 0
                    elm[index].t.z = 1
                    elm[index].code = newCode
                    
                }
    
                if (elm[index].t.y == 1 && elm[index].t.z == -1+4) {
                    
                    newCode = this.m.getCode(elm[index].code, 'x', -1)
                    // console.log(elm[index].code, ">", newCode, '#'+elm[index].id)
                    elm[index].t.x = couronneIndex
                    elm[index].t.y = 1
                    elm[index].t.z = 1
                    elm[index].code = newCode
                }
            }
        }


        for (let index = 0; index < n; index++) {
            
            let genericTrasform = this.m.pos(elm[index].code , couronneIndex, elm[index].t.y, elm[index].t.z)
            $('#'+elm[index].id).css('transform', genericTrasform);
        }


    }
    
    Y(couronneIndex=-1, nRotate=1){
        let elm = this.m.elementToApply;
        let n = elm.length;
        let newCode = '';

        if ( elm.length > 9) {
            console.log('erreur trop de cubi selectionnés', elm.length, 'elements: ',  elm)
            return false;
        }
        

        // execute la rotation de 90 degres n fois. 
        // 1 fois 90deg, 2fois 90+90deg, 3 fois revient à dire une fois -90.
        for (let i = 0; i < nRotate; i++) {

            for (let index = 0; index < n; index++) {
                this.m.cubi(elm[index].i).transform()
                .translateX(200)
            }
            
            // execution d'un rotation à 90 degres des cubis
            // dans une matrice 3x3
            for (let index = 0; index < n; index++) {

                if(elm[index].i === undefined) {
                    console.error('Erreur elm ',elm[index])
                    break;
                }
                
                if (elm[index].t.x == -1+4 && elm[index].t.z == -1) {
                    
                    newCode = this.m.getCode(elm[index].code, 'y', 1)
                    // console.log(elm[index].code, ">", newCode, '#'+elm[index].id)
                    elm[index].t.x = 1
                    elm[index].t.y = couronneIndex
                    elm[index].t.z = -1
                    elm[index].code = newCode
                }
                
                if (elm[index].t.x == 0+4 && elm[index].t.z == -1) {
                    
                    newCode = this.m.getCode(elm[index].code, 'y', 1)
                    // console.log(elm[index].code, ">", newCode, '#'+elm[index].id)
                    elm[index].t.x = 1
                    elm[index].t.y = couronneIndex
                    elm[index].t.z = 0
                    elm[index].code = newCode
                }
                
                if (elm[index].t.x == 1+4 && elm[index].t.z == -1) {
                    
                    newCode = this.m.getCode(elm[index].code, 'y', 1)
                    // console.log(elm[index].code, ">", newCode, '#'+elm[index].id)
                    elm[index].t.x = 1
                    elm[index].t.y = couronneIndex
                    elm[index].t.z = 1
                    elm[index].code = newCode
                    let genericTrasform = this.m.pos(newCode, 1,-1,1)
                }
                
                if (elm[index].t.x == -1+4 && elm[index].t.z == 0) {
                    
                    newCode = this.m.getCode(elm[index].code, 'y', 1)
                    //console.log(elm[index].code, ">", newCode, '#'+elm[index].id)
                    elm[index].t.x = 0
                    elm[index].t.y = couronneIndex
                    elm[index].t.z = -1
                    elm[index].code = newCode
                }
    
                if (elm[index].t.x == 0+4 && elm[index].t.z == 0) {
                    
                    newCode = this.m.getCode(elm[index].code, 'y', 1)
                    // console.log(elm[index].code, ">", newCode, '#'+elm[index].id)
                    elm[index].t.x = 0
                    elm[index].t.y = couronneIndex
                    elm[index].t.z = 0
                    elm[index].code = newCode
                }
    
                if (elm[index].t.x == 1+4 && elm[index].t.z == 0) {
                    
                    newCode = this.m.getCode(elm[index].code, 'y', 1)
                    // console.log(elm[index].id, elm[index].code, ">", newCode, '#'+elm[index].id)
                    elm[index].t.x = 0
                    elm[index].t.y = couronneIndex
                    elm[index].t.z = 1
                    elm[index].code = newCode
                }
    
                if (elm[index].t.x == -1+4 && elm[index].t.z == 1) {
                    
                    newCode = this.m.getCode(elm[index].code, 'y', 1)
                    // console.log(elm[index].code, ">", newCode, '#'+elm[index].id)
                    elm[index].t.x = -1
                    elm[index].t.y = couronneIndex
                    elm[index].t.z = -1
                    elm[index].code = newCode
                }
    
                if (elm[index].t.x == 0+4 && elm[index].t.z == 1) {
                    
                    newCode = this.m.getCode(elm[index].code, 'y', 1)
                    // console.log(elm[index].code, ">", newCode, '#'+elm[index].id)
                    elm[index].t.x = -1
                    elm[index].t.y = couronneIndex
                    elm[index].t.z = 0
                    elm[index].code = newCode
                }
    
                if (elm[index].t.x == 1+4 && elm[index].t.z == 1) {
                    
                    newCode = this.m.getCode(elm[index].code, 'y', 1)
                    // console.log(elm[index].code, ">", newCode, '#'+elm[index].id)
                    elm[index].t.x = -1
                    elm[index].t.y = couronneIndex
                    elm[index].t.z = 1
                    elm[index].code = newCode
                }
                
            }
    
        }

        for (let index = 0; index < n; index++) {
            
            let genericTrasform = this.m.pos(elm[index].code , elm[index].t.x, couronneIndex, elm[index].t.z)
            $('#'+elm[index].id).css('transform', genericTrasform);
        }

    }

    Z(couronneIndex=1, nRotate=1){
        
        let elm = this.m.elementToApply;
        let n = elm.length;
        let newCode = '';

        if ( elm.length > 9) {
            console.log('erreur trop de cubi selectionnés', elm.length, 'elements: ',  elm)
            return false;
        }




        // execute la rotation de 90 degres n fois. 
        // 1 fois 90deg, 2fois 90+90deg, 3 fois revient à dire une fois -90.
        for (let i = 0; i < nRotate; i++) {

            for (let index = 0; index < n; index++) {
                this.m.cubi(elm[index].i).transform()
                .translateX(200)
            }
            
            // execution d'un rotation à 90 degres des cubis
            // dans une matrice 3x3
            for (let index = 0; index < n; index++) {

                if(elm[index].i === undefined) {
                    console.error('Erreur elm ',elm[index])
                    break;
                }
                
    
                
                if (elm[index].t.x == -1+4 && elm[index].t.y == -1) {

                    newCode = this.m.getCode(elm[index].code, 'z', 1)
                   //  console.log(elm[index].code, ">", newCode, '#'+elm[index].id)
                    elm[index].t.x = 1
                    elm[index].t.y = -1
                    elm[index].t.z = couronneIndex
                    elm[index].code = newCode
                }
    
                if (elm[index].t.x == 0+4 && elm[index].t.y == -1) {
    
                    newCode = this.m.getCode(elm[index].code, 'z', 1)
                    // console.log(elm[index].code, ">", newCode, '#'+elm[index].id)
                    elm[index].t.x = 1
                    elm[index].t.y = 0
                    elm[index].t.z = couronneIndex
                    elm[index].code = newCode
                }
    
                if (elm[index].t.x == 1+4 && elm[index].t.y == -1) {
    
                    // console.log('DEBUG ',elm[index])
                    newCode = this.m.getCode(elm[index].code, 'z', 1)
                    // console.log(elm[index].code, ">", newCode, '#'+elm[index].id)
                    elm[index].t.x = 1
                    elm[index].t.y = 1
                    elm[index].t.z = couronneIndex
                    elm[index].code = newCode
                }
    
                if (elm[index].t.x == -1+4 && elm[index].t.y == 0) {
    
                    newCode = this.m.getCode(elm[index].code, 'z', 1)
                    // console.log(elm[index].code, ">", newCode, '#'+elm[index].id)
                    elm[index].t.x = 0
                    elm[index].t.y = -1
                    elm[index].t.z = couronneIndex
                    elm[index].code = newCode
                }
                
    
                if (elm[index].t.x == 0+4 && elm[index].t.y == 0) {
    
                    newCode = this.m.getCode(elm[index].code, 'z', 1)
                    // console.log(elm[index].code, ">", newCode, '#'+elm[index].id)
                    elm[index].t.x = 0
                    elm[index].t.y = 0
                    elm[index].t.z = couronneIndex
                    elm[index].code = newCode
                }
    
                if (elm[index].t.x == 1+4 && elm[index].t.y == 0) {
    
                    newCode = this.m.getCode(elm[index].code, 'z', 1)
                    // console.log(elm[index].code, ">", newCode, '#'+elm[index].id)
                    elm[index].t.x = 0
                    elm[index].t.y = 1
                    elm[index].t.z = couronneIndex
                    elm[index].code = newCode
                    
                }
    
                if (elm[index].t.x == -1+4 && elm[index].t.y == 1) {
    
                    newCode = this.m.getCode(elm[index].code, 'z', 1)
                    // console.log(elm[index].code, ">", newCode, '#'+elm[index].id)
                    elm[index].t.x = -1
                    elm[index].t.y = -1
                    elm[index].t.z = couronneIndex
                    elm[index].code = newCode
                    
                }
    
                if (elm[index].t.x == 0+4 && elm[index].t.y == 1) {
    
                    newCode = this.m.getCode(elm[index].code, 'z', 1)
                    // console.log(elm[index].code, ">", newCode, '#'+elm[index].id)
                    elm[index].t.x = -1
                    elm[index].t.y = 0
                    elm[index].t.z = couronneIndex
                    elm[index].code = newCode
                }
                
                if (elm[index].t.x == 1+4 && elm[index].t.y == 1) {
    
                    newCode = this.m.getCode(elm[index].code, 'z', 1)
                    // console.log(elm[index].code, ">", newCode, '#'+elm[index].id)
                    elm[index].t.x = -1
                    elm[index].t.y =  1
                    elm[index].t.z = couronneIndex
                    elm[index].code = newCode
                }
    
                
            }
    
        }


        for (let index = 0; index < n; index++) {
            
            let genericTrasform = this.m.pos(elm[index].code , elm[index].t.x, elm[index].t.y, couronneIndex)
            $('#'+elm[index].id).css('transform', genericTrasform);
        }



    }
}