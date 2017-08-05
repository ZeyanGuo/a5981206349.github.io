function initSectionAndNav(){
				var nav = document.getElementById('content-nav'),
					clientWidth = window.innerWidth,
					clientHeight = window.innerHeight,
					sectionPages = document.querySelectorAll('.s');
				nav.style.width = clientWidth + 'px';
				sectionPages.forEach(function(value){
					value.style.height = clientHeight + 'px';
				});
			}
			initSectionAndNav();
			function initslideTransition(){
				var sectionPositions = {
					intro:{
						x:0,
						y:0
					},
					profession:{
						x:0,
						y:window.innerHeight
					},
					project:{
						x:0,
						y:2*window.innerHeight
					},
					link:{
						x:0,
						y:3*window.innerHeight
					},
					more:{
						x:0,
						y:4*window.innerHeight
					}
				}
				document.body.addEventListener('click',function(e){
					var e = e || window.event,
						target = e.target || e.srcElement,
						flag = target.getAttribute('data-flag') || null,
						moveTarget = target.getAttribute('data-target');
					if(flag && flag === 'move'){
						e.preventDefault();
						scrollToAnimation(sectionPositions[moveTarget].x,sectionPositions[moveTarget].y,400);
					}
				});
			}
			
			function scrollToAnimation(x,y,d){//x表示滑动到的x坐标，y为滑动到的y坐标，d为持续时间
				var position = getNowPosition(),
					currentX = position.x,
					currentY = position.y,
					xPreMsec = (x-currentX)/d,
					yPreMsec = (y-currentY)/d,
					beginTime = new Date();
				function moveTo(){
					var now = new Date(),
						duration = now - beginTime;
					if(duration < d){
						window.scrollTo(currentX+xPreMsec*duration,currentY+yPreMsec*duration);
						requestAnimationFrame(moveTo);
					}
					else{//由于时间控制无法达到精确位置，最后定位以达到精准位置
						window.scrollTo(x,y);
					}
				}
				requestAnimationFrame(moveTo);
			}
			function getNowPosition(){
				var x,y;
				if(window.pageXOffset !== undefined){
					x = window.pageXOffset;
					y = window.pageYOffset;
				}
				else if(window.document.scrollTop !== undefined){
					x = window.document.scrollLeft;
					y = window.document.scrollTop;
				}
				else{
					x = window.body.scrollLeft;
					y = window.body.scrollTop
				}
				return {
					x:x,
					y:y
				}
			}
			window.onload = function(){
				initslideTransition();
			}