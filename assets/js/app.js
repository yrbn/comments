
/*
        Function to add comment
*/
function addComment() {
    var button = document.querySelector(".comments_button"),
        commentInput = document.querySelector("#comment_input");

    button.addEventListener('click', add);
    commentInput.addEventListener('keyup', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) {
            add();
        }
    });

     function add() {

        var parent          = document.querySelector(".comments"),
            childItem       = parent.children[0],
            clonedNode      = childItem.cloneNode(true),
            avatarBlock     = clonedNode.querySelector(".comments_avatar"),
            commentBlock    = clonedNode.querySelector(".comments_block"),
            commentAuthor   = clonedNode.querySelector(".comments_author"),
            commentText     = clonedNode.querySelector(".comments_text"),
            dateBlock       = clonedNode.querySelector(".date_current"),
            likesBlock      = clonedNode.querySelector(".likes_count"),
            commentInput    = document.querySelector("#comment_input"),
            commentInputAva = document.querySelector(".addcomment_ava"),
            date            = new Date(),
            author          = "Vasya Pupkin";

        if(commentInput.value == '') {
            alert("Write something!");
        } else {
            avatarBlock.innerHTML = commentInputAva.innerHTML;
            commentAuthor.textContent = author;
            commentText.textContent = commentInput.value;
            dateBlock.textContent = currentDate();
            likesBlock.textContent = "0";
            clonedNode.dataset.date = +date;
            clonedNode.dataset.likes = 0;

            parent.appendChild(clonedNode);
            commentInput.value = '';
        }
        commentsCounter();
        likesCounter();
        sortOut();
    };
}



/*
        Function to get current time
*/
function currentDate() {
    Date.prototype.getMonthName = function() {
        var month = ['Jan','Feb','Mar','Apr','May','Jun',
        'Jul','Aug','Sep','Oct','Nov','Dec'];
        return month[this.getMonth()];
    }

    var date    = new Date(),
        current = date.getMonthName() + " " + date.getDate() + ", " + date.getHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes();

    return current;
}



/*
        Function to count likes 
*/
function likesCounter() {
    var likeElements   = [].slice.call(document.getElementsByClassName("js-icon-like")),
        counter        = document.getElementsByClassName("likes_count"),
        commentsBlock  = document.getElementsByClassName("comments_card");

    likeElements.forEach(function (element, i) {
        var clicks = +counter[i].innerHTML;
        commentsBlock[i].dataset.likes = clicks;

        element.addEventListener('click', function () {
            clicks++;
            counter[i].innerHTML = clicks;
            commentsBlock[i].dataset.likes = clicks;
        })
    });
}



/*
        Function to count comments 
*/
function commentsCounter() {
    var commentsBlock  = document.getElementsByClassName("comments_card"),
        commentsLength = commentsBlock.length;

    if(commentsBlock.length == 1) {
        document.querySelector(".js-comment-counter").innerHTML = commentsBlock.length + " comment"
    } else {
        document.querySelector(".js-comment-counter").innerHTML = commentsBlock.length + " comments"
    }
}



/*
        Function to sort comments 
*/
function sortOut() {

    var comments_block = document.getElementsByClassName("comments_card"),
        arr            = [].slice.call(comments_block),
        comments       = document.querySelector(".comments"),
        buttonBest     = document.querySelector(".js-btn_best"),
        buttonNewest   = document.querySelector(".js-btn_newest"),
        buttonOldest   = document.querySelector(".js-btn_oldest"),
        fragment       = document.createDocumentFragment();


    buttonBest.addEventListener('click', function () {

        arr.sort(function(a, b) {
            return +b.dataset.likes - +a.dataset.likes;
        });

        arr.forEach(function(item) {
            fragment.appendChild(item);
        });

        comments.appendChild(fragment);
    });

    buttonNewest.addEventListener('click', function () {

        arr.sort(function(a, b) {
            return +b.dataset.date - +a.dataset.date;
        });

        arr.forEach(function(item) {
            fragment.appendChild(item);
        });

        comments.appendChild(fragment);
    });

    buttonOldest.addEventListener('click', function () {

        arr.sort(function(a, b) {
            return +a.dataset.date - +b.dataset.date;
        });

        arr.forEach(function(item) {
            fragment.appendChild(item);
        });

        comments.appendChild(fragment);
    });
}



/*
        Function for menu toggle
*/
function menuCheckbox() {
    var menuButton    = document.querySelector(".menu_btn"),
        iconComments  = document.querySelector(".header_comments"),
        iconShare     = document.querySelector(".header_share"),
        iconBookmark  = document.querySelector(".header_bookmark"),
        iconCustomize = document.querySelector(".header_customize"),
        mqTablet      = window.matchMedia( "(max-width: 1023px)" ),
        mqPhone       = window.matchMedia( "(max-width: 767px)" );

    menuButton.onchange = function () {
        if(menuButton.checked) {
            iconComments.style.display = "inline";
            iconShare.style.display = "inline";

            if(mqTablet.matches) {
                iconBookmark.style.display = "inline";
            };

            if(mqPhone.matches) {
                iconCustomize.style.display = "inline";
            }

        } else {
            iconComments.style.display = "none";
            iconShare.style.display = "none";
            

            if(mqTablet.matches) {
                iconBookmark.style.display = "none";
            };

            if (mqPhone.matches) {
                iconCustomize.style.display = "none";
            };
        }
    };

    document.body.onresize = function () {
        var mqMonitor    = window.matchMedia( "(min-width: 1024px)" ),
            mqTabl       = window.matchMedia( "(min-width: 768px)" );

        if(mqMonitor.matches) {
            iconBookmark.style.display = "inline";
        };

        if (mqTabl.matches) {
            iconCustomize.style.display = "inline";
        };
    }
}


/*
        Init functions 
*/
function init() {
    addComment();
    sortOut();
    commentsCounter();
    likesCounter();
    menuCheckbox();
}


init();




