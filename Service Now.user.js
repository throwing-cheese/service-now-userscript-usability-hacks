// ==UserScript==
// @name        Service Now Userscript Usability Hacks
// @version     1.0
// @description Various improvements to Service Now user interface
// @namespace   https://example.com/
// @author      Octu
// @homepage    https://github.com/octu/service-now-userscript-usability-hacks
// @match       https://*.service-now.com/*incident.do*
// @match       https://*.service-now.com/*incident_task.do*
// @match       https://*.service-now.com/*change_request.do*
// @match       https://*.service-now.com/*knowledge.do*
// @match       https://*.service-now.com/*pa_dashboard.do*
// @match       https://*.service-now.com/*problem.do*
// @match       https://*.service-now.com/*rm_release.do*
// @match       https://*.service-now.com/*rm_task.do*
// @match       https://*.service-now.com/*sc_req_item.do*
// @match       https://*.service-now.com/*sc_task.do*
// @match       https://*.service-now.com/*task_list.do*
// @match       https://*.service-now.com/*sys_email.do*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=service-now.com
// @grant       GM.setClipboard
// ==/UserScript==

(function() {
	'use strict';

	/*
	+-+-+-+-+-+-+-+-+-+
	|F|U|N|C|T|I|O|N|S|
	+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
	*/

	// Stylesheets function (used to define colours etc)
	function addGlobalStyle(css) {
		var head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css.replaceAll(';', ' !important;');
		head.appendChild(style);
	}

	// Return the id value of an element
	function return_id_value(id) {
		var this_id_value;
		if(document.getElementById(id)) {
			this_id_value = document.getElementById(id).value;
			return this_id_value;
		} else {
			this_id_value = "";
			return this_id_value;
		}
	}

	// Debug function, used when developing
	function debug_this(debug_label, debug_var, debug_type) {
		var debug_text;
		debug_text = '+--------------------------------+\n';
		debug_text += '::::: DEBUG START :::::\n';
		debug_text += '+--------------------------------+\n';
		debug_text += 'Variable: ' + debug_label + '\n';
		debug_text += 'Value: ' + debug_var + '\n';
		debug_text += '+--------------------------------+\n';
		debug_text += '::::: DEBUG END :::::\n';
		debug_text += '+--------------------------------+\n';
		if (debug_type === "log") {
			console.log(debug_text);
		} else if (debug_type === "alert") {
			alert(debug_text);
		}
	}

	/*
	+-+-+-+-+-+-+-+-+-+
	|V|A|R|I|A|B|L|E|S|
	+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
	*/

	// Get address of current page
	var url_loc = window.location.href;

	// Get hostname of current service now instance
	var url_domain = window.location.hostname;

	// Check which page is being viewed
	var Incident = url_loc.indexOf("incident.do"); // incident (e.g. INC0123456)
	var IncidentTask = url_loc.indexOf("incident_task.do"); // incident task (e.g. TASK0012345)
	var Change = url_loc.indexOf("change_request.do"); // change request (e.g. CHG0012345)
	var RITM = url_loc.indexOf("sc_req_item.do"); // request item (e.g. RITM001234)
	var CatalogTask = url_loc.indexOf("sc_task.do"); // catalog task (e.g. SCTASK0012345)
	var Problem = url_loc.indexOf("problem.do"); // problem (e.g. PRB0012345)
	var ProblemTask = url_loc.indexOf("problem_task.do"); // problem task (e.g. PTASK0012345)
	var Release = url_loc.indexOf("rm_release.do"); // release (e.g. RLSE0012345)
	var ReleaseTask = url_loc.indexOf("rm_task.do"); // release task (e.g. RTSK0010006)
	var TaskPage = url_loc.indexOf("task_list.do");
	var SysEmail = url_loc.indexOf("sys_email.do"); // email page

	// display content from email TEXTAREA in a separate DIV so HTML it contains can be easily read
	if(SysEmail > 1) {
		var textarea_content = document.getElementById("sys_readonly.sys_email.body").value
		var this_start2 = document.getElementById("sys_readonly.sys_email.subject");
		var new_div=document.createElement("div");
		new_div.setAttribute("style", "margin-top:10px; background:beige; padding:20px; border:1px solid black;");
		new_div.innerHTML = textarea_content;
		this_start2.parentNode.insertBefore(new_div, this_start2.nextSibling);
	}

	// Edit as per requirements
	var Person = "Daffy Duck";
	var TelNo = "Tel: 01234 123456";
	var JobTitle = "Helpdesk Person";
	var Company = "Support For Hire";
	var MyUserName = 'daffy.duck@example.com';
    var cc_email = "example@service-now.com";

	// Define variables based on record type
	// get the record number, descrition and where applicable, customer name

	var record_description, record_number, record_customer, record_user, record_created;

	if (Incident > 0) {
		record_number = return_id_value("sys_readonly.incident.number");
		record_description = return_id_value("incident.short_description");
		record_customer = return_id_value("sys_display.incident.company");
		record_user = return_id_value("sys_display.incident.caller_id");
	}

	if (IncidentTask > 0) {
		record_number = return_id_value("sys_readonly.incident_task.number");
		record_description = return_id_value("incident_task.short_description");
		record_customer = return_id_value("incident_task.company_label");
	}

	if (Change > 0) {
		record_number = return_id_value("change_request.number");
		record_description = return_id_value("change_request.short_description");
		record_customer = return_id_value("change_request.company_label");
	}

	if (RITM > 0) {
		record_number = return_id_value("sys_readonly.sc_req_item.number");
		record_description = return_id_value("sc_req_item.u_short_description");
		record_customer = return_id_value("sc_req_item.company_label");
	}

	if (CatalogTask > 0) {
		record_number = return_id_value("sys_readonly.sc_task.number");
		record_description = return_id_value("sc_task.short_description");
		record_customer = return_id_value("sc_task.company_label");
	}

	if (Problem > 0) {
		record_number = return_id_value("sys_readonly.problem.number");
		record_description = return_id_value("problem.short_description");
		record_customer = return_id_value("problem.company_label");
	}

	if (ProblemTask > 0) {
		record_number = return_id_value("sys_readonly.problem_task.number");
		record_description = return_id_value("sys_readonly.problem_task.short_description");
		record_customer = "n/a"; // there is no customer on problem tasks
	}

	if (Release > 0) {
		record_number = return_id_value("sys_readonly.rm_release.number");
		record_description = return_id_value("rm_release.short_description");
		record_customer = return_id_value("sys_display.rm_release.company");
	}

	if (ReleaseTask > 0) {
		record_number = return_id_value("sys_readonly.rm_task.number");
		record_description = return_id_value("rm_task.short_description");
		record_customer = return_id_value("rm_task.company_label");
	}

	// Variables to check which page is being viewed

	var isEmpty = url_loc.indexOf("assigned_toISEMPTY");
	var isMine = url_loc.indexOf("stateNOT");
	var STARTSWITHOracle = url_loc.indexOf("STARTSWITHOracle");

	/*
	+-+-+-+-+ +-+-+-+
	|C|O|P|Y| |U|R|L|
	+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
	Get the URL of the page being viewed, used for the Copy Link button
	*/

	var url_search = window.location.search;
	var url_origin = window.location.origin;
	var url_pathname = window.location.pathname;
	url_pathname = url_pathname.replace('/','');
	var url_ampersand = url_search.indexOf("&");
	var copy_url;
	if(url_ampersand < 0) {
		copy_url = url_origin + '/nav_to.do?uri=' + url_pathname + url_search;
	}
	var updated_query_string
	if(url_ampersand > 0) {
		updated_query_string = url_search.substring(0,url_ampersand);
		copy_url = url_origin + '/nav_to.do?uri=' + url_pathname + updated_query_string;
	}

	/*
	+-+-+-+
	|C|S|S|
	+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
	Stylesheets used to change colours / layout of elements on the page
	*/

	addGlobalStyle('.MyPills { padding:0 5px 0 5px; border-radius: 5px; text-align:center; display:block; opacity: 0.5; border-bottom:1px solid black; }');
	addGlobalStyle('.MyButtons { margin-left:1px; }');
	addGlobalStyle('.vt { border-bottom:1px solid ccc; border-left:1px solid #ccc; }');
	addGlobalStyle('.table.table-hover > tbody > tr:hover > td { background: yellow; }');
	addGlobalStyle('.custom_buttons1 { background:#fff; font-size:15px; margin-right:2px; }');
	addGlobalStyle('.list2_cell_background { background:transparent; }');
	addGlobalStyle('.custom_buttons2 { background:yellow; margin-right:2px; font: 15px "Arial", "Helvetica Neue", "Helvetica", Arial, sans-serif; color: #000; }');
	addGlobalStyle('.custom_buttons3 { background:#0368d4; margin-right:2px; font: 15px "Arial", "Helvetica Neue", "Helvetica", Arial, sans-serif; color: #fff; }');
	addGlobalStyle('.navbar-title-display-value { margin-right:5px; }');
	addGlobalStyle('input, select, textarea, .sn-card-component_records, .sn-widget-list-table-cell, .sn-widget-textblock-body, .sn-widget-textblock-body_formatted { font: 14px "Arial", "Helvetica Neue", "Helvetica", Arial, sans-serif; color: #000; }');

	/*
	+-+-+-+-+-+-+-+-+-+-+-+-+
	|R|E|C|O|R|D| |P|A|G|E|S|
	+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
	*/

	if(document.getElementsByClassName('navbar-title-twoline')[0] && SysEmail < 1) {

		// On Incidents, colour customer notes updates
		// get type of note
		// li class="h-card h-card_md h-card_comments" ... -> then 2nd DIV with class of "sn-card-component" (that's what the [1] does ([0] is the first DIV with class of "sn-card-component"
		// then get DIV with class of "sn-card-component-time" via getElementsByClassName("sn-card-component-time")[0]
		// then get first SPAN value nested below DIV with class of "sn-card-component-time" via querySelectorAll("span")[0].innerHTML

		var hcards, hcard, card_type, text_container;
		hcards = document.querySelectorAll(".h-card");
		for(hcard of hcards) {
			card_type = hcard.getElementsByClassName("sn-card-component")[1].getElementsByClassName("sn-card-component-time")[0].querySelectorAll("span")[0].innerHTML;
			if (card_type === "Customer notes" || card_type === "Additional comments") {
				hcard.setAttribute("style", "background: #cce6ff;");
			} else if (card_type === "Image uploaded") {
				hcard.setAttribute("style", "background: #ffffcc;");
			} else if (card_type === "Work notes") {
				hcard.setAttribute("style", "background: #ffe6cc;");
			} else if (card_type === "Attachment uploaded") {
				hcard.setAttribute("style", "background: #ccffe6;");
			}
		}

		// Code to add extra buttons onto certain pages

		var record_number_stripped;
		record_number_stripped = parseInt(record_number.replace(/\D/g,''));
		var today = new Date(); // e.g. Mon Mar 07 2022 09:36:45 GMT+0000 (Greenwich Mean Time)
		var dd = today.getDate();
		if(dd < 10) {
			dd='0'+dd;
		}
		var mm1 = today.toLocaleString('en-us', { month: 'short' });
		var mm = mm1.toUpperCase();
		var yyyy = today.getFullYear();
		today = dd + '-' + mm + '-' + yyyy;

		var text_update;
		text_update = 'Last Action\n';
		text_update += '~~~~~~~~~~~~~~~~~~~~~~\n';
		text_update += 'On ' + today + ' I \n';
		text_update += '\n';
		text_update += 'Next Action\n';
		text_update += '~~~~~~~~~~~~~~~~~~~~~~\n';
		text_update += 'Wait for reply from Oracle.\n';
		text_update += '\n';
		text_update += 'Next Action Date\n';
		text_update += '~~~~~~~~~~~~~~~~~~~~~~\n';
		text_update += 'Not known - review in 7 days if no update before then from Oracle.';
		text_update += '\n';

		var text_resolve;
		text_resolve = 'Issue\n';
		text_resolve += '~~~~~~~~~~~~~~~~~~~~~~\n';
		text_resolve += '\n';
		text_resolve += '\n';
		text_resolve += 'Cause\n';
		text_resolve += '~~~~~~~~~~~~~~~~~~~~~~\n';
		text_resolve += '\n';
		text_resolve += '\n';
		text_resolve += 'Solution\n';
		text_resolve += '~~~~~~~~~~~~~~~~~~~~~~\n';
		text_resolve += '\n';
		text_resolve += '\n';

		var record_ref = "RE: " + record_number + ": " + record_description;
		var record_ref_short = record_number + ": " + record_description;

		var email_data;
		email_data = "mailto:test@example.com?cc=" + cc_email;
		email_data += "&subject=" + record_ref;
		email_data += "&body=Hi,";
		email_data += "%0A";
		email_data += "%0A";
		email_data += "Thanks";
		email_data += "%0A";
		email_data += "%0A";
		email_data += Person;
		email_data += "%0A";
		email_data += JobTitle;
		email_data += "%0A";
		email_data += TelNo;
		email_data += "%0A";
		email_data += Company;

		function create_element (var_element_type, var_name, var_link, var_inner_html, var_class, var_title, var_copy_value, var_span_name) {
			var this_start = document.getElementsByClassName('navbar-title-twoline')[0];
			var_name=document.createElement("a");
			var_name.setAttribute("href", var_link);
			var_name.innerHTML = var_inner_html;
			var_name.setAttribute("class", var_class);
			var_name.setAttribute("title", var_title);
			if (var_element_type === "copy") {
				var_name.addEventListener("click", function() {
					GM.setClipboard(var_copy_value, "text")
				}, false);
			}
			var_span_name = document.createElement('span');
			var_span_name.setAttribute("class", "MyButtons");
			var_span_name.appendChild(var_name);
			this_start.parentNode.insertBefore(var_span_name, this_start.nextSibling);
		}

		var button_class1 = "btn btn-default navbar-btn custom_buttons1";
		var button_class2 = "btn btn-default navbar-btn custom_buttons2";
		var button_class3 = "btn btn-default navbar-btn custom_buttons3";
		var record_description_short = record_description.substring(0, 60);

		create_element("link","RecordTitle", "#", record_description_short, button_class2, record_description, "n/a", "span_RecordTitle");
        create_element("link","InternalLinkTop", "#tabs2_list", "🔽", button_class1, "Bottom Set of Tabs", "n/a", "span_InternalLinkTabsBottom");
		create_element("link","InternalLinkTabsTop", "#tabs2_section", "🔵", button_class1, "First Set of Tabs", "n/a", "span_InternalLinkTabsTop");
		create_element("link","InternalLinkTop", "#header_attachment", "🔼", button_class1, "Top Of Page", "n/a", "span_InternalLinkTop");
		create_element("copy","ButtonCopyTextResolved", "#", "✅", button_class1, "Copy Resolve Note Text to Clipboard", text_resolve, "span_ButtonCopyTextResolved");
		create_element("copy","ButtonCopyTextUpdate", "#", "📑", button_class1, "Copy Update Note Text to Clipboard", text_update, "span_ButtonCopyTextUpdate");
		create_element("copy","ButtonCopyURL", "#", "🔗", button_class1, "Copy URL", copy_url, "span_ButtonCopyURL");
		create_element("copy","ButtonCopyRecordNumStripped", "#", "1️⃣", button_class1, "Copy Numeric Record Number \n (" + record_number_stripped + ")", record_number_stripped, "span_ButtonCopyRecordNumStripped");
		create_element("copy","ButtonCopyRecordNum", "#", "🔟", button_class1, "Copy Full Record Number \n (" + record_number + ")", record_number, "span_ButtonCopyRecordNum");
		create_element("copy","ButtonCopyShortRef", "#", "🆗", button_class1, "Copy Record Reference \n (" + record_ref_short + ")", record_ref_short, "span_ButtonCopyShortRef");
		create_element("link","ButtonEmail", email_data, "📧", button_class1, "Email Customer", "n/a", "span_ButtonEmail");

	}

	/*
	+-+-+-+-+-+-+-+-+-+-+
	|P|A|G|E| |T|I|T|L|E|
	+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
	*/

	if (Incident > 0 || IncidentTask > 0 || Change > 0 || RITM > 0 || CatalogTask > 0 || Problem > 0 || ProblemTask > 0 || Release > 0 || ReleaseTask > 0) {
		var record_new_title = record_number + " / " + record_description + " / " + record_customer + " / " + record_user;
		document.title = record_new_title;
	}

	/*
	+-+-+-+-+-+-+-+-+-+-+
	|T|A|S|K|S| |P|A|G|E|
	+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
	https://patorjk.com/software/taag/#p=display&f=Digital&t=TASKS%20PAGE
	*/

	if (TaskPage > 0) {

	  /*##############################################################################
		 AUTO REFRESH PAGE
	  /*############################################################################*/

        if (isEmpty > 0 || isMine > 0 || STARTSWITHOracle > 0) {
			setTimeout(function() {
				location.reload(true);
			}, 300000); // 5 minutes
		}

	  /*##############################################################################
		 UPDATE PAGE TITLE
	  /*############################################################################*/

		var contentBody = document.getElementsByClassName('list2_body');

		if (contentBody) {
			for (var i = 0; i < contentBody.length; i++) {
				var innerHTML = contentBody[i].innerHTML;
				var item_count = (innerHTML.match(/record_class/g) || []).length;
			}

			var items;
			if (item_count !== null) {
				items = item_count;
			} else {
				items = 0;
			}

			var nowTime = new Date(new Date().getTime()).toLocaleTimeString(); // e.g. 09:36:28

			if (isEmpty > 0) {
				document.title = items + " - Empty @ " + nowTime;
			} else {
				document.title = items + " @ " + nowTime;
			}
		}

	  /*##############################################################################
		 TEXT REPLACEMENTS - TABLE CELLS
	  /*############################################################################*/

		var table_cells = document.querySelectorAll('td.vt');
		for (var j = 0; j < table_cells.length; j++) {
			var cell = table_cells[j];
			cell.innerHTML = cell.innerHTML.replaceAll('On Hold', '✅');
			cell.innerHTML = cell.innerHTML.replaceAll('Work in Progress', 'WIP');
			cell.innerHTML = cell.innerHTML.replaceAll('Root Cause Analysis', 'RCA');
			cell.innerHTML = cell.innerHTML.replaceAll('Development', 'Dev');
			cell.innerHTML = cell.innerHTML.replaceAll('In Progress', '🔴');
			cell.innerHTML = cell.innerHTML.replaceAll('Specification', 'Spec');
			cell.innerHTML = cell.innerHTML.replaceAll('British Broadcasting Corporation', 'BBC');
			cell.innerHTML = cell.innerHTML.replaceAll('Limited', 'Ltd');
			cell.innerHTML = cell.innerHTML.replaceAll('1 - Major', '🔴 [1]');
			cell.innerHTML = cell.innerHTML.replaceAll('2 - Significant', '🟠 [2]');
			cell.innerHTML = cell.innerHTML.replaceAll('3 - High', '🟡 [3]');
			cell.innerHTML = cell.innerHTML.replaceAll('4 - Moderate', '🟢 [4]');
			cell.innerHTML = cell.innerHTML.replaceAll('5 - Minor', '🔵 [5]');
			var html_check = cell.innerHTML;
			var html_check_code = html_check.indexOf("<");
			if (html_check_code < 0) {
				cell.innerHTML = cell.innerHTML.replaceAll(MyUserName, '<span class="MyPills" style="background:#A7E7AE; color: black;">✅</span>');
			}
			if(cell.innerHTML == "Incident") { cell.innerHTML = cell.innerHTML.replaceAll('Incident', '<span class="MyPills" style="background:red; color: white;">INC</span>'); };
			if(cell.innerHTML == "Incident Task") { cell.innerHTML = cell.innerHTML.replaceAll('Incident Task', '<span class="MyPills" style="background:red; color: white;">INC TASK</span>'); };
			if(cell.innerHTML == "Change Request") { cell.innerHTML = cell.innerHTML.replaceAll('Change Request', '<span class="MyPills" style="background:orange; color: black;">CHG</span>'); };
			if(cell.innerHTML == "Change Task") { cell.innerHTML = cell.innerHTML.replaceAll('Change Task', '<span class="MyPills" style="background:orange; color: black;">CHG TASK</span>'); };
			if(cell.innerHTML == "Requested Item") { cell.innerHTML = cell.innerHTML.replaceAll('Requested Item', '<span class="MyPills" style="background:#A7E7AE; color: black;">RITM</span>'); };
			if(cell.innerHTML == "Catalog Task") { cell.innerHTML = cell.innerHTML.replaceAll('Catalog Task', '<span class="MyPills" style="background:green; color: white;">TASK</span>'); };
			if(cell.innerHTML == "Problem Task") { cell.innerHTML = cell.innerHTML.replaceAll('Problem Task', '<span class="MyPills" style="background:fuchsia; color: white;">PRB TASK</span>'); };
			if(cell.innerHTML == "Problem") { cell.innerHTML = cell.innerHTML.replaceAll('Problem', '<span class="MyPills" style="background:purple; color: white;">PRB</span>'); };
			if(cell.innerHTML == "Request") { cell.innerHTML = cell.innerHTML.replaceAll('Request', '<span class="MyPills" style="background:#306090; color: white;">REQUEST</span>'); };
			if(cell.innerHTML == "Release") { cell.innerHTML = cell.innerHTML.replaceAll('Release', '<span class="MyPills" style="background:black; color: white;">RELEASE</span>'); };
			if(cell.innerHTML == "(empty)") { cell.innerHTML = cell.innerHTML.replaceAll('(empty)', '<span class="MyPills" style="background:rebeccapurple; color: white;">(empty)</span>'); };

		}

	  /*##############################################################################
		 TEXT REPLACEMENTS - TABLE HEADINGS
	  /*############################################################################*/

		var table_header_cells = document.querySelectorAll('a.table-col-header');
		for (var k = 0; k < table_header_cells.length; k++) {
			var cell_header = table_header_cells[k];
			cell_header.innerHTML = cell_header.innerHTML.replaceAll('Assignment group', 'Assg Gp');
			cell_header.innerHTML = cell_header.innerHTML.replaceAll('Assigned to', 'Assg To');
			cell_header.innerHTML = cell_header.innerHTML.replaceAll('Priority', '🟢');
			cell_header.innerHTML = cell_header.innerHTML.replaceAll('Important Notice [Incident]', 'Note');
			cell_header.innerHTML = cell_header.innerHTML.replaceAll('Incident or Request', 'Type');
			cell_header.innerHTML = cell_header.innerHTML.replaceAll('Task type', 'Type');
			cell_header.innerHTML = cell_header.innerHTML.replaceAll('Updates', '#');
			cell_header.innerHTML = cell_header.innerHTML.replaceAll('Company', 'Org');
			cell_header.innerHTML = cell_header.innerHTML.replaceAll('Opened by', 'Op By');
			cell_header.innerHTML = cell_header.innerHTML.replaceAll('Updated by', 'Up By');
			cell_header.innerHTML = cell_header.innerHTML.replaceAll('Number', 'Num');
			cell_header.innerHTML = cell_header.innerHTML.replaceAll('[Incident Task]', '');
			cell_header.innerHTML = cell_header.innerHTML.replaceAll('Requester Name', 'Requester');
			cell_header.innerHTML = cell_header.innerHTML.replaceAll('Chase count', 'CC');
			cell_header.innerHTML = cell_header.innerHTML.replaceAll('State', 'St');
		}

	}

})();
