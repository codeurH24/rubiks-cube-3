
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
                        
                        $(cubi).attr('data-transform-rotate', JSON.stringify({r: {x:0, y:0, z:0}}))
                        $(cubi).attr('data-transform-translate', JSON.stringify({t:{x:x*50, y:y*50, z:z*50}}))
                    }
                }
            }
            
            matriceCube = new MatriceCube(matriceCube);
            
            matriceCube.build();
            

            (async () => {
                // matriceCube.select('z', 1);
                // // await matriceCube.animate(90, 'z', 1); 
                // matriceCube.apply('z',1,1);

                // matriceCube.unselectAll().select('z', 0);
                // // await matriceCube.animate(180, 'z', 0); 
                // matriceCube.apply('z',0,2);

                // matriceCube.unselectAll().select('y', 0);
                // // await matriceCube.animate(90, 'y', 0); 
                // matriceCube.apply('y',0,3);


                // matriceCube.unselectAll().select('x', -1);
                // // await matriceCube.animate(90, 'x', -1); 
                // matriceCube.apply('x',-1,1);

                // matriceCube.unselectAll().select('x', 0);
                // // await matriceCube.animate(-90, 'x', 0); 
                // matriceCube.apply('x',0,3);

                // matriceCube.unselectAll().select('x', 1);
                // // await matriceCube.animate(90, 'x', 1); 
                // matriceCube.apply('x',1,1);

                // matriceCube.unselectAll().select('y', -1);
                // await matriceCube.animate(90, 'y', -1); 
                // matriceCube.apply('y',-1,1);

                // matriceCube.unselectAll().select('y', 0);
                // await matriceCube.animate(-90, 'y', 0); 

                // matriceCube.unselectAll().select('y', 1);
                // await matriceCube.animate(90, 'y', 1); 
            })()











            let execute = () => {
                return {
                    U: async () => {
                        matriceCube.unselectAll().select('y', -1);
                        return await matriceCube.animate(-90, 'y', -1); 
                    },
                    Uprime: async () => {
                        matriceCube.unselectAll().select('y', -1);
                        return await matriceCube.animate(90, 'y', -1); 
                    },
                    D: async () => {
                        matriceCube.unselectAll().select('y', 1);
                        return await matriceCube.animate(90, 'y', 1); 
                    },
                    Dprime: async () => {
                        matriceCube.unselectAll().select('y', 1);
                        return await matriceCube.animate(-90, 'y', 1); 
                    },
                    R: async () => {
                        matriceCube.unselectAll().select('x', 1);
                        return await matriceCube.animate(90, 'x', 1); 
                    },
                    Rprime: async () => {
                        matriceCube.unselectAll().select('x', 1);
                        return await matriceCube.animate(-90, 'x', 1); 
                    },
                    L: async () => {
                        matriceCube.unselectAll().select('x', -1);
                        return await matriceCube.animate(-90, 'x', -1); 
                    },
                    Lprime: async () => {
                        matriceCube.unselectAll().select('x', -1);
                        return await matriceCube.animate(90, 'x', -1); 
                    },
                    F: async () => {
                        matriceCube.unselectAll().select('z', 1);
                        return await matriceCube.animate(90, 'z', 1); 
                    },
                    Fprime: async () => {
                        matriceCube.unselectAll().select('z', 1);
                        return await matriceCube.animate(-90, 'z', 1); 
                    },
                    B: async () => {
                        matriceCube.unselectAll().select('z', -1);
                        return await matriceCube.animate(-90, 'z', -1); 
                    },
                    Bprime: async () => {
                        matriceCube.unselectAll().select('z', -1);
                        return await matriceCube.animate(90, 'z', -1); 
                    }
                }
            }
            
            $( "button#execute" ).click(async (e) =>{
                const input = $(e.target).parent().find('.instructions')[0];
                

                const caracts = input.value.split('');
                console.log('caracts',caracts);
                

                for (let i = 0; i < caracts.length; i++) {
                    const char = caracts[i];
                    console.log('char', char, 'caracts[key+1]', caracts[i+1]);
                    if (char === 'U' && caracts[i+1] === "'") {
                        await execute().Uprime();
                        i++
                    } else if (char === 'U') {
                        await execute().U();
                    } else if (char === 'D' && caracts[i+1] === "'") {
                        await execute().Dprime();
                        i++
                    } else if (char === 'D') {
                        await execute().D();
                    } else if (char === 'R' && caracts[i+1] === "'") {
                        await execute().Rprime();
                        i++
                    } else if (char === 'R') {
                        await execute().R();
                    } else if (char === 'L' && caracts[i+1] === "'") {
                        await execute().Lprime();
                        i++
                    } else if (char === 'L') {
                        await execute().L();
                    } else if (char === 'F' && caracts[i+1] === "'") {
                        await execute().Fprime();
                        i++
                    } else if (char === 'F') {
                        await execute().F();
                    } else if (char === 'B' && caracts[i+1] === "'") {
                        await execute().Bprime();
                        i++
                    } else if (char === 'B') {
                        await execute().B();
                    }
                }

            })













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