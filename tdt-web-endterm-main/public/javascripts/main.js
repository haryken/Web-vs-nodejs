
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
        // $(".delete").click(function () {
        //     let name =  $(this).data('name');
        //     console.log(name);
        //     let id =  $(this).data('id');
        //     $("#mdheader").html(name);
        //     $("#delete-id").val(id);
        //     $('#myModal').modal({
        //         backdrop: 'static',
        //         keyboard: false
        //     });

        // });
    });
	//Delete post
	$(document).ready(function () {
        // $(".deletepost").click(function () {
        //     let name =  $(this).data('name');
        //     let id =  $(this).data('idpost');
        //     $("#mdheader").html(name);
        //     $("#deletepost-id").val(id);
        //     $('#myModal1').modal({
        //         backdrop: 'static',
        //         keyboard: false
        //     });

        // });
    });
	//edit post
	$(document).ready(function () {
        // $(".editpost").click(function () {
        //     let name =  $(this).data('name');
		// 	let content =  $(this).data('content');
        //     let id =  $(this).data('idpost');
        //     $("#mdheader").html(name);
		// 	$("#content").val(content);
        //     $("#post-id").val(id);
        //     $('#editmodel').modal({
        //         backdrop: 'static',
        //         keyboard: false
        //     });

        // });
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

// DEPARMENT USER PASSWORD UPDATE
(() => {

    function showErrorMessage(message) {
        let errorMessageElement = document.querySelector(".department-update-form-error-message");

        errorMessageElement.textContent = message;

        errorMessageElement.hidden = false;
    }

    function hideErrorMessage() {
        let errorMessageElement = document.querySelector(".department-update-form-error-message");

        errorMessageElement.hidden = true;
    }

    function showSuccessMessage(message) {
        let successMessageElement = document.querySelector(".department-update-form-success-message");

        successMessageElement.textContent = message;
        successMessageElement.hidden = false;
    }

    function hideSuccessMessage() {
        let successMessageElement = document.querySelector(".department-update-form-success-message");

        successMessageElement.hidden = true;
    }

    let form = document.querySelector(".department-update-form");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            let oldPassword = document.querySelector(".department-update-form-old-password").value;
            let newPassword = document.querySelector(".department-update-form-new-password").value;
            let rePassword = document.querySelector(".department-update-form-re-password").value;

            if (newPassword !== rePassword) {
                return showErrorMessage("Password and confirmation password doesn't match");
            }

            fetch("/users/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    newPassword,
                    oldPassword,
                })
            })
            .then(response => response.json())
            .then(data => {

                if (data.error) {
                    hideSuccessMessage();
                    showErrorMessage(data.error);
                } else {
                    hideErrorMessage();
                    showSuccessMessage("Password changed successfully");
                }
            })
            .catch(error => {
                console.log(error);
            })
        })
    }

})();

// STUDENT INFORMATION UPDATE
(() => {

    let form = document.querySelector(".student-update-form");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            let displayName = document.querySelector(".student-update-form-display-name").value;
            let className = document.querySelector(".student-update-form-class-name").value;
            let departmentName = document.querySelector(".student-update-form-department-name").value;
            let files = document.querySelector(".student-update-form-profile").files;

            const formData = new FormData();

            if (displayName && displayName.trim().length >= 0) {
                formData.append("displayName", displayName);
            }

            if (className && className.trim().length >= 0) {
                formData.append("className", className);
            }

            if (departmentName && departmentName.trim().length >= 0) {
                formData.append("departmentName", departmentName);
            }

            if (files.length > 0) {
                let profilePicture = files[0];

                let fileSplitted = profilePicture.name.split(".");

                let fileExtension = fileSplitted[fileSplitted.length - 1];

                if (fileExtension.match(/^(jpg|jpeg|png|gif)$/i)) {
                    formData.append("profilePicture", profilePicture);
                }
            }

            fetch("/users/update", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {

                hideMessages();

                if (data.error) {
                    showErrorMessage(data.error);
                } else {
                    showSuccessMessage("Update successfully!");
                    if (data.image) {
                        changeProfilePicture(data.image);
                    }
                }
            })
            .catch(error => {
                console.log(error);
            })
        })
    }

    function changeProfilePicture(imagePath) {
        let image = document.querySelector(".student-update-form-picture");

        image.src = imagePath;
    }

    function hideMessages() {
        let errorMessageElement = document.querySelector(".student-update-form-error-message");
        let successMessageElement = document.querySelector(".student-update-form-success-message");

        errorMessageElement.hidden = true;
        successMessageElement.hidden = true;
    }

    function showSuccessMessage(message) {
        let successMessageElement = document.querySelector(".student-update-form-success-message");
        successMessageElement.textContent = message;

        successMessageElement.hidden = false;
    }

    function showErrorMessage(message) {
        let errorMessageElement = document.querySelector(".student-update-form-error-message");

        errorMessageElement.textContent = message;

        errorMessageElement.hidden = false;
    }

})();

// ADMIN USER CREATION
(() => {

    function showErrorMessage(message) {
        let errorMessageElement = document.querySelector(".user-create-form-error-message");

        errorMessageElement.textContent = message;

        errorMessageElement.hidden = false;
    }

    function hideErrorMessage() {
        let errorMessageElement = document.querySelector(".user-create-form-error-message");

        errorMessageElement.hidden = true;
    }

    function showSuccessMessage(message) {
        let successMessageElement = document.querySelector(".user-create-form-success-message");

        successMessageElement.textContent = message;
        successMessageElement.hidden = false;
    }

    function hideSuccessMessage() {
        let successMessageElement = document.querySelector(".user-create-form-success-message");

        successMessageElement.hidden = true;
    }

    let form = document.querySelector(".user-create-form");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            let displayName = document.querySelector(".user-create-form-display-name").value;
            let username = document.querySelector(".user-create-form-username").value;
            let newPassword = document.querySelector(".user-create-form-new-password").value;
            let rePassword = document.querySelector(".user-create-form-re-password").value;

            if (newPassword !== rePassword) {
                return showErrorMessage("Password and confirmation password doesn't match");
            }

            fetch("/users/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    displayName,
                    username,
                    password: newPassword,
                    rePassword,
                })
            })
            .then(response => response.json())
            .then(data => {

                console.log(data);

                if (data.error) {
                    hideSuccessMessage();
                    showErrorMessage(data.error);
                } else {
                    hideErrorMessage();
                    showSuccessMessage("User created successfully");
                }
            })
            .catch(error => {
                console.log(error);
            })
        })
    }

})();


