chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    'bounds': {
      'width': 1600,
      'height': 800
    }
  });
});

// standard global variables
                var container, scene, camera, renderer, controls, stats;
                var keyboard = new THREEx.KeyboardState();
                var clock = new THREE.Clock();
                var cuttentIdx = 0;  //  현재 화면 상에 보이는 object
                var Objects = [];
                var materials =[];
                var meshXZ, meshYZ, meshXY;

                init();
                animate();
                //preview();
                // FUNCTIONS     
                function init() {
                    // SCENE
                    scene = new THREE.Scene();

                    var geometry = new THREE.Geometry(); //add

                    // CAMERA
                    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
                    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
                    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);

                    scene.add(camera);

                    camera.position.set(0,300,500);
                    camera.lookAt(scene.position);  

                    // RENDERER
                    if ( Detector.webgl )
                        renderer = new THREE.WebGLRenderer( {antialias:true} );
                    else
                        renderer = new THREE.CanvasRenderer(); 
                        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
                        container = document.getElementById('room');
                        container.appendChild( renderer.domElement );

                    // EVENTS
                    THREEx.WindowResize(renderer, camera);
                    THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });

                    // CONTROLS
                    controls = new THREE.OrbitControls( camera, renderer.domElement );

                    // LIGHT
                    var light = new THREE.PointLight(0xffffff);
                    light.position.set(100,250,100);

                    scene.add(light);
                    
                    //방 모양 틀 만들기
                    var gridXZ = new THREE.GridHelper(200, 10); //cm로 가정
                    gridXZ.setColors( new THREE.Color(0x006600), new THREE.Color(0x006600) );
                    gridXZ.position.set( 200,0,200 );

                    scene.add(gridXZ);

                    var gridXY = new THREE.GridHelper(200, 10); //cm로 가정
                    gridXY.position.set( 200,200,0 );
                    gridXY.rotation.x = Math.PI/2;
                    gridXY.setColors( new THREE.Color(0x000066), new THREE.Color(0x000066) );

                    scene.add(gridXY);

                    var gridYZ = new THREE.GridHelper(200, 10); //cm로 가정
                    gridYZ.position.set( 0,200,200 );
                    gridYZ.rotation.z = Math.PI/2;
                    gridYZ.setColors( new THREE.Color(0x660000), new THREE.Color(0x660000) );

                    scene.add(gridYZ);

                    $("img").click(function(event) {
                        var target = event.target;
                        if (target.id == 'wallpaper') {
                            textures();
                        } else if (target.id == 'floor') {
                            floors();
                        } else if(target.id == 'chair') {
                            chair();
                        } else if(target.id == 'desk') {
                            desk();
                        }
                    });

                    // $("#previewId").click(function(event) {
                    //     var target = event.target;
                    //     if(target.id=='floor') {
                    //         floors();
                    //     } else if(target.id=='wallpaper') {
                    //         textures();
                    //     }
                    // });
                  }

                function furniture () {
                    // 상자 생성 ==================================
                    var geometry = new THREE.CubeGeometry( 400, 400, 400 );
                    var texture = THREE.ImageUtils.loadTexture( '/static/textures/wood.jpg' );

                    texture.anisotropy = renderer.getMaxAnisotropy();

                    var material = new THREE.MeshBasicMaterial( { map: texture } );
                    mesh = new THREE.Mesh( geometry, material );

                    scene.add( mesh );

                    mesh.position.set (200, 200, 200);
                    mesh.visible = false;
                }

                //벽지 입히기 
                function textures() {
                    var target = event.target;
                    var src = event.target.src;

                    var geometryXZ = new THREE.CubeGeometry( 0, 400, 400 ); //CubeGeometry(width, height, depth) = (z, y, x)
                    var textureXZ = THREE.ImageUtils.loadTexture( src );

					mesh.position.set(50, 50, 50);
					mesh.visible = false;
				}

				function textures() {
                    var target = event.target;
                    var src = event.target.src;

                    var geometryXZ = new THREE.CubeGeometry( 0, 400, 400 ); //CubeGeometry(width, height, depth) = (z, y, x)
                    var textureXZ = THREE.ImageUtils.loadTexture( src );

                    textureXZ.anisotropy = renderer.getMaxAnisotropy();

                    if( meshXZ != null ) scene.remove( meshXZ );

                    var materialXZ = new THREE.MeshBasicMaterial( { map: textureXZ } );
                    meshXZ = new THREE.Mesh( geometryXZ, materialXZ );

                    scene.add( meshXZ );

                    meshXZ.position.set (0, 200, 200);
                    if(!meshXZ.visible) meshXZ.visible = true;

                    var geometryYZ = new THREE.CubeGeometry( 400, 400, 0 ); //CubeGeometry(width, height, depth) = (z, y, x)
                    var textureYZ = THREE.ImageUtils.loadTexture( src );

                    textureYZ.anisotropy = renderer.getMaxAnisotropy();

                    if( meshYZ != null ) scene.remove( meshYZ );

                    var materialYZ = new THREE.MeshBasicMaterial( { map: textureYZ } );
                    meshYZ = new THREE.Mesh( geometryYZ, materialYZ );

                    scene.add( meshYZ );

                    meshYZ.position.set (200, 200, 0);
                    if(!meshYZ.visible) meshYZ.visible = true;
                }

                function floors() {
                    var target = event.target;
                    var src = event.target.src;

                    var geometryXY = new THREE.CubeGeometry( 400, 0, 400 ); //CubeGeometry(width, height, depth) = (z, y, x)
                    var textureXY = THREE.ImageUtils.loadTexture( src );

                    textureXY.anisotropy = renderer.getMaxAnisotropy();

                    if( meshXY != null ) scene.remove( meshXY );

                    var materialXY = new THREE.MeshBasicMaterial( { map: textureXY } );
                    meshXY = new THREE.Mesh( geometryXY, materialXY );

                    //if(!meshXY.visible) meshXY.visible = true;

                    scene.add( meshXY );

                    meshXY.position.set (200, 0, 200);
                    if(!meshXY.visible) meshXY.visible = true;
                }

                function chair() {
                    var target = event.target;
                    var src = event.target.src;
                    var obj, mtl;

                    var loader = new THREE.OBJMTLLoader();
                    switch (src) {
                        case 'chrome-extension://fkpanmechngakainjnoclnjfkfnnjmfd/static/textures/chair1.png' :
                            obj = '/static/obj/chair/Vitra Chairs-3.obj';
                            mtl = '/static/obj/chair/Vitra Chairs-3.mtl';

                            break;
                        case 'chrome-extension://fkpanmechngakainjnoclnjfkfnnjmfd/static/textures/014.jpg' :
                            obj = '/static/obj/chair/014.obj';
                            mtl = '/static/obj/chair/014.mtl';

                            break;
                    }

                    loader.load(obj, mtl, function(object) {
                        
                        //if(object.visible){
                            scene.add(object);
                            object.position.set(100, 0, 100);
                        //}
                        //else{
                        //  scene.remove(object);
                        //}
                    });
                }

                function desk() {
                    var target = event.target;
                    var src = target.src;
                    var obj, mtl;

                    var loader = new THREE.OBJMTLLoader();
                    switch (src) {
                        case 'chrome-extension://fkpanmechngakainjnoclnjfkfnnjmfd/static/textures/Desk1.jpg':
                            obj = '/static/obj/desk/Desk1.obj';
                            mtl = '/static/obj/desk/Desk1.mtl';

                            break;
                        case 'chrome-extension://fkpanmechngakainjnoclnjfkfnnjmfd/static/textures/desk2.jpg' :
                            obj = '/static/obj/desk/desk2.obj';
                            mtl = '/static/obj/desk/desk2.mtl';

                            break;
                    }

                    loader.load(obj, mtl, function(object) {
                        scene.add(object);
                        object2.position.set(0, 0, 0);
                    });

                }

                function animate() {
                    requestAnimationFrame( animate );
                    render();    
                    update();
                }

                function update() {
                // if ( keyboard.pressed("z") ) 
                // {  // do something   
                // }
                    controls.update();
                    //stats.update();
                }

                function render() {
                    renderer.render( scene, camera );
                }

                function obj_btn(id){
                    return document.getElementById(id);
                }

                // function setRoomSize() {
                //     var tmpX = document.getElementById("width");
                //     var tmpY = document.getElementById("leng");
                //     var tmpZ = document.getElementById("height");

                //     roomX = tmpX.value;
                //     roomY = tmpY.value;
                //     roomZ = tmpZ.value;
                    
                //     document.write(roomX);

                //     halfX = roomX / 2;
                //     halfY = roomY / 2;
                //     halfZ = roomZ / 2;
                // }

                //썸네일
                function previewImage(targetObj, previewId) {
                    var preview = document.getElementById(previewId); //div id   
                    var ua = window.navigator.userAgent;
                    var files = targetObj.files;

                    for ( var i = 0; i < files.length; i++) {
                        var file = files[i];
                        var imageType = /image.*/; //이미지 파일일경우만.. 뿌려준다.
                    
                        if (!file.type.match(imageType))
                            continue;

                        var prevImg = document.getElementById("prev_" + previewId); //이전에 미리보기가 있다면 삭제
                        
                        if (prevImg) {
                            preview.removeChild(prevImg);
                        }

                        var img = document.createElement("img"); //크롬은 div에 이미지가 뿌려지지 않는다. 그래서 자식Element를 만든다.
                        img.id = "floor";
                        img.classList.add("obj");
                        img.file = file;
                        img.style.width = '100px'; //기본설정된 div의 안에 뿌려지는 효과를 주기 위해서 div크기와 같은 크기를 지정해준다.
                        img.style.height = '100px';

                        preview.appendChild(img);

                        if (window.FileReader) { // FireFox, Chrome, Opera 확인.
                            var reader = new FileReader();
                            reader.onloadend = (function(aImg) {
                                return function(e) {
                                    aImg.src = e.target.result;
                                };
                            })(img);
                            reader.readAsDataURL(file);
                            } else { // safari is not supported FileReader
                            //alert('not supported FileReader');
                            if (!document.getElementById("sfr_preview_error_" + previewId)) {
                                var info = document.createElement("p");
                                info.id = "sfr_preview_error_" + previewId;
                                info.innerHTML = "not supported FileReader";
                                preview.insertBefore(info, null);
                            }
                            }
                    }
                }

                //controller
                $(document).ready(function() {
                    $('.wallpaper button').click(function() {
                        $('.wallpaper-box').css('display', 'block');
                        $('.flooring-box').css('display', 'none');
                        $('.chair-box').css('display', 'none');
                        $('.desk-box').css('display', 'none');
                    });
                    $('.flooring button').click(function() {
                        $('.wallpaper-box').css('display', 'none');
                        $('.flooring-box').css('display', 'block');
                        $('.chair-box').css('display', 'none');
                        $('.desk-box').css('display', 'none'); 
                    });
                    $('.chair button').click(function() {
                        $('.wallpaper-box').css('display', 'none');
                        $('.flooring-box').css('display', 'none');
                        $('.chair-box').css('display', 'block');
                        $('.desk-box').css('display', 'none');
                    });
                    $('.desk button').click(function() {
                        $('.wallpaper-box').css('display', 'none');
                        $('.flooring-box').css('display', 'none');
                        $('.chair-box').css('display', 'none');
                        $('.desk-box').css('display', 'block');
                    });
                });