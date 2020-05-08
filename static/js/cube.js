
import MatriceCube from '../../lib/MatriceCube.class.js';

        // https://stackoverflow.com/questions/34450835/get-3d-css-rotation-value-from-matrix3d-with-javascript
        var _getTransform = function($element) {

            var matrix = $element.css('transform'),
                rotateX = 0,
                rotateY = 0,
                rotateZ = 0;

            if (matrix !== 'none') {

                // do some magic
                var values = matrix.split('(')[1].split(')')[0].split(','),
                    pi = Math.PI,
                    sinB = parseFloat(values[8]),
                    b = Math.round(Math.asin(sinB) * 180/ pi),
                    cosB = Math.cos(b * pi / 180),
                    matrixVal10 = parseFloat(values[9]),
                    a = Math.round(Math.asin(-matrixVal10 / cosB) * 180 / pi),
                    c = Math.round(Math.acos(matrixVal1 / cosB) * 180 / pi);

                rotateX = a;
                rotateY = b;
                rotateZ = c;

            }
            if( values[0] < 0)
                rotateY = (rotateY+180)*-1;
            else 
                if (rotateY >0) rotateY = -360 + rotateY;

            rotateY = Math.abs(rotateY);
            //console.log('test', rotateY)

            return {
                rotateX: rotateX,
                rotateY: rotateY,
                rotateZ: rotateZ
            };

        }


        function cloneCube(id, x, y, z, css={}, classe={}) {
            let cube = `<div class="wrapper3D" id="cube${id}">
                <o class="x"></o>
                <b class="top">top
                </b> 
                <b class="bottom">bottom</b>
                <b class="left">left
                    <b class="back">back</b>
                </b> 
                <b class="right">right
                    <b class="front">front</b>
                </b>
            </div>`;
            $( "#cubeAxis" ).append( cube );
            
            let hotfixZ = (z < 0) ? 50 : 0 ;
            if (z == 0)
                hotfixZ = 0;
            else if (z < 0) 
                hotfixZ = 50;
            else if (z > 0)
                hotfixZ = -50;

            $('#cube'+id).css({
                transform: `translate3d(${100*parseInt(x)}%, ${100*parseInt(y)}%, ${(50*parseInt(z))}px)`,
            })
            
            return '#cube'+id;
        }

          $(function(){

            let v3 = { x:0,y:0,z:0 }

            let cube = {
                r: v3
            }



            let cubeAxis = `<div class="wrapper3D control" id="cubeAxis">
                <o class="x"></o>
                <b class="top">top
                </b> 
                <b class="bottom">bottom</b>
                <b class="left">left
                    <b class="back">back</b>
                </b> 
                <b class="right">right
                    <b class="front">front</b>
                </b>
            </div>`;
            $( ".wrapper" ).append( cubeAxis );

            let rAxis = `<div class="wrapper3D r-control" id="r-axis">
                <o class="x"></o>
                <b class="top">top
                </b> 
                <b class="bottom">bottom</b>
                <b class="left">left
                    <b class="back">back</b>
                </b> 
                <b class="right">right
                    <b class="front">front</b>
                </b>
            </div>`;
            $( "#cubeAxis" ).append( rAxis );

            let matriceCube = []

            let i = 0;
            for (let z = -1; z < 2; z++) {
                for (let y = -1; y < 2; y++) {
                    for (let x = -1; x < 2; x++) {
                        i++;
                        //console.log('cloneCube(', i, x, y, z,')')
                        let css = {}
                        let classe = ''

                        // css pour reperer les cubis
                        // avec ces class css
                        css = {background: 'red'};

                        matriceCube.push({i:i, id:'cube'+i, t:{x, y, z}, r:{x:0,y:0,z:0}})
                        let cubi = cloneCube(i, x, y, z);

                        // if( z < 0) $(cubi).addClass('cubi-back');
                        // if( z > 0) $(cubi).addClass('cubi-front');
                        // if( y < 0) $(cubi).addClass('cubi-top');
                        // if( y > 0) $(cubi).addClass('cubi-bottom');
                        // if( x < 0) $(cubi).addClass('cubi-left');
                        // if( x > 0) $(cubi).addClass('cubi-right');

                        //cubi.cube = {r: {x:0, y:0, z:0}}
                        //cubi.dataset['transform'] = JSON.stringify({r: {x:0, y:0, z:0}});
                        $(cubi).attr('data-transform-rotate', JSON.stringify({r: {x:0, y:0, z:0}}))
                        $(cubi).attr('data-transform-translate', JSON.stringify({t:{x:x*50, y:y*50, z:z*50}}))
                    }
                }
            }
            // déplace le front sur l'axe de rotation
            //$('#r-axis').append($('.cubi-front'))
            
            

            //$('.cubi-front *').css({background: '#777'}); 

            matriceCube = new MatriceCube(matriceCube);
            
            // matriceCube.log();
            matriceCube.build();
            

            //let t1 = matriceCube.cubi(1).transform();
            
            // TEST Z 90
            // t1.rotateZ(90) // U > R
            // y 
            // t1.rotateX(90) L > F
            // x
            // t1.rotateY(90) // U > F

            // TEST X 90
            //t1.rotateX(90) // F > U
            // y
            //t1.rotateZ(90) // R > F
            // z
            // t1.rotateY(90)

            // TEST Y 90
            // t1.rotateY(90) // F > R
            // x
            // t1.rotateZ(90) // U > B
            // z
            // t1.rotateX(90) // R > U



            // SENARIO 4 etape
            // t1.rotateZ(90) // y=x x=y
            // // y etape 2
            // t1.rotateX(90) // y=z z=y > y=x z=y x=z
            // // y
            // // t1.rotateX(90) // F > R 
            // // z
            // //t1.rotateY(90) // U > R 
            // // x etape 3
            // t1.rotateZ(90); // F > U

            // t1.rotateY(90)
            // t1.rotateZ(270)
            // console.log('HELLO', $('#cube1').css('transform') );


            // U D F R B L

           // UR matrix3d(6.12323e-17, -1, 0, 0, 1, 6.12323e-17, 0, 0, 0, 0, 1, 0, -50.2857, -150.286, -50, 1)
            // UF matrix3d(3.7494e-33, -6.12323e-17, -1, 0, 1, 6.12323e-17, 0, 0, 6.12323e-17, -1, 6.12323e-17, 0, -50.2857, -150.286, -50, 1)
            // UL matrix3d(-6.12323e-17, 1, -1.22465e-16, 0, 1, 6.12323e-17, 0, 0, 7.49879e-33, -1.22465e-16, -1, 0, -50.2857, -150.286, -50, 1)
            // UB matrix3d(-1.12482e-32, 1.83697e-16, 1, 0, 1, 6.12323e-17, 0, 0, -6.12323e-17, 1, -1.83697e-16, 0, -50.2857, -150.286, -50, 1)

            
            // DL matrix3d(6.12323e-17, 1, 0, 0, -1, 6.12323e-17, 0, 0, 0, 0, 1, 0, -50.2857, -150.286, -50, 1)
            // DB matrix3d(3.7494e-33, 6.12323e-17, -1, 0, -1, 6.12323e-17, 0, 0, 6.12323e-17, 1, 6.12323e-17, 0, -50.2857, -150.286, -50, 1)
            // DR matrix3d(-6.12323e-17, -1, -1.22465e-16, 0, -1, 6.12323e-17, 0, 0, 7.49879e-33, 1.22465e-16, -1, 0, -50.2857, -150.286, -50, 1)
            // DF matrix3d(-1.12482e-32, -1.83697e-16, 1, 0, -1, 6.12323e-17, 0, 0, -6.12323e-17, -1, -1.83697e-16, 0, -50.2857, -150.286, -50, 1)

            
            // FU matrix3d(6.12323e-17, 0, 1, 0, 0, 1, 0, 0, -1, 0, 6.12323e-17, 0, -50.2857, -150.286, -50, 1)
            // FL matrix3d(3.7494e-33, 1, 6.12323e-17, 0, -6.12323e-17, 6.12323e-17, -1, 0, -1, 0, 6.12323e-17, 0, -50.2857, -150.286, -50, 1)
            // FD matrix3d(-6.12323e-17, 1.22465e-16, -1, 0, -7.49879e-33, -1, -1.22465e-16, 0, -1, 0, 6.12323e-17, 0, -50.2857, -150.286, -50, 1)
            // FR matrix3d(-1.12482e-32, -1, -1.83697e-16, 0, 6.12323e-17, -1.83697e-16, 1, 0, -1, 0, 6.12323e-17, 0, -50.2857, -150.286, -50, 1)


            
            // RD matrix3d(-1, 1.22465e-16, 0, 0, -1.22465e-16, -1, 0, 0, 0, 0, 1, 0, -50.2857, -150.286, -50, 1)
            // RB matrix3d(-1, 1.22465e-16, 0, 0, -7.49882e-33, -6.12323e-17, 1, 0, 1.22465e-16, 1, 6.12323e-17, 0, -50.2857, -150.286, -50, 1)
            // RU matrix3d(-1, 1.22465e-16, 0, 0, 1.22465e-16, 1, 1.22465e-16, 0, 1.49976e-32, 1.22465e-16, -1, 0, -50.2857, -150.286, -50, 1)
            // RF matrix3d(-1, 1.22465e-16, 0, 0, 2.24965e-32, 1.83697e-16, -1, 0, -1.22465e-16, -1, -1.83697e-16, 0, -50.2857, -150.286, -50, 1)


            // BU matrix3d(6.12323e-17, 0, -1, 0, 0, 1, 0, 0, 1, 0, 6.12323e-17, 0, -50.2857, -150.286, -50, 1)
            // BL matrix3d(3.7494e-33, 1, -6.12323e-17, 0, -6.12323e-17, 6.12323e-17, 1, 0, 1, 0, 6.12323e-17, 0, -50.2857, -150.286, -50, 1)
            // BD matrix3d(-6.12323e-17, 1.22465e-16, 1, 0, -7.49879e-33, -1, 1.22465e-16, 0, 1, 0, 6.12323e-17, 0, -50.2857, -150.286, -50, 1)
            // BR matrix3d(-1.12482e-32, -1, 1.83697e-16, 0, 6.12323e-17, -1.83697e-16, -1, 0, 1, 0, 6.12323e-17, 0, -50.2857, -150.286, -50, 1)

            
            // LU matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -50.2857, -150.286, -50, 1)
            // LF matrix3d(1, 0, 0, 0, 0, 6.12323e-17, 1, 0, 0, -1, 6.12323e-17, 0, -50.2857, -150.286, -50, 1)
            // LD matrix3d(1, 0, 0, 0, 0, -1, 1.22465e-16, 0, 0, -1.22465e-16, -1, 0, -50.2857, -150.286, -50, 1)
            // LB matrix3d(1, 0, 0, 0, 0, -1.83697e-16, -1, 0, 0, 1, -1.83697e-16, 0, -50.2857, -150.286, -50, 1)
            

            let pos = (code, x,y,z) => {

                if (x == -1) x = -150
                if (x ==  0) x = 0
                if (x ==  1) x = 150

                if (y == -1) y = -150
                if (y ==  0) y = 0
                if (y ==  1) y = 150

                if (z == -1) z = -150
                if (z ==  0) z = 0
                if (z ==  1) z = 150



                let transform = '';
                switch (code) {
                    case 'UR':
                        transform = 'matrix3d(6.12323e-17, -1, 0, 0, 1, 6.12323e-17, 0, 0, 0, 0, 1, 0, '+x+', '+y+', '+z+', 1)'
                        break;
                    case 'UF':
                        transform = 'matrix3d(3.7494e-33, -6.12323e-17, -1, 0, 1, 6.12323e-17, 0, 0, 6.12323e-17, -1, 6.12323e-17, 0, '+x+', '+y+', '+z+', 1)'
                        break;
                    case 'UL':
                        transform = 'matrix3d(-6.12323e-17, 1, -1.22465e-16, 0, 1, 6.12323e-17, 0, 0, 7.49879e-33, -1.22465e-16, -1, 0, '+x+', '+y+', '+z+', 1)'
                        break;
                    case 'UB':
                        transform = 'matrix3d(-1.12482e-32, 1.83697e-16, 1, 0, 1, 6.12323e-17, 0, 0, -6.12323e-17, 1, -1.83697e-16, 0, '+x+', '+y+', '+z+', 1)'
                        break;

                    case 'DL':
                        transform = 'matrix3d(6.12323e-17, 1, 0, 0, -1, 6.12323e-17, 0, 0, 0, 0, 1, 0, '+x+', '+y+', '+z+', 1)'
                        break;
                    case 'DB':
                        transform = 'matrix3d(3.7494e-33, 6.12323e-17, -1, 0, -1, 6.12323e-17, 0, 0, 6.12323e-17, 1, 6.12323e-17, 0, '+x+', '+y+', '+z+', 1)'
                        break;
                    case 'DR':
                        transform = 'matrix3d(-6.12323e-17, -1, -1.22465e-16, 0, -1, 6.12323e-17, 0, 0, 7.49879e-33, 1.22465e-16, -1, 0, '+x+', '+y+', '+z+', 1)'
                        break;
                    case 'DF':
                        transform = 'matrix3d(-1.12482e-32, -1.83697e-16, 1, 0, -1, 6.12323e-17, 0, 0, -6.12323e-17, -1, -1.83697e-16, 0, '+x+', '+y+', '+z+', 1)'
                        break;

                    case 'FU':
                        transform = 'matrix3d(6.12323e-17, 0, 1, 0, 0, 1, 0, 0, -1, 0, 6.12323e-17, 0, '+x+', '+y+', '+z+', 1)'
                        break;
                    case 'FL':
                        transform = 'matrix3d(3.7494e-33, 1, 6.12323e-17, 0, -6.12323e-17, 6.12323e-17, -1, 0, -1, 0, 6.12323e-17, 0, '+x+', '+y+', '+z+', 1)'
                        break;
                    case 'FD':
                        transform = 'matrix3d(-6.12323e-17, 1.22465e-16, -1, 0, -7.49879e-33, -1, -1.22465e-16, 0, -1, 0, 6.12323e-17, 0, '+x+', '+y+', '+z+', 1)'
                        break;
                    case 'FR':
                        transform = 'matrix3d(-1.12482e-32, -1, -1.83697e-16, 0, 6.12323e-17, -1.83697e-16, 1, 0, -1, 0, 6.12323e-17, 0, '+x+', '+y+', '+z+', 1)'
                        break;
                        

                    case 'RD':
                        transform = 'matrix3d(-1, 1.22465e-16, 0, 0, -1.22465e-16, -1, 0, 0, 0, 0, 1, 0, '+x+', '+y+', '+z+', 1)'
                        break;
                    case 'RB':
                        transform = 'matrix3d(-1, 1.22465e-16, 0, 0, -7.49882e-33, -6.12323e-17, 1, 0, 1.22465e-16, 1, 6.12323e-17, 0, '+x+', '+y+', '+z+', 1)'
                        break;
                    case 'RU':
                        transform = 'matrix3d(-1, 1.22465e-16, 0, 0, 1.22465e-16, 1, 1.22465e-16, 0, 1.49976e-32, 1.22465e-16, -1, 0, '+x+', '+y+', '+z+', 1)'
                        break;
                    case 'RF':
                        transform = 'matrix3d(-1, 1.22465e-16, 0, 0, 2.24965e-32, 1.83697e-16, -1, 0, -1.22465e-16, -1, -1.83697e-16, 0, '+x+', '+y+', '+z+', 1)'
                        break;


                    case 'BU':
                        transform = 'matrix3d(6.12323e-17, 0, -1, 0, 0, 1, 0, 0, 1, 0, 6.12323e-17, 0, '+x+', '+y+', '+z+', 1)'
                        break;
                    case 'BL':
                        transform = 'matrix3d(3.7494e-33, 1, -6.12323e-17, 0, -6.12323e-17, 6.12323e-17, 1, 0, 1, 0, 6.12323e-17, 0, '+x+', '+y+', '+z+', 1)'
                        break;
                    case 'BD':
                        transform = 'matrix3d(-6.12323e-17, 1.22465e-16, 1, 0, -7.49879e-33, -1, 1.22465e-16, 0, 1, 0, 6.12323e-17, 0, '+x+', '+y+', '+z+', 1)'
                        break;
                    case 'BR':
                        transform = 'matrix3d(-1.12482e-32, -1, 1.83697e-16, 0, 6.12323e-17, -1.83697e-16, -1, 0, 1, 0, 6.12323e-17, 0, '+x+', '+y+', '+z+', 1)'
                        break;


                    case 'LU':
                        transform = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, '+x+', '+y+', '+z+', 1)'
                        break;
                    case 'LF':
                        transform = 'matrix3d(1, 0, 0, 0, 0, 6.12323e-17, 1, 0, 0, -1, 6.12323e-17, 0, '+x+', '+y+', '+z+', 1)'
                        break;
                    case 'LD':
                        transform = 'matrix3d(1, 0, 0, 0, 0, -1, 1.22465e-16, 0, 0, -1.22465e-16, -1, 0, '+x+', '+y+', '+z+', 1)'
                        break;
                    case 'LB':
                        transform = 'matrix3d(1, 0, 0, 0, 0, -1.83697e-16, -1, 0, 0, 1, -1.83697e-16, 0, '+x+', '+y+', '+z+', 1)'
                        break;
                    
                
                    default:
                        break;
                }
                return transform;
            }

            let newCode= (currentPos, axyR, direction) => {
                let U = [];
                U.push('R')
                U.push('F')
                U.push('L')
                U.push('B')

                let D = [];
                D.push('L')
                D.push('B')
                D.push('R')
                D.push('F')

                let F = [];
                F.push('U')
                F.push('L')
                F.push('D')
                F.push('R')

                let R = [];
                R.push('D')
                R.push('B')
                R.push('U')
                R.push('F')
                
                let B = [];
                B.push('U')
                B.push('L')
                B.push('D')
                B.push('R')

                let L = [];
                L.push('U')
                L.push('F')
                L.push('D')
                L.push('B')

                let getArrFace = (letter) => {
                    if (letter == 'U') return U;
                    if (letter == 'D') return D;
                    if (letter == 'F') return F;
                    if (letter == 'R') return R;
                    if (letter == 'B') return B;
                    if (letter == 'L') return L;
                }
                



                // let currentPos = 'LU';
                // let axyR = 'z';
                // let direction = -1

                

                if (axyR == 'x') {

                    if (currentPos.charAt(0) != 'R' && currentPos.charAt(0) != 'F') {
                        
                        direction = direction*-1;
                    }

                    console.log('Mode X')
                        let arrFace = getArrFace(currentPos.charAt(0))
                        let n = arrFace.length;

                        let offset = -1;
                        for (let i = 0; i < arrFace.length; i++) {
                            console.log('cherche '+arrFace[i]+' == '+currentPos.charAt(1))
                            if (arrFace[i] == currentPos.charAt(1)) {
                                offset = i;
                                console.log('offset trouvé', i)
                                break;
                            }

                        }
                        let newOffset = -99;
                        console.log('demande ', (offset + direction))
                        if (offset + direction < 0) {
                            newOffset = arrFace.length + direction;
                        } else if (offset + direction > arrFace.length-1) {
                            newOffset = 0
                        }else {
                            newOffset = (offset + direction)
                        }
                        
                        console.log('offset = ', offset,' index passe à ', newOffset,':', arrFace[newOffset], 'return '+currentPos.charAt(0)+arrFace[newOffset])

                        return currentPos.charAt(0)+arrFace[newOffset];
                        
                } else if (axyR == 'y') {
                    
                    if (currentPos.charAt(0) != 'B' && currentPos != 'LF') {
                        console.log('inverse direction')
                        direction = direction*-1;
                    }


                    console.log('Mode Y')
                    let arrFace = getArrFace(currentPos.charAt(1))

                    let offset = -1;
                    for (let i = 0; i < arrFace.length; i++) {
                        console.log('cherche '+arrFace[i]+' == '+currentPos.charAt(0))
                        if (arrFace[i] == currentPos.charAt(0)) {
                            offset = i;
                            console.log('offset trouvé', i)
                            break;
                        }

                    }
                    let newOffset = -99;
                    console.log('demande ', (offset + direction))
                    if (offset + direction < 0) {
                        newOffset = arrFace.length + direction;
                    } else if (offset + direction > arrFace.length-1) {
                        newOffset = 0
                    }else {
                        newOffset = (offset + direction)
                    }
                    console.log('offset = ', offset,' index passe à ', newOffset,':', arrFace[newOffset], 'return '+arrFace[newOffset]+currentPos.charAt(1))

                    console.log('exclusion ', currentPos.charAt(0))
                    // if (currentPos.charAt(0) == 'L'   && direction == -1){

                        // if (newOffset==0) newOffset=2
                        // if (newOffset==1) newOffset=3
                        // if (newOffset==2) newOffset=0
                        // if (newOffset==3) newOffset=1
                    // }
                    let nexOffsetY = currentPos.charAt(1);
                    
                    console.log('TEST ', currentPos, direction)
                    if (currentPos == 'LF' && direction == -1) {
                        return 'DB';
                    }


                    return arrFace[newOffset]+currentPos.charAt(1);

                } else if (axyR == 'z') {
                    console.log('Mode Z get tab '+currentPos.charAt(1))
                    let arrFace = getArrFace(currentPos.charAt(1))

                    let searchFace = 1;

                    // début de la recherche de la face arriere
                    let offset = -1;
                    for (let i = 0; i < arrFace.length; i++) {
                        console.log('cherche '+arrFace[i]+' == '+currentPos.charAt(0))
                        if (arrFace[i] == currentPos.charAt(0)) {
                            offset = i;
                            console.log('offset trouvé', i)
                            break;
                        }

                    }
                    let newOffset = -99;
                    let faceX = arrFace[offset];
                    console.log('demande ', (offset + searchFace))
                    if (offset + searchFace < 0) {
                        newOffset = arrFace.length + searchFace;
                    } else if (offset + searchFace > arrFace.length-1) {
                        newOffset = 0
                    }else {
                        newOffset = (offset + searchFace)
                    }
                    // fin de la recherche de la face arriere
                    console.log('face Z arriere = '+arrFace[newOffset])

                    // recupere le tableau back pour simplifié l'explication
                    // mais en realité ce n'est pas vraiment le tableau back car
                    // cela depend de la rotation du cubi 
                    arrFace = getArrFace(arrFace[newOffset])
                    console.log('face arriere debug ', arrFace)
                    
                    // retrouve la face X dans le tableau back 
                    // pour faire tourné les deux face x y contenu
                    // dans ce tableau
                    for (let i = 0; i < arrFace.length; i++) {
                        console.log('cherche '+arrFace[i]+' == '+faceX)
                        if (arrFace[i] == faceX) {
                            offset = i;
                            console.log('offset trouvé', i)
                            break;
                        }

                    }
                    // console.log('faces actuelles = ', arrFace[offset] , arrFace[offset-1], offset , offset-1);
                    // console.log('faces demandé = ', offset+direction , offset-1+direction);

                    // nouvelle face demandé pour la face left que je nome x
                    let fxIndex = offset-direction
                    console.log('fxIndex', fxIndex)
                    // -99 pour montrer que la valeur n'a pas ete touché
                    let offsetX = -99
                    // recherche l'index du tableau si il n'existe 
                    // pas en dessous de zero ou au dessus de la taille du tableau
                    if (fxIndex < 0) {
                        offsetX = arrFace.length + fxIndex;
                    } else if (fxIndex > arrFace.length-1) {
                        console.log('testX')
                        offsetX = 0
                    }else {
                        offsetX = fxIndex
                    }

                    // nouvelle face demandé pour la face du haut que je nome y
                    let fyIndex = fxIndex+1
                    console.log('fyIndex', fyIndex)
                    // -99 pour montrer que la valeur n'a pas ete touché
                    let offsetY = -99
                    // recherche l'index du tableau si il n'existe 
                    // pas en dessous de zero ou au dessus de la taille du tableau
                    if (fyIndex < 0) {
                        offsetY = arrFace.length + fyIndex;
                    } else if (fyIndex > arrFace.length-1) {
                        offsetY = 0+1
                    }else {
                        offsetY = fyIndex
                    }

                    // console.log('faces nouvelles = ', arrFace[offsetX] , arrFace[offsetY], offsetX, offsetY);

                    if (currentPos.charAt(0) != 'R'   && direction == -1){
                        console.log('exclusion ', currentPos.charAt(0))

                        if (offsetX==0) offsetX=2
                        if (offsetX==1) offsetX=3
                        if (offsetX==2) offsetX=0
                        if (offsetX==3) offsetX=1
                    }

                    return arrFace[offsetX]+arrFace[offsetY];
                }
            }
                            
            // let code = newCode('LU', 'y', -1);
            // console.log('code = ', code);

            // let trasformTest = pos(code, -1,-1,-1)
            // $('#cube1').css('transform', trasformTest);



            // // // // test
            // code = newCode(code, 'y', -1);
            // console.log('code = ', code);

            // trasformTest = pos(code, -1,-1,-1)
            // $('#cube1').css('transform', trasformTest);





            // GOOD
            // let code = 'LU';
            // let trasformTest = pos(code, -1,-1,-1)
            // $('#cube1').css('transform', trasformTest);
            
            
            // code = matriceCube.getCode(code, 'z', -1);
            // console.log('code = ', code);
            // trasformTest = pos(code, -1,-1,-1)
            // $('#cube1').css('transform', trasformTest);


            // code = matriceCube.getCode(code, 'z', -1);
            // console.log('code = ', code);
            // trasformTest = pos(code, -1,-1,-1)
            // $('#cube1').css('transform', trasformTest);


            // code = matriceCube.getCode(code, 'y', -1);
            // console.log('code = ', code);
            // trasformTest = pos(code, -1,-1,-1)
            // $('#cube1').css('transform', trasformTest);
      
      





            // .rotateX(90)

            // matriceCube.select('z', 1);
            // matriceCube.apply('z');
            // matriceCube.apply('z');
            // matriceCube.unselectAll().select('y', -1);
            // matriceCube.apply('y');
            // matriceCube.unselectAll().select('x', 1);
            // matriceCube.apply('x');

            (async () => {
                matriceCube.select('z', 1);
                // await matriceCube.animate(90, 'z', 1); 
                matriceCube.apply('z',1,1);

                matriceCube.unselectAll().select('z', 0);
                // await matriceCube.animate(180, 'z', 0); 
                matriceCube.apply('z',0,2);

                matriceCube.unselectAll().select('y', 0);
                // await matriceCube.animate(90, 'y', 0); 
                matriceCube.apply('y',0,3);


                matriceCube.unselectAll().select('x', -1);
                // await matriceCube.animate(90, 'x', -1); 
                matriceCube.apply('x',-1,1);

                matriceCube.unselectAll().select('x', 0);
                // await matriceCube.animate(-90, 'x', 0); 
                matriceCube.apply('x',0,3);

                matriceCube.unselectAll().select('x', 1);
                // await matriceCube.animate(90, 'x', 1); 
                matriceCube.apply('x',1,1);

                matriceCube.unselectAll().select('y', -1);
                await matriceCube.animate(90, 'y', -1); 
                // matriceCube.apply('y',-1,1);

                // matriceCube.unselectAll().select('y', 0);
                // await matriceCube.animate(-90, 'y', 0); 

                // matriceCube.unselectAll().select('y', 1);
                // await matriceCube.animate(90, 'y', 1); 
                


                
                
            })()
            
         



            let r = v3;
            let axis = v3;
            
            $( "body" ).keydown((e) => {

                // console.log(e.key)
                


                

                if (e.key === 'ArrowUp') cube.r.x += 1;
                if (e.key === 'ArrowDown') cube.r.x += -1;
                if (e.key === 'ArrowRight') cube.r.y += 1;
                if (e.key === 'ArrowLeft') cube.r.y += -1;
                // $(".control").css({
                //     transform: `rotateX(${cube.r.x}deg) rotateY(${cube.r.y}deg) rotateZ(${cube.r.z}deg) translate3d(0,0,0)`
                // })
                $(".control").css({
                    transform: `rotateX(${cube.r.x}deg) rotateY(${cube.r.y}deg) translate3d(0,0,0)`
                })
                
                
                

                // if (e.key === '6') matriceCube.cubi(18).transform().rotateZ(1);;
                // if (e.key === '4') matriceCube.cubi(18).transform().rotateZ(-1);;
                if (e.key === '4') axis.z--;
                if (e.key === '6') axis.z++;

                

                // $("#r-axis").css({
                //     transform: ` rotateZ(${axis.z}deg)`
                // })

                // let cubiWork = [];
                // $( ".cubi-front" ).each(function( index ) {
                //     let t = JSON.parse($(this).attr('data-transform-rotate'));

                //     cubiWork.push(this);

                //     if (e.key === '6') t.r.z++;
                //     if (e.key === '4') t.r.z--;

                //     console.log(this.id, t)
                //     $(this).attr('data-transform-rotate', JSON.stringify({r: {x:t.r.x, y:0, z:t.r.z}}))
                    
                // });
                

                // $( ".copy" ).each(function( index ) {
                    
                //     for (let i = 0; i < cubiWork.length; i++) {
                        
                //         if (this.id === cubiWork[i].id) continue;

                //         var cubiTest1 = $( this).position();
                //         var cubiTest2 = $( cubiWork[i] ).position();

                //         let cmpX = parseInt(cubiTest1.left)-parseInt(cubiTest2.left);
                //         let cmpY = parseInt(cubiTest1.top)- parseInt(cubiTest2.top);
                //         if(cmpX < 10 && cmpX > -10 &&  cmpY < 10 && cmpY > -10)
                //             console.log('correspondance ', this.id, cubiWork[i].id,  cmpX, cmpY);

                //     }
                    
                //     let t = JSON.parse($(this).attr('data-transform-rotate'));
                //     //$(this).css("transform", 'rotateX('+tr.x+'deg)'+' rotateY('+tr.y+'deg)'+' rotateZ('+tr.z+'deg)');
                //     //this.style.transform = 'rotateX('+t.r.x+'deg)  ';

                //     this.style.transform = 'translate3d(-100%, -100%, 50px) rotateZ('+t.r.z+'deg)';

                //     console.log(this.id, this.style.transform, t)
                // });


                // //console.log('transform axe cube', $('#cubeAxis').css('transform'))
                // //$( ".cubi-front" ).clone().appendTo( "#cubeAxis" );
                // $( ".cubi-front" ).each(function( index ) {
                //     let transform = $(this).css('transform').match(/-?[0-9]+,/g);
                //     let tx = transform[12];
                //     let ty = transform[13];
                //     let tz = transform[14];
                //     if ($(this).attr('id') == 'cube19') {


                //         if ($('#cube19-1').length === 0) {
                //             console.log('create cube19-1')
                //             let cubiClone = $( this ).clone();
                //             cubiClone.attr('id', this.id+'-1');
                //             cubiClone.addClass('copy');
                //             cubiClone.appendTo( "#cubeAxis" );
                //             cubiClone[0].cube = {r: {x:0, y:0, z:0}}
                //         } else {
                            
                //             $('#debug-c19-1').text(parseInt($("#"+this.id+'-1').position().left)+' ,'+parseInt($("#"+this.id+'-1').position().top))
                //         }

                //         //console.log($(this).attr('id'), tx, ty, tz)
                //     }
                // });

            });
          })