//D EPARTMENT USER SECTIONS ASSIGN

(() => {

    let modalSaveButton = document.querySelector(".user-assign-form-submit"); 

    if (modalSaveButton) {
        modalSaveButton.addEventListener("click", (event) => {
    
            fetch("/users/assign", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: modalSaveButton.getAttribute("userid"),
                    sections: handleGetSections(),
                })
            })
            .then(response => response.json())
            .then(data => {
    
                hideMessages();
    
                if (data.error) {
                    showErrorMessage(data.error);
                } else {
                    showSuccessMessage("Assign sections success!");
                }
            })
            .catch(error => console.log(error))
    
        })
    }


    $('.user-assign-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var userId = button.data('id') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)

        let modalSaveButton = document.querySelector(".user-assign-form-submit"); 

        modalSaveButton.setAttribute("userid", userId);

        hideMessages();

        fetch("/users/sections", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: userId
            })
        })
        .then(response => response.json())
        .then((data) => {
    
            let {
                departmentUser,
            } = data;
    
            handleClearingSections();
    
            if (!departmentUser) {
                
            } else {
                handleUpdatingSections(departmentUser.sections);
            }
        })
        .catch(error => {
            console.log(error);
        })

        // modal.find('.modal-title').text('New message to ' + recipient)
        // modal.find('.modal-body input').val(recipient)
    })

    function showSuccessMessage(message) {
        let successMessageElement = document.querySelector(".user-assign-form-success");

        successMessageElement.textContent = message;

        successMessageElement.hidden = false;
    }

    function showErrorMessage(message) {
        let errorMessageElement = document.querySelector(".user-assign-form-error");
        errorMessageElement.textContent = message;
        errorMessageElement.hidden = false;
    }

    function hideMessages() {
        let successMessageElement = document.querySelector(".user-assign-form-success");
        let errorMessageElement = document.querySelector(".user-assign-form-error");

        successMessageElement.hidden = true;
        errorMessageElement.hidden = true;

    }

    function handleGetSections() {
        let formCheckInputs = Array.from(document.querySelectorAll(".user-assign-form .form-check-input"));

        let sections = []

        formCheckInputs.forEach((formCheckInput) => {
            if (formCheckInput.checked) {
                sections.push(formCheckInput.value);
            }
        })

        return sections;

    }

    function handleClearingSections() {
        let formCheckInputs = Array.from(document.querySelectorAll(".user-assign-form .form-check-input"));

        formCheckInputs.forEach((formCheckInput) => {
            formCheckInput.checked = false;
        })
    }

    function handleUpdatingSections(userSections) {
        let formCheckInputs = Array.from(document.querySelectorAll(".user-assign-form .form-check-input"));

        console.log(userSections);

        formCheckInputs.forEach((formCheckInput) => {

            let found = userSections.find((userSection) => userSection === formCheckInput.value);

            if (found) {
                formCheckInput.checked = true;
            } else {
                formCheckInput.checked = false;
            }

        })


    }
})();


// STUDENT CREATE POST

