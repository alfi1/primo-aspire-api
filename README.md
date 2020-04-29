# primo-aspire-api
Link from Primo new ui to Talis Aspire API to display the reading lists on which an item is cited.

The script gets the MMSID of the item from the full display, makes a call to the Aspire API, and then displays the results in Primo.

A quick screencast of the end result can be seen at:
https://drive.google.com/file/d/0B31GYM72ZWvBbHp6dGZlSlhLN3c/view

20/04/2017. Talis have now made available an article on how other Primo customers can implement this integration.  https://support.talis.com/hc/en-us/articles/115002712709-Primo-Explore-Integrations-with-Talis-Aspire

05/05/2017.  I gave a talk at the Talis Insight conference, the recording of which is available at:
 http://go.talis.com/talis-insight-europe-2017-tim-graves
By lucky chance, this recording contains the explanatory screencast that I put together during the development process.  The original recordings were lost with a defunct Google account.

16/06/2017: code now rewritten to work in Angular 1.6
The May 2017 release of Primo moved from Angular 1.5 to 1.6.
This caused the original code to stop working for three different reasons.

When adapting for their own use, other sites will need to replace the whitelisted Talis Aspire URL to reflect their own Aspire tenancy.:
The line that needs changing is:
        .constant('AspireTrustBaseUrl', "https://sussex.rl.talis.com/")

27/07/2017
Code adapted to also work with Internet Explorer.

29/04/2020
Rewrote the code to check all local control numbers to get the correct MMSID. 
Before, the code just got the forst LCN from the list and checked that against the Aspire API.
This was missing items whose MMSID was in a lower position on the list of LCNs.
The changes are in aspire_rewrite_20200429.js
