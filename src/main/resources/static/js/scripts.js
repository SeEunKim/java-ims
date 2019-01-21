// ## Login
$("#login button[type=submit]").click(login);

function login(e) {
    console.log("click login");
    e.preventDefault();

//    var queryString = $("#login").serialize();
//    console.log(queryString);

    var url = $('#login').attr("action");
    console.log(url);

    var json = new Object();
    json.userId = $('#userId').val();
    json.password = $('#password').val();

    console.log(JSON.stringify(json));

    $.ajax({
        type : 'post',
        url : url,
        data : JSON.stringify(json),
        contentType: 'application/json',
        error : function(xhr, status, error) {
            alert("아이디 또는 비밀번호가 다릅니다.")
        },
        success : function() {
            console.log("success");
            location.href = "/";
        }
    });
}


// ### add milstone
$(".mdl-menu__item_milestone").click(addMilestone);
function addMilestone(e) {
    console.log("click addMilestone");
    e.preventDefault();

    var url = $(this).find('a').attr("href");
    console.log(url);

    $.ajax({
        type : 'get',
        url : url,
        error : function() {
        },
        success : function(data) {

            if (data.valid) {

                alert('마일스톤 지정에 성공했습니다.');
                $("#milestone-menu").empty().append(data.object.userId);
            }
        }
    })
}

// ### add assignee
$(".mdl-menu__item_assignee").click(addAssignee);
function addAssignee(e) {
    console.log("click addAssignee");
    e.preventDefault();

    var url = $(this).find('a').attr("href");
    console.log(url);

    $.ajax({
        type : 'get',
        url : url,
        error : function(xhr, status, error) {
            console.log('error');
        },
        success : function(data, status) {
            console.log(data);
            console.log('success');


            if (data.valid) {

                   alert('담당자를 지정하였습니다.');
            }
        }
    });
}



// ### add labels
$(".mdl-menu__item_label").click(addLabels);
function addLabels(e) {
    console.log("click addLabels");
    e.preventDefault();

    var url = $(this).find('a').attr("href");
    console.log(url);

    $.ajax({
        type : 'get',
        url : url,
        error : function(xhr, status, error) {
            console.log('error');
        },
        success : function(data, status) {
            console.log(data);
            console.log('success');
            if (data.valid) {
                   alert('라벨을 지정했습니다..');
            }
        }
    });
}

// ### add answers
$(".add_answers button[type=submit]").click(addAnswers);
function addAnswers(e) {
    console.log("click addAnswers");
    e.preventDefault();

    var url = $(".add_answers").attr("action");
    console.log(url);

    var queryString = $(".add_answers").serialize();
    console.log(queryString);

    $.ajax({
        type : 'post',
        url : url,
        data : queryString,
        error : function() {
            console.log("error");
            location.href = "/users/login/form";
        },
        success : function(data) {
            console.log("success");
            console.log(data);

console.log(data.formattedCreateDate);
console.log(data.formattedDate);
            var answerTemplate = $("#answerTemplate").html();
            var template = answerTemplate.format(data.writer.userId, data.answer, data.formattedCreateDate);
            $(".comments").append(template);
            $("textarea[name=comment]").val("");

        }
    });
}

// ### update answers form
$("#updateAnswerForm").click(updateAnswerForm);
function updateAnswerForm(e) {
    console.log("click updateAnswerForm");
    e.preventDefault();

    var url = $("#updateAnswerForm").attr("href");
    console.log(url);

    $.ajax({
        type : 'get',
        url : url,
        error : function() {
            console.log("error");
            location.href = "/users/login/form";
        },
        success : function(data) {
            console.log("success");
            console.log(data);

            var answerTemplate = $("#answerUpdateTemplate").html();
            var template = answerTemplate.format(data.answer);
            $("#answerForm").append(template);
            $(".update_answer button[type=submit]").click(updateAnswer);
        }
    });
}


// ### update answers
$(".update_answer button[type=submit]").click(updateAnswer);
function updateAnswer(e) {
    console.log("click updateAnswer");
    e.preventDefault();

    var url = $(".update_answer").attr("action");
    console.log(url);

    var json = new Object();
    json.answer = $("#updatecomment").val();
    console.log(json);

     var submitBnt = $(this);

    $.ajax({
        type : 'put',
        url : url,
        data : JSON.stringify(json),
        dataType : 'json',
        contentType : 'application/json',
        error : function() {
            console.log("error");
            location.href = "/users/login/form";
        },
        success : function(data) {
            console.log("success");
            console.log(data);
            submitBnt.closest(".new-comment").remove();
            submitBnt.closest()

//            var answerTemplate = $("#answerUpdateTemplate").html();
//            var template = answerTemplate.format(data.answer);
//            $("#answerForm").append(template);
        }
    });

}


String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined'
        ? args[number]
        : match
        ;
  });
};