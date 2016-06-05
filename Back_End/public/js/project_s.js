
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

    function memAdd() {
        var div = document.createElement("div");
        member_num++;
        var memberid = "member_id" + member_num.toString();
        var result = "<input type=text id=";
        result += memberid;
        result +="><br><br>"
        div.innerHTML += "멤버" + member_num + "의 아이디 : "+result;

        document.getElementById("member_list").appendChild(div);
        if(member_num==1)
        {
            $('#member_id1').val($('#session').val());
            $('#member_id1').prop('readonly',true);
        }
    };

    function createOk() {
        if ($('#member_id1').val() == null)
        {
            alert("최소 1명의 사용자는 입력을 해야 합니다.");
            createNo();
            return;
        }
        else if($("#startDate").val()==""||$("#endDate").val() == "")
        {
            alert("시작날짜와 끝 날짜를 입력해 주세요");
            createNo();
            return;
        }
        else if ($('#project_name').val() == "")
        {
            alert("프로젝트의 이름을 입력해 주세요");
            createNo();
            return;
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
            }
        })
        
        

    };

    function createNo() {
        //초기화
        $('#project_name').val("");
        $('#project_explain').val("");
        for (var j = member_num; j > 0; j--) {
            app = document.getElementById("member_list");
            app.removeChild(app.childNodes[j]);
        }
        member_num = 0;

        $("#startDate").val("");
        $("#endDate").val("");


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
                    div.innerHTML = "<div class ='btext' id ='" + PID + "'value ='" + PID + "'>" + Pname + "</div>"
                    div.className = "p_Selector2"
                    div.onclick = function (e) {
                        last = e.target.getAttribute('value');
                        $('#infoModal').modal();
                    };

                    document.getElementById("container1").appendChild(div);
                    i++;

                    //초기화
                    $('#project_name').val("");
                    $('#project_explain').val("");
                    for (var j = member_num; j > 0; j--) {
                        app = document.getElementById("member_list");
                        app.removeChild(app.childNodes[j]);
                    }
                    member_num = 0;

                    $("#startDate").val("");
                    $("#endDate").val("");
                }
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
        updateData();

        $("#makeProject").on('click', function () {
            $("#basicModal").modal();
        })
       
    });

