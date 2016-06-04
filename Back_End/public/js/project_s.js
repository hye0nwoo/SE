
    var i = 1;
    var member_num = 0;
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
        alert($('#project_name').val());
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
                PID: $('#member_id1').val()+member_num.toString(),
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
                $('#container1').children().remove();
                for(var k =0;k<data.length;k++)
                {
                    var Pname = data[k].pName;
                    var PID = data[k].pID;
                    var container = $("#container1"), UL = container.find("#listView2");
                    var project_id = "proj" + k.toString();
                    var div = document.createElement("div");
                    div.innerHTML = "<div class ='btext'>" + Pname + "</div>"
                    div.className = "p_Selector2"
                    div.onclick = function () {
                        //입력한내용이 만들어진 div 클릭하면 실행됨
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
    });