(() => {
    let form = document.querySelector(".student-post-create");

    if (form) {

        function showDeleteModalSuccess (message) {
            let element = document.querySelector(".delete-post-modal-success");

            element.textContent = message;
            element.hidden = false;
        }

        function showDeleteModalError (message) {
            let element = document.querySelector(".delete-post-modal-error");
            element.textContent = message;
            element.hidden = false;
        }

        function hideDeleteMessages() {
            let success = document.querySelector(".delete-post-modal-success");
            let error = document.querySelector(".delete-post-modal-error");

            success.hidden = true;
            error.hidden = true;
        }

        document.querySelector(".delete-post-modal-button").addEventListener("click", function (event) {
            let postId = this.getAttribute("data-idpost");

            fetch(`/posts/${postId}/delete`, {
                method: "POST"
            })
            .then(response => response.json())
            .then(data => {

                console.log(data);

                hideDeleteMessages();

                if (data.error) {
                    showDeleteModalError(data.error);
                } else {
                    showDeleteModalSuccess("Delete post success");
                    deleteStudentPosts(data);
                }
            })
            .catch(error => console.log(error))
        })

        $("#myModal1").on("shown.bs.modal", (event) => {
            let button = $(event.relatedTarget)

            hideDeleteMessages();

            let postId = button.data("idpost")

            document.querySelector(".delete-post-modal-button").setAttribute("data-idpost", postId);
        });

        // EDIT MODEL

        function showEditModalSuccess (message) {
            let element = document.querySelector(".edit-post-modal-success");

            element.textContent = message;
            element.hidden = false;
        }

        function showEditModalError (message) {
            let element = document.querySelector(".edit-post-modal-error");

            element.textContent = message;
            element.hidden = false;
        }

        function hideEditMessages () {
            let successElement = document.querySelector(".edit-post-modal-success");
            let errorElement = document.querySelector(".edit-post-modal-error");

            successElement.hidden = true;
            errorElement.hidden = true;
        }

        document.querySelector(".edit-post-modal-form").addEventListener("submit", (event) => {
            event.preventDefault();

            let content = document.querySelector(".edit-post-modal-form-content").value;
            let youtubeLink = document.querySelector(".edit-post-modal-form-youtube").value;
            let files = document.querySelector(".edit-post-modal-form-picture").files;

            const formData = new FormData();

            if (content && content.trim().length > 0) {

                formData.append("content", content);
            }

            if (youtubeLink && youtubeLink.trim().length > 0) {
                formData.append("youtubeUrl", youtubeLink);
            }

            if (files.length > 0) {
                let postPicture = files[0];

                let fileSplitted = postPicture.name.split(".");

                let fileExtension = fileSplitted[fileSplitted.length - 1];

                if (fileExtension.match(/^(jpg|jpeg|png|gif)$/i)) {
                    formData.append("postPicture", postPicture);
                }
            }

            let postId = document.querySelector(".edit-post-modal-form-save").getAttribute("data-post");

            fetch(`/posts/${postId}/update`, {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {

                hideEditMessages();

                if (data.error) {

                    showEditModalError("Post updated failure");

                } else {
                    showEditModalSuccess("Post updated successfully");

                    updateStudentPosts(data);
                }
            })
            .catch(error => console.log(error));
        })

        $("#editmodel").on("shown.bs.modal", (event) => {
            let button = $(event.relatedTarget);
            let postId = button.data("idpost");

            console.log(postId);

            fetch(`/posts/${postId}`)
            .then(response => response.json())
            .then(data => {

                hideEditMessages();

                if (data.error) {

                    showEditModalError(data.error);

                } else {

                    document.querySelector(".edit-post-modal-form-save").setAttribute("data-post", data._id);
                    document.querySelector(".edit-post-modal-form-content").value = data.content;

                    if (data.youtubeUrl) {
                        document.querySelector(".edit-post-modal-form-youtube").value = data.youtubeUrl;
                    }
                    

                }
            })
            .catch(error => console.log(error));
        })


        form.addEventListener("submit", (event) => {
            event.preventDefault();

            let content = document.querySelector(".student-post-create-content").value;
            let youtubeLink = document.querySelector(".student-post-create-link").value;
            let files = document.querySelector(".student-post-create-picture").files;

            const formData = new FormData();

            if (content && content.trim().length > 0) {

                formData.append("content", content);
            } else {

                showErrorMessage("Content can't be blank!");

                return;
            }

            if (youtubeLink && youtubeLink.trim().length > 0) {
                formData.append("youtubeUrl", youtubeLink);
            }

            if (files.length > 0) {
                let postPicture = files[0];

                let fileSplitted = postPicture.name.split(".");

                let fileExtension = fileSplitted[fileSplitted.length - 1];

                if (fileExtension.match(/^(jpg|jpeg|png|gif)$/i)) {
                    formData.append("postPicture", postPicture);
                }
            }

            fetch("/posts/create", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {

                hideMessages();

                if (data.error) {
                    showErrorMessage(data.error);
                } else {
                    showSuccessMessage("Create post successfully");
                    renderPost(data);
                }
            })
            .catch(error => {
                console.log(error);
            })
        })
    }

    // STUDENT COMMENT CREATE

    let commentForms = Array.from(document.querySelectorAll(".student-post-comment-form"));

    if (commentForms) {

        commentForms.forEach((commentForm) => {
            commentForm.addEventListener("submit", (event) => {
                event.preventDefault();
    
                let content = commentForm.querySelector(".student-post-comment-content").value;
                let postId = commentForm.querySelector(".newsletter-btn").getAttribute("data-id");
    
                if (content && content.trim().length > 0) {
                    fetch(`/posts/${postId}/comment/add`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            content
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
    
                        } else {
                            updateStudentPostComments(data, postId);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
    
                } else {
                    return;
                }
    
            })
        })

    }

    let commentDeleteForm = document.querySelector(".student-post-delete-comment-form");

    if (commentDeleteForm) {
        commentDeleteForm.addEventListener("submit", (event) => {

            event.preventDefault();

            let commentDeleteFormButton = commentDeleteForm.querySelector(".student-post-delete-comment-button");
            
            let commentId = commentDeleteFormButton.getAttribute("data-id");
            let postId = commentDeleteFormButton.getAttribute("data-postid");

            fetch(`/posts/${postId}/comment/remove`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    commentId,
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {

                } else {
                    deleteStudentPostComments(data.commentId);
                }
            })
            .catch(error => console.log(error))

        })

        $("#myModal").on("shown.bs.modal", (event) => {
            let button = $(event.relatedTarget)

            let commentId = button.data("id");
            let postId = button.data("postid");

            let commentDeleteFormButton = document.querySelector(".student-post-delete-comment-button");

            commentDeleteFormButton.setAttribute("data-id", commentId);
            commentDeleteFormButton.setAttribute("data-postid", postId);
        
        });
    }

    // INFINITE SCROLL 

    let studentPostsContainer = document.querySelector(".student-posts");

    let currentPage = 1;

    let clientURL = window.location.href.split("/");
    let userId = clientURL[clientURL.length - 1];

    function infinitePostScrolling (event) {
        let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

        if (windowRelativeBottom > document.documentElement.clientHeight + 100) {
            return;    
        }

        this.removeEventListener("scroll", infinitePostScrolling);

        fetch(`/posts/?page=${currentPage}&user=${userId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.error) {

            } else {

                addPostsToStudentPosts(data);

                this.addEventListener("scroll", infinitePostScrolling);
                currentPage += 1
            }
        })
        .catch(error => console.log(error))
    } 

    if (studentPostsContainer) {
        
        window.addEventListener("scroll", infinitePostScrolling)

    }

    function addPostsToStudentPosts(posts) {
        posts.forEach((post) => addPost(post));
    }

    function addPost(post) {
        let containerDiv = document.createElement("div");
        let productDiv = document.createElement("div");
        let productPriceParagraph = document.createElement("p");
        let textArea = document.createElement("textarea");

        let youtubeDiv, youtubeIframe;
        
        let productImageDiv = document.createElement("div");
        let productImage = document.createElement("img");

        let productBodyDiv = document.createElement("div");
        let productButtonsDiv = document.createElement("div");
        let deleteButton = document.createElement("button");
        let deleteI = document.createElement("i");
        let deleteSpan = document.createElement("span");
        let updateButton = document.createElement("button");
        let updateI = document.createElement("i");
        let updateSpan = document.createElement("span");

        let shippingDetailDiv = document.createElement("div");
        let captionDiv = document.createElement("div");
        let colDiv = document.createElement("div");
        let reviewsDiv = document.createElement("div");
        let innerReviewsList = document.createElement("ul");

        // let commentListItem = document.createElement("li");
        // let reviewHeadingDiv = document.createElement("div");
        // let productWidgetDiv = document.createElement("div");
        // let deleteCommentButton = document.createElement("div");
        // let deleteCommentI = document.createElement("i");
        // let commentDisplayName = document.createElement("h5");
        // let commentDate = document.createElement("p");
        // let reviewBodyDiv = document.createElement("div");
        // let commentContent = document.createElement("p");

        let createCommentRowDiv = document.createElement("div");
        let createCommentColDiv = document.createElement("div");
        let newsletterDiv = document.createElement("div");
        let createCommentForm = document.createElement("form");
        let createCommentInput = document.createElement("input");
        let createCommentButton = document.createElement("button");
        let createCommentI = document.createElement("i");

        containerDiv.classList.add("col-md-12", "col-xs-8");
        productDiv.classList.add("product");
        productPriceParagraph.classList.add("product-price")
        productPriceParagraph.textContent = `${post.user.displayName} - ${new Date(post.createdAt).toDateString()}`;
        textArea.classList.add("input");
        textArea.readOnly = true;
        textArea.value = post.content;

        youtubeDiv = document.createElement("div");
        youtubeDiv.classList.add("student-post-youtube-container");

        if (post.youtubeUrl) {
            
            youtubeIframe = document.createElement("iframe");
            
            youtubeIframe.classList.add("embed-responsive-item");

            youtubeIframe.src = post.youtubeUrl;
            youtubeIframe.width = "500";
            youtubeIframe.height = "300";

            youtubeDiv.append(youtubeIframe);
        }

        productImageDiv.classList.add("product-img");
        productImage.src = post.imageUrl;

        productBodyDiv.classList.add("product-body");
        productButtonsDiv.classList.add("product-btns");
        deleteButton.classList.add("deletepost", "order-submit");
        deleteButton.setAttribute("type", "button");
        deleteButton.setAttribute("data-idpost", post._id);
        deleteButton.setAttribute("data-content", "Nội dung ở đây");
        deleteButton.setAttribute("data-name", "Xóa bài viết này");
        deleteButton.setAttribute("data-toggle", "modal");
        deleteButton.setAttribute("data-target", "#myModal1");

        deleteI.classList.add("fa", "fa-close");
        deleteSpan.classList.add("tooltipp");
        deleteSpan.textContent = "Xóa";

        updateButton.classList.add("editpost", "add-to-compare");
        updateButton.setAttribute("type", "button");
        updateButton.setAttribute("data-idpost", post._id);
        updateButton.setAttribute("data-content", "Nội dung ở đây");
        updateButton.setAttribute("data-name", "Xóa bài viết này");
        updateButton.setAttribute("data-toggle", "modal");
        updateButton.setAttribute("data-target", "#editmodel");

        updateI.classList.add("fa", "fa-cog");
        updateSpan.classList.add("tooltipp");
        updateSpan.textContent = "Chỉnh sửa";

        // deleteButton.addEventListener("click", function (event) {
        //     let name = this.getAttribute("data-name");
        //     let id = this.getAttribute("data-idpost");

        //     $("#myModal1").modal({
        //         backdrop: "static"
        //     })
        // })

        // updateButton.addEventListener("click", function (event) {
        //     let name = this.getAttribute("data-name");
        //     let id = this.getAttribute("data-idpost");

        //     $("#editmodel").modal({
        //         backdrop: "static"
        //     })
        // })

        shippingDetailDiv.classList.add("shiping-details");
        captionDiv.classList.add("caption");
        colDiv.classList.add("col-md-12");

        // reviewsDic ID

        innerReviewsList.classList.add("reviews");
        
        // comments

        // reviewHeadingDiv.classList.add("review-heading");
        // productWidgetDiv.classList.add("product-widget");
        // deleteCommentButton.classList.add("delete", "primary-btn", "btn-warning", "order-submit");
        // deleteCommentButton.setAttribute("type", "button");
        // deleteCommentButton.setAttribute("data-id", "id"); //l
        // deleteCommentButton.setAttribute("data-name", "Xóa cmt này");
        // deleteCommentI.classList.add("fa", "fa-close");
        // commentDisplayName.classList.add("name");
        // commentDisplayName.textContent = "123" //l
        // commentDate.classList.add("date");
        // commentDate.textContent = "123" // l
        // reviewBodyDiv.classList.add("review-body");
        // commentContent.textContent = "123" //l

        //

        createCommentRowDiv.classList.add("row");
        createCommentColDiv.classList.add("col-md-12");
        newsletterDiv.classList.add("newsletter");
        createCommentForm.method = "POST";
        createCommentForm.classList.add("student-post-comment-form");

        createCommentForm.addEventListener("submit", (event) => {
            event.preventDefault();
    
            let content = createCommentForm.querySelector(".student-post-comment-content").value;
            let postId = createCommentForm.querySelector(".newsletter-btn").getAttribute("data-id");

            if (content && content.trim().length > 0) {
                fetch(`posts/${postId}/comment/add`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        content
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {

                    } else {
                        updateStudentPostComments(data, postId);
                    }
                })
                .catch(error => {
                    console.log(error);
                })

            } else {
                return;
            }
        })

        createCommentInput.classList.add("input")
        createCommentInput.classList.add("student-post-comment-content");
        createCommentInput.name = "content";
        createCommentInput.type = "text";
        createCommentInput.required = true;
        createCommentInput.placeholder = "Viết bình luận...";
        createCommentButton.classList.add("newsletter-btn");
        createCommentButton.setAttribute("data-id", post._id);
        createCommentI.classList.add("fa", "fa-telegram");
        
        createCommentButton.append(createCommentI, "Post");
        createCommentForm.append(createCommentInput, createCommentButton);
        newsletterDiv.append(createCommentForm);
        createCommentColDiv.append(newsletterDiv);
        createCommentRowDiv.append(createCommentColDiv);

        if (post.comments) {
            post.comments.forEach((comment) => {
                let commentListItem = document.createElement("li");
                let reviewHeadingDiv = document.createElement("div");
                let productWidgetDiv = document.createElement("div");
                let deleteCommentButton = document.createElement("button");
                let deleteCommentI = document.createElement("i");
                let commentDisplayName = document.createElement("h5");
                let commentDate = document.createElement("p");
                let reviewBodyDiv = document.createElement("div");
                let commentContent = document.createElement("p");

                reviewHeadingDiv.classList.add("review-heading");
                productWidgetDiv.classList.add("product-widget");
                deleteCommentButton.classList.add("delete", "primary-btn", "btn-warning", "order-submit");
                deleteCommentButton.setAttribute("type", "button");
                deleteCommentButton.setAttribute("data-id", comment._id); //l
                deleteCommentButton.setAttribute("data-postid", post._id);
                deleteCommentButton.setAttribute("data-name", "Xóa cmt này");
                deleteCommentButton.setAttribute("data-toggle", "modal");
                deleteCommentButton.setAttribute("data-target", "#myModal");
                deleteCommentI.classList.add("fa", "fa-close");
                commentDisplayName.classList.add("name");
                commentDisplayName.textContent = comment.user?.displayName; //l
                commentDate.classList.add("date");
                commentDate.textContent = new Date(comment.createdAt).toDateString() // l
                reviewBodyDiv.classList.add("review-body");
                commentContent.textContent = comment.content; //

                commentListItem.setAttribute("data-id", comment._id);

                reviewBodyDiv.append(commentContent);
                deleteCommentButton.append(deleteCommentI);
                productWidgetDiv.append(deleteCommentButton);
                reviewHeadingDiv.append(productWidgetDiv, commentDisplayName, commentDate);

                commentListItem.append(reviewHeadingDiv, reviewBodyDiv);

                innerReviewsList.append(commentListItem);
            })
        }

        // reviewBodyDiv.append(commentContent);
        // deleteCommentButton.append(deleteCommentI);
        // productWidgetDiv.append(deleteCommentButton);
        // reviewHeadingDiv.append(productWidgetDiv, commentDisplayName, commentDate);

        // commentListItem.append(reviewHeadingDiv, reviewBodyDiv);

        // innerReviewsList.append(commentListItem);


        reviewsDiv.append(innerReviewsList);
        colDiv.append(reviewsDiv);
        captionDiv.append(colDiv);

        shippingDetailDiv.append(captionDiv, createCommentRowDiv);

        deleteButton.append(deleteI, deleteSpan);
        updateButton.append(updateI, updateSpan);

        productButtonsDiv.append(deleteButton, updateButton);
        productBodyDiv.append(productButtonsDiv);

        productImageDiv.append(productImage);


        productDiv.append(
            productPriceParagraph,
            textArea
        );

        productDiv.append(youtubeDiv);

        productDiv.append(productImageDiv, productBodyDiv, shippingDetailDiv);

        containerDiv.append(productDiv);

        containerDiv.setAttribute("data-post", post._id);

        let studentPosts = document.querySelector(".student-posts");

        studentPosts.append(containerDiv);
    }

    function deleteStudentPostComments(commentId) {

        console.log(commentId);

        let studentComment = document.querySelector(`li[data-comment="${commentId}"]`);

        console.log(studentComment);

        if (studentComment)
            studentComment.remove();
    }

    function updateStudentPostComments(comment, postId) {
        let studentPostListItem = document.querySelector(`div[data-post="${postId}"]`);
        let innerReviewsList = studentPostListItem.querySelector(".reviews");

        let commentListItem = document.createElement("li");
        let reviewHeadingDiv = document.createElement("div");
        let productWidgetDiv = document.createElement("div");
        let deleteCommentButton = document.createElement("button");
        let deleteCommentI = document.createElement("i");
        let commentDisplayName = document.createElement("h5");
        let commentDate = document.createElement("p");
        let reviewBodyDiv = document.createElement("div");
        let commentContent = document.createElement("p");

        reviewHeadingDiv.classList.add("review-heading");
        productWidgetDiv.classList.add("product-widget");
        deleteCommentButton.classList.add("delete", "primary-btn", "btn-warning", "order-submit");
        deleteCommentButton.setAttribute("type", "button");
        deleteCommentButton.setAttribute("data-id", comment._id); //l
        deleteCommentButton.setAttribute("data-postid", postId);
        deleteCommentButton.setAttribute("data-name", "Xóa cmt này");
        deleteCommentButton.setAttribute("data-toggle", "modal");
        deleteCommentButton.setAttribute("data-target", "#myModal");
        deleteCommentI.classList.add("fa", "fa-close");
        commentDisplayName.classList.add("name");
        commentDisplayName.textContent = comment.user?.displayName; //l
        commentDate.classList.add("date");
        commentDate.textContent = new Date(comment.createdAt).toDateString() // l
        reviewBodyDiv.classList.add("review-body");
        commentContent.textContent = comment.content; //l

        commentListItem.setAttribute("data-comment", comment._id);

        reviewBodyDiv.append(commentContent);
        deleteCommentButton.append(deleteCommentI);
        productWidgetDiv.append(deleteCommentButton);
        reviewHeadingDiv.append(productWidgetDiv, commentDisplayName, commentDate);

        commentListItem.append(reviewHeadingDiv, reviewBodyDiv);

        innerReviewsList.append(commentListItem);
    }

    function showSuccessMessage(message) {
        let successMessageElement = document.querySelector(".student-post-create-success-message");

        successMessageElement.textContent = message;
        
        successMessageElement.hidden = false;
    }

    function showErrorMessage(message) {
        let errorMessageElement = document.querySelector(".student-post-create-error-message");

        errorMessageElement.textContent = message;
        errorMessageElement.hidden = false;
    }

    function hideMessages() {
        let successMessageElement = document.querySelector(".student-post-create-success-message");
        let errorMessageElement = document.querySelector(".student-post-create-error-message");

        successMessageElement.hidden = true;
        errorMessageElement.hidden = true;
    }

    function deleteStudentPosts(data) {
        let {
            id
        } = data;

        let studentPostListItem = document.querySelector(`div[data-post="${id}"]`);

        studentPostListItem.remove();
    }

    function updateStudentPosts(data) {
        let {
            _id,
            imageUrl,
            youtubeUrl,
            content,
        } = data;

        let studentPostListItem = document.querySelector(`div[data-post="${_id}"]`);

        if (content) {
            let studentPostContent = studentPostListItem.querySelector("textarea");

            studentPostContent.value = content;
        }

        if (imageUrl) {
            let studentPostImage = studentPostListItem.querySelector("img");

            studentPostImage.src = imageUrl;
        }

        if (youtubeUrl) {
            let studentPostIframe = studentPostListItem.querySelector("iframe");

            if (studentPostIframe) {
                studentPostIframe.src = youtubeUrl;
            } else {
                studentPostIframe = document.createElement("iframe");
                studentPostIframe.classList.add("embed-responsive-item");

                studentPostIframe.src = youtubeUrl;
                studentPostIframe.width = "500";
                studentPostIframe.height = "300";

                let studentPostIframeContainer = studentPostListItem.querySelector(".student-post-youtube-container");
                studentPostIframeContainer.append(studentPostIframe);
            }
        }
    }

    function renderPost(post) {
        
        let containerDiv = document.createElement("div");
        let productDiv = document.createElement("div");
        let productPriceParagraph = document.createElement("p");
        let textArea = document.createElement("textarea");

        let youtubeDiv, youtubeIframe;
        
        let productImageDiv = document.createElement("div");
        let productImage = document.createElement("img");

        let productBodyDiv = document.createElement("div");
        let productButtonsDiv = document.createElement("div");
        let deleteButton = document.createElement("button");
        let deleteI = document.createElement("i");
        let deleteSpan = document.createElement("span");
        let updateButton = document.createElement("button");
        let updateI = document.createElement("i");
        let updateSpan = document.createElement("span");

        let shippingDetailDiv = document.createElement("div");
        let captionDiv = document.createElement("div");
        let colDiv = document.createElement("div");
        let reviewsDiv = document.createElement("div");
        let innerReviewsList = document.createElement("ul");

        // let commentListItem = document.createElement("li");
        // let reviewHeadingDiv = document.createElement("div");
        // let productWidgetDiv = document.createElement("div");
        // let deleteCommentButton = document.createElement("div");
        // let deleteCommentI = document.createElement("i");
        // let commentDisplayName = document.createElement("h5");
        // let commentDate = document.createElement("p");
        // let reviewBodyDiv = document.createElement("div");
        // let commentContent = document.createElement("p");

        let createCommentRowDiv = document.createElement("div");
        let createCommentColDiv = document.createElement("div");
        let newsletterDiv = document.createElement("div");
        let createCommentForm = document.createElement("form");
        let createCommentInput = document.createElement("input");
        let createCommentButton = document.createElement("button");
        let createCommentI = document.createElement("i");

        containerDiv.classList.add("col-md-12", "col-xs-12");
        productDiv.classList.add("product");
        productPriceParagraph.classList.add("product-price")
        productPriceParagraph.textContent = `${post.user.displayName} - ${new Date(post.createdAt).toDateString()}`;
        textArea.classList.add("input");
        textArea.readOnly = true;
        textArea.value = post.content;

        youtubeDiv = document.createElement("div");
        youtubeDiv.classList.add("student-post-youtube-container");

        if (post.youtubeUrl) {
            
            youtubeIframe = document.createElement("iframe");
            
            youtubeIframe.classList.add("embed-responsive-item");

            youtubeIframe.src = post.youtubeUrl;
            // youtubeIframe.width = "500";
            // youtubeIframe.height = "300";

            youtubeDiv.append(youtubeIframe);
        }

        if (post.imageUrl) {
            productImageDiv.classList.add("product-img");
            productImage.src = post.imageUrl;
        }


        productBodyDiv.classList.add("product-body");
        productButtonsDiv.classList.add("product-btns");
        deleteButton.classList.add("deletepost", "order-submit");
        deleteButton.setAttribute("type", "button");
        deleteButton.setAttribute("data-idpost", post._id);
        deleteButton.setAttribute("data-content", "Nội dung ở đây");
        deleteButton.setAttribute("data-name", "Xóa bài viết này");
        deleteButton.setAttribute("data-toggle", "modal");
        deleteButton.setAttribute("data-target", "#myModal1");

        deleteI.classList.add("fa", "fa-close");
        deleteSpan.classList.add("tooltipp");
        deleteSpan.textContent = "Xóa";

        updateButton.classList.add("editpost", "add-to-compare");
        updateButton.setAttribute("type", "button");
        updateButton.setAttribute("data-idpost", post._id);
        updateButton.setAttribute("data-content", "Nội dung ở đây");
        updateButton.setAttribute("data-name", "Xóa bài viết này");
        updateButton.setAttribute("data-toggle", "modal");
        updateButton.setAttribute("data-target", "#editmodel");

        updateI.classList.add("fa", "fa-cog");
        updateSpan.classList.add("tooltipp");
        updateSpan.textContent = "Chỉnh sửa";

        // deleteButton.addEventListener("click", function (event) {
        //     let name = this.getAttribute("data-name");
        //     let id = this.getAttribute("data-idpost");

        //     $("#myModal1").modal({
        //         backdrop: "static"
        //     })
        // })

        // updateButton.addEventListener("click", function (event) {
        //     let name = this.getAttribute("data-name");
        //     let id = this.getAttribute("data-idpost");

        //     $("#editmodel").modal({
        //         backdrop: "static"
        //     })
        // })

        shippingDetailDiv.classList.add("shiping-details");
        captionDiv.classList.add("caption");
        colDiv.classList.add("col-md-12");

        // reviewsDic ID

        innerReviewsList.classList.add("reviews");
        
        // comments

        // reviewHeadingDiv.classList.add("review-heading");
        // productWidgetDiv.classList.add("product-widget");
        // deleteCommentButton.classList.add("delete", "primary-btn", "btn-warning", "order-submit");
        // deleteCommentButton.setAttribute("type", "button");
        // deleteCommentButton.setAttribute("data-id", "id"); //l
        // deleteCommentButton.setAttribute("data-name", "Xóa cmt này");
        // deleteCommentI.classList.add("fa", "fa-close");
        // commentDisplayName.classList.add("name");
        // commentDisplayName.textContent = "123" //l
        // commentDate.classList.add("date");
        // commentDate.textContent = "123" // l
        // reviewBodyDiv.classList.add("review-body");
        // commentContent.textContent = "123" //l

        //

        createCommentRowDiv.classList.add("row");
        createCommentColDiv.classList.add("col-md-12");
        newsletterDiv.classList.add("newsletter");
        createCommentForm.method = "POST";
        createCommentForm.classList.add("student-post-comment-form");

        createCommentForm.addEventListener("submit", (event) => {
            event.preventDefault();
    
            let content = createCommentForm.querySelector(".student-post-comment-content").value;
            let postId = createCommentForm.querySelector(".newsletter-btn").getAttribute("data-id");

            if (content && content.trim().length > 0) {
                fetch(`posts/${postId}/comment/add`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        content
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {

                    } else {
                        updateStudentPostComments(data, postId);
                    }
                })
                .catch(error => {
                    console.log(error);
                })

            } else {
                return;
            }
        })

        createCommentInput.classList.add("input")
        createCommentInput.classList.add("student-post-comment-content");
        createCommentInput.name = "content";
        createCommentInput.type = "text";
        createCommentInput.required = true;
        createCommentInput.placeholder = "Viết bình luận...";
        createCommentButton.classList.add("newsletter-btn");
        createCommentButton.setAttribute("data-id", post._id);
        createCommentI.classList.add("fa", "fa-telegram");
        
        createCommentButton.append(createCommentI, "Post");
        createCommentForm.append(createCommentInput, createCommentButton);
        newsletterDiv.append(createCommentForm);
        createCommentColDiv.append(newsletterDiv);
        createCommentRowDiv.append(createCommentColDiv);

        if (post.comments) {
            post.comments.forEach((comment) => {
                let commentListItem = document.createElement("li");
                let reviewHeadingDiv = document.createElement("div");
                let productWidgetDiv = document.createElement("div");
                let deleteCommentButton = document.createElement("button");
                let deleteCommentI = document.createElement("i");
                let commentDisplayName = document.createElement("h5");
                let commentDate = document.createElement("p");
                let reviewBodyDiv = document.createElement("div");
                let commentContent = document.createElement("p");

                reviewHeadingDiv.classList.add("review-heading");
                productWidgetDiv.classList.add("product-widget");
                deleteCommentButton.classList.add("delete", "primary-btn", "btn-warning", "order-submit");
                deleteCommentButton.setAttribute("type", "button");
                deleteCommentButton.setAttribute("data-id", comment._id); //l
                deleteCommentButton.setAttribute("data-postid", post._id);
                deleteCommentButton.setAttribute("data-name", "Xóa cmt này");
                deleteCommentButton.setAttribute("data-toggle", "modal");
                deleteCommentButton.setAttribute("data-target", "#myModal");
                deleteCommentI.classList.add("fa", "fa-close");
                commentDisplayName.classList.add("name");
                commentDisplayName.textContent = comment.user?.displayName; //l
                commentDate.classList.add("date");
                commentDate.textContent = new Date(comment.createdAt).toDateString() // l
                reviewBodyDiv.classList.add("review-body");
                commentContent.textContent = comment.content; //

                commentListItem.setAttribute("data-id", comment._id);

                reviewBodyDiv.append(commentContent);
                deleteCommentButton.append(deleteCommentI);
                productWidgetDiv.append(deleteCommentButton);
                reviewHeadingDiv.append(productWidgetDiv, commentDisplayName, commentDate);

                commentListItem.append(reviewHeadingDiv, reviewBodyDiv);

                innerReviewsList.append(commentListItem);
            })
        }

        // reviewBodyDiv.append(commentContent);
        // deleteCommentButton.append(deleteCommentI);
        // productWidgetDiv.append(deleteCommentButton);
        // reviewHeadingDiv.append(productWidgetDiv, commentDisplayName, commentDate);

        // commentListItem.append(reviewHeadingDiv, reviewBodyDiv);

        // innerReviewsList.append(commentListItem);


        reviewsDiv.append(innerReviewsList);
        colDiv.append(reviewsDiv);
        captionDiv.append(colDiv);

        shippingDetailDiv.append(captionDiv, createCommentRowDiv);

        deleteButton.append(deleteI, deleteSpan);
        updateButton.append(updateI, updateSpan);

        productButtonsDiv.append(deleteButton, updateButton);
        productBodyDiv.append(productButtonsDiv);

        productImageDiv.append(productImage);


        productDiv.append(
            productPriceParagraph,
            textArea
        );

        productDiv.append(youtubeDiv);

        productDiv.append(productImageDiv, productBodyDiv, shippingDetailDiv);

        containerDiv.append(productDiv);

        containerDiv.setAttribute("data-post", post._id);

        let studentPosts = document.querySelector(".student-posts");

        studentPosts.prepend(containerDiv);
    }
    
})();

// DEPARTMENT CREATE ALERT

(() => {

    let form = document.querySelector(".department-post-create");

    console.log(form);

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            let content = document.querySelector(".department-post-create-content").value;

            let section = document.querySelector("#department-post-create-sections").value;

            // let section = sections.options[]

            if (content && content.trim().length > 0) {

                fetch("/alerts/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        content,
                        section
                    })
                })
                .then(response => response.json())
                .then(data => {

                    hideMessages();

                    if (data.error) {
                        showErrorMessage(data.error);
                    } else {
                        showSuccessMessage("Alert created successfully!");
                        updateAlerts(data);
                    }

                })
                .catch(error => {
                    console.log(error);
                })

            } else {
                showErrorMessage("Alert content must be specified");
            }
        })
    }

    function updateAlerts(alert) {
        // <div class="col-md-12 col-xs-12">
        //                 <div class="product">
        //                     <div class="product-body">
        //                         <p><%= alert.section.name %> - <%= new Date(alert.createdAt).toLocaleDateString() %> </p>
        //                         <h3 class="product-name"><a href="/alerts/render/<%= alert._id %>">
        //                             <%= alert.content %>
        //                         </a></h3>
        //                     </div>
        //                 </div>
        //             </div>

        let colDiv = document.createElement("div");
        let productDiv = document.createElement("div");
        let productBodyDiv = document.createElement("div");
        let contentHeading = document.createElement("p");
        let contentTitle = document.createElement("h3");
        let contentLink = document.createElement("a");

        colDiv.classList.add("col-md-12", "col-xs-12");
        productDiv.classList.add("product");
        productBodyDiv.classList.add("product-body");
        contentHeading.textContent = `${alert.section.name} - ${new Date(alert.createdAt).toLocaleDateString()}`;
        contentTitle.classList.add("product-name");
        contentLink.href = `/alerts/render/${alert._id}`;
        contentLink.textContent = alert.content;

        contentTitle.append(contentLink);
        productBodyDiv.append(contentHeading, contentTitle);
        productDiv.append(productBodyDiv);
        colDiv.append(productDiv);

        let alerts = document.querySelector(".department-alerts");

        alerts.prepend(colDiv);
    }

    function showErrorMessage(message) {
        let errorElement = document.querySelector(".department-post-create-error-message");
        errorElement.textContent = message;
        errorElement.hidden = false;
    }

    function showSuccessMessage(message) {
        let successElement = document.querySelector(".department-post-create-success-message");
        successElement.textContent = message;
        successElement.hidden = false;
    }

    function hideMessages() {
        let errorElement = document.querySelector(".department-post-create-error-message");
        let successElement = document.querySelector(".department-post-create-success-message");

        errorElement.hidden = true;
        successElement.hidden = true;
    }

})();


(() => {
    let currentPage = 0;
    let previousButton = document.querySelector(".alerts-container-previous");

    if (previousButton) {
        previousButton.addEventListener("click", (event) => {
            if (currentPage == 0) {
                return;
            } else {

                currentPage--;

                fetch(`/alerts?page=${currentPage}`)
                .then(response => response.json())
                .then(data => {
                    if (data.error) {

                    } else {
                        clearAlertsContainer();
                        updateAlertsContainer(data);
                        updatePageNumber(currentPage);
                    }
                })
                .catch(error => console.log(error));

            }
        })
    }

    let nextButton = document.querySelector(".alerts-container-next"); 

    if (nextButton) {
        nextButton.addEventListener("click", (event) => {

            currentPage++;
            
            fetch(`/alerts?page=${currentPage}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {

                } else {
                    clearAlertsContainer();
                    updateAlertsContainer(data);
                    updatePageNumber(currentPage);
                }
            })
            .catch(error => console.log(error));

        })
    }

    function updatePageNumber(pageNumber) {
        let pageNumberElement = document.querySelector(".alerts-container-page-number");

        pageNumberElement.textContent = pageNumber + 1;
    }

    function clearAlertsContainer() {
        let alertsContainer = document.querySelector(".alerts-container");

        alertsContainer.innerHTML = "";
    }

    function updateAlertsContainer (alerts) {
        alerts.forEach((alert) => {
            addAlert(alert)
        })
    }

    function addAlert(alert) {
        // <div class="col-md-12 col-xs-12">
        //                 <div class="product">
        //                     <div class="product-body">
        //                         <p><%= alert.section.name %> - <%= new Date(alert.createdAt).toLocaleDateString() %> </p>
        //                             <h3 class="product-name"><a href="/alerts/render/<%= alert._id %>">
        //                                 <%= alert.content %>
        //                             </a></h3>
        //                     </div>
        //                 </div>
        //             </div>

        let colDiv = document.createElement("div");
        let productDiv = document.createElement("div");
        let productBodyDiv = document.createElement("div");
        let contentHeading = document.createElement("p");
        let contentTitle = document.createElement("h3");
        let contentLink = document.createElement("a");

        colDiv.classList.add("col-md-12", "col-xs-12");
        productDiv.classList.add("product");
        productBodyDiv.classList.add("product-body");
        contentHeading.textContent = `${alert.section.name} - ${new Date(alert.createdAt).toLocaleDateString()}`;
        contentTitle.classList.add("product-name");
        contentLink.href = `/alerts/render/${alert._id}`;
        contentLink.textContent = alert.content;

        contentTitle.append(contentLink);
        productBodyDiv.append(contentHeading, contentTitle);
        productDiv.append(productBodyDiv);
        colDiv.append(productDiv);

        let alerts = document.querySelector(".alerts-container");

        alerts.append(colDiv);
    }
})();


