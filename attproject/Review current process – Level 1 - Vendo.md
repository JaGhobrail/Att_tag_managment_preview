Review current process – Level 1 - Vendor Investigations

Potential future process – Level 1 - Vendor Investigations

Set Month/Year to Investigate Level 1 (step 40) – default is the previous month.
1.  Automate script to run in 1st week of a new month to set to Month/Year

Investigate web tool should display current Month/Year under investigation
Investigate web tool should allow the change to previous Month/Year to review past investigations. 
Past setting could be passive, reading last Level 1 snapshot results OR active and re-generate next version of past Month/Year snapshot with current data
Parameters of scan_domain defaults to ‘att.com’ but should be able to be changed or set per user login/role.
Parameters of business_unit defaults to ‘Consumer’ but should be able to be changed or set per user login/role.
 
Manual update to current approved vendors and filter data
Prepare Approved Vendors
Manual load/update TMCR & DCM Data
Include any queued add on data to TMCR & DCM (Step 30)
Generate new Approved Vendors table from active TMCR & DCM data (Step 31)
Update Filter tables
Make sure updates from previous month’s reports are made to VM DB
Update other tables with any queued add on data (Step 35)
2.  Need to improve & automate data updates from TMCR & DCM

Move TMCR process from SharePoint to Web entry tool that feeds into TMCR domain and page tables? (other project?)
Automate download of CM360 data from DCM to feed into dcm domain table
Investigate web tool should allow automatic workflow to process queued add-on data to filters, TMCR & DCM data
Investigate web tool should allow automatic workflow to call preparation steps that preps and generates the current Approved Vendors table
Potential enhancement – historic past approved vendors could be used for comparisons to previous investigation data instead of only the current set.
Generate Vendor Investigates snapshot for set Month/Year (Step 41)
Create Snapshot as Version 1 or increment to next version
Pull consolidated set of Vendor Scan records for set Month/Year (Initially all marked “Investigate” in results)
3. Automatically generate Vendor Investigates snapshot for set Month/Year

As part of initial or refresh, investigate web tool should update the database and go through the steps to create a new snapshot or add the next version for the given Month/Year
Filter out records that do NOT need to be investigated and update Results with filters (Step 42)
Mark result ‘Functional’ if tracking domain in Func. Vendors table (Step 42a)
Mark result ‘Microsite if page section in Microsite Pages table (Step 42b)
Mark result ‘Approved if tracking domain & page section in Approved Vendors table (Step 42c)
Mark result ‘Remove if tracking domain & page section in Remove Vendors table (Step 42d)
Mark result ‘Request if tracking domain & page section in Request Vendors table (Step 42e)
Automatically filter out records that do NOT need to be investigated
As part of initial or refresh, investigate web tool should update the results of the generated snapshot for the set Month/Year based on Approved, Functional, Microsite, Remove & Request filters.
Collect Data on records that need investigation and produce Vendor Investigation reports in CSV format (Step 42)
Summary report
Vendor List
Tracker List
Tracker & Page Section List
Example URL List
6. Automatically generate and store current Vendor Investigation reports in the DB

Report tables or views can be used instead of CSV output files
Need for historic storage of past Month/Year tables TBD
Manual collection of reports into excel
7.  n/a – Data will exist primarily in DB

Manual transfer of Notes from previous reports
8. Notes from past investigations should be available for viewing and/or automatically propagate to latest investigations in DB

Manual publishing excel workbook in shared file space
9. Present reports on demand in investigate web tool

Production of excel version may not be needed but investigate web tool should allow the export of current report(s) if needed
 

Manual Do the Investigations (documented in attached)
Also follow-up and resolve those records marked “Request” or “Remove”
10.  Use web tool to document and aid in vendor investigations

Investigate web tool should allow interaction with reports to sort and filter on columns
Investigate web tool should enable the drill down of needed URLs or pulling of more detailed reports in support of investigations (TBD)
URLs should open in new windows or tabs
Manual Make changes to notes and result status in excel
11.  Changes to notes and change of results will be done in the Investigate web tool.

Investigate web tool should enable the adding and editing of notes associated with the particular Vendor, Tracking Domains, etc. (TBD)
Notes can be saved immediately to underlying DB structures
Time and date and id of user will be saved with notes or edits to notes
TBD if historical past versions notes need to be kept and for how long.
One note should be considered active for a given tracker domain and can be displayed across other reports like Vendor roll-up and those with page sections.
If need different nots based on page-section may need to consider how structure would align with level 2 page investigation notes
Manual Update VM DB
Approve à Add tracker domain(s) to existing TMCR or DCM domain tables
add_dom_to_tmcr('www.vendor.com','191')
add_page_to_tmcr(‘www.att.com/dir','191')  -- Used in Level 2
add_dom_to_dcm('www.vendor.com', 'www.att.com/dir')
Functional à Add tracker domain(s) to Functional table
add_func_vendor('www.vendor.com')
Microsite à Add page section(s) to Microsite table
add_microsite_page('www.att.com/dir')
Remove à Add tracker domain(s) and page section(s) to Remove table
add_remove_vendor('www.vendor.com', 'www.att.com/dir')
Request à Add tracker domain(s) and page section(s) to Remove table
add_request_vendor('www.vendor.com', 'www.att.com/dir')
Investigate à remove from existing filter(s) to return to original Investigate state
Depends on why being filtered out of list.
12. Changes to results done in Investigate web tool and will result in changes to the DB once they are saved or applied.

Investigate web tool should enable the change of Investigation results and save results to refresh and get next version of investigation snapshot
Changing results should be verified and accepted
Required data like TMCR ID or DCM domain need to be validated before accepting a valid change in result status to Approved
Some needed data will be pulled from the record whose result status is changing.
Saving Result changes should initiate the needed procedures to add to TMCR/DCM tables and Functional, Microsite, Remove, Request tables.
Once these are done it should initiate a new version of the snapshot and refresh the investigation tables being displayed to the next version.
Other steps TBD.
 

REPEAT Steps 2-8. Generate next version of Vendor Investigation reports
13.  n/a see above.

REPEAT Steps 9-12. Investigate next version of Vendor Investigation reports
14. n/a see above.

 

 

 

________________________________________________________________________________

Microsoft Teams meeting

Join on your computer, mobile app or room device

Click here to join the meeting

Meeting ID: 278 735 485 381
Passcode: H9TF7c

Download Teams | Join on the web

Join with a video conferencing device

att@m.webex.com

Video Conference ID: 114 213 415 0

Alternate VTC instructions

Or call in (audio only)

+1 346-200-6580,,57676213#   United States, Houston

Phone Conference ID: 576 762 13#