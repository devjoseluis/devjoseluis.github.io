/*! Curriculum Vitae - v1.0.0 - 2015-09-03
* Copyright (c) 2015 Jose Luis Morales; */
function background(){var a=document.getElementById("left-side"),b=new Trianglify({height:a.clientHeight,width:a.clientWidth,cell_size:250,x_colors:["#3B5168","#364b60","#3F5870","#445E79","#496481","#4D6B89","#527191"]});a.setAttribute("style","background-image: url("+b.png()+")")}$(document).foundation(),background(),$(".do-toggle").click(function(){$(this).closest(".toggle-title").next().slideToggle(),$(this).find("i").hasClass("fa-chevron-up")?$(this).find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down"):($(this).find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up"),$(this).closest("#left-side").length>0&&setTimeout(background,500))});var resizeTimer;$(window).on("resize",function(a){clearTimeout(resizeTimer),resizeTimer=setTimeout(background,250)});