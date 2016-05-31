{% extends 'layout.swig' %}


{% block page_header %}{% endblock %}



{% block page_body_nav %}
	<style type="text/css" media="screen">
	.shadow {
		-moz-box-shadow: 3px 3px 4px #aaaaaa;
		-webkit-box-shadow: 3px 3px 4px #aaaaaa;
		box-shadow: 3px 3px 4px #aaaaaa;
		/* For IE 8 */
		-ms-filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#aaaaaa')";
		/* For IE 5.5 - 7 */
		filter: progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#aaaaaa');
	}
	</style>

	<h1 style="font-size: 30px; font-weight: bold; font-family:세프리체">일정 관리</h1>aㅁㄴㅇ
	
	<div id="toolbar" class="ui-widget-header ui-corner-all" style="backgroundColor: black; font-color: white; padding:3px; vertical-align: middle; white-space:nowrap; overflow: hidden;">
		<button id="BtnPreviousMonth">이전 달</button>
		<button id="BtnNextMonth">다음 달</button>
		
		&nbsp;&nbsp;&nbsp;
		Date: <input type="text" id="dateSelect" size="20"/>
		&nbsp;&nbsp;&nbsp;
		<button id="public_click" class="btn btn-danger">공식일정보기</button>
		<button id="private_click" class="btn btn-warning">개인일정보기</button>
		<button class="btn btn-success" ><a href="javascript:openWin('popup2.html','1350','800')" style="color:white">팝업으로보기</a></button>
		<button id="test33" class="btn btn-primary">달력저장</button>
		
		
	</div>
{% endblock %}

