{% extends '../layout.swig' %}

{% block site_header %}

<link rel="stylesheet" type="text/css" href="/public/css/jquery-frontier-cal-1.3.2.css" />
<link rel="stylesheet" type="text/css" href="/public/css/colorpicker.css" />
<link rel="stylesheet" type="text/css" href="/public/css/jquery-ui-1.8.1.custom.css" />
<link rel="stylesheet" type="text/css" href="/public/css/colorselector.css" />
<link rel="stylesheet" type="text/css" href="/public/css/calendar.css" />
{%endblock%}

{%block site_body %}
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
	<div id="mycal"></div>
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
								<li class = "colors"><input value="#000000" id="b000000" name="colorSelectorBackground" type="radio" checked="true" /></li>
								<li class = "colors"><input value="#f1d04d" id="bf1d04d" name="colorSelectorBackground" type="radio"  /></li>
								<li class = "colors"><input value="#caaf40" id="bcaaf40" name="colorSelectorBackground" type="radio"  /></li>
								<li class = "colors"><input value="#92d04f" id="b92d04f" name="colorSelectorBackground" type="radio"  /></li>
								<li class = "colors"><input value="#7aaf42" id="b7aaf42" name="colorSelectorBackground" type="radio"  /></li>
								<li class = "colors"><input value="#ed5850" id="bed5850" name="colorSelectorBackground" type="radio"  /></li>
								<li class = "colors"><input value="#b70218" id="bb70218" name="colorSelectorBackground" type="radio"  /></li>
								<li class = "colors"><input value="#00bfff" id="b00bfff" name="colorSelectorBackground" type="radio"  /></li>
								<li class = "colors"><input value="#dcdcdc" id="bdcdcdc" name="colorSelectorBackground" type="radio"  /></li>
								<li class = "colors"><input value="#f5f5f5" id="bf5f5f5" name="colorSelectorBackground" type="radio"  /></li>
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
								<li class = "colors"><input value="#000000" id="f000000" name="colorSelectorForeground" type="radio"  /></li>
								<li class = "colors"><input value="#f1d04d" id="ff1d04d" name="colorSelectorForeground" type="radio"  /></li>
								<li class = "colors"><input value="#caaf40" id="fcaaf40" name="colorSelectorForeground" type="radio" /></li>
								<li class = "colors"><input value="#92d04f" id="f92d04f" name="colorSelectorForeground" type="radio" /></li>
								<li class = "colors"><input value="#7aaf42" id="f7aaf42" name="colorSelectorForeground" type="radio"  /></li>
								<li class = "colors"><input value="#ed5850" id="fed5850" name="colorSelectorForeground" type="radio"  /></li>
								<li class = "colors"><input value="#b70218" id="fb70218" name="colorSelectorForeground" type="radio"  /></li>
								<li class = "colors"><input value="#00bfff" id="f00bfff" name="colorSelectorForeground" type="radio"  /></li>
								<li class = "colors"><input value="#dcdcdc" id="fdcdcdc" name="colorSelectorForeground" type="radio"  /></li>
								<li class = "colors"><input value="#f5f5f5" id="ff5f5f5" name="colorSelectorForeground" type="radio" checked="true" /></li>
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


	<input type="hidden" value = "{{sid}}" id='session' />
		<input type="hidden" value = "{{pro}}" id='project' />
	<div id="display-event-form" title="일정">
		
	</div>		

	<p>&nbsp;</p>


	<p>&nbsp;</p>




{%endblock%}

{%block site_footer %}
<!-- Include JQuery UI (Required for calendar plugin.) -->
    <script type="text/javascript" src="/public/js/jquery-ui-1.8.1.custom.min.js"></script>

    <!-- Include color picker plugin (Not required for calendar plugin. Used for example.) -->
    <script type="text/javascript" src="/public/js/colorpicker.js"></script>

    <!-- Include jquery tooltip plugin (Not required for calendar plugin. Used for example.) -->
    <script type="text/javascript" src="/public/js/jquery.qtip-1.0.js"></script>
    <script type="text/javascript" src="/public/js/html2canvas.js"></script>
    <script type="text/javascript" src="/public/js/FileSaver.js"></script>
    <!--
        (Required for plugin)
        Dependancies for JQuery Frontier Calendar plugin.
        ** THESE MUST BE INCLUDED BEFORE THE FRONTIER CALENDAR PLUGIN. **
    -->
    <script type="text/javascript" src="/public/js/jshashtable-2.1.js"></script>
<script type="text/javascript" src="/public/js/jquery-frontier-cal-1.3.2.js"></script>
    <script type="text/javascript" src="/public/js/calendar.js"></script>
{%endblock%}