(function($) {
	"use strict"

	// Mobile Nav toggle
	$('.menu-toggle > a').on('click', function (e) {
		e.preventDefault();
		$('#responsive-nav').toggleClass('active');
	})

	// Fix cart dropdown from closing
	$('.cart-dropdown').on('click', function (e) {
		e.stopPropagation();
	});

	/////////////////////////////////////////
	
	// Products Slick
	$('.products-slick').each(function() {
		var $this = $(this),
				$nav = $this.attr('data-nav');

		$this.slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: true,
			infinite: true,
			speed: 300,
			dots: false,
			arrows: true,
			appendArrows: $nav ? $nav : false,
			responsive: [{
	        breakpoint: 991,
	        settings: {
	          slidesToShow: 2,
	          slidesToScroll: 1,
	        }
	      },
	      {
	        breakpoint: 480,
	        settings: {
	          slidesToShow: 1,
	          slidesToScroll: 1,
	        }
	      },
	    ]
		});
	});


	
	$('.products-widget-slick').each(function() {
		var $this = $(this),
				$nav = $this.attr('data-nav');

		$this.slick({
			infinite: true,
			autoplay: true,
			speed: 300,
			dots: false,
			arrows: true,
			appendArrows: $nav ? $nav : false,
		});
	});
	////////////////////////////////////////
	//Delete cmt
	$(document).ready(function () {
        $(".delete").click(function () {
            let name =  $(this).data('name');
            console.log(name);
            let id =  $(this).data('id');
            $("#mdheader").html(name);
            $("#delete-id").val(id);
            $('#myModal').modal({
                backdrop: 'static',
                keyboard: false
            });

        });
    });
	//Delete post
	$(document).ready(function () {
        $(".deletepost").click(function () {
            let name =  $(this).data('name');
            let id =  $(this).data('idpost');
            $("#mdheader").html(name);
            $("#deletepost-id").val(id);
            $('#myModal1').modal({
                backdrop: 'static',
                keyboard: false
            });

        });
    });
	//edit post
	$(document).ready(function () {
        $(".editpost").click(function () {
            let name =  $(this).data('name');
			let content =  $(this).data('content');
            let id =  $(this).data('idpost');
            $("#mdheader").html(name);
			$("#content").val(content);
            $("#post-id").val(id);
            $('#editmodel').modal({
                backdrop: 'static',
                keyboard: false
            });

        });
    });
	
})(jQuery);

function hidecmt(id,idcb) {
    cb = document.getElementById(idcb);
    console.log(cb);
    if (cb.checked == true)
    {
        document.getElementById(id).style.display = 'block';
        

    }else{
        document.getElementById(id).style.display = 'none';

    }
}