{% block page_body %}

	<br>

	<!--
	You can use pixel widths or percentages. Calendar will auto resize all sub elements.
	Height will be calculated by aspect ratio. Basically all day cells will be as tall
	as they are wide.
	-->
	<div id="mycal"></div>



	<!-- debugging-->

	<!-- Add event modal form -->

	<div id="add-event-form" title="일정추가">
		<form>
		<fieldset>
			<label for="calcal">개인/공식 일정</label>
			
			<select id="calcal" class="text ui-widget-content ui-corner-all" style="margin-bottom:12px; width:100%; padding: .4em;">
				<option value="private" SELECTED>개인일정</option>
				<option value="public">공식일정</option>	
			</select>				
			
			<label for="name">일정제목</label>
			
			<input type="text" name="what" id="what" class="text ui-widget-content ui-corner-all" style="margin-bottom:12px; width:100%; padding: .4em;"/>
			
			<table style="width:100%; padding:5px;">
				<tr>
					<td>
						<label>시작하는 날</label>
						<input type="text" name="startDate" id="startDate" value="" class="text ui-widget-content ui-corner-all" style="margin-bottom:12px; width:95%; padding: .4em;"/>				
					</td>
					<td>&nbsp;</td>
					<td>
						<label>시</label>
						<select id="startHour" class="text ui-widget-content ui-corner-all" style="margin-bottom:12px; width:95%; padding: .4em;">
	                        <option value="0" selected>00</option>
							<option value="1">01</option>
							<option value="2">02</option>
							<option value="3">03</option>
							<option value="4">04</option>
							<option value="5">05</option>
							<option value="6">06</option>
							<option value="7">07</option>
							<option value="8">08</option>
							<option value="9">09</option>
							<option value="10">10</option>
							<option value="11">11</option>
	                        <option value="12">12</option>
	                        <option value="13">13</option>
	                        <option value="14">14</option>
	                        <option value="15">15</option>
	                        <option value="16">16</option>
	                        <option value="17">17</option>
	                        <option value="18">18</option>
	                        <option value="19">19</option>
	                        <option value="20">20</option>
	                        <option value="21">21</option>
	                        <option value="22">22</option>
	                        <option value="23">23</option>
	                        
						</select>				
					<td>
					<td>
						<label>분</label>
						<select id="startMin" class="text ui-widget-content ui-corner-all" style="margin-bottom:12px; width:95%; padding: .4em;">
							<option value="0" SELECTED>00</option>
							<option value="10">10</option>
							<option value="20">20</option>
							<option value="30">30</option>
							<option value="40">40</option>
							<option value="50">50</option>
						</select>				
					<td>
					
				</tr>
				<tr>
					<td>
						<label>끝나는 날</label>
						<input type="text" name="endDate" id="endDate" value="" class="text ui-widget-content ui-corner-all" style="margin-bottom:12px; width:95%; padding: .4em;"/>				
					</td>
					<td>&nbsp;</td>
					<td>
						<label>시</label>
						<select id="endHour" class="text ui-widget-content ui-corner-all" style="margin-bottom:12px; width:95%; padding: .4em;">
	                        <option value="0" selected>00</option>
	                        <option value="1">01</option>
	                        <option value="2">02</option>
	                        <option value="3">03</option>
	                        <option value="4">04</option>
	                        <option value="5">05</option>
	                        <option value="6">06</option>
	                        <option value="7">07</option>
	                        <option value="8">08</option>
	                        <option value="9">09</option>
	                        <option value="10">10</option>
	                        <option value="11">11</option>
	                        <option value="12">12</option>
	                        <option value="13">13</option>
	                        <option value="14">14</option>
	                        <option value="15">15</option>
	                        <option value="16">16</option>
	                        <option value="17">17</option>
	                        <option value="18">18</option>
	                        <option value="19">19</option>
	                        <option value="20">20</option>
	                        <option value="21">21</option>
	                        <option value="22">22</option>
	                        <option value="23">23</option>
						</select>				
					<td>
					<td>
						<label>분</label>
						<select id="endMin" class="text ui-widget-content ui-corner-all" style="margin-bottom:12px; width:95%; padding: .4em;">
							<option value="0" SELECTED>00</option>
							<option value="10">10</option>
							<option value="20">20</option>
							<option value="30">30</option>
							<option value="40">40</option>
							<option value="50">50</option>
						</select>				
					<td>						
							
				</tr>			
			</table>
			<table>
				<tr>
					<td>
						<label>배경색 선택</label>
					</td>
					</tr>
					<tr>						
					<td>
						<ul id="back">
							<li><input value="#000000" id="b#000000" name="colorSelectorBackground" type="radio" checked="true" /></li>
							<li><input value="#f1d04d" id="b#f1d04d" name="colorSelectorBackground" type="radio" checked="false" /></li>
							<li><input value="#caaf40" id="b#caaf40" name="colorSelectorBackground" type="radio" checked="false" /></li>
							<li><input value="#92d04f" id="b#92d04f" name="colorSelectorBackground" type="radio" checked="false" /></li>
							<li><input value="#7aaf42" id="b#7aaf42" name="colorSelectorBackground" type="radio" checked="false" /></li>
							<li><input value="#ed5850" id="b#ed5850" name="colorSelectorBackground" type="radio" checked="false" /></li>
							<li><input value="#b70218" id="b#b70218" name="colorSelectorBackground" type="radio" checked="false" /></li>
							<li><input value="#00bfff" id="b#00bfff" name="colorSelectorBackground" type="radio" checked="false" /></li>
							<li><input value="#dcdcdc" id="b#dcdcdc" name="colorSelectorBackground" type="radio" checked="false" /></li>
							<li><input value="#f5f5f5" id="b#f5f5f5" name="colorSelectorBackground" type="radio" checked="false" /></li>
							          </ul>							
					</td>						
					<tr>
					<td>
						<label>글자색 선택</label>
					</td>
					</tr>
					<tr>
					<td>
						<ul id="fore">
							<li><input value="#000000" id="f#000000" name="colorSelectorForeground" type="radio" checked="false" /></li>
							<li><input value="#f1d04d" id="f#f1d04d" name="colorSelectorForeground" type="radio" checked="false" /></li>
							<li><input value="#caaf40" id="f#caaf40" name="colorSelectorForeground" type="radio"checked="false" /></li>
							<li><input value="#92d04f" id="f#92d04f" name="colorSelectorForeground" type="radio"checked="false" /></li>
							<li><input value="#7aaf42" id="f#7aaf42" name="colorSelectorForeground" type="radio" checked="false" /></li>
							<li><input value="#ed5850" id="f#ed5850" name="colorSelectorForeground" type="radio" checked="false" /></li>
							<li><input value="#b70218" id="f#b70218" name="colorSelectorForeground" type="radio" checked="false" /></li>
							<li><input value="#00bfff" id="f#00bfff" name="colorSelectorForeground" type="radio" checked="false" /></li>
							<li><input value="#dcdcdc" id="f#dcdcdc" name="colorSelectorForeground" type="radio" checked="false" /></li>
							<li><input value="#f5f5f5" id="f#f5f5f5" name="colorSelectorForeground" type="radio" checked="true" /></li>
							          </ul>							 
	    
					</td>	
					<tr>					
				</tr>				
			</table>
			<label>일정내용</label><br>
			<textarea name="contents" id="contents" style="width:100%; border:1;overflow:visible;text-overflow:ellipsis; resize: none" rows="9"></textarea>
		</fieldset>
		</form>
	    <input type="hidden" id="tok" />
	    <input type="hidden" id="tok2" />
	</div>



	<div id="display-event-form" title="일정">
		
	</div>		

	<p>&nbsp;</p>


	<p>&nbsp;</p>

{% endblock %}


{% block page_body_footer %}{% endblock %}


{% block page_footer %}{% endblock %}