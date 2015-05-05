/*! Curriculum Vitae - v1.0.0 - 2015-05-05
* Copyright (c) 2015 Jose Luis Morales; */

$(window).resize(function() { 
  
  if ($(window).width() > 928) {
    $('aside').height($('section').height());
  } else {
    $('aside').height('auto');
  }
   
});