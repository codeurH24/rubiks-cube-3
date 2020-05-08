import CrownRotate from './CrownRotate.class.js';

export default class MatriceCube {
    constructor(matriceCube){

        this.matrice = matriceCube
        console.log('init Constructor MatriceCube')
        this.cubeMaster = "cubeAxis";
        this.cubiCurrent = null;
        this.elementToApply = []
        // axe demandé pour la rotation
        this.axis
    }

    log(test=0){
        for (let index = 0; index < this.matrice.length; index++) {

            // if (index < test) continue;

            const el = this.matrice[index];
            let separator = '  ';
            let padLength = 3;
            let id = el.i.toString().padStart(padLength, separator );
            let tx = el.t.x.toString().padStart(padLength, separator );
            let ty = el.t.y.toString().padStart(padLength, separator );
            let tz = el.t.z.toString().padStart(padLength, separator );
            let rx = el.r.x.toString().padStart(padLength, separator );
            let ry = el.r.y.toString().padStart(padLength, separator );
            let rz = el.r.z.toString().padStart(padLength, separator );
            let _id = el.id.toString().padStart(padLength, separator );
            console.log(id, tx, ty, tz, rx, ry, rz, _id);
        }
    }

    build(){
        this.remove();

        // contruction des faces du cube
        for (let index = 0; index < this.matrice.length; index++) {

            // if (index < 19) continue;
            this.matrice[index]['code'] = 'LU'

            const el = this.matrice[index];
            let separator = '  ';
            let padLength = 3;
            let id = el.i.toString().padStart(padLength, separator );
            let tx = el.t.x.toString().padStart(padLength, separator );
            let ty = el.t.y.toString().padStart(padLength, separator );
            let tz = el.t.z.toString().padStart(padLength, separator );
            let rx = el.r.x.toString().padStart(padLength, separator );
            let ry = el.r.y.toString().padStart(padLength, separator );
            let rz = el.r.z.toString().padStart(padLength, separator );

            this.addCube(el.i, tx,ty,tz);

            //console.log(id, tx, ty, tz, rx, ry, rz);
        }

        // ajout d'un axe de rotation
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
        
    }

    unselectAll(className='cubi-f') {
        this.elementToApply = [];
        $('#cubeAxis > div:not(#r-axis)').removeClass(className);
        return this;
    }

    select(direction='z', couronneIndex=-1, className='cubi-f' ) {
        
        let m = this.matrice;
        let n = m.length;
        let elm = [];
        
        for (let index = 0; index < n; index++) {
            
            const el = m[index];

            if (el.t[direction] != couronneIndex) continue

            $('#'+el.id).addClass(className);
            
            elm.push(el);
        }

        if(elm.length > 9)
        console.error('Error de selection:',elm.length, 'elements trouvés à la place de 9 attendus', elm)

        console.log('selection ', direction, elm)

        this.elementToApply = elm;
        return this 
    }

    color() {
        $('.cubi-f *').css({background: '#777'});
    }

    apply(cmd='', couronneIndex, nRotate){
        let crownRotate = new CrownRotate(this);
        crownRotate.apply(cmd, couronneIndex, nRotate)
    }

