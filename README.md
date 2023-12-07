# Service Now Userscript Usability Hacks

- [Service Now Userscript Usability Hacks](#service-now-userscript-usability-hacks)
  * [Introduction](#introduction)
  * [Full List of Updates](#full-list-of-updates)
    + [Table Page URLs](#table-page-urls)
    + [Table Page Updates](#table-page-updates)
      - [Example Screenshot](#example-screenshot)
      - [List of Table Page Updates](#list-of-table-page-updates)
    + [Individual Record Pages](#individual-record-pages)
      - [Toolbar](#toolbar)
      - [Other Updates](#other-updates)
  * [Installation](#installation)
    + [Download the Userscript file](#download-the-userscript-file)
    + [Install Userscript Manager](#install-userscript-manager)
      - [Installation on Chrome](#installation-on-chrome)
        * [Install Tampermonkey](#install-tampermonkey)
        * [Import Userscript](#import-userscript)
  * [Post Installation Config](#post-installation-config)
    + [Table Page URLs](#table-page-urls-1)
- [Issues](#issues)

## Introduction

While using Service Now for working on Incidents,  Changes, Tasks etc. I found that there were a number of things I wanted do to improve the user interface.

Since I didn't have the power to make those changes from an admin point of view, I decided to use [userscripts](https://en.wikipedia.org/wiki/Userscript) to make on-the-fly changes to Service Now. These changes are only visible to me, but can be easily exported to a zip file and imported by others if they want the same updates / functionality.

Functionality includes things such as:

- Add email button
- Add buttons to automatically copy templates to the clipboard for Incident Updates / Incident Resolutions
- Add buttons to copy Incident Number, Title, URL etc. to clipboard
- Update values in table of records (e.g. incidents page) to easily see records I last updated, shorten long customer names, replace `In Process` with a green emoji tick etc. etc.

## Full List of Updates

### Table Page URLs

The `table pages` I refer to are pages listing records in a table format, such as:

- [Tickets Assigned to me](https://example.service-now.com/nav_to.do?uri=%2Ftask_list.do%3Fsysparm_query%3Dactive%253Dtrue%255Eassignment_groupDYNAMICd6435e965f510100a9ad2572f2b47744%255EstateNOT%2520IN-4%252C0%252C6%255Eassigned_toDYNAMIC90d1921e5f510100a9ad2572f2b477fe%26sysparm_first_row%3D1%26sysparm_view%3D)
- [Unassigned Tickets for Assignment Groups I have access to](https://example.service-now.com/nav_to.do?uri=%2Ftask_list.do%3Fsysparm_query%3Dactive%253Dtrue%255Eassignment_groupDYNAMICd6435e965f510100a9ad2572f2b47744%255EstateNOT%2520IN0%252C-4%252C6%255Eassigned_toISEMPTY%26sysparm_first_row%3D1%26sysparm_view%3D)

**Replace `example` in the URLs to the Service-Now identifier for your organisation.**

### Table Page Updates

#### Example Screenshot

![Sample Updated Table Page](https://jimpix.co.uk/dist/images/github/service-now/0002.png)

#### List of Table Page Updates

1. Auto-refresh table-pages every 5 minutes
2. Display record count and last refresh time in title bar
3. Colour-code priorities:
	- Major: 🔴 [1]
	- Significant: 🟠 [2]
	- High: 🟡 [3]
	- Moderate: 🟢 [4]
	- Minor: 🔵 [5]
4. Change status values:
	- On Hold: ✅
	- Work in Progress: WIP
	- Root Cause Analysis: RCA
	- Development: Dev
	- In Process: 🔴
	- Specification: Spec
5. If `Assigned To` is empty, style with purple `empty` marker to make the records easy to spot
6. If `Updated By` is my username, style with green marker to make my last updates easy to spot
7. Shorten column headings to save space and reduce horizontal scrolling:
	- Assignment group: Assg Gp
	- Assigned to: Assg To
	- Priority: 🟢
	- Important Notice [Incident]: Note
	- Incident or Request: Type
	- Task type: Type
	- Updates: #
	- Company: Org
	- Opened by: Op By
	- Updated by: Up By
	- Number: Num
	- [Incident Task]: 
	- Requester Name: Requester
	- Chase count: CC
	- State: St
8. Optionally, add in any other abbreviations as required, to the `TEXT REPLACEMENTS - TABLE CELLS` section - e.g. change `British Broadcasting Corporation` to `BCC` etc.
9. Colour code records by record type and abbreviate record type name:
	- Incident: INC
	- Incident Task: INC TASK
	- Change Request: CHG
	- Change Task: CHG TASK
	- Request Item: RITM
	- Catalog Task: TASK
	- Problem Task: PRB TASK
	- Problem: PRB
	- Release: RELEASE
	- Request: REQUEST
10. Apply cell borders to table layout
11. Highlight current row being hovered over in yellow
12. Apply background colour to activity panels
	- Customer notes and Additional comments: #cce6ff
	- Image uploaded: #ffffcc
	- Work notes: #ffe6cc
	- Attachment uploaded: #ccffe6

### Individual Record Pages

#### Toolbar

If page is one of these:
- Incident
- IncidentTask 
- Change
- CatalogTask
- Problem
- ProblemTask
- Release
- ReleaseTask

Then add the following toolbar to the top of the page:

![Single Record Toolbar](https://jimpix.co.uk/dist/images/github/service-now/0001a.png)

1. 📧: Create draft email referencing the ticket, CCd to the Service Now update email address. As long as the Subject line starts with `RE:` followed by the record number, then the email's contents and attachments will be automatically added to the Service Now record once you send the email.
	- Note that you will need to manually populate the correct `To` address.
	- Sample email:
	- ![Sample Email](https://jimpix.co.uk/dist/images/github/service-now/0003.png)
2. 🆗: Copy Record Reference
	- If Incident Number is `INC0123456` and Short Summary is `Oracle PO Approval Error` then `INC0123456: Oracle PO Approval Error` will be copied to the clipboard
3. 🔟: Copy Full Record Number
	-  If Incident Number is `INC0123456` then `INC0123456` will be copied to the clipboard
4. 1️⃣: Copy Numberic Record Number
	-  If Incident Number is `INC0123456` then `123456` will be copied to the clipboard
5. 🔗: Copy record's URL to the clipboard
6. 📑: Copy update text template to clipboard, which is useful for ensuring all updates follow the same format. Automatically includes today's date in the `Last Action` section:

![Update Template](https://jimpix.co.uk/dist/images/github/service-now/0004.png)

7. ✅: Copy resolultion text template to clipboard - also useful to ensure all resolutions follow the same format.

![Resolution Template](https://jimpix.co.uk/dist/images/github/service-now/0005.png)

8. 🔼: Jump to the top of the page
9. 🔵: Jump to the first set of tabs on the page (if tabbed view enabled)
10. 🔽: Jump to the bottom of the page
11. Record Title: Show record title in a yellow box

#### Other Updates

1. Updates made to record pages are also colour coded.
2. Page Title updated to include record_number + " / " + record_description + " / " + record_customer + " / " + record_user;

## Installation

### Download the Userscript file
1. Download the userscript file called `Service Now.user.js`

### Install Userscript Manager

1. Install your userscript manager of choice:
	- I use [Tampermonkey](https://www.tampermonkey.net/) for Chrome (it's also available for all other major browsers including:
		- [Chrome](https://www.tampermonkey.net/index.php?browser=chrome#download)
		- [Edge](https://www.tampermonkey.net/index.php?browser=edge#download)
		- [Firefox](https://www.tampermonkey.net/index.php?browser=firefox#download)
		- [Safari](https://www.tampermonkey.net/index.php?browser=safari&locale=en#download)
		- [Opera](https://www.tampermonkey.net/index.php?browser=opera&locale=en#download)
3. Other userscript managers are also available, such as [Greasemonkey for Firefox](https://addons.mozilla.org/en-GB/firefox/addon/greasemonkey/) and [Violentmonkey for Chrome, Firefox and Edge](https://violentmonkey.github.io/).

#### Installation on Chrome

I'll focus on using Tampermonkey on Chrome.

##### Install Tampermonkey

1. Install the Tampermonkey Add-On via the [Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
2. Click `Add to Chrome`:

![Add to Chrome](https://jimpix.co.uk/dist/images/github/service-now/0006.png)

3. Click `Add extension`:

![Add extension](https://jimpix.co.uk/dist/images/github/service-now/0007.png)

4. Click the `Extensions` button in the Chrome toolbar and click the white pin against the new Tampermonkey extension:

![Extensions](https://jimpix.co.uk/dist/images/github/service-now/0008.png)

5. The Extension will be shown on the Chrome Toolbar:

![Pinned Extension](https://jimpix.co.uk/dist/images/github/service-now/0009.png)

##### Import Userscript

1. Go to the Dashboard by clicking on the Tampermonkey Extension in the Chrome toolbar:

![Dashboard](https://jimpix.co.uk/dist/images/github/service-now/0010.png)

2. Click on the `Utilities` tab and then click on `Choose file` under the `Import from file` heading:

![Import from file](https://jimpix.co.uk/dist/images/github/service-now/0011.png)

3. Browse to the javascript file you downloaded on the [Download the Userscript file](#download-the-userscript-file) step

![Browse to file](https://jimpix.co.uk/dist/images/github/service-now/0012.png)

4. Click `Install`

![Install userscript](https://jimpix.co.uk/dist/images/github/service-now/0013.png)

## Post Installation Config

1. Once you have installed the Add-On, and imported the script, go to the script via `Tampermonkey > Dashboard > Click on script name`:

![Edit File](https://jimpix.co.uk/dist/images/github/service-now/0014.png)

2. Then update the values under the `Edit as per requirements` heading starting on approx line `108`:
	- `Person`: Your name - to appear in email
	- `TelNo`: Your phone number - to appear in email
	- `JobTitle`: Your job title - to appear in email
	- `Company`: Company you work for - to appear in email
	- `MyUserName`: Your username as it appears on Service Now list of records - so that when you last updated a record, your username will appear with a green background
	- `cc_email`: Email address for your Service Now updates to be CCd to

![Update settings](https://jimpix.co.uk/dist/images/github/service-now/0015.png)

### Table Page URLs

Finally, if you have made it this far through this essay - the updates to table pages work best when using these URLS:

- [Tickets Assigned to me](https://example.service-now.com/nav_to.do?uri=%2Ftask_list.do%3Fsysparm_query%3Dactive%253Dtrue%255Eassignment_groupDYNAMICd6435e965f510100a9ad2572f2b47744%255EstateNOT%2520IN0%252C-4%252C6%255Eassigned_toISEMPTY%26sysparm_first_row%3D1%26sysparm_view%3D)
- [Unassigned Tickets for Assignment Groups I have access to](https://example.service-now.com/nav_to.do?uri=%2Ftask_list.do%3Fsysparm_query%3Dactive%253Dtrue%255Eassignment_groupDYNAMICd6435e965f510100a9ad2572f2b47744%255EstateNOT%2520IN0%252C-4%252C6%255Eassigned_toISEMPTY%26sysparm_first_row%3D1%26sysparm_view%3D)

# Issues
If you have any problems with the instructions or the userscript, [please log an issue](https://github.com/otcu/service-now-userscript-usability-hacks/issues) or get in touch using [this contact form](https://jimpix.co.uk/contact/).
