////////////////////////////////////////////
//                                        //
//             Validate v1.1              //
//            by Albert Kiteck            //
//           www.paxagency.com            //
//          Copyright PAXagency           //
//                                        //
////////////////////////////////////////////

var $valid = {
	el:$('body'),
    reg: {
        rule:/^(.+?)\[(.+)\]$/,
		number:/^[0-9]+$/,
		integer:/^\d+(\.\d{1,2})?$/,
		decimal:/^\-?[0-9]*\.?[0-9]+$/,
		email:/\S+@\S+\.\S+/,
		alpha:/^[a-z]+$/i,
		alphaNumeric:/^[a-z0-9]+$/i,
		dash:/^[a-z0-9_\-]+$/i,
		natural:/^[0-9]+$/i,
		naturalzero:/^[1-9][0-9]*$/i,
		ip:/^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
		bas64:/[^a-zA-Z0-9\/\+=]/i,
		numericdash:/^[\d\-\s]+$/,
		url:/^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/,
		credit:/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6011[0-9]{12}|622((12[6-9]|1[3-9][0-9])|([2-8][0-9][0-9])|(9(([0-1][0-9])|(2[0-5]))))[0-9]{10}|64[4-9][0-9]{13}|65[0-9]{14}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47][0-9]{13})*$/,
		required:/(^$)|(\s+$)/
	},
	cha: {
		number:[8,9,13,17,18,37,38,39,40,48,49,50,51,52,53,54,55,56,57,91,224],
		numberslash:[8,9,13,17,18,37,38,39,40,48,49,50,51,52,53,54,55,56,57,191,91,224],
		numberdash:[8,9,13,17,18,37,38,39,40,48,49,50,51,52,53,54,55,56,57,189,91,224],
		integer:[8,9,13,17,18,37,38,39,40,49,50,51,52,53,54,55,56,57,91,224],
		decimal:[8,9,13,17,18,37,38,39,40,48,49,50,51,52,53,54,55,56,57,188,190,91,224],
		characters:[8,9,13,16,17,18,37,38,39,40,48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,189,224],
		file:[8,9,13,17,18,37,38,39,40,48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,189,190,224],
		numbers:[48,49,50,51,52,53,54,55,56,57],
		onlycharacters:[81,87,69,82,84,89,85,73,79,80,65,83,68,70,71,72,74,75,76,90,88,67,86,66,78,77],
	    alphaNumeric:[49,50,51,52,53,54,55,56,57,48,81,87,69,82,84,89,85,73,79,80,65,83,68,70,71,72,74,75,76,90,88,67,86,66,78,77]
	},
    init: function() {
		$valid.el = $('body');
		$valid.set();	
    },
    set: function () {
	  	$($valid.el).find('input[type="text"]').each(function() {
				if($(this).attr('vkey')) $valid.addKey($(this));
				if($(this).attr('vsuf')) $valid.addSuffix($(this));
				if($(this).attr('vpre')) $valid.addPrefix($(this));
				if($(this).attr('vfoc')) $valid.addFocus($(this));
		});
	},
	update: function (el) {
	  	$($valid.el).find('input[type="text"]').each(function() {
				if($(this).attr('vkey')) $valid.addKey($(this));
				if($(this).attr('vsuf')) $valid.addSuffix($(this));
				if($(this).attr('vpre')) $valid.addPrefix($(this));
				if($(this).attr('vfoc')) $valid.addFocus($(this));
		});
	},
    addSuffix: function(el) {
  		$(el).parent().append("<span class='span-valid-fix' style='display:none; max-width:200px; max-height:25px; position:absolute;top:30px; z-index:0; left:0; color:#91a4b2;  padding:0;text-indent:4px;' onclick='$(this).parent().find(\"input\").focus()'>"+$(el).attr('vsuf')+"</span>");
		$(el).on("input focus blur",function(e) {
			var width = $valid.textWidth($(el).val());
			$(el).parent().find('span.span-valid-fix').css('margin-left',width+'px');
			(width) ? $(el).parent().find('span.span-valid-fix').show() : $(el).parent().find('span.span-valid-fix').hide();
		})
		$(el).trigger("input");
    },
    addPrefix: function(el) {
		$(el).parent().append("<span style='position:absolute;top:30px; left:7px;color:#91a4b2;' class='span-valid-fix'>"+$(el).attr('vpre')+"</span>");
		var width = $(el).parent().find('span.span-valid-fix').width()+12;
		$(el).css('padding-left',width+'px');
    },
    addFocus: function(el) {
        $(el).on('focusout',function(e){
            var vl = $(this).val();
            var error = false;
            if($(this).attr('vfoc')=='required' && vl!='') return  $(this).removeClass('error');
            if(vl=='') return $(this).removeClass('error');
            if(!$valid.reg[$(this).attr('vfoc')].test(vl)) error = true;
            (error) ? $(this).addClass('error') : $(this).removeClass('error');
        });
    },
    addKey: function(el) {
  		$(el).on("keydown",function(e) {
		    if(!$(this).attr("vkey")) return;
		    var vkey = $(this).attr("vkey");
			var key = e.keyCode ? e.keyCode : e.which;
			if(key==8) return true;
			if(vkey=='decimal') {
				if($(el).val().indexOf('.')>-1 && key==190) return false;
			}
			if((e.ctrlKey==false) && (e.altKey==false)) {
				if($(el).attr('vdmax')) {
					if($(el).val().indexOf('.')>-1) {
						if(key==190) return false;
						var dec = $(el).val().toString().split(".")[1].length || 0;
						if(dec>1 && $valid.cha['numbers'].indexOf(key)!=-1) return false;
					}
				}
				if(vkey=='alphaNumeric' && e.shiftKey) return false; 
				return ($valid.cha[vkey].indexOf(key)!=-1) ? true : false;
			} else {
				if(e.shiftKey || e.altKey) return false;
				return true;
			}
		});
    },
    submit: function(form) {
  		var success = true;
  		$(form).find('input').each(function() {
  		  if(!$(this).attr('vfoc')) $(this).removeClass('error');
  		  if($(this).attr('vfoc') && $(this).hasClass('error')) success = false;
			  if($(this).attr('vreq')=='true' && $(this).val()=='') {
					success = false;
					$(this).addClass('error');
			 	}
		});
		return (success) ? $(form).submit() : alert('Please fill-in all required fields correctly.');
    },
    textWidth: function(text){
		if(text.length != 0) {
		    var html = $('<span class="span-valid-fix"  style="font-size:21px; font-family:arial; postion:absolute;width:auto;left:-9999px">' + text+ '</span>');
		    $('body').append(html);
		    var width = html.width();
		    html.remove();
		    return width+10;
	    } else {
	  	    return false;
	    }
	}
}
$($valid.init);