    async animate(deg, direction='z', couronneIndex){
        // ajoute la couronne a l'axe de rotation
        // c'est un axe temporaire
        $('#r-axis').append($('.cubi-f'));
        let that = this;
        var $elem = $('#r-axis');
        await $({deg: 0}).animate({deg: deg}, {
            duration: 2500,
            step: function(now) {
                if (direction == 'z') {
                    $elem.css({
                        transform: 'rotate(' + now + 'deg)'
                    });
                } else if (direction == 'x') {
                    $elem.css({
                        transform: 'rotateX(' + now + 'deg)'
                    });
                }else if (direction == 'y') {
                    $elem.css({
                        transform: 'rotateY(' + now + 'deg)'
                    });
                }

            },
            complete: function() {
                // remet l'axe de rotation en place
                let transform = $('#r-axis').css('transform');
                $('#r-axis').css('transform', 'rotate3d(0deg, 0deg, 0deg)');

                // remet les cubis en place
                $('#cubeAxis').append($('.cubi-f'));

                // change reellement la rotation des cubes sur une matrice 3x3
                
                if(direction != 'y') {

                    if (deg === 90) {

                        console.log('aply', direction, couronneIndex, 1)
                        that.apply(direction, couronneIndex, 1);

                    } else if (deg === 180 || deg === -180) {

                        console.log('aply', direction, couronneIndex, 2);
                        that.apply(direction, couronneIndex, 2);

                    } else if (deg === -90 || deg === 270) {

                        console.log('aply', direction, couronneIndex, 3);
                        that.apply(direction, couronneIndex, 3);
                    }

                } else {

                    if (deg === 90) {

                        console.log('aply', direction, couronneIndex, 3);
                        that.apply(direction, couronneIndex, 3); 

                    } else if (deg === 180 || deg === -180) {

                        console.log('aply', direction, couronneIndex, 2);
                        that.apply(direction, couronneIndex, 2);

                    } else if (deg === -90 || deg === 270) {

                        console.log('aply', direction, couronneIndex, 1);
                        that.apply(direction, couronneIndex, 1);

                    }

                }

             
                
                console.log('animation complete')
            }
        }).promise().then(() => {
            //return that;
        })

        return this
    }

    cubi(id) {
        
        for (let index = 0; index < this.matrice.length; index++) {

            if (this.matrice[index].i === id) {

                // console.log('cubi('+id+')', this.matrice[index]);
                this.cubiCurrent = this.matrice[index];
                return this;
            }
        }
        return false;
    }
    getCubi(id) {
        
        for (let index = 0; index < this.matrice.length; index++) {

            if (this.matrice[index].i === id) {

                console.log('cubi('+id+')', this.matrice[index]);
                return this.matrice[index];
            }
        }
        return false;
    }

    getCubiById(id) {
        
        for (let index = 0; index < this.matrice.length; index++) {

            if (this.matrice[index].id === id) {

                //console.log('cubi('+id+')', this.matrice[index]);
                return this.matrice[index];
            }
        }
        return false;
    }

    setCubi(id, data) {
        
        for (let index = 0; index < this.matrice.length; index++) {

            if (this.matrice[index].i === id) {

                this.matrice[index] = data;
                let r = data.r;

                let transform = $('#cube'+id).css('transform')
                $('#cube'+id).css('transform', transform+' rotateZ('+r.z+'deg)')

                console.log('cubi('+id+')', this.matrice[index], $('#cube'+id).css('transform'));
                return this.matrice[index];
            }
        }
        return false;
    }

    transform() {
        
        return {
            
            translateX: (px=0, ghost=false) => {
                let id = this.cubiCurrent.i;    
                
                if (!ghost) this.cubiCurrent.t.x += (px/50);
                
                let transform = $('#cube'+id).css('transform')
                // console.log('translateX', this.cubiCurrent, $('#cube'+id));
                $('#cube'+id).css('transform', transform+' translateX('+px+'px)')
                return this.transform();
            },
            translateY: (px=0) => {
                let id = this.cubiCurrent.i;
                this.cubiCurrent.t.y += (px/50);
                let transform = $('#cube'+id).css('transform')
                $('#cube'+id).css('transform', transform+' translateY('+px+'px)')
                return this.transform();
            },
            translateZ: (px=0) => {
                let id = this.cubiCurrent.i;
                this.cubiCurrent.t.z += (px/50);
                let transform = $('#cube'+id).css('transform')
                $('#cube'+id).css('transform', transform+' translateZ('+px+'px)')
                return this.transform();
            },
            rotateX: (deg=0, mirror=true) => {
                let id = this.cubiCurrent.i;
                this.cubiCurrent.r.x = deg;

                let transform = $('#cube'+id).css('transform')
                $('#cube'+id).css('transform', transform+' rotateX('+deg+'deg)')
                return this.transform();
            },
            rotateY: (deg=0, mirror=true) => {
                let id = this.cubiCurrent.i;
                this.cubiCurrent.r.y = deg;

                let transform = $('#cube'+id).css('transform')
                $('#cube'+id).css('transform', transform+' rotateY('+deg+'deg)')
                return this.transform();
            },
            rotateZ: (deg=0, mirror=true) => {
                let id = this.cubiCurrent.i;
                this.cubiCurrent.r.z = deg;

                let transform = $('#cube'+id).css('transform')
                $('#cube'+id).css('transform', transform+' rotateZ('+deg+'deg)')
                return this.transform();
            },
            getParent: () => {
                return this;
            }
        }
    }

