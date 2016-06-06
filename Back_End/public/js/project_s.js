
    var i = 1;
    var member_num = 0;
    var project_num = 0;
    var last;
    jQuery.ready();
    function memDel() {
        app = document.getElementById("member_list");
        app.removeChild(app.childNodes[member_num]);
        member_num--;
    };
    function ememDel() {
        app = document.getElementById("emember_list");
        app.removeChild(app.childNodes[member_num]);
        member_num--;
    };

    function memAdd() {
        var div = document.createElement("div");
        member_num++;
        var memberid = "member_id" + member_num.toString();
        var result = "<input class='memberT' type=text id=";
        result += memberid;
        result += "><span></span><br><br>"
        
        if (member_num == 1) {
            div.innerHTML += "팀장"+ "의 아이디 : " + result;
        }
        else if(member_num==6)
        {
            alert("최대 5명까지 가능합니다.")
            member_num--;
            return false;
        }
        else
        {
            div.innerHTML += "멤버" + member_num + "의 아이디 : " + result;
        }
        document.getElementById("member_list").appendChild(div);
        if(member_num==1)
        {
            $('#member_id1').val($('#session').val());
            $('#member_id1').prop('readonly', true);
            $('#member_id1').next().attr('class', "glyphicon glyphicon-ok");
        }
        $('.memberT').on('blur', function (event) {
            $.ajax({
                type: "POST",
                url: "/check",
                data: {
                    uid : event.target.value
                },
                success:function(data)
                {
                    if(data=="성공")
                    {
                        event.target.nextSibling.className = "glyphicon glyphicon-ok"
                        
                    }
                    else if(data=="실패")
                    {
                        event.target.nextSibling.className = "glyphicon glyphicon-remove"
                    }
                }
            })
        });
        
    };
    function ememAdd2() {
        var div = document.createElement("div");
        member_num++;
        var memberid = "emember_id" + member_num.toString();
        var result = "<input type=text class='memberT' id='" + memberid + "'><span></span><br><br>";
        if (member_num == 1) {
            div.innerHTML += "팀장" + "의 아이디 : " + result;
        }
        else if (member_num == 6) {
            alert("최대 5명까지 가능합니다.")
            member_num--;
            return false;
        }
        else {
            div.innerHTML += "멤버" + member_num + "의 아이디 : " + result;
        };

        document.getElementById("emember_list").appendChild(div);

        if (member_num == 1) {
            $('#emember_id1').val($('#session').val());
            $('#emember_id1').prop('readonly', true);
            $('#emember_id1').next().attr('class', "glyphicon glyphicon-ok");
        }
        $('.memberT').on('blur', function (event) {
            $.ajax({
                type: "POST",
                url: "/check",
                data: {
                    uid: event.target.value
                },
                success: function (data) {
                    if (data == "성공") {
                        event.target.nextSibling.className = "glyphicon glyphicon-ok"

                    }
                    else if (data == "실패") {
                        event.target.nextSibling.className = "glyphicon glyphicon-remove"
                    }
                }
            })
        });
    };
    function ememAdd(id) {
        var div = document.createElement("div");
        member_num++;
        var memberid = "emember_id" + member_num.toString();
        var result = "<input type=text class='memberT' id='"+memberid+"'value='"+id+"'><span></span><br><br>";
        if (member_num == 1) {
            div.innerHTML += "팀장" + "의 아이디 : " + result;
        }

        else {
            div.innerHTML += "멤버" + member_num + "의 아이디 : " + result;
        };
       
        document.getElementById("emember_list").appendChild(div);

        if (member_num == 1) {
            $('#emember_id1').prop('readonly', true);
            $('#emember_id1').next().attr('class', "glyphicon glyphicon-ok");
        }
        $('.memberT').on('blur', function (event) {
            $.ajax({
                type: "POST",
                url: "/check",
                data: {
                    uid: event.target.value
                },
                success: function (data) {
                    if (data == "성공") {
                        event.target.nextSibling.className = "glyphicon glyphicon-ok"

                    }
                    else if (data == "실패") {
                        event.target.nextSibling.className = "glyphicon glyphicon-remove"
                    }
                }
            })
        });
    };

    function createOk() {
        var toc = 0;
        $('#member_list').children().each(function () {
            if ($(this).children().next().attr('class') != "glyphicon glyphicon-ok") {
                toc++;
            }

        });
        if ($('#member_id1').val() == null)
        {
            alert("최소 1명의 사용자는 입력을 해야 합니다.");
            createNo();
            return false;
        }
        else if($("#startDate").val()==""||$("#endDate").val() == "")
        {
            alert("시작날짜와 끝 날짜를 입력해 주세요");
            createNo();
            return false;
        }
        else if ($('#project_name').val() == "")
        {
            alert("프로젝트의 이름을 입력해 주세요");
            createNo();
            return false;
        }
        else if(toc!=0)
        {
            alert("계정이 확인되지 않은 사용자가 있습니다.");
            return false;
        }
        
             
        project_num++;
        $.ajax({
            type: "POST",
            url: '/main2',
            data:
            {
                name: $('#project_name').val(),
                SD: $('#startDate').val(),
                ED: $('#endDate').val(),
                PE: $('#project_explain').val(),
                MN: member_num,
                PID: $('#member_id1').val()+project_num.toString(),
                member1: $('#member_id1').val(),
                member2: $('#member_id2').val(),
                member3: $('#member_id3').val(),
                member4: $('#member_id4').val(),
                member5: $('#member_id5').val(),

            },
            success: function (data) {
                updateData();
                alert("성공적으로 추가되었습니다.");
                $('#basicModal').modal('hide');
            }
        })
        
        

    };

    function project_activation()
    {
       
        $.ajax({
            type: "POST",
            url: "/main3",
            data:
            {
                pro: last
            },
            success: function (data) {
                alert("정상적으로 활성화 되었습니다.");
                window.location.href = "/main"
            }
        });
    }
    function updateData()
    {
       
        $.ajax({
            type: "POST",
            url: "/main1",
            data:
            {
                id : $('#session').val()
            },
            success:function(data)
            {
                project_num = data.length;
                $('#container1').children().remove();
                for(var k =0;k<data.length;k++)
                {
                    var Pname = data[k].pName;
                    var PID = data[k].pID;
                    var container = $("#container1"), UL = container.find("#listView2");
                    var div = document.createElement("div");
                    div.setAttribute("value", PID);
                    div.innerHTML = "<div href='#' class = 'glyphicon glyphicon-search editp' ></div><br><div class ='btext' id ='" + PID + "'value ='" + PID + "'>" + Pname + "</div>"
                    div.className = "p_Selector2"
                    div.id = "b" + PID;
                    

                    document.getElementById("container1").appendChild(div);
                    i++;
                }
                $(".editp").on('click', function (event) {
                    event.stopPropagation();
                    last = event.target.parentNode.getAttribute('value');
                    $.ajax({
                        type: "POST",
                        url: "/editp",
                        data:
                        {
                            pid : last
                        },
                        success:function(data)
                        {
                            if ($('#session').val() == data.member1_id)
                            {
                                $('#editpb').prop('disabled', false);
                                $('#delpb').prop('disabled', false);
                            }
                            else
                            {
                                $('#editpb').prop('disabled', true);
                                $('#delpb').prop('disabled', true);
                            }
                            $("#edit_name").val(data.project_name);
                            $("#estartDate").val(data.start_date[0] + data.start_date[1] + data.start_date[2] + data.start_date[3] + '-' + data.start_date[5] + data.start_date[6] + '-' + data.start_date[8] + data.start_date[9]);
                            $("#eendDate").val(data.end_date[0] + data.end_date[1] + data.end_date[2] + data.end_date[3] + '-' + data.end_date[5] + data.end_date[6] + '-' + data.end_date[8] + data.end_date[9]);
                            $("#edit_explain").val(data.project_explain);
                            ememAdd(data.member1_id);
                            if (data.member2_id != "") ememAdd(data.member2_id);
                            if (data.member3_id != "") ememAdd(data.member3_id);
                            if (data.member4_id != "") ememAdd(data.member4_id);
                            if (data.member5_id != "") ememAdd(data.member5_id);
                           
                        }
                    })
                    $('#editModal').modal();
                });
                   
                $('.p_Selector2').on('click', function (e) {

                    last = e.target.getAttribute('value');
                    $('#infoModal').modal();

                })
            }
        })
    }
    $(document).ready(function () {
        $("#startDate").datepicker(
            {
                dateFormat:"yy-mm-dd"
            }
            );
        $("#endDate").datepicker({
            dateFormat: "yy-mm-dd"
        });
        $("#estartDate").datepicker(
            {
                dateFormat: "yy-mm-dd"
            }
            );
        $("#eendDate").datepicker({
            dateFormat: "yy-mm-dd"
        });
        updateData();

        $("#makeProject").on('click', function () {
            $("#basicModal").modal();
        })
        
        $('#basicModal').on('hidden.bs.modal', function () {
            $('#project_name').val("");
            $('#project_explain').val("");
            for (var j = member_num; j > 0; j--) {
                app = document.getElementById("member_list");
                app.removeChild(app.childNodes[j]);
            }
            member_num = 0;

            $("#startDate").val("");
            $("#endDate").val("");

        })

        $('#editModal').on('hidden.bs.modal', function () {
            $('#eproject_name').val("");
            $('#eproject_explain').val("");
            for (var j = member_num; j > 0; j--) {
                app = document.getElementById("emember_list");
                app.removeChild(app.childNodes[j]);
            }
            member_num = 0;
            $("#editpb").show();
            $("#editpbx").hide();
            $("#edit_name").prop('disabled', true);
            $("#estartDate").prop('disabled', true);
            $("#eendDate").prop('disabled', true);
            $("#edit_explain").prop('disabled', true);
            $("#ememadd").prop('disabled', true);
            $("#ememdel").prop('disabled', true);
            $("#editcommit").hide();

            $("#estartDate").val("");
            $("#eendDate").val("");

        })

        $('#delpb').on('click', function () {
            var temp = 'b' + last;
            $.ajax({
                type: "post",
                url: "/del",
                data:
                    {
                        pid : last
                    },
                success:function()
                 {
                    $('#' + temp).remove();
                    $('#editModal').modal('hide');
                 }
            })
            
        })
        $('#editpb').on('click', function () {
            $("#editpb").hide();
            $("#editpbx").show();
            $("#edit_name").prop('disabled', false);
            $("#estartDate").prop('disabled', false);
            $("#eendDate").prop('disabled', false);
            $("#edit_explain").prop('disabled', false);
            $("#ememadd").prop('disabled', false);
            $("#ememdel").prop('disabled', false);
            $("#editcommit").show();
            
        })

        $('#editpbx').on('click', function () {
            $("#editpb").show();
            $("#editpbx").hide();
            $("#edit_name").prop('disabled', true);
            $("#estartDate").prop('disabled', true);
            $("#eendDate").prop('disabled', true);
            $("#edit_explain").prop('disabled', true);
            $("#ememadd").prop('disabled', true);
            $("#ememdel").prop('disabled', true);
            $("#editcommit").hide();
        })

        $('#editcommit').on('click', function () {
            var toc = 0;
            $('#emember_list').children().each(function () {
                if ($(this).children().next().attr('class') != "glyphicon glyphicon-ok") {
                    toc++;
                }

            });
            if ($('#emember_id1').val() == null) {
                alert("최소 1명의 사용자는 입력을 해야 합니다.");
                createNo();
                return false;
            }
            else if ($("#estartDate").val() == "" || $("#eendDate").val() == "") {
                alert("시작날짜와 끝 날짜를 입력해 주세요");
                createNo();
                return false;
            }
            else if ($('#edit_name').val() == "") {
                alert("프로젝트의 이름을 입력해 주세요");
                createNo();
                return false;
            }
            else if (toc != 0) {
                alert("계정이 확인되지 않은 사용자가 있습니다.");
                return false;
            }


            project_num++;
            $.ajax({
                type: "POST",
                url: '/editcommit',
                data:
                {
                    name: $('#edit_name').val(),
                    SD: $('#estartDate').val(),
                    ED: $('#eendDate').val(),
                    PE: $('#edit_explain').val(),
                    MN: member_num,
                    PID: last,
                    member1: $('#emember_id1').val(),
                    member2: $('#emember_id2').val(),
                    member3: $('#emember_id3').val(),
                    member4: $('#emember_id4').val(),
                    member5: $('#emember_id5').val(),

                },
                success: function (data) {
                    alert("성공적으로 수정되었습니다.");
                    $('#editModal').modal('hide');
                    updateData();
                }
            })
        })
       
    });
    