(() => {
    let editAlertModalForm = document.querySelector(".edit-alert-modal-form");

    if (editAlertModalForm) {
        editAlertModalForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let content = document.querySelector(".edit-alert-modal-form-content").value;
            let alertId = document.querySelector(".edit-alert-modal-form-save").getAttribute("data-alertid");

            if (content && content.trim().length > 0) {

                fetch(`/alerts/${alertId}/update`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        content
                    })
                })
                .then(response => response.json())
                .then(data => {

                    hideEditMessages();

                    if (data.error) {
                        showEditModalError(data.error);
                    } else {
                        showEditModalSuccess("Alert updated successfully");
                        updateAlertContent(data);
                    }
                })  
                .catch(error => console.log(error))

            } else {
                showEditModalError("New content must be specified!");
            }
        })
    }

    function updateAlertContent(alert) {
        let alertContent = document.querySelector(".alert-content");
        alertContent.textContent = alert?.content;
    }

    function showEditModalError(message) {
        let errorElement = document.querySelector(".edit-alert-modal-error");

        errorElement.textContent = message;
        errorElement.hidden = false;
    }

    function showEditModalSuccess(message) {
        let successElement = document.querySelector(".edit-alert-modal-success");
        successElement.textContent = message;
        successElement.hidden = false;
    }

    function hideEditMessages() {
        let errorElement = document.querySelector(".edit-alert-modal-error");
        let successElement = document.querySelector(".edit-alert-modal-success");

        errorElement.hidden = true;
        successElement.hidden = true;
    }

    let deleteModalFormButton = document.querySelector(".delete-alert-modal-button");

    if (deleteModalFormButton) {
        deleteModalFormButton.addEventListener("click", function (event) {
            let alertId = this.getAttribute("data-alertid");

            fetch(`/alerts/${alertId}/delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => {

                hideDeleteMessages();

                if (data.error) {
                    showDeleteModalError(data.error);
                } else {
                    showDeleteModalSuccess("Delete alert successfully");
                }
            })
            .catch(error => console.log(error));
        })
    }

    function showDeleteModalError(message) {
        let errorElement = document.querySelector(".delete-alert-modal-error");

        errorElement.textContent = message;
        errorElement.hidden = false;
    }

    function showDeleteModalSuccess(message) {
        let successElement = document.querySelector(".delete-alert-modal-success");
        successElement.textContent = message;
        successElement.hidden = false;
    }

    function hideDeleteMessages() {
        let errorElement = document.querySelector(".delete-alert-modal-error");
        let successElement = document.querySelector(".delete-alert-modal-success");

        errorElement.hidden = true;
        successElement.hidden = true;
    }

    
})();