    remove(){
        $('#'+this.cubeMaster+' *' ).remove();
    }

    addCube(id, x, y, z) {
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

    getCode(code, axy, direction) {

        if (code == 'FU') {

            if (axy == 'x')
                return (direction < 0) ? 'FR' : 'FL';

            if (axy == 'y')
                return (direction < 0) ? 'LU' : 'RU';

            if (axy == 'z')
                return (direction < 0) ? 'UB' : 'DF';

        } else if (code == 'RU') {

            if (axy == 'x')
                return (direction < 0) ? 'RB' : 'RF';

            if (axy == 'y')
                return (direction < 0) ? 'FU' : 'BU';

            if (axy == 'z')
                return (direction < 0) ? 'UL' : 'DR';

        } else if (code == 'BU') {

            if (axy == 'x')
                return (direction < 0) ? 'BL' : 'BR';

            if (axy == 'y')
                return (direction < 0) ? 'RU' : 'LU';

            if (axy == 'z')
                return (direction < 0) ? 'UF' : 'DB';

        } else if (code == 'LU') {

            if (axy == 'x')
                return (direction < 0) ? 'LF' : 'LB';

            if (axy == 'y')
                return (direction < 0) ? 'BU' : 'FU';

            if (axy == 'z')
                return (direction < 0) ? 'UR' : 'DL';

        } else if (code == 'UR') {

            if (axy == 'x')
                return (direction < 0) ? 'UF' : 'UB';

            if (axy == 'y')
                return (direction < 0) ? 'BR' : 'FR';

            if (axy == 'z')
                return (direction < 0) ? 'RD' : 'LU';

        } else if (code == 'UF') {

            if (axy == 'x')
                return (direction < 0) ? 'UL' : 'UR';

            if (axy == 'y')
                return (direction < 0) ? 'RF' : 'LF';

            if (axy == 'z')
                return (direction < 0) ? 'BU' : 'FD';

        } else if (code == 'UL') {

            if (axy == 'x')
                return (direction < 0) ? 'UB' : 'UF';

            if (axy == 'y')
                return (direction < 0) ? 'FL' : 'BL';

            if (axy == 'z')
                return (direction < 0) ? 'LD' : 'RD';

        } else if (code == 'UB') {

            if (axy == 'x')
                return (direction < 0) ? 'UR' : 'UL';

            if (axy == 'y')
                return (direction < 0) ? 'LB' : 'RB';

            if (axy == 'z')
                return (direction < 0) ? 'BD' : 'FU';
                
        } else if (code == 'DR') {

            if (axy == 'x')
                return (direction < 0) ? 'DB' : 'DF';

            if (axy == 'y')
                return (direction < 0) ? 'FR' : 'BR';

            if (axy == 'z')
                return (direction < 0) ? 'RU' : 'LD';
                
        } else if (code == 'DB') {

            if (axy == 'x')
                return (direction < 0) ? 'DL' : 'DR';

            if (axy == 'y')
                return (direction < 0) ? 'RB' : 'LB';

            if (axy == 'z')
                return (direction < 0) ? 'BU' : 'FD';
                
        } else if (code == 'DL') {

            if (axy == 'x')
                return (direction < 0) ? 'DF' : 'DB';

            if (axy == 'y')
                return (direction < 0) ? 'BL' : 'FL';

            if (axy == 'z')
                return (direction < 0) ? 'LU' : 'RD';
                
        } else if (code == 'DF') {

            if (axy == 'x')
                return (direction < 0) ? 'DR' : 'DL';

            if (axy == 'y')
                return (direction < 0) ? 'LF' : 'RF';

            if (axy == 'z')
                return (direction < 0) ? 'FU' : 'BD';
                
        } else if (code == 'RB') {

            if (axy == 'x')
                return (direction < 0) ? 'RD' : 'RU';

            if (axy == 'y')
                return (direction < 0) ? 'UB' : 'DB';

            if (axy == 'z')
                return (direction < 0) ? 'BL' : 'FR';
                
        } else if (code == 'RD') {

            if (axy == 'x')
                return (direction < 0) ? 'RF' : 'RB';

            if (axy == 'y')
                return (direction < 0) ? 'BD' : 'FD';

            if (axy == 'z')
                return (direction < 0) ? 'DL' : 'UR';
                
        } else if (code == 'RF') {

            if (axy == 'x')
                return (direction < 0) ? 'RU' : 'RD';

            if (axy == 'y')
                return (direction < 0) ? 'DF' : 'UF';

            if (axy == 'z')
                return (direction < 0) ? 'FL' : 'BR';
                
        } else if (code == 'BL') {

            if (axy == 'x')
                return (direction < 0) ? 'BD' : 'BU';

            if (axy == 'y')
                return (direction < 0) ? 'UL' : 'DL';

            if (axy == 'z')
                return (direction < 0) ? 'LF' : 'RB';
                
        } else if (code == 'BD') {

            if (axy == 'x')
                return (direction < 0) ? 'BR' : 'RL';

            if (axy == 'y')
                return (direction < 0) ? 'RL' : 'RD';

            if (axy == 'z')
                return (direction < 0) ? 'DF' : 'UB';
                
        } else if (code == 'BR') {

            if (axy == 'x')
                return (direction < 0) ? 'BU' : 'BD';

            if (axy == 'y')
                return (direction < 0) ? 'DR' : 'UD';

            if (axy == 'z')
                return (direction < 0) ? 'LB' : 'RF';
                
        } else if (code == 'LF') {

            if (axy == 'x')
                return (direction < 0) ? 'LD' : 'LU';

            if (axy == 'y')
                return (direction < 0) ? 'UF' : 'DF';

            if (axy == 'z')
                return (direction < 0) ? 'FR' : 'BL';
                
        } else if (code == 'LD') {

            if (axy == 'x')
                return (direction < 0) ? 'LB' : 'LF';

            if (axy == 'y')
                return (direction < 0) ? 'FD' : 'BD';

            if (axy == 'z')
                return (direction < 0) ? 'DR' : 'UL';
                
        } else if (code == 'LB') {

            if (axy == 'x')
                return (direction < 0) ? 'LU' : 'LD';

            if (axy == 'y')
                return (direction < 0) ? 'DB' : 'UB';

            if (axy == 'z')
                return (direction < 0) ? 'BR' : 'FL';
                
        } else if (code == 'FR') {

            if (axy == 'x')
                return (direction < 0) ? 'FD' : 'FU';

            if (axy == 'y')
                return (direction < 0) ? 'UR' : 'DR';

            if (axy == 'z')
                return (direction < 0) ? 'RB' : 'LF';
                
        } else if (code == 'FD') {

            if (axy == 'x')
                return (direction < 0) ? 'FL' : 'FR';

            if (axy == 'y')
                return (direction < 0) ? 'RD' : 'LD';

            if (axy == 'z')
                return (direction < 0) ? 'DB' : 'UF';
                
        } else if (code == 'FL') {

            if (axy == 'x')
                return (direction < 0) ? 'FU' : 'FD';

            if (axy == 'y')
                return (direction < 0) ? 'DL' : 'UL';

            if (axy == 'z')
                return (direction < 0) ? 'LB' : 'RF';
                
        }
    }

    pos(code, x,y,z) {

        if (x == -1) x = -50
        if (x ==  0) x = 0
        if (x ==  1) x = 50

        if (y == -1) y = -50
        if (y ==  0) y = 0
        if (y ==  1) y = 50

        if (z == -1) z = -50
        if (z ==  0) z = 0
        if (z ==  1) z = 50


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

        if (transform == '') console.error('ERROR CODE INCONNU')

        return transform;
    }

}